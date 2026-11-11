/**
 * Canonical route policy used by SEO, prerendering, sitemap generation, and
 * navigation links. Course URLs are the only indexable URLs without a slash.
 */
export const COURSE_ROUTES = new Set([
  "cfe-curriculum",
  "cia-curriculum",
  "cia-challenge-curriculum",
  "cams",
  "cisa",
]);

export function normalizeRoutePath(rawPath: string): string {
  const cleanPath = rawPath.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!cleanPath) return "/";
  return COURSE_ROUTES.has(cleanPath) ? `/${cleanPath}` : `/${cleanPath}/`;
}
