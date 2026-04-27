// import { useEffect } from "react";
// import axios from "axios";

// const BASE_URL = "https://aia.in.net";
// const API_URL = "https://aia.in.net/webapi/public/api/getSitemap";

// export default function SitemapPage() {
//   useEffect(() => {
//     async function generateAndServeSitemap() {
//       try {
//         const response = await axios.get(API_URL, {
//           headers: { "Cache-Control": "no-cache" },
//         });

//         const pages = response.data.data || [];
//         const blogs = response.data.blog || [];
//         const students = response.data.student || [];

//         let urls = "";

//         // ── Static Pages ──
//         pages.forEach((page) => {
//           if (!page.page_two_url) return;

//           let url = page.page_two_url;
//           if (url === "about-us") url = "about-aia";
//           if (url === "passed-out") url = "our-passouts";

//           const lastmod = page.updated_at
//             ? new Date(page.updated_at).toISOString().split("T")[0]
//             : new Date().toISOString().split("T")[0];

//           urls += `
//   <url>
//     <loc>${BASE_URL}/${url}</loc>
//     <lastmod>${lastmod}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>${page.page_two_priority || "0.8"}</priority>
//   </url>`;
//         });

//         // ── Blog Pages ──
//         blogs.forEach((blog) => {
//           if (!blog.page_two_url) return;

//           const lastmod = blog.updated_at
//             ? new Date(blog.updated_at).toISOString().split("T")[0]
//             : new Date().toISOString().split("T")[0];

//           urls += `
//   <url>
//     <loc>${BASE_URL}/blogs/${blog.page_two_url}</loc>
//     <lastmod>${lastmod}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>${blog.page_two_priority || "0.8"}</priority>
//   </url>`;
//         });

//         // ── Student Stories ──
//         students.forEach((student) => {
//           if (!student.student_slug) return;

//           const lastmod = student.updated_at
//             ? new Date(student.updated_at).toISOString().split("T")[0]
//             : new Date().toISOString().split("T")[0];

//           urls += `
//   <url>
//     <loc>${BASE_URL}/passout-stories/${student.student_slug}</loc>
//     <lastmod>${lastmod}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.7</priority>
//   </url>`;
//         });

//         const xml = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

//   <url>
//     <loc>${BASE_URL}</loc>
//     <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
//     <changefreq>daily</changefreq>
//     <priority>1.0</priority>
//   </url>
// ${urls}

// </urlset>`;

//         // Replace the entire page with raw XML
//         document.open("text/xml");
//         document.write(xml);
//         document.close();
//       } catch (err) {
//         console.error("❌ Error generating sitemap:", err);
//       }
//     }

//     generateAndServeSitemap();
//   }, []);

//   // Show nothing while loading (page will be replaced with XML)
//   return null;
// }
