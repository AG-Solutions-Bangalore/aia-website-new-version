import { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";

// react-pageflip + page-flip are sizeable libs only used on this route, so
// code-split them (the route itself is already lazy-loaded in App.jsx).
const FlipBook = lazy(() => import("./flipbook/FlipBook"));

/**
 * Route-level section that replaces the old Heyzine iframe with a local,
 * self-hosted flipbook rendered from the magazine PDF file.
 *
 * `isPopup` lets the same reader be embedded inside a constrained container
 * instead of taking the full viewport.
 */
export default function FlipbookSection({ isPopup = false }) {
  const [searchParams] = useSearchParams();
  const pdfUrl = searchParams.get("pdf") || "/AIA_Times_Magazine_vol2.pdf";

  return (
    <Suspense fallback={null}>
      <FlipBook pdfUrl={pdfUrl} isPopup={isPopup} />
    </Suspense>
  );
}
