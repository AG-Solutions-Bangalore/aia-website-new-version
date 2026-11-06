import { lazy, memo, Suspense, useEffect, useState } from "react";
import { isReactSnapPrerender, scheduleIdle } from "@/lib/prerender";
import { prefetchPopup } from "@/lib/popup-cache";

const PopUp = lazy(() => import("@/components/common/pop-up"));

const DeferredPopUp = memo(function DeferredPopUp({
  delay = 0,
  slug,
  ...props
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const isPrerendering = isReactSnapPrerender();

  useEffect(() => {
    if (isPrerendering || !slug) return;
    if (sessionStorage.getItem(`popup_hidden_${slug}`) === "true") return;

    // Start the API request immediately. It runs in parallel with the lazy
    // popup chunk instead of waiting for that chunk to download and execute.
    prefetchPopup(slug).catch(() => {});

    // Render on the next idle slot after hydration so the popup still does
    // not compete with the initial paint, but appears within ~500ms.
    return scheduleIdle(() => setShouldRender(true), { delay, timeout: 500 });
  }, [delay, isPrerendering, slug]);

  if (!shouldRender) return null;

  return (
    <Suspense fallback={null}>
      <PopUp slug={slug} {...props} />
    </Suspense>
  );
});

export default DeferredPopUp;
