const OptimizedImage = ({
  src,
  alt = "",
  className = "",
  style = {},
  priority = false, 
  width,
  height,
  sizes = "100vw", 
  onError,
  ...rest
}) => {
  if (!src) return null;
  const WIDTHS = [320, 640, 960, 1280, 1600];
  const QUALITY = 75;

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

  const srcSet = WIDTHS.map((w) => `${buildUrl(src, w, QUALITY)} ${w}w`).join(
    ", "
  );

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
      fetchPriority={priority ? "high" : "low"}
      decoding={priority ? "sync" : "async"}
      onError={onError}
      {...rest}
    />
  );
};

export default OptimizedImage;
