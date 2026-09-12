/**
 * ============================================================================
 * @file scripts/generateSitemap.ts
 * ============================================================================
 * 
 * WHY:
 * Search engines (Googlebot, Bingbot) rely on an accurate, automatically generated
 * XML sitemap to discover, crawl, and index all published pages. In a pre-rendered
 * Static Site Generation (SSG) React application, the source of truth for crawlable
 * pages is the actual set of generated static HTML files in the build output (`dist/`).
 * Manually maintaining sitemaps risks index drift, stale URLs, 404s, and omitted routes.
 * 
 * WHAT:
 * This script runs immediately after `vite build`:
 * 1. Traverses the build output directory (`dist/`) recursively to discover all
 *    generated `index.html` static routes.
 * 2. Formats and builds an RFC-compliant XML sitemap (`<urlset>` with `<loc>`,
 *    `<lastmod>`, `<changefreq>`, `<priority>`).
 * 3. Prepends the canonical site origin (`SITE_ORIGIN = "https://www.aia.in.net"`)
 *    from `src/config/site.ts`.
 * 4. Generates a production-ready `robots.txt` referencing the sitemap and disallowing
 *    private admin endpoints.
 * 5. Writes both `sitemap.xml` and `robots.txt` directly to `dist/` for production deployment,
 *    and synchronously updates `public/` for local dev consistency.
 * 
 * RESPONSIBILITY:
 * - Guarantee 100% crawl coverage for every SSG pre-rendered route.
 * - Enforce strict canonical domain matching (`https://www.aia.in.net`) across sitemap URLs.
 * - Provide zero-maintenance sitemap and robots.txt automation on every build.
 * 
 * DEPENDENCIES:
 * - `node:fs`, `node:path`, `node:url`: Native Node.js file system and path modules.
 * - `../src/config/site.ts`: Source of truth for `SITE_ORIGIN`.
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE_ORIGIN } from '../src/config/site';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');

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
      results.push(urlPath === '' ? '/' : `/${urlPath.replace(/\/$/, '')}`);
    }
  }
  return results;
}

const routes = getHtmlFiles(distDir);
const today = new Date().toISOString().split('T')[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_ORIGIN}${route === '/' ? '' : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

// Write to dist/
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml.trim(), 'utf8');

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

fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt.trim(), 'utf8');

if (fs.existsSync(publicDir)) {
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt.trim(), 'utf8');
}

console.log(`✅ [Sitemap Generator] Generated sitemap.xml with ${routes.length} pre-rendered URLs -> dist/ & public/`);
console.log(`✅ [Sitemap Generator] Generated robots.txt referencing ${SITE_ORIGIN}/sitemap.xml`);
