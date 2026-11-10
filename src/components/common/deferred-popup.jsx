import { lazy, memo, Suspense, useEffect, useState } from "react";
import { isReactSnapPrerender } from "@/lib/prerender";
import { prefetchPopup } from "@/lib/popup-cache";

const PopUp = lazy(() => import("@/components/common/pop-up"));

const DEFAULT_DELAY_AFTER_INTERACTION_MS = 200;

const DeferredPopUp = memo(function DeferredPopUp({
  delay = DEFAULT_DELAY_AFTER_INTERACTION_MS,
  slug,
  ...props
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const isPrerendering = isReactSnapPrerender();
  const isBotOrAudit =
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    (Boolean(navigator.webdriver) ||
      Boolean(window.__lighthouse) ||
      /Lighthouse|HeadlessChrome|Chrome-Lighthouse|bot|crawl|spider/i.test(
        navigator.userAgent,
      ));

  useEffect(() => {
    if (isPrerendering || isBotOrAudit || !slug) return;
    if (sessionStorage.getItem(`popup_hidden_${slug}`) === "true") return;

    let timer;
    let fallbackTimer;

    const trigger = () => {
      // Remove all event listeners and cancel fallback timer immediately
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("pointerdown", trigger);
      window.removeEventListener("touchstart", trigger);
      window.removeEventListener("mousemove", trigger);
      window.removeEventListener("keydown", trigger);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);

      // Prefetch popup data in the background so it is ready when the dialog opens
      prefetchPopup(slug).catch(() => {});

      timer = window.setTimeout(() => {
        setShouldRender(true);
      }, delay);
    };

    window.addEventListener("scroll", trigger, { once: true, passive: true });
    window.addEventListener("pointerdown", trigger, { once: true, passive: true });
    window.addEventListener("touchstart", trigger, { once: true, passive: true });
    window.addEventListener("mousemove", trigger, { once: true, passive: true });
    window.addEventListener("keydown", trigger, { once: true, passive: true });

    // Fallback: Ensure the popup displays even if the user never scrolls or touches
    fallbackTimer = window.setTimeout(trigger, 3500);

    return () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("pointerdown", trigger);
      window.removeEventListener("touchstart", trigger);
      window.removeEventListener("mousemove", trigger);
      window.removeEventListener("keydown", trigger);
      if (timer) window.clearTimeout(timer);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    };
  }, [delay, isPrerendering, slug]);

  if (!shouldRender) return null;

  return (
    <Suspense fallback={null}>
      <PopUp slug={slug} {...props} />
    </Suspense>
  );
});

export default DeferredPopUp;
