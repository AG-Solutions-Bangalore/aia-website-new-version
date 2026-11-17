/**
 * Canonical route policy used by SEO, prerendering, sitemap generation, and
 * navigation links. Every indexable route is normalized WITHOUT a trailing
 * slash; `/` remains the only URL with a slash.
 */
const SITE_ORIGIN = "https://aia.in.net";
const PROTOCOL_PATTERN = /^[a-zA-Z][a-zA-Z\d+.-]*:/;
const SITE_HOST_PATTERN = /^(?:www\.)?aia\.in\.net(?:[/?#]|$)/i;
const EXTERNAL_HOST_PATTERN =
  /^(?:www\.)?[a-z0-9][a-z0-9-]*(?:\.[a-z0-9-]+)+(?::\d+)?(?:[/?#]|$)/i;
const FILE_EXTENSION_PATTERN =
  /\.(?:html?|php|aspx?|jsp|css|js|json|xml|pdf|jpe?g|png|webp|gif|svg)(?:[?#].*)?$/i;
const JUNK_HREF_PATTERN = /^[&$()[\]]+$/;

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
 * Normalizes a CMS-provided external link (LinkedIn, YouTube, etc.) that may be
 * missing its protocol. Without this, browsers resolve values like
 * `linkedin.com/in/x` against the current page and create fake internal URLs.
 */
export function normalizeExternalUrl(rawUrl?: string | null): string | undefined {
  if (!rawUrl) return undefined;
  const value = String(rawUrl).trim();
  if (!value) return undefined;
  if (
    PROTOCOL_PATTERN.test(value) ||
    value.startsWith("//") ||
    value.startsWith("/") ||
    value.startsWith("#")
  ) {
    return value;
  }
  if (
    EXTERNAL_HOST_PATTERN.test(value) &&
    !FILE_EXTENSION_PATTERN.test(value) &&
    !SITE_HOST_PATTERN.test(value)
  ) {
    return `https://${value}`;
  }
  return value;
}

/**
 * Normalizes a CMS or hard-coded link to the site's canonical internal route form.
 * External URLs are returned unchanged. Internal absolute URLs are reduced to a
 * path so they do not get treated as external links by callers. Protocol-less
 * external hosts are upgraded to absolute URLs, and malformed hrefs are neutralized.
 */
export function normalizeInternalUrl(rawUrl?: string | null): string | undefined {
  if (!rawUrl) return undefined;
  const value = rawUrl.trim();
  if (!value) return undefined;
  if (JUNK_HREF_PATTERN.test(value)) return "#";
  if (value.startsWith("#")) return value;

  const siteHostMatch = value.match(/^(?:www\.)?aia\.in\.net(?=[/?#]|$)/i);
  if (siteHostMatch) return normalizeInternalUrl(value.slice(siteHostMatch[0].length) || "/");

  const hasProtocol = PROTOCOL_PATTERN.test(value);
  const isSiteAbsolute = value === SITE_ORIGIN || value.startsWith(`${SITE_ORIGIN}/`);
  if (hasProtocol && !isSiteAbsolute) return value;

  const externalUrl = normalizeExternalUrl(value);
  if (externalUrl !== value) return externalUrl;

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
