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
  const pdfUrl = searchParams.get("pdf") || "/AIA_Times_Volume_3_Nov_2026.pdf";

  return (
    <>
      {!isPopup && (
        <div className="bg-[#0F3652] px-4 py-3">
          <h1 className="mx-auto max-w-5xl text-center text-sm font-bold leading-snug text-white sm:text-lg md:text-xl">
            AIA Times E-Magazine
          </h1>
        </div>
      )}

      <Suspense fallback={null}>
        <FlipBook pdfUrl={pdfUrl} isPopup={isPopup} />
      </Suspense>
    </>
  );
}
