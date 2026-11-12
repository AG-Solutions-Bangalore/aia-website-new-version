import fs from 'fs';

const testUrls = [
  'dist/passout-stories/leo-mathew-thomas-cia-part-1/index.html',
  'dist/passout-stories/disha-srivastava-cams/index.html',
  'dist/passout-stories/sanjay-namdeo-cfe/index.html'
];

console.log('=== HTML Verification ===');
for (const path of testUrls) {
  if (fs.existsSync(path)) {
    const html = fs.readFileSync(path, 'utf8');
    const robots = html.match(/<meta[^>]*name=["']robots["'][^>]*>/i);
    console.log(path + ':');
    console.log('  ' + (robots ? robots[0] : 'NO ROBOTS TAG FOUND'));
  } else {
    console.log(path + ': FILE NOT FOUND');
  }
}

console.log('\n=== Sitemap Verification ===');
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const passoutInSitemap = sitemap.match(/<loc>[^<]*passout-stories[^<]*<\/loc>/gi);
console.log('Passout stories in dist/sitemap.xml count:', passoutInSitemap ? passoutInSitemap.length : 0);

const publicSitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
const passoutInPublicSitemap = publicSitemap.match(/<loc>[^<]*passout-stories[^<]*<\/loc>/gi);
console.log('Passout stories in public/sitemap.xml count:', passoutInPublicSitemap ? passoutInPublicSitemap.length : 0);

