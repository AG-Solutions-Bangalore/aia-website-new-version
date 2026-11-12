import fs from 'fs';

const f = 'src/pages/Blog/blog-details.jsx';
let content = fs.readFileSync(f, 'utf8');

const p = content.indexOf('const demoteBodyHeadings =');
if (p !== -1) {
  const end = content.indexOf('const BlogDetails =', p);
  const matched = content.substring(p, end).trim();

  const replacement = `// Article bodies occasionally contain their own <h1>. The page title is the
// single H1 for the document, so demote body headings to H2 at render time.
// Also harden external links with target="_blank" to ensure rel="noopener noreferrer"
// is present, mitigating reverse tabnabbing and window.opener security vulnerabilities.
const demoteBodyHeadings = (html) =>
  String(html || "")
    .replace(/<h1(\\s|>)/gi, "<h2$1")
    .replace(/<\\/h1>/gi, "</h2>")
    .replace(/<a\\b([^>]*target=["']_blank["'][^>]*)>/gi, (match) => {
      if (/rel=["'][^"']*(noopener|noreferrer)[^"']*["']/i.test(match)) {
        return match;
      }
      return match.replace(/<a\\b/i, '<a rel="noopener noreferrer"');
    });`;

  content = content.replace(matched, replacement);
  fs.writeFileSync(f, content);
  console.log('✅ Updated blog-details.jsx demoteBodyHeadings with link sanitization');
} else {
  console.log('❌ Could not find demoteBodyHeadings');
}

