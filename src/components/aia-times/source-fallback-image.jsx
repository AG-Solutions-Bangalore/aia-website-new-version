import { useEffect, useState } from "react";

export default function SourceFallbackImage({ sources, alt, className, onExhausted }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const src = sources[sourceIndex];

  useEffect(() => {
    setSourceIndex(0);
  }, [sources]);

  useEffect(() => {
    if (src) return;
    onExhausted?.();
  }, [onExhausted, src]);

  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setSourceIndex((current) => current + 1)}
    />
  );
}
