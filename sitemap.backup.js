// import axios from "axios";

// const BASE_URL = "https://aia.in.net";

// export function sitemapMiddleware() {
//   return async (req, res, next) => {
//     if (req.url === "/sitemap.xml") {
//       try {
//         console.log("Fetching sitemap from API at", new Date().toISOString());

//         // Fetch sitemap data from API
//         const response = await axios.get(
//           "https://aia.in.net/webapi/public/api/getSitemap"
//         );

//         const pages = response.data.data || [];
//         const blogs = response.data.blog || [];
//         const students = response.data.student || [];

//         let urls = "";

//         // -------- Static Pages --------
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

//         // -------- Blog Pages --------
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

//         // -------- Student Stories --------
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

//         // Full sitemap XML
//         const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

// <url>
//   <loc>${BASE_URL}</loc>
//   <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
//   <changefreq>daily</changefreq>
//   <priority>1.0</priority>
// </url>

// ${urls}

// </urlset>`;

//         // Send response as XML
//         res.setHeader("Content-Type", "application/xml");
//         res.end(sitemap);

//         console.log("✅ Sitemap generated successfully!");
//       } catch (err) {
//         console.error("❌ Error generating sitemap:", err);
//         res.statusCode = 500;
//         res.end("Error generating sitemap");
//       }
//     } else {
//       next();
//     }
//   };
// }