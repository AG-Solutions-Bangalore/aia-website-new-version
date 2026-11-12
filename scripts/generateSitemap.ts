/**
 * ============================================================================
 * @file scripts/generateSitemap.ts
 * ============================================================================
 *
 * WHY:
 * Search engines rely on an accurate XML sitemap to discover and index published pages.
 * The backend `getSitemap` API (https://aia.in.net/webapi/public/api/getSitemap) is the
 * single source of truth for all published CRM content, blogs, and core pages.
 *
 * WHAT:
 * 1. Fetches live content directly from `https://aia.in.net/webapi/public/api/getSitemap`.
 * 2. Maps `data` (active static pages) and `blog` (active CRM blog posts) into canonical URLs.
 * 3. Enforces strict trailing-slash rules:
 *    - Course pages ONLY (/cfe-curriculum, /cia-curriculum, /cia-challenge-curriculum, /cams, /cisa) have NO trailing slash.
 *    - All other pages (/, /about-aia/, /blogs/, /blogs/:slug/, etc.) have a trailing slash.
 * 4. Excludes student passout stories (/passout-stories/*) per noindex policy.
 * 5. Generates sitemap.xml and robots.txt in dist/ and public/.
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE_ORIGIN, getCanonicalUrl } from '../src/seo/server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');

const SITEMAP_API = `${SITE_ORIGIN}/webapi/public/api/getSitemap`;
const API_TIMEOUT_MS = 30_000;
const buildDate = new Date().toISOString().split('T')[0];

/**
 * Legacy API page URLs that redirect to a different canonical route.
 * Sitemaps must advertise the final destination, never the redirect source.
 */
const PAGE_URL_ALIASES: Record<string, string> = {
  'about-us': 'about-aia',
  'passed-out': 'alumni-network',
  'our-passouts': 'alumni-network',
  'contact-us': 'contact',
};

interface SitemapApiPage {
  page_two_url?: string | null;
  page_two_priority?: string | null;
  page_two_status?: string | null;
  updated_at?: string | null;
}

interface SitemapApiResponse {
  data?: SitemapApiPage[];
  blog?: SitemapApiPage[];
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
  if (clean === '/alumni-network') {
    return { priority: '0.7', changefreq: 'monthly' };
  }
  if (['/policies', '/terms-and-conditions'].includes(clean)) {
    return { priority: '0.3', changefreq: 'monthly' };
  }
  return { priority: '0.6', changefreq: 'weekly' };
}

async function fetchSitemapData(): Promise<SitemapApiResponse> {
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
    console.error(
      `❌ [Sitemap Generator] Failed to fetch getSitemap API: ${(error as Error).message}`,
    );
    throw error;
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
  if (!normalized || normalized.startsWith('/passout-stories')) return;
  const defaults = getRoutePriority(normalized);
  entries.set(normalized, {
    route: normalized,
    priority: overrides.priority ?? defaults.priority,
    changefreq: overrides.changefreq ?? defaults.changefreq,
    lastmod: overrides.lastmod ?? buildDate,
  });
}

// 1. Fetch live CMS data from the getSitemap API (single source of truth)
const apiData = await fetchSitemapData();
let apiRouteCount = 0;

// 2. Always guarantee the home page is present and sorted first
upsertEntry('/', { priority: '1.0', changefreq: 'daily', lastmod: buildDate });

// 3. Process static and core pages from apiData.data
for (const page of apiData.data ?? []) {
  if (!page.page_two_url || !isActive(page.page_two_status)) continue;
  const route = normalizeRoute(page.page_two_url);
  const rawKey = route.replace(/^\//, '');
  const canonicalRoute = PAGE_URL_ALIASES[rawKey] ? `/${PAGE_URL_ALIASES[rawKey]}` : route;

  upsertEntry(canonicalRoute, {
    priority: formatPriority(page.page_two_priority, getRoutePriority(canonicalRoute).priority),
    changefreq: getRoutePriority(canonicalRoute).changefreq,
    lastmod: formatLastmod(page.updated_at),
  });
  apiRouteCount += 1;
}

// 4. Process dynamic blog articles from apiData.blog
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

// 5. Ensure core course blog hubs are indexed
const courseBlogHubs = [
  '/blogs/course/cfe',
  '/blogs/course/cia',
  '/blogs/course/cams',
  '/blogs/course/cisa',
  '/blogs/course/other',
];
for (const hub of courseBlogHubs) {
  upsertEntry(hub, { priority: '0.8', changefreq: 'weekly', lastmod: buildDate });
}

// Sort routes deterministically: '/' first, followed by alphabetical order
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
</urlset>
`;

if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml.trim(), 'utf8');
}

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
  `✅ [Sitemap Generator] Generated dynamic sitemap.xml with ${routes.length} URLs (${apiRouteCount} from getSitemap API) -> dist/ & public/`,
);
console.log(`✅ [Sitemap Generator] Generated robots.txt referencing ${SITE_ORIGIN}/sitemap.xml`);
