import { memo } from "react";

const FALLBACK_IMAGE = "https://aia.in.net/webapi/public/assets/images/no_image.jpg";

/**
 * Standard pass-through image component using real server URLs directly.
 * Server images on aia.in.net are already pre-optimized WebP assets.
 */
const OptimizedImage = memo(function OptimizedImage({
  src,
  alt = "",
  title,
  className = "",
  style = {},
  priority = false,
  width,
  height,
  onError,
  fetchPriority,
  decoding,
  // Ignored props passed from older call sites
  imageKind,
  sizes,
  srcSet,
  ...rest
}) {
  if (!src || src === "undefined" || src === "null" || src.includes("undefined")) {
    return null;
  }

  const handleError = (event) => {
    if (typeof onError === "function") {
      onError(event);
      return;
    }
    const img = event.currentTarget;
    if (img.dataset.fallback === "true") return;
    img.dataset.fallback = "true";
    img.src = FALLBACK_IMAGE;
  };

  return (
    <img
      src={src}
      alt={alt}
      title={title ?? alt ?? "Academy of Internal Audit"}
      className={className}
      style={style}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={fetchPriority || (priority ? "high" : "low")}
      decoding={decoding || (priority ? "sync" : "async")}
      onError={handleError}
      {...rest}
    />
  );
});

export default OptimizedImage;
