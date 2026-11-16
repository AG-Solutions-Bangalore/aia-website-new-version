/**
 * Canonical route policy used by SEO, prerendering, sitemap generation, and
 * navigation links. Every indexable route is normalized WITHOUT a trailing
 * slash; `/` remains the only URL with a slash.
 */
const SITE_ORIGIN = "https://aia.in.net";

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
  return `/${cleanPath}`;
}

/**
 * Normalizes a CMS or hard-coded link to the site's canonical internal route form.
 * External URLs are returned unchanged. Internal absolute URLs are reduced to a
 * path so they do not get treated as external links by callers.
 */
export function normalizeInternalUrl(rawUrl?: string | null): string | undefined {
  if (!rawUrl) return undefined;
  const value = rawUrl.trim();
  if (!value) return undefined;
  if (value.startsWith("#")) return value;

  const hasProtocol = /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value);
  const isSiteAbsolute = value === SITE_ORIGIN || value.startsWith(`${SITE_ORIGIN}/`);
  if (hasProtocol && !isSiteAbsolute) return value;

  try {
    const url = new URL(value, SITE_ORIGIN);
    if (url.origin !== SITE_ORIGIN) return value;
    return `${normalizeRoutePath(url.pathname)}${url.search}${url.hash}`;
  } catch {
    return value;
  }
}

/**
 * Rewrites internal links inside CMS-provided HTML to canonical, non-trailing-slash URLs.
 * External links are left untouched.
 */
export function normalizeHtmlInternalLinks(html?: string | null): string {
  if (!html) return html ?? "";
  return html.replace(
    /(href=["'])([^"']+)(["'])/gi,
    (match, prefix: string, url: string, suffix: string) => {
      const normalized = normalizeInternalUrl(url);
      return normalized ? `${prefix}${normalized}${suffix}` : match;
    },
  );
}
