import { memo, useMemo } from "react";

const OptimizedImage = memo(function OptimizedImage({
  src,
  alt = "",
  className = "",
  style = {},
  priority = false,
  width,
  height,
  sizes = "100vw",
  onError,
  fetchPriority,
  ...rest
}) {
  const srcSet = useMemo(() => {
    if (!src) return "";

    const widths = [320, 640, 960, 1280, 1600];
    const quality = 75;

    const buildUrl = (originalSrc, w, q) => {
      try {
        const url = new URL(originalSrc);
        url.searchParams.set("w", w);
        url.searchParams.set("q", q);
        return url.toString();
      } catch {
        return originalSrc;
      }
    };

    return widths.map((w) => `${buildUrl(src, w, quality)} ${w}w`).join(", ");
  }, [src]);

  if (!src) return null;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      style={style}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchpriority={fetchPriority || (priority ? "high" : "low")}
      decoding={priority ? "sync" : "async"}
      onError={onError}
      {...rest}
    />
  );
});

export default OptimizedImage;
