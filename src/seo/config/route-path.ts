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

  // Handle absolute or protocol-relative AIA URLs (e.g. https://www.aia.in.net/..., http://aia.in.net/...)
  const aiaUrlMatch = value.match(/^(?:https?:)?\/\/(?:www\.)?aia\.in\.net(\/.*)?$/i);
  if (aiaUrlMatch) {
    const internalPath = aiaUrlMatch[1] || "/";
    return normalizeInternalUrl(internalPath);
  }

  // Handle protocol-less hostnames like aia.in.net/... or www.aia.in.net/...
  const siteHostMatch = value.match(/^(?:www\.)?aia\.in\.net(?=[/?#]|$)/i);
  if (siteHostMatch) {
    const internalPath = value.slice(siteHostMatch[0].length) || "/";
    return normalizeInternalUrl(internalPath);
  }

  const hasProtocol = PROTOCOL_PATTERN.test(value);
  if (hasProtocol) return value;

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

const TRUSTED_AUTHORITIES = new Set([
  "theiia.org",
  "www.theiia.org",
  "acfe.com",
  "www.acfe.com",
  "isaca.org",
  "www.isaca.org",
]);

/**
 * Rewrites links inside CMS-provided HTML:
 * 1. Internal links -> rewritten to canonical internal routes per strict trailing slash policy.
 * 2. External links -> keeps trusted credential bodies (IIA, ACFE, ISACA) followed; adds
 *    rel="noopener noreferrer nofollow" to all promotional, partner, and social external links
 *    per technical SEO audit requirements.
 */
export function normalizeHtmlInternalLinks(html?: string | null): string {
  if (!html) return html ?? "";
  return html.replace(
    /<a\b([^>]*?)href=(["'])([^"']+)\2([^>]*)>/gi,
    (match, beforeHref, quote, url, afterHref) => {
      const normalized = normalizeInternalUrl(url);
      if (normalized && normalized !== url && (normalized.startsWith("/") || normalized.startsWith("#"))) {
        return `<a${beforeHref}href=${quote}${normalized}${quote}${afterHref}>`;
      }

      try {
        const testUrl = /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(url) ? url : `https://${url}`;
        const parsed = new URL(testUrl);
        const host = parsed.hostname.toLowerCase();
        if (host === 'aia.in.net' || host === 'www.aia.in.net') {
          const internalPath = `${normalizeRoutePath(parsed.pathname)}${parsed.search}${parsed.hash}`;
          return `<a${beforeHref}href=${quote}${internalPath}${quote}${afterHref}>`;
        }
        if (!TRUSTED_AUTHORITIES.has(host)) {
          let combined = `${beforeHref} ${afterHref}`;
          if (/rel=["']/i.test(combined)) {
            combined = combined.replace(/rel=(["'])(.*?)\1/gi, 'rel="noopener noreferrer nofollow"');
            return `<a href=${quote}${url}${quote} ${combined.trim()}>`;
          } else {
            return `<a href=${quote}${url}${quote} rel="noopener noreferrer nofollow"${beforeHref}${afterHref}>`;
          }
        }
      } catch {
        // relative or invalid URL
      }

      return match;
    },
  );
}
