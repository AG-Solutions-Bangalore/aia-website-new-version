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
  srcSet: providedSrcSet,
  onError,
  fetchPriority,
  ...rest
}) {
  const safeSrc = useMemo(() => {
    if (!src) return "";
    try {
      return encodeURI(src);
    } catch {
      return src;
    }
  }, [src]);

  const generatedSrcSet = useMemo(() => {
    if (!safeSrc) return "";

    try {
      const url = new URL(safeSrc);
      if (url.hostname === "aia.in.net" && url.pathname.includes("/webapi/")) {
        return "";
      }
    } catch {
      return "";
    }

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

    return widths.map((w) => `${buildUrl(safeSrc, w, quality)} ${w}w`).join(", ");
  }, [safeSrc]);
  const resolvedSrcSet =
    providedSrcSet !== undefined ? providedSrcSet : generatedSrcSet;

  if (!safeSrc) return null;

  return (
    <img
      src={safeSrc}
      srcSet={resolvedSrcSet || undefined}
      sizes={sizes}
      alt={alt}
      className={className}
      style={style}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={fetchPriority || (priority ? "high" : "low")}
      decoding={priority ? "sync" : "async"}
      onError={onError}
      {...rest}
    />
  );
});

export default OptimizedImage;
