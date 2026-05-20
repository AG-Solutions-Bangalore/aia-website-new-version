export const SITE_URL = "https://aia.in.net";

const CANONICAL_PATH_ALIASES = {
  "/about-us": "/about-aia",
  "/passed-out": "/our-passouts",
  "/corpo": "/corporate-training",
  "/enroll": "/enroll-now",
  "/corporate-training/cia-curriculum": "/cia-curriculum",
  "/corporate-training/cams": "/cams",
  "/corporate-training/cfe-curriculum": "/cfe-curriculum",
};

export function normalizeCanonicalPath(path = "/") {
  const pathname = path.split(/[?#]/)[0] || "/";
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, "");

  const canonicalPath = withoutTrailingSlash || "/";
  return CANONICAL_PATH_ALIASES[canonicalPath] || canonicalPath;
}

export function buildCanonicalUrl(path = "/") {
  const canonicalPath = normalizeCanonicalPath(path);
  return canonicalPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath}`;
}
