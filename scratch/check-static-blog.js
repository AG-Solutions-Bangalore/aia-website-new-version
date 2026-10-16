import fs from 'fs';

const path = 'd:/JOB_PROJECTS/igli/dist/blogs/cisa-study-material/index.html';
console.log('Exists?', fs.existsSync(path));
if (fs.existsSync(path)) {
  const html = fs.readFileSync(path, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/);
  const desc = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/);
  console.log('Title in static HTML:', title ? title[1] : 'NONE');
  console.log('Description in static HTML:', desc ? desc[1] : 'NONE');
  
  const idx = html.indexOf('application/ld+json');
  console.log('Index of application/ld+json in local dist:', idx);
  if (idx !== -1) {
    const start = html.lastIndexOf('<script', idx);
    const end = html.indexOf('</script>', idx) + 9;
    const tag = html.slice(start, end);
    const jsonStr = tag.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    const json = JSON.parse(jsonStr);
    const webpage = json['@graph']?.find((x) => x['@type'] === 'WebPage');
    const blogposting = json['@graph']?.find((x) => x['@type'] === 'BlogPosting');
    console.log('\n--- LOCAL DIST JSON-LD ---');
    console.log('WebPage name:', webpage?.name);
    console.log('WebPage desc:', webpage?.description);
    console.log('BlogPosting headline:', blogposting?.headline);
    console.log('BlogPosting desc:', blogposting?.description);
  }
}

async function checkLive() {
  console.log('\n📡 Fetching LIVE URL https://aia.in.net/blogs/cisa-study-material/ ...');
  const res = await fetch('https://aia.in.net/blogs/cisa-study-material/');
  const liveHtml = await res.text();
  const title = liveHtml.match(/<title>(.*?)<\/title>/);
  const desc = liveHtml.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/);
  console.log('LIVE Title:', title ? title[1] : 'NONE');
  console.log('LIVE Description:', desc ? desc[1] : 'NONE');

  const idx = liveHtml.indexOf('application/ld+json');
  console.log('Index of application/ld+json in LIVE HTML:', idx);
  if (idx !== -1) {
    const start = liveHtml.lastIndexOf('<script', idx);
    const end = liveHtml.indexOf('</script>', idx) + 9;
    const tag = liveHtml.slice(start, end);
    const jsonStr = tag.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    const json = JSON.parse(jsonStr);
    const webpage = json['@graph']?.find((x) => x['@type'] === 'WebPage');
    const blogposting = json['@graph']?.find((x) => x['@type'] === 'BlogPosting');
    console.log('\n--- LIVE HTML JSON-LD ---');
    console.log('WebPage name:', webpage?.name);
    console.log('WebPage desc:', webpage?.description);
    console.log('BlogPosting headline:', blogposting?.headline);
    console.log('BlogPosting desc:', blogposting?.description);
  }
}

checkLive();

