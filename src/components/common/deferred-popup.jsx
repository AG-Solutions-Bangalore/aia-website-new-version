import { lazy, memo, Suspense, useEffect, useState } from "react";
import { isReactSnapPrerender, scheduleIdle } from "@/lib/prerender";

const PopUp = lazy(() => import("@/components/common/pop-up"));

const DeferredPopUp = memo(function DeferredPopUp({
  delay = 16000,
  slug,
  ...props
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const isPrerendering = isReactSnapPrerender();

  useEffect(() => {
    if (isPrerendering) return;

    const show = () => setShouldRender(true);
    return scheduleIdle(show, { delay, timeout: 2000 });
  }, [delay, isPrerendering]);

  if (!shouldRender) return null;

  return (
    <Suspense fallback={null}>
      <PopUp slug={slug} {...props} />
    </Suspense>
  );
});

export default DeferredPopUp;
