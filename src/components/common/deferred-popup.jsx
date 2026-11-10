import { lazy, memo, Suspense, useEffect, useState } from "react";
import { isReactSnapPrerender } from "@/lib/prerender";
import { prefetchPopup } from "@/lib/popup-cache";

const PopUp = lazy(() => import("@/components/common/pop-up"));

const DEFAULT_DELAY_AFTER_INTERACTION_MS = 2000;

const DeferredPopUp = memo(function DeferredPopUp({
  delay = DEFAULT_DELAY_AFTER_INTERACTION_MS,
  slug,
  ...props
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const isPrerendering = isReactSnapPrerender();

  useEffect(() => {
    if (isPrerendering || !slug) return;
    if (sessionStorage.getItem(`popup_hidden_${slug}`) === "true") return;

    let timer;

    const trigger = () => {
      // Remove listeners immediately once user intent is confirmed.
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("pointerdown", trigger);
      window.removeEventListener("touchstart", trigger);
      window.removeEventListener("keydown", trigger);

      // Prefetch popup data in the background so it is ready when the dialog opens.
      prefetchPopup(slug).catch(() => {});

      timer = window.setTimeout(() => {
        setShouldRender(true);
      }, delay);
    };

    window.addEventListener("scroll", trigger, { once: true, passive: true });
    window.addEventListener("pointerdown", trigger, { once: true, passive: true });
    window.addEventListener("touchstart", trigger, { once: true, passive: true });
    window.addEventListener("keydown", trigger, { once: true, passive: true });

    return () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("pointerdown", trigger);
      window.removeEventListener("touchstart", trigger);
      window.removeEventListener("keydown", trigger);
      if (timer) window.clearTimeout(timer);
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
