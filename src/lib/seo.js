export const SITE_URL = "https://aia.in.net";

export function normalizeCanonicalPath(path = "/") {
  const pathname = path.split(/[?#]/)[0] || "/";
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, "");

  return withoutTrailingSlash || "/";
}

export function buildCanonicalUrl(path = "/") {
  const canonicalPath = normalizeCanonicalPath(path);
  return canonicalPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath}`;
}
