export const SITE_URL = "https://aia.in.net";

const CANONICAL_PATH_ALIASES = {
  "/about-us": "/about-aia",
  "/passed-out": "/alumni-network",
  "/our-passouts": "/alumni-network",
  "/corpo": "/corporate-training",
  "/enroll": "/enroll-now",
  "/about-aia/cia-curriculum": "/cia-curriculum",
  "/about-aia/cams": "/cams",
  "/about-aia/cfe-curriculum": "/cfe-curriculum",
  "/about-aia/cia-challenge-curriculum": "/cia-challenge-curriculum",
  "/about-aia/cisa": "/cisa",
  "/corporate-training/cia-curriculum": "/cia-curriculum",
  "/corporate-training/cams": "/cams",
  "/corporate-training/cfe-curriculum": "/cfe-curriculum",
  "/corporate-training/cisa": "/cisa",
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
  return canonicalPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath}/`;
}
