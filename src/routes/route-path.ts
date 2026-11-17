/**
 * Navigation-facing adapter for the central SEO route policy.
 * Components use this routing helper without importing SEO metadata modules.
 */
export {
  normalizeRoutePath,
  normalizeInternalUrl,
  normalizeExternalUrl,
  normalizeHtmlInternalLinks,
} from "@/seo/config/route-path";
