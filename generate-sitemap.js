// import axios from "axios";
// import fs from "fs";
// import path from "path";

// const BASE_URL = "https://aia.in.net";
// const API_URL = "https://aia.in.net/webapi/public/api/getSitemap";

// // ─── Shared XML Generator (fetches fresh data from API) ───────────────────────
// async function generateSitemapXML() {
//   const response = await axios.get(API_URL, {
//     headers: { "Cache-Control": "no-cache" },
//   });

//   const pages = response.data.data || [];
//   const blogs = response.data.blog || [];
//   const students = response.data.student || [];

//   let urls = "";

//   // ── Static Pages ──
//   pages.forEach((page) => {
//     if (!page.page_two_url) return;

//     let url = page.page_two_url;
//     if (url === "about-us") url = "about-aia";
//     if (url === "passed-out") url = "our-passouts";

//     const lastmod = page.updated_at
//       ? new Date(page.updated_at).toISOString().split("T")[0]
//       : new Date().toISOString().split("T")[0];

//     urls += `
//   <url>
//     <loc>${BASE_URL}/${url}</loc>
//     <lastmod>${lastmod}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>${page.page_two_priority || "0.8"}</priority>
//   </url>`;
//   });

//   // ── Blog Pages ──
//   blogs.forEach((blog) => {
//     if (!blog.page_two_url) return;

//     const lastmod = blog.updated_at
//       ? new Date(blog.updated_at).toISOString().split("T")[0]
//       : new Date().toISOString().split("T")[0];

//     urls += `
//   <url>
//     <loc>${BASE_URL}/blogs/${blog.page_two_url}</loc>
//     <lastmod>${lastmod}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>${blog.page_two_priority || "0.8"}</priority>
//   </url>`;
//   });

//   // ── Student Stories ──
//   students.forEach((student) => {
//     if (!student.student_slug) return;

//     const lastmod = student.updated_at
//       ? new Date(student.updated_at).toISOString().split("T")[0]
//       : new Date().toISOString().split("T")[0];

//     urls += `
//   <url>
//     <loc>${BASE_URL}/passout-stories/${student.student_slug}</loc>
//     <lastmod>${lastmod}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.7</priority>
//   </url>`;
//   });

//   return `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

//   <url>
//     <loc>${BASE_URL}</loc>
//     <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
//     <changefreq>daily</changefreq>
//     <priority>1.0</priority>
//   </url>
// ${urls}

// </urlset>`;
// }

// // ─── DEV Middleware (serves fresh /sitemap.xml on localhost) ───────────────────
// export function sitemapMiddleware() {
//   return async (req, res, next) => {
//     if (req.url === "/sitemap.xml") {
//       try {
//         const xml = await generateSitemapXML();
//         res.setHeader("Content-Type", "application/xml");
//         res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
//         res.end(xml);
//         console.log("✅ Sitemap served in dev");
//       } catch (err) {
//         console.error("❌ Sitemap dev error:", err);
//         res.statusCode = 500;
//         res.end("Error generating sitemap");
//       }
//     } else {
//       next();
//     }
//   };
// }

// // ─── BUILD Plugin (writes dist/sitemap.xml during `vite build`) ───────────────
// // Every time you deploy (run `npm run build`), this fetches fresh data
// // from the API and writes an up-to-date sitemap.xml into dist/.
// export function sitemapBuildPlugin() {
//   return {
//     name: "vite-plugin-sitemap",
//     apply: "build",
//     async closeBundle() {
//       try {
//         console.log("🗺️  Generating sitemap.xml for production...");
//         const xml = await generateSitemapXML();

//         const outDir = path.resolve(process.cwd(), "dist");
//         fs.writeFileSync(path.join(outDir, "sitemap.xml"), xml, "utf-8");

//         console.log("✅ sitemap.xml written to dist/sitemap.xml");
//       } catch (err) {
//         console.error("❌ Sitemap build error:", err);
//       }
//     },
//   };
// }
