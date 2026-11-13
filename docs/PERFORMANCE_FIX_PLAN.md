# Performance Fix Plan — Code vs Hosting

Latest build live verified hai (SHA-256 match). Mobile Lighthouse median **92** (best 94–96), desktop **96**. `.htaccess` caching/compression fallback already live hai.

Note: `.htaccess` repo me edit hota hai, lekin effect server par padta hai — isliye use Hosting section me rakha gaya hai.

---

## 1. Code Se Fix Hoga (Developer / Repo)

| # | Issue | Fix | File / Area | Expected Impact | Priority |
|---|-------|-----|-------------|-----------------|----------|
| 1 | Hero image base64 **2 baar** hai (23.2KB duplicate) | `<picture>` ke `<source srcSet>` aur `<img src>` dono se duplicate base64 hatao; ek copy ya URL fallback rakho | `src/components/home/home-hero.jsx`, `src/components/home/hero-480-base64.ts` | HTML se ~11.6KB kam; HTML abhi 135KB raw / 58.5KB gzip | High |
| 2 | LCP image discoverable nahi (data URI) aur timing unstable | Mobile ke liye ek inline 480px image ya hashed URL + `<link rel="preload">` use karo; LCP element ko stable banao | `home-hero.jsx`, `index.html`, `src/prerender.tsx` | LCP median 3.0s → target **<2.5s**; LCP timing reliable | High |
| 3 | GTM/analytics slow load se score girta hai | GTM ko interaction/idle ke baad load karo; `getGTag` response cache karo; automation ke liye `navigator.webdriver` skip (optional) | `src/components/google-analytics/google-analytics.jsx` | 63-run outlier fix: TBT 820ms → ~20ms, BP 77 → 100; TTI stable | High |
| 4 | Google Fonts render-blocking + 4 cross-origin requests | Poppins woff2 fonts self-host karo, `font-display: swap`, font files preload; Google Fonts stylesheet hatao | `index.html`, `src/index.css`, `public/fonts/` | 33KB + 4 requests kam; FCP improvement | High |
| 5 | 14 `modulepreload` scripts CSS se compete karte hain | Non-critical modulepreloads hatao; app entry ko idle ke baad load karo; chhote chunks bundle karo | `vite.config.ts`, `index.html`, `src/main.tsx` | HTTP/1.1 queueing kam; HTTP/2 ke saath impact kam | Medium |
| 6 | Initial JS me unused code | `react-router`/`@tanstack` ko `react-dom` se alag karo; heavy dialogs/forms lazy-load; codeSplitting groups tune karo | `vite.config.ts` | React-vendor ka 176KB unused (partly false positive) kam | Medium |
| 7 | Render-blocking CSS (~255ms) | Above-the-fold critical CSS inline karo; baaki CSS defer karo | `index.html`, CSS build pipeline | ~255ms render-blocking saving | Medium |
| 8 | A11y color contrast fail | `#F3831C` + white (2.6:1) ki jagah darker orange ya dark text use karo; design token update | Shared buttons/text components | Mobile A11y 95 → 100; desktop 91 → 100 | Easy |
| 9 | Carousel dot target size | Dot ko 24x24 + safe spacing do | `src/components/home/home-hero.jsx` | Desktop target-size audit pass | Easy |
| 10 | Banner images LCP/CLS | Width/height, `fetchpriority`, preload, compression verify karo | `home-hero.jsx`, `public/images/` | LCP/CLS improvement | Medium |
| 11 | HTML payload bada hai | SSG banner JSON/announcements trim karo; non-critical JSON defer karo | `src/prerender.tsx`, `home-hero.jsx` | HTML/TTFB thoda kam | Low |

---

## 2. Hosting Se Fix Hoga (Server / CDN / Apache)

| # | Issue | Fix | Kahan | Expected Impact | Priority |
|---|-------|-----|-------|-----------------|----------|
| 1 | Site **HTTP/1.1** par hai (h2/h3 nahi) | Apache `mod_http2` enable karo (`Protocols h2 http/1.1`) ya Cloudflare proxy lagao | Apache vhost / CDN | ~990–1280ms estimated saving; 57 requests/14 preloads ka queueing fix | **Highest** |
| 2 | CDN nahi hai | Cloudflare lagao; HTML ke liye `s-maxage=600` respect karo, API paths bypass rakho | DNS / CDN | TTFB 190–390ms → kam; HTML edge cache effective | High |
| 3 | Brotli available nahi (sirf gzip) | `mod_brotli` enable karo ya CDN Brotli on karo | Apache / CDN | HTML/JS/CSS smaller; gzip se better | High |
| 4 | Precompressed `.gz` files use nahi ho rahe | `.htaccess` me rewrite rules add karo jo existing `.gz` serve karein; `RemoveType .gz` se JS/CSS ka sahi MIME ensure karo. `DeflateCompressionLevel` `.htaccess` me allowed nahi (500 error), isliye vhost me set karo | `.htaccess` + Apache modules | Home first-load ~**125KB** saving; react-vendor 241KB → 183KB, App 43 → 30KB, CSS 37 → 29KB | High |
| 5 | Apache compression/caching tuning | `DeflateCompressionLevel` vhost me, `KeepAlive`, `MaxKeepAliveRequests`; cache headers already done | vhost / `.htaccess` | TTFB/CPU/bandwidth better | Medium |
| 6 | Backend API latency | `getGTag` / `fetch-webreffer` responses cache karo; PHP opcache/DB tune karo; Lighthouse me 5.3s vs curl 340–370ms observed | PHP / backend / DB | GTM delay aur TTI variance kam | Medium |
| 7 | Server resources/workers | PHP-FPM/Apache workers aur memory check karo; repeated Lighthouse runs me slow response na aaye | Hosting panel | Score consistency | Medium |
| 8 | Required Apache modules | `mod_rewrite`, `mod_headers`, `mod_deflate`, `mod_expires`, `mod_mime`, `AllowOverride All` ensure karo | Hosting config | `.htaccess` ke saare fixes kaam karenge | Prerequisite |
