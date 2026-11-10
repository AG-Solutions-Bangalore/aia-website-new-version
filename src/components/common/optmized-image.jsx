import { memo, useMemo } from "react";
import {
  IMAGE_KIND_FORMATS,
  detectImageKind,
  isOptimizableRemoteImage,
  optimizedImageSrc,
  optimizedImageSrcSet,
  preferredImageWidth,
} from "@/lib/imageVariants";

const OptimizedImage = memo(function OptimizedImage({
  src,
  alt = "",
  title,
  className = "",
  style = {},
  priority = false,
  width,
  height,
  sizes = "100vw",
  srcSet: providedSrcSet,
  imageKind,
  onError,
  fetchPriority,
  decoding,
  ...rest
}) {
  const safeSrc = useMemo(() => {
    if (!src || src === "undefined" || src === "null" || src.includes("undefined")) return "";
    try {
      return encodeURI(src);
    } catch {
      return src;
    }
  }, [src]);

  const resolved = useMemo(() => {
    if (!safeSrc) {
      return {
        src: "",
        srcSet: "",
        sources: [],
        original: "",
        optimized: false,
      };
    }

    const kind = imageKind || detectImageKind(safeSrc);
    const isRemote = isOptimizableRemoteImage(safeSrc);
    const optimizedSrc = optimizedImageSrc(
      safeSrc,
      preferredImageWidth(kind),
      kind,
    );
    const optimized = optimizedSrc !== safeSrc;

    return {
      src: optimized ? optimizedSrc : safeSrc,
      srcSet: optimized ? "" : providedSrcSet || "",
      original: isRemote ? safeSrc : "",
      optimized,
      sources: optimized
        ? IMAGE_KIND_FORMATS[kind]
            .map((format) => ({
              format,
              srcSet: optimizedImageSrcSet(safeSrc, format, kind),
            }))
            .filter((source) => source.srcSet)
        : [],
    };
  }, [imageKind, providedSrcSet, safeSrc]);

  if (!safeSrc) return null;

  const handleError = (event) => {
    if (typeof onError === "function") {
      onError(event);
      return;
    }

    const image = event.currentTarget;
    if (image.dataset.optimizedFallback === "true") return;

    image.dataset.optimizedFallback = "true";
    image.src = safeSrc;
  };

  const image = (
    <img
      src={resolved.src}
      srcSet={resolved.srcSet || undefined}
      sizes={resolved.optimized ? sizes : sizes || undefined}
      alt={alt}
      title={title ?? alt ?? "Academy of Internal Audit"}
      className={className}
      style={style}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={fetchPriority || (priority ? "high" : "low")}
      decoding={decoding || (priority ? "sync" : "async")}
      data-original-src={resolved.original || undefined}
      onError={handleError}
      {...rest}
    />
  );

  if (!resolved.optimized) return image;

  return (
    <picture className="contents">
      {resolved.sources.map((source) => (
        <source
          key={source.format}
          type={`image/${source.format}`}
          srcSet={source.srcSet}
          sizes={sizes}
        />
      ))}
      {image}
    </picture>
  );
});

export default OptimizedImage;
