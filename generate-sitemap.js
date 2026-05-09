import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://aia.in.net";
const API_URL = "https://aia.in.net/webapi/public/api/getSitemap";

const ROUTE_ALIASES = {
  "about-us": "about-aia",
  "passed-out": "our-passouts",
  corpo: "corporate-training",
  enroll: "enroll-now",
};

const STATIC_ROUTES = new Set([
  "/",
  "/about-aia",
  "/cfe-curriculum",
  "/cia-curriculum",
  "/cia-challenge-curriculum",
  "/cams",
  "/cia-free-resources",
  "/cams-free-resources",
  "/cfe-free-resources",
  "/blogs",
  "/our-passouts",
  "/enroll-now",
  "/contact",
  "/corporate-training",
  "/policies",
  "/terms-and-conditions",
]);

const CFE_RESOURCE_MODULES = ["CFE-1", "CFE-2", "CFE-3", "CFE-4"];
const BLOG_COURSE_CATEGORIES = ["cfe", "cia", "cams"];

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toDateString(value) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime())
    ? new Date().toISOString().split("T")[0]
    : date.toISOString().split("T")[0];
}

function normalizePath(loc) {
  const url = String(loc || "").trim().split(/[?#]/)[0];
  if (!url) return "";

  let pathname = url;
  if (/^https?:\/\//i.test(url)) {
    try {
      const parsed = new URL(url);
      if (parsed.origin !== BASE_URL) return "";
      pathname = parsed.pathname;
    } catch {
      return "";
    }
  }

  pathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  pathname = pathname.replace(/\/+$/, "") || "/";

  const aliasKey = pathname.replace(/^\//, "");
  if (ROUTE_ALIASES[aliasKey]) {
    return `/${ROUTE_ALIASES[aliasKey]}`;
  }

  return pathname;
}

function isRoutablePath(pathname) {
  return (
    STATIC_ROUTES.has(pathname) ||
    pathname.startsWith("/blogs/") ||
    pathname.startsWith("/passout-stories/") ||
    pathname.startsWith("/cfe-free-resource/")
  );
}

async function generateSitemapXML() {
  try {
    console.log("🌐 Fetching dynamic routes from API...");
    const response = await axios.get(API_URL, {
        headers: { "Cache-Control": "no-cache" },
    });

    const pages = response.data.data || [];
    const blogs = response.data.blog || [];
    const students = response.data.student || [];

    // Base set of URLs to ensure no duplicates
    const urlSet = new Set();
    let urlTags = "";
    let skippedUrls = 0;

    const addUrl = (loc, priority = "0.5", changefreq = "monthly", lastmod = null) => {
        const pathname = normalizePath(loc);

        if (!pathname || !isRoutablePath(pathname)) {
          skippedUrls += 1;
          return;
        }

        const encodedPath = pathname
          .split("/")
          .map((part) => encodeURIComponent(part))
          .join("/");
        const finalUrl = pathname === "/" ? `${BASE_URL}/` : `${BASE_URL}${encodedPath}`;

        if (urlSet.has(finalUrl)) return;
        urlSet.add(finalUrl);

        const date = toDateString(lastmod);

        urlTags += `
  <url>
    <loc>${escapeXml(finalUrl)}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    };

    // 1. Static/Home
    addUrl("/", "1.0", "daily");

    // 2. Dynamic Pages from API
    pages.forEach((page) => {
        if (!page.page_two_url) return;
        let url = page.page_two_url;
        
        addUrl(url, page.page_two_priority || "0.8", "weekly", page.updated_at);
    });

    // 3. Blogs from API
    blogs.forEach((blog) => {
        if (!blog.page_two_url) return;
        addUrl(`/blogs/${blog.page_two_url}`, "0.7", "weekly", blog.updated_at);
    });

    const blogCourses = new Set(
      blogs
        .map((blog) => slugify(blog.blog_course))
        .filter(Boolean),
    );
    BLOG_COURSE_CATEGORIES.forEach((course) => blogCourses.add(course));
    blogCourses.forEach((course) => addUrl(`/blogs/course/${course}`, "0.6", "weekly"));

    // 4. Student Stories from API
    students.forEach((student) => {
        if (!student.student_slug) return;
        addUrl(`/passout-stories/${student.student_slug}`, "0.6", "monthly", student.updated_at);
    });

    // 5. Ensure critical routes not in API are included
    STATIC_ROUTES.forEach(route => addUrl(route, route === "/" ? "1.0" : "0.8", route === "/" ? "daily" : "weekly"));
    CFE_RESOURCE_MODULES.forEach(module => addUrl(`/cfe-free-resource/${module}`, "0.6", "monthly"));

    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlTags}
</urlset>`;

    // Save to public and dist
    const publicPath = path.join(__dirname, "public", "sitemap.xml");
    fs.writeFileSync(publicPath, sitemapXML);
    console.log(`✅ Sitemap successfully generated at ${publicPath} (${urlSet.size} URLs, ${skippedUrls} skipped)`);

    const distPath = path.join(__dirname, "dist", "sitemap.xml");
    if (fs.existsSync(path.join(__dirname, "dist"))) {
        fs.writeFileSync(distPath, sitemapXML);
        console.log(`✅ Sitemap successfully copied to ${distPath}`);
    }

  } catch (error) {
    console.error("❌ Error generating sitemap:", error.message);
  }
}

generateSitemapXML();
