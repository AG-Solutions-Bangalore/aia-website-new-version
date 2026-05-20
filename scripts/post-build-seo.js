import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_PATH = path.resolve(__dirname, '../dist/index.html');
const DIST_DIR = path.resolve(__dirname, '../dist');
const META_PATH = path.resolve(__dirname, '../src/meta/meta.json');

function upsertHeadTag(html, selector, tag) {
  const nextHtml = html.replace(selector, tag);
  if (nextHtml !== html) return nextHtml;
  return html.replace('<head>', `<head>\n    ${tag}`);
}

async function prerenderHomepage() {
  try {
    if (!fs.existsSync(DIST_PATH)) {
      console.log('⚠️ dist/index.html not found. Run build first.');
      return;
    }

    const metaData = JSON.parse(fs.readFileSync(META_PATH, 'utf-8'));
    const homeMeta = metaData['/'] || {
      title: "AIA | Best Training Institute for Certification Courses",
      description: "Academy of Internal Audit (AIA) is Online Training Institute for Global Certification Courses like CIA, CFE, and other International Certification Courses."
    };

    let html = fs.readFileSync(DIST_PATH, 'utf-8');

    html = upsertHeadTag(html, /<title>.*?<\/title>/, `<title>${homeMeta.title}</title>`);
    
    html = upsertHeadTag(html, /<meta\s+name="title"[^>]*>/, `<meta name="title" content="${homeMeta.title}">`);
    html = upsertHeadTag(html, /<meta\s+name="description"[^>]*>/, `<meta name="description" content="${homeMeta.description}">`);
    html = upsertHeadTag(html, /<meta\s+property="og:title"[^>]*>/, `<meta property="og:title" content="${homeMeta.title}">`);
    html = upsertHeadTag(html, /<meta\s+property="og:description"[^>]*>/, `<meta property="og:description" content="${homeMeta.description}">`);
    html = upsertHeadTag(html, /<meta\s+property="og:type"[^>]*>/, `<meta property="og:type" content="website">`);
    html = upsertHeadTag(html, /<meta\s+name="twitter:card"[^>]*>/, `<meta name="twitter:card" content="summary_large_image">`);
    html = upsertHeadTag(html, /<meta\s+name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${homeMeta.title}">`);
    html = upsertHeadTag(html, /<meta\s+name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${homeMeta.description}">`);

    html = html.replace(/\s*<link\s+rel="canonical"[^>]*>/g, "");
    html = html.replace(/\s*<meta\s+property="og:url"[^>]*>/g, "");

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

prerenderHomepage().then(materializeCleanUrlHtmlFiles);
