import { lazy, memo, Suspense, useEffect, useState } from "react";

const PopUp = lazy(() => import("@/components/common/pop-up"));

const DeferredPopUp = memo(function DeferredPopUp({
  delay = 16000,
  slug,
  ...props
}) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const show = () => setShouldRender(true);
    const timer = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(show, { timeout: 2000 });
      } else {
        show();
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [delay]);

  if (!shouldRender) return null;

  return (
    <Suspense fallback={null}>
      <PopUp slug={slug} {...props} />
    </Suspense>
  );
});

export default DeferredPopUp;
