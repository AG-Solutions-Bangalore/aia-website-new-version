import { lazy, Suspense } from "react";

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
  return (
    <Suspense fallback={null}>
      <FlipBook pdfUrl="/AIA_Times_Magazine.pdf" isPopup={isPopup} />
    </Suspense>
  );
}
