import fs from 'fs';

const pages = [
  'dist/index.html',
  'dist/about-aia/index.html',
  'dist/cfe-curriculum/index.html',
  'dist/blogs/index.html',
  'dist/blogs/cisa-study-material/index.html',
  'dist/passout-stories/ankita-gupta-ciac/index.html'
];

console.log('Testing side-effects on static and dynamic pages:');
for (const p of pages) {
  const html = fs.readFileSync(p, 'utf8');
  const t = html.match(/<title>(.*?)<\/title>/)?.[1];
  const d = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/)?.[1];
  console.log(`\n📄 [${p}]`);
  console.log(`  Title: ${t}`);
  console.log(`  Desc:  ${d?.slice(0, 90)}...`);
}
