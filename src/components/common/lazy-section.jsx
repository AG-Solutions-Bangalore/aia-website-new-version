import {
  memo,
  Suspense,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { isBrowser, isReactSnapPrerender, scheduleIdle } from "@/lib/prerender";

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
  prerender = true,
  deferUntilIdle = false,
  idleDelay = 1600,
  idleTimeout = 1500,
  mountOnInteraction = true,
}) {
  const isPrerendering = isReactSnapPrerender();
  const shouldPrerender = isPrerendering && prerender !== false;
  const [canObserve, setCanObserve] = useState(
    priority || shouldPrerender || !deferUntilIdle,
  );
  const [isVisible, setIsVisible] = useState(priority || shouldPrerender);
  const [isPending, startTransition] = useTransition();
  const [reservedHeight, setReservedHeight] = useState(minHeight);
  const ref = useRef(null);
  const contentRef = useRef(null);
  const hasRendered = useRef(false);

  useEffect(() => {
    if (priority || shouldPrerender || !deferUntilIdle) {
      setCanObserve(true);
      return;
    }

    let started = false;
    const startObserving = () => {
      if (started) return;
      started = true;
      setCanObserve(true);
    };

    const cancelIdle = scheduleIdle(startObserving, {
      delay: idleDelay,
      timeout: idleTimeout,
    });

    if (!mountOnInteraction || !isBrowser) {
      return cancelIdle;
    }

    const interactionEvents = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"];
    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, startObserving, {
        passive: true,
        once: true,
      });
    });

    return () => {
      cancelIdle();
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, startObserving);
      });
    };
  }, [
    deferUntilIdle,
    idleDelay,
    idleTimeout,
    mountOnInteraction,
    priority,
    shouldPrerender,
  ]);

  useEffect(() => {
    if (priority || shouldPrerender || !canObserve) return;

    if (!isBrowser || !("IntersectionObserver" in window)) {
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
  }, [canObserve, priority, rootMargin, shouldPrerender]);

  useEffect(() => {
    if (!isVisible || !contentRef.current) return;
    if (!isBrowser || !("ResizeObserver" in window)) return;

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
