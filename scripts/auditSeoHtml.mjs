/**
 * @file scripts/auditSeoHtml.mjs
 * @description Validates every prerendered HTML file in `dist` for the SEO
 * contract that must survive the SSG pipeline: one H1, title, meta description,
 * canonical, JSON-LD, crawlable internal links, crawlable anchors, and image alt
 * attributes.
 *
 * Usage:
 *   bun scripts/auditSeoHtml.mjs [distDir]
 *
 * Exit code 1 when a real page fails. Redirect-only stubs are ignored.
 */

import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const ROOT = path.resolve(process.argv[2] || 'dist');
const REPORT_DIR = path.resolve('reports');
const REPORT_FILE = path.join(REPORT_DIR, 'seo-html-audit.json');

// Routes that are intentionally client-side redirects and therefore do not
// need indexable content.
const REDIRECT_ONLY = new Set(['/filter']);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'assets' || entry.name === 'images') continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.name === 'index.html') {
      files.push(fullPath);
    }
  }

  return files;
}

function routeFor(file) {
  const relative = path.relative(ROOT, file).split(path.sep).join('/');
  const route = `/${relative.replace(/index\.html$/, '')}`;
  return route !== '/' ? route.replace(/\/$/, '') : '/';
}

function textOf(node) {
  return (node?.textContent || '').replace(/\s+/g, ' ').trim();
}

const pages = walk(ROOT).sort();
const failures = [];
const summaries = [];

for (const file of pages) {
  const route = routeFor(file);
  if (REDIRECT_ONLY.has(route)) continue;

  const html = fs.readFileSync(file, 'utf8');
  const root = parse(html);
  const head = root.querySelector('head');
  const body = root.querySelector('body') || root;

  const title = textOf(head?.querySelector('title'));
  const description = head
    ?.querySelector('meta[name="description"]')
    ?.getAttribute('content')?.trim();
  const canonical = head
    ?.querySelector('link[rel="canonical"]')
    ?.getAttribute('href')?.trim();
  const jsonLdCount = head?.querySelectorAll('script[type="application/ld+json"]').length || 0;

  const h1s = body.querySelectorAll('h1');
  const h1Count = h1s.length;
  const h2Count = body.querySelectorAll('h2').length;
  const h3Count = body.querySelectorAll('h3').length;

  const anchors = body.querySelectorAll('a');
  const missingHref = anchors.filter((a) => {
    const href = a.getAttribute('href');
    return !href || !href.trim();
  });
  const internalAnchors = anchors.filter((a) => {
    const href = (a.getAttribute('href') || '').trim();
    return href.startsWith('/') && !href.startsWith('//');
  });

  const images = body.querySelectorAll('img');
  const missingAlt = images.filter((img) => !img.hasAttribute('alt'));

  const pageFailures = [];
  if (!title) pageFailures.push('missing <title>');
  if (!description) pageFailures.push('missing meta description');
  if (!canonical) pageFailures.push('missing canonical');
  if (jsonLdCount === 0) pageFailures.push('missing JSON-LD');
  if (h1Count !== 1) pageFailures.push(`expected 1 H1, found ${h1Count}`);
  if (internalAnchors.length === 0) pageFailures.push('missing internal links');
  if (missingHref.length > 0) pageFailures.push(`${missingHref.length} <a> without href`);
  if (missingAlt.length > 0) pageFailures.push(`${missingAlt.length} <img> without alt`);

  summaries.push({
    route,
    title: Boolean(title),
    description: Boolean(description),
    canonical: Boolean(canonical),
    jsonLdCount,
    h1Count,
    h2Count,
    h3Count,
    internalLinks: internalAnchors.length,
    images: images.length,
    missingAlt: missingAlt.length,
    missingHref: missingHref.length,
  });

  if (pageFailures.length > 0) {
    failures.push({
      route,
      failures: pageFailures,
      h1Text: h1s.map((h1) => textOf(h1)).slice(0, 3),
      sampleMissingHrefs: missingHref
        .slice(0, 3)
        .map((a) => a.getAttribute('aria-label') || textOf(a).slice(0, 60)),
    });
  }
}

fs.mkdirSync(REPORT_DIR, { recursive: true });
fs.writeFileSync(
  REPORT_FILE,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      pages: summaries.length,
      failures: failures.length,
      details: failures,
      summaries,
    },
    null,
    2,
  ),
);

const avgH1 = summaries.length
  ? (summaries.reduce((sum, page) => sum + page.h1Count, 0) / summaries.length).toFixed(2)
  : '0.00';
const pagesWithoutH2 = summaries.filter((page) => page.h2Count === 0).length;

console.log('');
console.log('SEO HTML audit');
console.log('──────────────');
console.log(`Pages checked:      ${summaries.length}`);
console.log(`Failing pages:      ${failures.length}`);
console.log(`Average H1/page:    ${avgH1}`);
console.log(`Pages without H2:   ${pagesWithoutH2}`);
console.log(`Report:             ${path.relative(process.cwd(), REPORT_FILE)}`);

if (failures.length > 0) {
  console.log('');
  console.log('Failures:');
  for (const failure of failures.slice(0, 30)) {
    console.log(`  ${failure.route}: ${failure.failures.join('; ')}`);
  }
  if (failures.length > 30) {
    console.log(`  ...and ${failures.length - 30} more (see report)`);
  }
  process.exitCode = 1;
} else {
  console.log('');
  console.log('All pages pass the SEO HTML contract.');
}
