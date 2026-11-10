/**
 * @file src/lib/imageVariants.ts
 * @description Deterministic build-time image variant naming shared by the
 * sharp optimizer (`scripts/optimizeImages.ts`) and the runtime `OptimizedImage`
 * component. No manifest is required: both sides derive the same path from the
 * source URL, kind, width, and format.
 */

export type ImageKind = "banner" | "pdf" | "blog" | "story" | "badge" | "generic";
export type ImageFormat = "avif" | "webp";

export const IMAGE_KIND_WIDTHS: Record<ImageKind, number[]> = {
  banner: [640, 1280, 1600],
  pdf: [320, 640],
  blog: [360, 720],
  story: [320, 640],
  badge: [64, 128],
  generic: [320, 640],
};

export const IMAGE_KIND_FORMATS: Record<ImageKind, ImageFormat[]> = {
  banner: ["avif", "webp"],
  pdf: ["webp"],
  blog: ["webp"],
  story: ["webp"],
  badge: ["webp"],
  generic: ["webp"],
};

const BADGE_NAMES = ["IAO", "BECKER", "ISO", "ISACA", "GSAAA"];

function isProduction(): boolean {
  try {
    return Boolean(import.meta.env?.PROD);
  } catch {
    return false;
  }
}

export function isOptimizableRemoteImage(src: string): boolean {
  return /^https?:\/\/aia\.in\.net\/webapi\/.+\/images\//i.test(src);
}

export function detectImageKind(src: string): ImageKind {
  const lower = src.toLowerCase();

  if (lower.includes("/banner_images/")) return "banner";
  if (lower.includes("/web_images//pdf/") || lower.includes("/web_images/pdf/")) return "pdf";
  if (lower.includes("/blog_images/")) return "blog";
  if (lower.includes("/student_images/")) return "story";
  if (lower.includes("/student_company_images/")) return "story";

  const basename = imageBasename(src).toUpperCase();
  if (BADGE_NAMES.some((name) => basename.includes(name))) return "badge";

  return "generic";
}

function hashString(value: string): string {
  let hash = 5381;

  for (let index = 0; index < value.length; index++) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }

  return (hash >>> 0).toString(36);
}

export function imageBasename(src: string): string {
  const path = src.split(/[?#]/)[0];
  const segment = path.split("/").filter(Boolean).pop() || "image";
  const decoded = decodeURIComponent(segment);
  const withoutExtension = decoded.replace(/\.[a-z0-9]+$/i, "");
  const sanitized = withoutExtension.replace(/[^a-zA-Z0-9_-]/g, "-");

  return `${sanitized || "image"}-${hashString(src).slice(0, 6)}`;
}

export function optimizedImagePath(
  src: string,
  width: number,
  format: ImageFormat = "webp",
  kindOverride?: ImageKind,
): string {
  const kind = kindOverride || detectImageKind(src);
  return `/optimized/${kind}/${imageBasename(src)}-${width}.${format}`;
}

export function optimizedImageSrc(
  src: string,
  fallbackWidth = 960,
  kindOverride?: ImageKind,
): string {
  if (!isProduction() || !isOptimizableRemoteImage(src)) return src;

  return optimizedImagePath(src, fallbackWidth, "webp", kindOverride);
}

export function optimizedImageSrcSet(
  src: string,
  format: ImageFormat = "webp",
  kindOverride?: ImageKind,
  widths?: number[],
): string {
  if (!isProduction() || !isOptimizableRemoteImage(src)) return "";

  const kind = kindOverride || detectImageKind(src);
  const targetWidths = widths || IMAGE_KIND_WIDTHS[kind];

  return targetWidths
    .map((width) => `${optimizedImagePath(src, width, format, kind)} ${width}w`)
    .join(", ");
}

export function preferredImageWidth(kind: ImageKind): number {
  if (kind === "banner") return 1280;
  if (kind === "pdf") return 640;
  if (kind === "blog") return 720;
  if (kind === "badge") return 128;
  return 640;
}
