/**
 * ============================================================================
 * @file scripts/generateSitemap.ts
 * ============================================================================
 *
 * WHY:
 * Search engines rely on an accurate, automatically generated XML sitemap to
 * discover and index published pages. Static sitemaps go stale as soon as an
 * editor publishes a new blog or student story. The backend `getSitemap` API is
 * the source of truth for all published pages, so the sitemap is built from it
 * on every build while remaining resilient if the API is unavailable.
 *
 * WHAT:
 * 1. Fetches `https://aia.in.net/webapi/public/api/getSitemap` at build time.
 * 2. Maps the `data` (static pages), `blog` posts, and `student` stories into
 *    canonical URLs, using the API priority and `updated_at` lastmod values.
 * 3. Merges any pre-rendered routes discovered in `dist/` that the API does
 *    not return (home, policies, terms, course blog hubs, etc.).
 * 4. Falls back to the pre-rendered `dist/` routes if the API request fails,
 *    so the build never produces an empty or missing sitemap.
 * 5. Writes `sitemap.xml` and `robots.txt` to `dist/` and `public/`.
 *
 * DEPENDENCIES:
 * - `node:fs`, `node:path`, `node:url`: Native Node.js modules.
 * - `../src/config/site.ts`: `SITE_ORIGIN`, `COURSE_ROUTES`, `getCanonicalUrl`.
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { COURSE_ROUTES, SITE_ORIGIN, getCanonicalUrl } from '../src/config/site';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');

const SITEMAP_API = `${SITE_ORIGIN}/webapi/public/api/getSitemap`;
const API_TIMEOUT_MS = 30_000;
const buildDate = new Date().toISOString().split('T')[0];

/**
 * Routes that must never appear in sitemap.xml.
 * `/filter/` is a client-side redirect alias for `/fillter/` (see AppRoutes).
 */
const EXCLUDED_ROUTES = new Set<string>(['/filter']);

/**
 * Legacy API page URLs that redirect to a different canonical route.
 * Sitemaps must advertise the final destination, never the redirect source.
 */
const PAGE_URL_ALIASES: Record<string, string> = {
  'about-us': 'about-aia',
  'passed-out': 'alumni-network',
  'our-passouts': 'alumni-network',
};

interface SitemapApiPage {
  page_two_url?: string | null;
  page_two_priority?: string | null;
  page_two_status?: string | null;
  updated_at?: string | null;
}

interface SitemapApiStudent {
  student_slug?: string | null;
  student_status?: string | null;
  updated_at?: string | null;
}

interface SitemapApiResponse {
  data?: SitemapApiPage[];
  blog?: SitemapApiPage[];
  student?: SitemapApiStudent[];
}

interface SitemapEntry {
  route: string;
  priority: string;
  changefreq: string;
  lastmod: string;
}

function normalizeRoute(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, '') || '/';
}

function cleanSlug(value: string, prefix = ''): string {
  let slug = value.trim().replace(/^\/+/, '').replace(/\/+$/, '');
  if (prefix && slug.startsWith(`${prefix}/`)) {
    slug = slug.slice(prefix.length + 1);
  }
  return slug;
}

function isActive(status?: string | null): boolean {
  if (!status) return true;
  return status.trim().toLowerCase() === 'active';
}

function formatPriority(value: unknown, fallback: string): string {
  const num = typeof value === 'string' ? Number(value) : typeof value === 'number' ? value : NaN;
  if (Number.isFinite(num) && num >= 0 && num <= 1) return num.toFixed(1);
  return fallback;
}

function formatLastmod(value?: string | null): string {
  if (!value) return buildDate;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return buildDate;
  return date.toISOString().split('T')[0];
}

/**
 * Recursively scans directory for pre-rendered `index.html` files
 * and maps them to clean relative URL routes.
 */
function getHtmlFiles(dir: string, baseDir: string = dir): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath, baseDir));
    } else if (file === 'index.html') {
      const relative = path.relative(baseDir, filePath);
      const urlPath = relative.replace(/\\/g, '/').replace(/index\.html$/, '');
      const clean = urlPath.replace(/^\/+/, '').replace(/\/+$/, '');
      if (!clean) {
        results.push('/');
      } else if (COURSE_ROUTES.has(clean)) {
        results.push(`/${clean}`);
      } else {
        results.push(`/${clean}/`);
      }
    }
  }
  return results;
}

/**
 * Calculates SEO crawling priority and change frequency based on route importance:
 * - `1.0` (daily): Home page (`/`) - main brand hub.
 * - `0.9` (weekly): Flagship course landing pages (CFE, CIA, CAMS, CISA, Enroll Now).
 * - `0.8` (weekly): Dynamic and static blog articles (`/blogs/*`) - high organic search traffic.
 * - `0.7` (monthly): Student success stories and alumni network (`/passout-stories/*`).
 * - `0.3` (monthly): Legal, policies, terms & conditions.
 * - `0.6` (weekly): All other standard pages.
 */
function getRoutePriority(route: string): { priority: string; changefreq: string } {
  const clean = route.replace(/\/+$/, '') || '/';
  if (clean === '/') return { priority: '1.0', changefreq: 'daily' };
  if (
    [
      '/cfe-curriculum',
      '/cia-curriculum',
      '/cia-challenge-curriculum',
      '/cams',
      '/cisa',
      '/enroll-now',
    ].includes(clean)
  ) {
    return { priority: '0.9', changefreq: 'weekly' };
  }
  if (clean.startsWith('/blogs')) return { priority: '0.8', changefreq: 'weekly' };
  if (clean.startsWith('/passout-stories') || clean === '/alumni-network') {
    return { priority: '0.7', changefreq: 'monthly' };
  }
  if (['/policies', '/terms-and-conditions'].includes(clean)) {
    return { priority: '0.3', changefreq: 'monthly' };
  }
  return { priority: '0.6', changefreq: 'weekly' };
}

async function fetchSitemapData(): Promise<SitemapApiResponse | null> {
  try {
    const response = await fetch(SITEMAP_API, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    const payload = (await response.json()) as SitemapApiResponse;
    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid JSON payload');
    }
    return payload;
  } catch (error) {
    console.warn(
      `⚠️ [Sitemap Generator] getSitemap API unavailable (${(error as Error).message}). Falling back to pre-rendered routes.`,
    );
    return null;
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const entries = new Map<string, SitemapEntry>();

function upsertEntry(
  route: string,
  overrides: Partial<Pick<SitemapEntry, 'priority' | 'changefreq' | 'lastmod'>> = {},
): void {
  const normalized = normalizeRoute(route);
  if (!normalized || EXCLUDED_ROUTES.has(normalized)) return;
  const defaults = getRoutePriority(normalized);
  entries.set(normalized, {
    route: normalized,
    priority: overrides.priority ?? defaults.priority,
    changefreq: overrides.changefreq ?? defaults.changefreq,
    lastmod: overrides.lastmod ?? buildDate,
  });
}

/**
 * Blog articles and student stories are owned by the CMS. When the API is
 * reachable, its response is authoritative for these routes so unpublished
 * entries do not linger in a stale pre-rendered `dist/` directory.
 */
function isApiManagedRoute(route: string): boolean {
  const clean = route.replace(/\/+$/, '');
  if (clean.startsWith('/passout-stories/')) return true;
  return clean.startsWith('/blogs/') && !clean.startsWith('/blogs/course/');
}

// 1. Fetch live CMS data before seeding so dynamic routes can be delegated to it.
const apiData = await fetchSitemapData();
let apiRouteCount = 0;

// 2. Seed with pre-rendered routes; skip API-owned sections when the API is live.
for (const route of getHtmlFiles(distDir)) {
  if (apiData && isApiManagedRoute(route)) continue;
  upsertEntry(route);
}

// 3. Overlay live CMS data from the getSitemap API.
if (apiData) {
  for (const page of apiData.data ?? []) {
    if (!page.page_two_url || !isActive(page.page_two_status)) continue;
    const route = normalizeRoute(page.page_two_url);
    const canonicalRoute = PAGE_URL_ALIASES[route.replace(/^\//, '')] ?? route;
    upsertEntry(canonicalRoute, {
      priority: formatPriority(page.page_two_priority, getRoutePriority(canonicalRoute).priority),
      changefreq: 'weekly',
      lastmod: formatLastmod(page.updated_at),
    });
    apiRouteCount += 1;
  }

  for (const blog of apiData.blog ?? []) {
    if (!blog.page_two_url || !isActive(blog.page_two_status)) continue;
    const slug = cleanSlug(blog.page_two_url, 'blogs');
    if (!slug) continue;
    upsertEntry(`/blogs/${slug}`, {
      priority: formatPriority(blog.page_two_priority, '0.8'),
      changefreq: 'weekly',
      lastmod: formatLastmod(blog.updated_at),
    });
    apiRouteCount += 1;
  }

  for (const student of apiData.student ?? []) {
    if (!student.student_slug || !isActive(student.student_status)) continue;
    const slug = cleanSlug(student.student_slug, 'passout-stories');
    if (!slug) continue;
    upsertEntry(`/passout-stories/${slug}`, {
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: formatLastmod(student.updated_at),
    });
    apiRouteCount += 1;
  }
}

// 4. Always guarantee the home page is present and sorted first.
upsertEntry('/', { priority: '1.0', changefreq: 'daily', lastmod: buildDate });

const routes = [...entries.values()].sort((a, b) => {
  if (a.route === '/') return -1;
  if (b.route === '/') return 1;
  return a.route.localeCompare(b.route);
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ route, priority, changefreq, lastmod }) => `  <url>
    <loc>${escapeXml(getCanonicalUrl(route))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml.trim(), 'utf8');
}

// Also keep public/sitemap.xml updated for repo consistency
if (fs.existsSync(publicDir)) {
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml.trim(), 'utf8');
}

const robotsTxt = `User-agent: *
Allow: /

# Private Endpoints
Disallow: /admin
Disallow: /dashboard
Disallow: /login
Disallow: /auth
Disallow: /api

# Sitemap Reference
Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt.trim(), 'utf8');
}

if (fs.existsSync(publicDir)) {
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt.trim(), 'utf8');
}

console.log(
  `✅ [Sitemap Generator] Generated sitemap.xml with ${routes.length} URLs (${apiRouteCount} from getSitemap API) -> dist/ & public/`,
);
console.log(`✅ [Sitemap Generator] Generated robots.txt referencing ${SITE_ORIGIN}/sitemap.xml`);
