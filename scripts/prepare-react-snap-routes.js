import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const packagePath = path.join(rootDir, "package.json");
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
const siteOrigin = "https://aia.in.net";

// Default total react-snap routes, including /404.html.
// Override per build with REACT_SNAP_ROUTE_LIMIT=80, 160, or "all".
const DEFAULT_REACT_SNAP_ROUTE_LIMIT = 48;
const DEFAULT_REACT_SNAP_PORT = 45679;

const staticRoutes = new Set([
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

const prerenderStaticRoutes = new Set([
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
  "/contact",
  "/corporate-training",
]);

const redirectOnlyRoutes = new Set([
  "/about-us",
  "/passed-out",
  "/corpo",
  "/enroll",
]);

const dynamicSeoRoutePatterns = [
  /^\/blogs\/[^/]+$/,
  /^\/blogs\/course\/[^/]+$/,
  /^\/passout-stories\/[^/]+$/,
  /^\/cfe-free-resource\/[^/]+$/,
];

function normalizePath(value) {
  if (!value) return "";

  let pathname = String(value).trim();

  try {
    const parsed = new URL(pathname, siteOrigin);
    if (parsed.origin !== siteOrigin) return "";
    pathname = parsed.pathname;
  } catch {
    return "";
  }

  try {
    pathname = decodeURI(pathname);
  } catch {
    return "";
  }

  pathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return pathname.replace(/\/+$/, "") || "/";
}

function isSeoSafeRoute(pathname) {
  if (!pathname || redirectOnlyRoutes.has(pathname)) return false;
  if (pathname.includes(":") || pathname.includes("*")) return false;
  if (pathname === "/404" || pathname === "/404.html") return false;
  if (/\.[a-z0-9]+$/i.test(pathname)) return false;

  return (
    staticRoutes.has(pathname) ||
    dynamicSeoRoutePatterns.some((pattern) => pattern.test(pathname))
  );
}

function readSitemapRoutes() {
  if (!fs.existsSync(sitemapPath)) return [];

  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  return Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), ([, loc]) =>
    normalizePath(loc),
  );
}

function toPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function toRouteLimit(value, fallback) {
  if (String(value || "").toLowerCase() === "all") {
    return Number.POSITIVE_INFINITY;
  }

  return toPositiveInteger(value, fallback);
}

function toPort(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 && parsed < 65536
    ? parsed
    : fallback;
}

function uniqueRoutes(routes) {
  return Array.from(new Set(routes.filter(Boolean)));
}

function formatRouteLimit(value) {
  return Number.isFinite(value) ? String(value) : "all";
}

const sitemapRoutes = readSitemapRoutes();
const sitemapSeoRoutes = sitemapRoutes.filter(isSeoSafeRoute);
const reactSnapRouteLimit = toRouteLimit(
  process.env.REACT_SNAP_ROUTE_LIMIT,
  DEFAULT_REACT_SNAP_ROUTE_LIMIT,
);
const reactSnapPort = toPort(process.env.REACT_SNAP_PORT, DEFAULT_REACT_SNAP_PORT);
const maxBlogRoutes = toRouteLimit(
  process.env.REACT_SNAP_MAX_BLOG_ROUTES,
  Number.POSITIVE_INFINITY,
);
const includePassoutRoutes = process.env.REACT_SNAP_INCLUDE_PASSOUT !== "false";
const includeFreeResourceDetails =
  process.env.REACT_SNAP_INCLUDE_FREE_RESOURCE_DETAILS !== "false";

const blogDetailRoutes = sitemapSeoRoutes
  .filter((route) => /^\/blogs\/[^/]+$/.test(route))
  .slice(0, maxBlogRoutes);

const blogCourseRoutes = sitemapSeoRoutes.filter((route) =>
  /^\/blogs\/course\/[^/]+$/.test(route),
);

const passoutRoutes = includePassoutRoutes
  ? sitemapSeoRoutes.filter((route) => /^\/passout-stories\/[^/]+$/.test(route))
  : [];

const freeResourceDetailRoutes = includeFreeResourceDetails
  ? sitemapSeoRoutes.filter((route) => /^\/cfe-free-resource\/[^/]+$/.test(route))
  : [];

const requiredRoutes = uniqueRoutes([
  ...[...prerenderStaticRoutes].filter(isSeoSafeRoute),
  "/404.html",
]);

const lowerPriorityStaticRoutes = [...staticRoutes].filter(
  (route) => !prerenderStaticRoutes.has(route) && isSeoSafeRoute(route),
);

const optionalRoutes = uniqueRoutes([
  ...blogCourseRoutes,
  ...blogDetailRoutes,
  ...lowerPriorityStaticRoutes,
  ...freeResourceDetailRoutes,
  ...passoutRoutes,
]);

const optionalRouteSlots = Number.isFinite(reactSnapRouteLimit)
  ? Math.max(reactSnapRouteLimit - requiredRoutes.length, 0)
  : Number.POSITIVE_INFINITY;

const include = Array.from(
  new Set([
    ...requiredRoutes,
    ...optionalRoutes.slice(0, optionalRouteSlots),
  ]),
).sort((a, b) => {
  if (a === "/") return -1;
  if (b === "/") return 1;
  return a.localeCompare(b);
});

const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

packageJson.reactSnap = {
  ...packageJson.reactSnap,
  include,
  port: reactSnapPort,
};

fs.writeFileSync(`${packagePath}.tmp`, `${JSON.stringify(packageJson, null, 2)}\n`);
fs.renameSync(`${packagePath}.tmp`, packagePath);

console.log(`Prepared react-snap include list with ${include.length} SEO-safe routes.`);
console.log(
  `React-snap route limit: ${formatRouteLimit(reactSnapRouteLimit)}. Set REACT_SNAP_ROUTE_LIMIT to control total crawls.`,
);
console.log(`React-snap port: ${reactSnapPort}. Set REACT_SNAP_PORT if this port is busy.`);
console.log(
  `React-snap route budget: ${include.filter((route) => /^\/blogs\/[^/]+$/.test(route)).length} blog details, ${include.filter((route) => /^\/blogs\/course\/[^/]+$/.test(route)).length} blog course pages, ${include.filter((route) => /^\/passout-stories\/[^/]+$/.test(route)).length} passout stories, ${include.filter((route) => /^\/cfe-free-resource\/[^/]+$/.test(route)).length} free-resource detail pages.`,
);
