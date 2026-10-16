import fs from 'fs';

const path = 'd:/JOB_PROJECTS/igli/dist/blogs/cisa-vs-cia/index.html';
console.log('Exists in dist?', fs.existsSync(path));
if (fs.existsSync(path)) {
  const html = fs.readFileSync(path, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/);
  const desc = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/);
  console.log('Title in static HTML:', title ? title[1] : 'NONE');
  console.log('Description in static HTML:', desc ? desc[1] : 'NONE');
  const idx = html.indexOf('application/ld+json');
  if (idx !== -1) {
    const start = html.lastIndexOf('<script', idx);
    const end = html.indexOf('</script>', idx) + 9;
    const tag = html.slice(start, end);
    const jsonStr = tag.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    const json = JSON.parse(jsonStr);
    const webpage = json['@graph']?.find((x) => x['@type'] === 'WebPage');
    console.log('WebPage name in static HTML JSON-LD:', webpage?.name);
    console.log('WebPage desc in static HTML JSON-LD:', webpage?.description);
  }
}
