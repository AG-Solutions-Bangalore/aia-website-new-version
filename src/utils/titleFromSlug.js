export const titleFromSlug = (slugish = "") => {
  const base = slugish.replace(/\.[^/.]+$/, "");
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};
