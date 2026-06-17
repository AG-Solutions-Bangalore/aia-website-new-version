import { lazy, Suspense } from "react";

import { flipbookPageSources } from "./aia-times.constants";

// react-pageflip + page-flip are sizeable libs only used on this route, so
// code-split them (the route itself is already lazy-loaded in App.jsx).
const FlipBook = lazy(() => import("./flipbook/FlipBook"));

/**
 * Route-level section that replaces the old Heyzine iframe with a local,
 * self-hosted flipbook rendered from the magazine page images.
 *
 * Pages come from `flipbookPageSources` (aia-times.constants.js), which
 * already holds a fallback URL chain per page for the 8 magazine pages
 * living under public/images/AIATimes/flipbook/.
 *
 * `isPopup` lets the same reader be embedded inside a constrained container
 * instead of taking the full viewport.
 */
export default function FlipbookSection({ isPopup = false }) {
  return (
    <Suspense fallback={null}>
      <FlipBook pageSources={flipbookPageSources} isPopup={isPopup} />
    </Suspense>
  );
}
