/**
 * @file src/config/site.ts
 * @description Single source of truth for site-wide branding constants, contact information,
 * origin URLs, and canonical URL derivation.
 *
 * @why
 * Inconsistent canonical URLs (e.g., mixing `http`/`https`, with/without trailing slashes, or using
 * temporary development URLs) cause duplicate content penalties, split domain authority, and
 * invalid Google Rich Results. Centralizing branding and canonical URL formatting here ensures
 * every component, pre-renderer, sitemap script, and schema entity derives URLs from a single
 * deterministic function.
 *
 * @what
 * - `SITE_NAME`: Canonical brand title ('Academy of Internal Audit').
 * - `SITE_ORIGIN`: Base production origin ('https://aia.in.net').
 * - `SITE_LOGO`: Absolute path to brand logo asset.
 * - `SITE_PHONE` & `SITE_EMAIL`: Verified primary contact details.
 * - `getCanonicalUrl(pathname)`: Pure function sanitizing path slashes and returning an absolute canonical URL.
 *
 * @responsibility
 * Providing immutable brand constants and pure canonical URL string formatting.
 * Strictly decoupled from React components and browser DOM APIs.
 *
 * @dependencies
 * - None (Zero-dependency pure TypeScript module).
 */

export const SITE_NAME = 'Academy of Internal Audit';
export const SITE_ORIGIN = 'https://aia.in.net';
export const SITE_LOGO = 'https://aia.in.net/webapi/public/assets/images/web_images/new_logo.webp';
export const SITE_PHONE = '+91 93113 20114';
export const SITE_EMAIL = 'support@aia.in.net';

/**
 * Course routes that are indexed in Google WITHOUT a trailing slash.
 * Follows the strict SEO requirement to prevent index drift and canonical mismatches.
 */
export const COURSE_ROUTES = new Set([
  'cfe-curriculum',
  'cia-curriculum',
  'cia-challenge-curriculum',
  'cams',
  'cisa',
]);

/**
 * Normalizes any route pathname to an absolute canonical URL.
 * - Course pages are formatted WITHOUT a trailing slash (e.g. 'https://aia.in.net/cfe-curriculum')
 * - All other pages retain the trailing slash (e.g. 'https://aia.in.net/about-aia/' or 'https://aia.in.net/blogs/')
 *
 * @param pathname - The route path (e.g. '/about-aia' or 'cfe-curriculum')
 * @returns Fully-qualified canonical URL matching Google indexed format
 */
export function getCanonicalUrl(pathname: string): string {
  const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!cleanPath) return `${SITE_ORIGIN}/`;
  if (COURSE_ROUTES.has(cleanPath)) {
    return `${SITE_ORIGIN}/${cleanPath}`;
  }
  return `${SITE_ORIGIN}/${cleanPath}/`;
}
