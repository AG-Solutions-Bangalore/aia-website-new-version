import { ChevronLeft, ChevronRight, Minimize, Maximize } from "lucide-react";

/**
 * Floating control bar for the flipbook.
 *
 * Renders Previous / Next buttons, a current-page indicator, and a
 * Fullscreen toggle. All interactivity lives on the buttons themselves
 * (pointer-events), so the bar can overlay the magazine without blocking
 * page-turn drags elsewhere.
 *
 * `orientation` ("landscape" | "portrait") lets the indicator show a
 * two-page range in spread mode.
 */
export default function FlipBookControls({
  currentPage = 0,
  totalPages = 0,
  orientation = "landscape",
  canPrev = false,
  canNext = false,
  isFullscreen = false,
  onPrev,
  onNext,
  onToggleFullscreen,
}) {
  const isSpread = orientation === "landscape" && totalPages > 1;

  let indicator = "—";
  if (totalPages > 0) {
    if (isSpread) {
      if (currentPage === 0) {
        indicator = "1";
      } else if (currentPage === totalPages - 1) {
        indicator = `${totalPages}`;
      } else {
        // In landscape (spread) mode,currentPage matches the left page index.
        // It should be odd (1, 3, 5) when there's a single cover page.
        // We normalize it to the left page index if it's even during flips.
        const leftPageIndex = currentPage % 2 === 0 ? currentPage - 1 : currentPage;
        const displayStart = leftPageIndex + 1;
        const displayEnd = Math.min(leftPageIndex + 2, totalPages);
        indicator = displayStart === displayEnd ? `${displayStart}` : `${displayStart}–${displayEnd}`;
      }
    } else {
      indicator = `${currentPage + 1}`;
    }
  }

  return (
    <div className="fb-controls" role="toolbar" aria-label="Magazine controls">
      <button
        type="button"
        className="fb-control-btn"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous page"
        title="Previous (←)"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="fb-indicator" aria-live="polite">
        <strong>{indicator}</strong> <span>/ {totalPages || "—"}</span>
      </div>

      <button
        type="button"
        className="fb-control-btn"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next page"
        title="Next (→)"
      >
        <ChevronRight size={20} />
      </button>

      {onToggleFullscreen && (
        <>
          <span className="fb-controls-divider" aria-hidden="true" />
          <button
            type="button"
            className="fb-control-btn fb-control-btn--full"
            onClick={onToggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </>
      )}
    </div>
  );
}
