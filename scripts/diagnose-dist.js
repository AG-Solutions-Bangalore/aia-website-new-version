import fs from 'fs';
import path from 'path';

const DIST_DIR = 'C:/Users/ADITYA/Desktop/igli/dist';
const SITE_ORIGIN = 'https://aia.in.net';

console.log('=== Dist HTML SEO Tag Audit ===');

function scanHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'assets' && entry.name !== 'images') {
        scanHtmlFiles(fullPath, files);
      }
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = scanHtmlFiles(DIST_DIR);
console.log(`Found ${htmlFiles.length} HTML files to audit.\n`);

let totalErrors = 0;
let scannedCount = 0;

for (const file of htmlFiles) {
  const relPath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  
  // Skip specific files that are fallback templates rather than standard pages
  if (relPath === '200.html') {
    continue;
  }
  
  scannedCount++;
  const content = fs.readFileSync(file, 'utf-8');
  const fileIssues = [];

  // 1. Check Canonical Tags
  // Find all <link ... rel="canonical" ...> or similar
  const canonicalRegex = /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi;
  const canonicalMatches = content.match(canonicalRegex) || [];
  
  if (canonicalMatches.length === 0) {
    fileIssues.push('❌ Missing canonical tag');
  } else if (canonicalMatches.length > 1) {
    fileIssues.push(`❌ Multiple canonical tags found (${canonicalMatches.length}):\n` + canonicalMatches.map(t => `      - ${t}`).join('\n'));
  } else {
    const canonicalTag = canonicalMatches[0];
    
    // Check for data-rh="true"
    if (!canonicalTag.includes('data-rh="true"')) {
      fileIssues.push(`❌ Canonical tag is missing data-rh="true" attribute: ${canonicalTag}`);
    }
    
    // Check href value
    const hrefMatch = canonicalTag.match(/href=["']([^"']+)["']/i);
    if (!hrefMatch) {
      fileIssues.push(`❌ Canonical tag is missing href attribute: ${canonicalTag}`);
    } else {
      const href = hrefMatch[1];
      
      // Expected URL check
      // For index.html, it's https://aia.in.net/
      // For other pages, we expect the path + trailing slash
      let expectedPath = relPath.replace(/\.html$/, '');
      if (expectedPath.endsWith('/index')) {
        expectedPath = expectedPath.substring(0, expectedPath.length - 6);
      }
      
      let expectedCanonical;
      if (expectedPath === 'index') {
        expectedCanonical = `${SITE_ORIGIN}/`;
      } else {
        expectedCanonical = `${SITE_ORIGIN}/${expectedPath}/`;
      }
      
      // Special check: skip validation on 404 page canonical, or check if it matches appropriately
      if (expectedPath !== '404') {
        if (href !== expectedCanonical) {
          fileIssues.push(`❌ Canonical href mismatch.\n      Expected: "${expectedCanonical}"\n      Actual:   "${href}"`);
        }
      }
    }
  }

  // 2. Check Description Tags
  const descRegex = /<meta\b[^>]*\bname=["']description["'][^>]*>/gi;
  const descMatches = content.match(descRegex) || [];
  
  if (descMatches.length === 0) {
    fileIssues.push('❌ Missing description tag');
  } else if (descMatches.length > 1) {
    fileIssues.push(`❌ Multiple description tags found (${descMatches.length}):\n` + descMatches.map(t => `      - ${t}`).join('\n'));
  } else {
    const descTag = descMatches[0];
    if (!descTag.includes('data-rh="true"')) {
      fileIssues.push(`❌ Description tag is missing data-rh="true" attribute: ${descTag}`);
    }
  }

  // Print findings if there are issues
  if (fileIssues.length > 0) {
    console.log(`⚠️ Issues in "${relPath}":`);
    fileIssues.forEach(issue => console.log(`  ${issue}`));
    console.log('-'.repeat(60));
    totalErrors++;
  }
}

console.log('=== Audit Summary ===');
console.log(`Audited: ${scannedCount} pages (excluding 200.html)`);
console.log(`Pages with issues: ${totalErrors}`);
if (totalErrors === 0) {
  console.log('✅ ALL PAGES PASSED! Canonical and description tags are 100% correct.');
} else {
  console.log('❌ SOME PAGES HAVE ISSUES. Please review the output above.');
}
