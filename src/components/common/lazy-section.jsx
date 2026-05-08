import {
  memo,
  Suspense,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

const SectionSkeleton = memo(function SectionSkeleton({ height }) {
  return (
    <div
      style={{ minHeight: height, background: "transparent" }}
      aria-hidden="true"
    />
  );
});

const LazySection = memo(function LazySection({
  children,
  rootMargin = "200px",
  minHeight = "200px",
  priority = false,
  withQuery = false,
  QueryProvider,
}) {
  const [isVisible, setIsVisible] = useState(priority);
  const [isPending, startTransition] = useTransition();
  const [reservedHeight, setReservedHeight] = useState(minHeight);
  const ref = useRef(null);
  const contentRef = useRef(null);
  const hasRendered = useRef(false);

  useEffect(() => {
    if (priority) return;

    if (!("IntersectionObserver" in window)) {
      hasRendered.current = true;
      startTransition(() => setIsVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRendered.current) {
          hasRendered.current = true;
          startTransition(() => setIsVisible(true));
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [minHeight, priority, rootMargin]);

  useEffect(() => {
    if (!isVisible || !contentRef.current) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height;
      if (height > 0) {
        setReservedHeight(`${height}px`);
      }
    });

    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, [isVisible]);

  const content =
    withQuery && QueryProvider ? (
      <QueryProvider>{children}</QueryProvider>
    ) : (
      children
    );

  return (
    <div
      ref={ref}
      style={{
        minHeight: isVisible && !isPending ? undefined : reservedHeight,
      }}
    >
      {isVisible ? (
        <Suspense fallback={<SectionSkeleton height={reservedHeight} />}>
          <div ref={contentRef}>{content}</div>
        </Suspense>
      ) : (
        <SectionSkeleton height={reservedHeight} />
      )}
    </div>
  );
});

export default LazySection;
