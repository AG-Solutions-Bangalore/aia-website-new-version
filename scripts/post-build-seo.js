import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_PATH = path.resolve(__dirname, '../dist/index.html');
const DIST_DIR = path.resolve(__dirname, '../dist');
const META_PATH = path.resolve(__dirname, '../src/meta/meta.json');
const SITEMAP_PATH = path.resolve(__dirname, '../dist/sitemap.xml');
const SITE_ORIGIN = 'https://aia.in.net';
const BLOG_LIST_API_URL = `${SITE_ORIGIN}/webapi/public/api/getAllBlogs`;
const BLOG_DETAIL_API_URL = `${SITE_ORIGIN}/webapi/public/api/getBlogbySlug`;
const API_TIMEOUT_MS = 30000;
const BLOG_META_FETCH_CONCURRENCY = 6;

const DEFAULT_META = {
  title: 'Best Training Institute For Top Certification Courses- AIA',
  description:
    'Academy of Internal Audit (AIA) is Online Training Institute for Global Certification Courses like CIA, CFE, and other International Certification Courses.',
  keywords: 'CIA, CFE, CAMS, Internal Audit, Training Institute, Fraud Examiner',
};

const UPPERCASE_WORDS = {
  aia: 'AIA',
  cams: 'CAMS',
  cfe: 'CFE',
  cia: 'CIA',
  ciac: 'CIAC',
};

function upsertHeadTag(html, selector, tag) {
  const globalFlags = selector.flags.includes('g')
    ? selector.flags
    : `${selector.flags}g`;
  const globalSelector = new RegExp(selector.source, globalFlags);
  let replaced = false;

  const nextHtml = html.replace(globalSelector, () => {
    if (replaced) return '';
    replaced = true;
    return tag;
  });

  if (replaced) return nextHtml;
  return html.replace('<head>', `<head>\n    ${tag}`);
}

function headMetaSelector(attributeName, value) {
  return new RegExp(
    `<meta\\b(?=[^>]*\\b${attributeName}=["']${value}["'])[^>]*>`,
    'i',
  );
}

function headMetaNameOrPropertySelector(value) {
  return new RegExp(
    `<meta\\b(?=[^>]*\\b(?:name|property)=["']${value}["'])[^>]*>`,
    'i',
  );
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttribute(value = '') {
  return escapeHtml(value).replace(/"/g, '&quot;');
}

function normalizeText(value = '') {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeRoutePath(value) {
  if (!value) return '/';

  let pathname = String(value).trim();

  try {
    const parsed = new URL(pathname, SITE_ORIGIN);
    pathname = parsed.pathname;
  } catch {
    // Plain route paths are already usable.
  }

  try {
    pathname = decodeURI(pathname);
  } catch {
    // Keep malformed escaped paths unchanged.
  }

  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return pathname.replace(/\/+$/, '') || '/';
}

function buildCanonicalUrl(routePath) {
  const normalized = normalizeRoutePath(routePath);
  return normalized === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${normalized}/`;
}

function getBlogSlugFromRoute(routePath) {
  const parts = normalizeRoutePath(routePath).split('/').filter(Boolean);
  if (parts.length === 2 && parts[0] === 'blogs' && parts[1] !== 'course') {
    return parts[1];
  }

  return null;
}

function titleFromSlug(value = '') {
  return decodeURIComponent(value)
    .split('-')
    .filter(Boolean)
    .map((word) => UPPERCASE_WORDS[word.toLowerCase()] || `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

function cfeModuleTitle(value = '') {
  const match = value.match(/^cfe-(\d+)$/i);
  return match ? `CFE Module ${match[1]}` : titleFromSlug(value);
}

function buildDynamicMeta(routePath) {
  const parts = normalizeRoutePath(routePath).split('/').filter(Boolean);

  if (parts[0] === 'blogs' && parts[1] === 'course' && parts[2]) {
    const courseName = titleFromSlug(parts[2]);
    return {
      title: `${courseName} Certification Articles | Academy of Internal Audit`,
      description: `Explore ${courseName} certification articles, exam tips, syllabus guidance, and career insights from Academy of Internal Audit experts.`,
      keywords: `${courseName} blogs, ${courseName} certification articles, ${courseName} exam tips`,
    };
  }

  if (parts[0] === 'cfe-free-resource' && parts[1]) {
    const moduleName = cfeModuleTitle(parts[1]);
    return {
      title: `${moduleName} Practice Questions | Free CFE Resources`,
      description: `Practice ${moduleName} questions with answers and explanations from Academy of Internal Audit to strengthen your CFE exam preparation.`,
      keywords: `${moduleName} practice questions, CFE free resources, CFE exam preparation`,
    };
  }

  if (parts[0] === 'passout-stories' && parts[1]) {
    const storyName = titleFromSlug(parts[1]);
    return {
      title: `${storyName} | Student Success Story | AIA`,
      description: `Read ${storyName}'s AIA success story after clearing CIA, CFE or CAMS exams. Get inspired by their journey, preparation strategy, and results.`,
      keywords: `${storyName} success story, AIA alumni, CIA CFE CAMS results`,
    };
  }

  return null;
}

function matchMetaRoute(routePath, metaData) {
  const normalized = normalizeRoutePath(routePath);
  if (metaData[normalized]) return normalized;

  return Object.keys(metaData)
    .sort((a, b) => b.split('/').length - a.split('/').length)
    .find((route) => {
      if (!route.includes(':')) return route === normalized;

      const routeParts = route.split('/').filter(Boolean);
      const pathParts = normalized.split('/').filter(Boolean);

      return (
        routeParts.length === pathParts.length &&
        routeParts.every((part, index) => part.startsWith(':') || part === pathParts[index])
      );
    });
}

function getBlogMeta(blog, fallbackSlug = '') {
  if (!blog) return null;

  const slug = normalizeText(blog.blog_slug || fallbackSlug);
  const fallbackTitle = slug ? `${titleFromSlug(slug)} | AIA Blog` : DEFAULT_META.title;
  const fallbackDescription =
    'Read certification insights, exam preparation guidance, and career advice from Academy of Internal Audit.';

  return {
    title: normalizeText(blog.blog_meta_title || blog.blog_heading || fallbackTitle),
    description: normalizeText(
      blog.blog_meta_description ||
        blog.blog_short_description ||
        fallbackDescription,
    ),
    keywords: normalizeText(blog.blog_meta_keywords || ''),
  };
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: { 'Cache-Control': 'no-cache' },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(
    Array.from(
      { length: Math.min(limit, items.length) },
      () => worker(),
    ),
  );

  return results;
}

async function buildBlogMetaMap(routes) {
  const slugs = Array.from(
    new Set(routes.map(getBlogSlugFromRoute).filter(Boolean)),
  );
  const blogMetaBySlug = new Map();

  if (slugs.length === 0) return blogMetaBySlug;

  try {
    const blogListResponse = await fetchJson(BLOG_LIST_API_URL);
    const blogList = Array.isArray(blogListResponse?.data)
      ? blogListResponse.data
      : [];

    blogList.forEach((blog) => {
      if (!blog?.blog_slug) return;
      blogMetaBySlug.set(blog.blog_slug, getBlogMeta(blog, blog.blog_slug));
    });
  } catch (error) {
    console.warn(`Could not load blog list metadata: ${error.message}`);
  }

  await mapWithConcurrency(slugs, BLOG_META_FETCH_CONCURRENCY, async (slug) => {
    try {
      const blogDetailResponse = await fetchJson(
        `${BLOG_DETAIL_API_URL}/${encodeURIComponent(slug)}`,
      );
      const blogMeta = getBlogMeta(blogDetailResponse?.data, slug);
      if (blogMeta) blogMetaBySlug.set(slug, blogMeta);
    } catch (error) {
      console.warn(`Could not load blog metadata for ${slug}: ${error.message}`);
    }
  });

  const loadedRouteMetaCount = slugs.filter((slug) => blogMetaBySlug.has(slug)).length;
  console.log(`Loaded SEO metadata for ${loadedRouteMetaCount}/${slugs.length} blog routes`);
  return blogMetaBySlug;
}

function getMetaForRoute(routePath, metaData, blogMetaBySlug = new Map()) {
  const blogSlug = getBlogSlugFromRoute(routePath);
  if (blogSlug && blogMetaBySlug.has(blogSlug)) {
    return blogMetaBySlug.get(blogSlug);
  }

  const routeKey = matchMetaRoute(routePath, metaData);
  return buildDynamicMeta(routePath) || metaData[routeKey] || DEFAULT_META;
}

function applySeoTags(html, routePath, metaData, blogMetaBySlug) {
  const pageMeta = getMetaForRoute(routePath, metaData, blogMetaBySlug);
  const pageTitle = pageMeta.title || DEFAULT_META.title;
  const pageDescription = pageMeta.description || DEFAULT_META.description;
  const pageKeywords = pageMeta.keywords || DEFAULT_META.keywords;
  const canonicalUrl = buildCanonicalUrl(routePath);

  html = upsertHeadTag(html, /<title>.*?<\/title>/i, `<title data-rh="true">${escapeHtml(pageTitle)}</title>`);
  html = upsertHeadTag(html, headMetaSelector('name', 'title'), `<meta name="title" content="${escapeAttribute(pageTitle)}" data-rh="true">`);
  html = upsertHeadTag(html, headMetaSelector('name', 'description'), `<meta name="description" content="${escapeAttribute(pageDescription)}" data-rh="true">`);
  html = upsertHeadTag(html, headMetaSelector('name', 'keywords'), `<meta name="keywords" content="${escapeAttribute(pageKeywords)}" data-rh="true">`);
  html = upsertHeadTag(html, headMetaSelector('name', 'robots'), '<meta name="robots" content="index, follow" data-rh="true">');
  html = upsertHeadTag(html, /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" data-rh="true">`);
  html = upsertHeadTag(html, headMetaSelector('property', 'og:url'), `<meta property="og:url" content="${canonicalUrl}" data-rh="true">`);
  html = upsertHeadTag(html, headMetaSelector('property', 'og:title'), `<meta property="og:title" content="${escapeAttribute(pageTitle)}" data-rh="true">`);
  html = upsertHeadTag(html, headMetaSelector('property', 'og:description'), `<meta property="og:description" content="${escapeAttribute(pageDescription)}" data-rh="true">`);
  html = upsertHeadTag(html, headMetaNameOrPropertySelector('twitter:url'), `<meta property="twitter:url" content="${canonicalUrl}" data-rh="true">`);
  html = upsertHeadTag(html, headMetaNameOrPropertySelector('twitter:title'), `<meta name="twitter:title" content="${escapeAttribute(pageTitle)}" data-rh="true">`);
  html = upsertHeadTag(html, headMetaNameOrPropertySelector('twitter:description'), `<meta name="twitter:description" content="${escapeAttribute(pageDescription)}" data-rh="true">`);

  return html;
}

function readSitemapRoutes() {
  if (!fs.existsSync(SITEMAP_PATH)) return [];

  const sitemap = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  return Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), ([, loc]) =>
    normalizeRoutePath(loc),
  );
}

function getRouteIndexPath(routePath) {
  const normalized = normalizeRoutePath(routePath);
  if (normalized === '/') return DIST_PATH;

  return path.join(DIST_DIR, ...normalized.split('/').filter(Boolean), 'index.html');
}

async function prerenderHomepage() {
  try {
    if (!fs.existsSync(DIST_PATH)) {
      console.log('⚠️ dist/index.html not found. Run build first.');
      return;
    }

    const metaData = JSON.parse(fs.readFileSync(META_PATH, 'utf-8'));
    const homeMeta = metaData['/'] || {
      title: "Best Training Institute For Top Certification Courses- AIA",
      description: "Academy of Internal Audit (AIA) is Online Training Institute for Global Certification Courses like CIA, CFE, and other International Certification Courses."
    };
    const canonicalUrl = 'https://aia.in.net/';

    let html = fs.readFileSync(DIST_PATH, 'utf-8');

    html = upsertHeadTag(html, /<title>.*?<\/title>/i, `<title data-rh="true">${escapeHtml(homeMeta.title)}</title>`);
    
    html = upsertHeadTag(html, headMetaSelector('name', 'title'), `<meta name="title" content="${escapeAttribute(homeMeta.title)}" data-rh="true">`);
    html = upsertHeadTag(html, headMetaSelector('name', 'description'), `<meta name="description" content="${escapeAttribute(homeMeta.description)}" data-rh="true">`);
    html = upsertHeadTag(html, headMetaSelector('property', 'og:title'), `<meta property="og:title" content="${escapeAttribute(homeMeta.title)}" data-rh="true">`);
    html = upsertHeadTag(html, headMetaSelector('property', 'og:description'), `<meta property="og:description" content="${escapeAttribute(homeMeta.description)}" data-rh="true">`);
    html = upsertHeadTag(html, headMetaSelector('property', 'og:type'), `<meta property="og:type" content="website" data-rh="true">`);
    html = upsertHeadTag(html, /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" data-rh="true">`);
    html = upsertHeadTag(html, headMetaSelector('property', 'og:url'), `<meta property="og:url" content="${canonicalUrl}" data-rh="true">`);
    html = upsertHeadTag(html, headMetaNameOrPropertySelector('twitter:url'), `<meta property="twitter:url" content="${canonicalUrl}" data-rh="true">`);
    html = upsertHeadTag(html, headMetaNameOrPropertySelector('twitter:card'), `<meta name="twitter:card" content="summary_large_image" data-rh="true">`);
    html = upsertHeadTag(html, headMetaNameOrPropertySelector('twitter:title'), `<meta name="twitter:title" content="${escapeAttribute(homeMeta.title)}" data-rh="true">`);
    html = upsertHeadTag(html, headMetaNameOrPropertySelector('twitter:description'), `<meta name="twitter:description" content="${escapeAttribute(homeMeta.description)}" data-rh="true">`);

    fs.writeFileSync(DIST_PATH, html);
    console.log('✅ Injected Homepage SEO into dist/index.html');

  } catch (error) {
    console.error('❌ Post-build SEO error:', error.message);
  }
}

function materializeCleanUrlHtmlFiles() {
  if (!fs.existsSync(DIST_DIR)) return;

  const copyIndexHtml = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const entryPath = path.join(dir, entry.name);

      if (!entry.isDirectory()) continue;
      if (entry.name === "assets" || entry.name === "images") continue;

      const indexPath = path.join(entryPath, "index.html");
      if (fs.existsSync(indexPath)) {
        const relativeDir = path.relative(DIST_DIR, entryPath);
        const cleanHtmlPath = path.join(DIST_DIR, `${relativeDir}.html`);
        fs.mkdirSync(path.dirname(cleanHtmlPath), { recursive: true });
        fs.copyFileSync(indexPath, cleanHtmlPath);
      }

      copyIndexHtml(entryPath);
    }
  };

  copyIndexHtml(DIST_DIR);
  console.log('✅ Materialized clean URL HTML files for prerendered routes');
}

async function ensureSitemapRouteHtmlFiles() {
  if (!fs.existsSync(DIST_PATH)) return;

  const metaData = JSON.parse(fs.readFileSync(META_PATH, 'utf-8'));
  const shellHtml = fs.readFileSync(DIST_PATH, 'utf-8');
  const routes = readSitemapRoutes();
  const blogMetaBySlug = await buildBlogMetaMap(routes);
  let created = 0;
  let updated = 0;

  routes.forEach((routePath) => {
    const indexPath = getRouteIndexPath(routePath);
    const existed = fs.existsSync(indexPath);
    const sourceHtml = existed ? fs.readFileSync(indexPath, 'utf-8') : shellHtml;
    const html = applySeoTags(sourceHtml, routePath, metaData, blogMetaBySlug);

    fs.mkdirSync(path.dirname(indexPath), { recursive: true });
    if (!existed || html !== sourceHtml) {
      fs.writeFileSync(indexPath, html);
    }

    if (existed) {
      updated += 1;
    } else {
      created += 1;
    }
  });

  console.log(`Ensured canonical HTML files for sitemap routes (${created} created, ${updated} checked)`);
}

prerenderHomepage()
  .then(ensureSitemapRouteHtmlFiles)
  .then(materializeCleanUrlHtmlFiles);
