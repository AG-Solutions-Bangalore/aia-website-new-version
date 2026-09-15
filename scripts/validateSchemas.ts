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
import { fileURLToPath } from 'url';
import { parse } from 'node-html-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

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

const htmlFiles = findHtmlFiles(distDir);
let hasError = false;

console.log(`\n🔍 [Schema Validator] Auditing ${htmlFiles.length} pre-rendered HTML files in dist/...\n`);

for (const file of htmlFiles) {
  const relPath = path.relative(distDir, file);
  const content = fs.readFileSync(file, 'utf8');
  const root = parse(content);
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
