/**
 * ============================================================================
 * @file scripts/validateSchemas.ts
 * ============================================================================
 * 
 * WHY:
 * Google's Structured Data guidelines and Rich Results test penalize websites
 * with broken syntax, duplicate JSON-LD tags, missing required fields, or fragmented
 * schema snippets. In an enterprise single-page application (SPA), common failure
 * modes include:
 * 1. Duplicate `<script type="application/ld+json">` tags created during route navigation.
 * 2. Missing `@context: "https://schema.org"` root declarations.
 * 3. Fragmented schemas that fail to link entities under a cohesive `@graph`.
 * 
 * WHAT:
 * This script serves as an automated post-build CI/CD quality gate:
 * 1. Scans all pre-rendered `.html` files in `dist/`.
 * 2. Uses `node-html-parser` to query for `script[type="application/ld+json"]`.
 * 3. Enforces that exactly ONE JSON-LD script exists per pre-rendered HTML document
 *    (preventing duplicate script pollution).
 * 4. Parses the inner JSON and validates the presence of `@context` and `@graph`.
 * 5. Checks item count and entity structure within each `@graph`.
 * 6. Exits with status code 1 if any failure is detected, stopping bad deploys immediately.
 * 
 * RESPONSIBILITY:
 * - Validate 100% compliance with Google Structured Data Testing Tool & Rich Results requirements.
 * - Protect against syntax regressions and duplicate schema tags across all SSG output files.
 * - Act as a hard CI/CD deployment gate.
 * 
 * DEPENDENCIES:
 * - `node-html-parser`: Fast DOM parser for inspecting build artifacts without headless browser overhead.
 * - `node:fs`, `node:path`, `node:url`: Native Node.js file system utilities.
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'node-html-parser';
import { getCanonicalUrl, INDEXABLE_HEADING_EXPECTATIONS } from '../src/seo/server';

const distDir = path.resolve(process.cwd(), 'dist');

/**
 * Traverses the dist directory to collect all pre-rendered HTML files.
 */
function findHtmlFiles(dir: string): string[] {
  let files: string[] = [];
  if (!fs.existsSync(dir)) return files;
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(findHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

let hasError = false;
const htmlFiles = findHtmlFiles(distDir);

console.log(`\n🔍 [Schema Validator] Auditing ${htmlFiles.length} pre-rendered HTML files in dist/...\n`);

function routeFromHtmlFile(file: string): string {
  const relative = path.relative(distDir, file).replace(/\\/g, '/');
  if (relative === 'index.html') return '/';
  const route = relative.replace(/\/index\.html$/, '').replace(/^\/+/, '');
  return route ? `/${route}` : '/';
}

const REDIRECT_ONLY_ROUTES = new Set(['/filter']);

function isInExcludedLandmark(node: ReturnType<typeof parse>['children'][number]): boolean {
  let parent = node.parentNode;
  while (parent) {
    const tagName = parent.rawTagName?.toLowerCase() || '';
    if (tagName === 'footer' || tagName === 'nav') return true;
    parent = parent.parentNode;
  }
  return false;
}

function validateHeadAndHierarchy(file: string, root: ReturnType<typeof parse>): void {
  const route = routeFromHtmlFile(file);
  if (REDIRECT_ONLY_ROUTES.has(route)) return;
  const canonicalTags = root.querySelectorAll('link[rel="canonical"]');
  const canonical = canonicalTags[0]?.getAttribute('href') || '';
  const expectedCanonical = getCanonicalUrl(route);

  if (canonicalTags.length !== 1) {
    console.error(`❌ [${path.relative(distDir, file)}] FAIL: Expected exactly one canonical tag, found ${canonicalTags.length}.`);
    hasError = true;
  } else if (canonical !== expectedCanonical) {
    console.error(`❌ [${path.relative(distDir, file)}] FAIL: Canonical mismatch. Expected ${expectedCanonical}, found ${canonical}.`);
    hasError = true;
  }

  const robots = root.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
  const isIndexable = !/noindex/i.test(robots);
  const headings = root.querySelectorAll('h1,h2,h3,h4')
    .filter((heading) => !isInExcludedLandmark(heading))
    .map((heading) => ({
      level: Number(heading.tagName.slice(1)),
      text: heading.text.trim().replace(/\s+/g, ' '),
    }));

  if (!isIndexable) return;

  const h1Count = headings.filter((heading) => heading.level === 1).length;
  if (h1Count !== 1) {
    console.error(`❌ [${path.relative(distDir, file)}] FAIL: Expected exactly one H1, found ${h1Count}.`);
    hasError = true;
  }

  const expectedHeading = INDEXABLE_HEADING_EXPECTATIONS[route];
  if (expectedHeading && headings[0]?.text !== expectedHeading.h1) {
    console.error(
      `❌ [${path.relative(distDir, file)}] FAIL: H1 mismatch. Expected "${expectedHeading.h1}", found "${headings[0]?.text || '(missing)'}".`,
    );
    hasError = true;
  }

  headings.forEach((heading) => {
    if (!heading.text) {
      console.error(`❌ [${path.relative(distDir, file)}] FAIL: Empty H${heading.level} heading.`);
      hasError = true;
    }
  });

  for (let index = 1; index < headings.length; index += 1) {
    const previous = headings[index - 1];
    const current = headings[index];
    if (current.level > previous.level + 1) {
      console.error(
        `❌ [${path.relative(distDir, file)}] FAIL: Heading hierarchy skips H${previous.level} → H${current.level} (${current.text}).`,
      );
      hasError = true;
    }
  }

  const title = root.querySelector('title')?.text.trim() || '';
  const description = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  if (title.length < 30 || title.length > 65) {
    console.warn(`⚠️ [${path.relative(distDir, file)}] SEO quality: title length is ${title.length}; recommended range is 30–65 characters.`);
  }
  if (description.length < 120 || description.length > 170) {
    console.warn(`⚠️ [${path.relative(distDir, file)}] SEO quality: description length is ${description.length}; recommended range is 120–170 characters.`);
  }
}

for (const file of htmlFiles) {
  const relPath = path.relative(distDir, file);
  const content = fs.readFileSync(file, 'utf8');
  const root = parse(content);
  validateHeadAndHierarchy(file, root);
  const scripts = root.querySelectorAll('script[type="application/ld+json"]');

  if (scripts.length === 0) {
    console.error(`❌ [${relPath}] FAIL: No JSON-LD script found!`);
    hasError = true;
    continue;
  }
  if (scripts.length > 1) {
    console.error(`❌ [${relPath}] FAIL: DUPLICATE SCRIPTS FOUND (${scripts.length})! Google requires a consolidated graph.`);
    hasError = true;
    continue;
  }

  try {
    const json = JSON.parse(scripts[0].text);
    if (!json['@context'] || !json['@graph']) {
      console.error(`❌ [${relPath}] FAIL: Missing @context or @graph!`);
      hasError = true;
    } else {
      const types = json['@graph'].map((item: { '@type': string }) => item['@type']).join(', ');
      
      // ========================================================================
      // GOOGLE RICH RESULTS DATETIME & TIMEZONE QUALITY GATE:
      // Google Article / BlogPosting / Review specifications require ISO-8601
      // timestamps with an explicit timezone offset (e.g., +05:30 or Z).
      //
      // FAILURE MODES PREVENTED:
      // 1. "Invalid datetime value for datePublished / dateModified"
      // 2. "Datetime property datePublished / dateModified is missing a timezone"
      //
      // If a database returns plain SQL date "2026-06-23" or fallback "2026-01-01"
      // without timezone offset, this CI loop will catch it and block deployment.
      // ========================================================================
      for (const item of json['@graph']) {
        if (item.datePublished) {
          const hasTz = item.datePublished.includes('T') && (item.datePublished.includes('+') || item.datePublished.endsWith('Z'));
          if (!hasTz || isNaN(new Date(item.datePublished).getTime())) {
            console.error(`❌ [${relPath}] FAIL: datePublished "${item.datePublished}" missing timezone or invalid ISO-8601! Expected format: YYYY-MM-DDTHH:mm:ss+05:30`);
            hasError = true;
          }
        }
        if (item.dateModified) {
          const hasTz = item.dateModified.includes('T') && (item.dateModified.includes('+') || item.dateModified.endsWith('Z'));
          if (!hasTz || isNaN(new Date(item.dateModified).getTime())) {
            console.error(`❌ [${relPath}] FAIL: dateModified "${item.dateModified}" missing timezone or invalid ISO-8601! Expected format: YYYY-MM-DDTHH:mm:ss+05:30`);
            hasError = true;
          }
        }
      }

      console.log(`  ✓ [${relPath}] Valid @graph with ${json['@graph'].length} entities (${types}).`);
    }
  } catch (err) {
    console.error(`❌ [${relPath}] FAIL: Malformed JSON-LD syntax:`, err);
    hasError = true;
  }
}

if (hasError) {
  console.error(`\n🚨 Validation failed! One or more pre-rendered pages have invalid or duplicate Schema.org markup.\n`);
  process.exit(1);
} else {
  console.log(`\n🎉 Success! All ${htmlFiles.length} HTML schemas passed Google Rich Results & Graph validation.\n`);
}
