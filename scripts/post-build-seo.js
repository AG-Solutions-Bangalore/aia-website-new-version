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

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttribute(value = '') {
  return escapeHtml(value).replace(/"/g, '&quot;');
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

function getMetaForRoute(routePath, metaData) {
  const routeKey = matchMetaRoute(routePath, metaData);
  return buildDynamicMeta(routePath) || metaData[routeKey] || DEFAULT_META;
}

function applySeoTags(html, routePath, metaData) {
  const pageMeta = getMetaForRoute(routePath, metaData);
  const pageTitle = pageMeta.title || DEFAULT_META.title;
  const pageDescription = pageMeta.description || DEFAULT_META.description;
  const pageKeywords = pageMeta.keywords || DEFAULT_META.keywords;
  const canonicalUrl = buildCanonicalUrl(routePath);

  html = upsertHeadTag(html, /<title>.*?<\/title>/i, `<title>${escapeHtml(pageTitle)}</title>`);
  html = upsertHeadTag(html, /<meta\b(?=[^>]*\bname="title")[^>]*>/i, `<meta name="title" content="${escapeAttribute(pageTitle)}">`);
  html = upsertHeadTag(html, /<meta\b(?=[^>]*\bname="description")[^>]*>/i, `<meta name="description" content="${escapeAttribute(pageDescription)}">`);
  html = upsertHeadTag(html, /<meta\b(?=[^>]*\bname="keywords")[^>]*>/i, `<meta name="keywords" content="${escapeAttribute(pageKeywords)}">`);
  html = upsertHeadTag(html, /<meta\b(?=[^>]*\bname="robots")[^>]*>/i, '<meta name="robots" content="index, follow">');
  html = upsertHeadTag(html, /<link\b(?=[^>]*\brel="canonical")[^>]*>/i, `<link rel="canonical" href="${canonicalUrl}">`);
  html = upsertHeadTag(html, /<meta\b(?=[^>]*\bproperty="og:url")[^>]*>/i, `<meta property="og:url" content="${canonicalUrl}">`);
  html = upsertHeadTag(html, /<meta\b(?=[^>]*\bproperty="og:title")[^>]*>/i, `<meta property="og:title" content="${escapeAttribute(pageTitle)}">`);
  html = upsertHeadTag(html, /<meta\b(?=[^>]*\bproperty="og:description")[^>]*>/i, `<meta property="og:description" content="${escapeAttribute(pageDescription)}">`);
  html = upsertHeadTag(html, /<meta\b(?=[^>]*\bproperty="twitter:url")[^>]*>/i, `<meta property="twitter:url" content="${canonicalUrl}">`);
  html = upsertHeadTag(html, /<meta\b(?=[^>]*\bname="twitter:title")[^>]*>/i, `<meta name="twitter:title" content="${escapeAttribute(pageTitle)}">`);
  html = upsertHeadTag(html, /<meta\b(?=[^>]*\bname="twitter:description")[^>]*>/i, `<meta name="twitter:description" content="${escapeAttribute(pageDescription)}">`);

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

    html = upsertHeadTag(html, /<title>.*?<\/title>/, `<title>${homeMeta.title}</title>`);
    
    html = upsertHeadTag(html, /<meta\b(?=[^>]*\bname="title")[^>]*>/i, `<meta name="title" content="${homeMeta.title}">`);
    html = upsertHeadTag(html, /<meta\b(?=[^>]*\bname="description")[^>]*>/i, `<meta name="description" content="${homeMeta.description}">`);
    html = upsertHeadTag(html, /<meta\b(?=[^>]*\bproperty="og:title")[^>]*>/i, `<meta property="og:title" content="${homeMeta.title}">`);
    html = upsertHeadTag(html, /<meta\b(?=[^>]*\bproperty="og:description")[^>]*>/i, `<meta property="og:description" content="${homeMeta.description}">`);
    html = upsertHeadTag(html, /<meta\b(?=[^>]*\bproperty="og:type")[^>]*>/i, `<meta property="og:type" content="website">`);
    html = upsertHeadTag(html, /<link\b(?=[^>]*\brel="canonical")[^>]*>/i, `<link rel="canonical" href="${canonicalUrl}">`);
    html = upsertHeadTag(html, /<meta\b(?=[^>]*\bproperty="og:url")[^>]*>/i, `<meta property="og:url" content="${canonicalUrl}">`);
    html = upsertHeadTag(html, /<meta\b(?=[^>]*\bproperty="twitter:url")[^>]*>/i, `<meta property="twitter:url" content="${canonicalUrl}">`);
    html = upsertHeadTag(html, /<meta\b(?=[^>]*\bname="twitter:card")[^>]*>/i, `<meta name="twitter:card" content="summary_large_image">`);
    html = upsertHeadTag(html, /<meta\b(?=[^>]*\bname="twitter:title")[^>]*>/i, `<meta name="twitter:title" content="${homeMeta.title}">`);
    html = upsertHeadTag(html, /<meta\b(?=[^>]*\bname="twitter:description")[^>]*>/i, `<meta name="twitter:description" content="${homeMeta.description}">`);

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

function ensureSitemapRouteHtmlFiles() {
  if (!fs.existsSync(DIST_PATH)) return;

  const metaData = JSON.parse(fs.readFileSync(META_PATH, 'utf-8'));
  const shellHtml = fs.readFileSync(DIST_PATH, 'utf-8');
  const routes = readSitemapRoutes();
  let created = 0;

  routes.forEach((routePath) => {
    const indexPath = getRouteIndexPath(routePath);
    if (fs.existsSync(indexPath)) return;

    const html = applySeoTags(shellHtml, routePath, metaData);
    fs.mkdirSync(path.dirname(indexPath), { recursive: true });
    fs.writeFileSync(indexPath, html);
    created += 1;
  });

  console.log(`Ensured canonical HTML files for sitemap routes (${created} created)`);
}

prerenderHomepage()
  .then(ensureSitemapRouteHtmlFiles)
  .then(materializeCleanUrlHtmlFiles);
