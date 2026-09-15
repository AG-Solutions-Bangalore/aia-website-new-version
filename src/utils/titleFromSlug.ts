/**
 * Converts a URL slug or filename into a human-readable title-cased string.
 */
export const titleFromSlug = (slugish: string = ''): string => {
  const base = slugish.replace(/\.[^/.]+$/, '');
  return base.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};
