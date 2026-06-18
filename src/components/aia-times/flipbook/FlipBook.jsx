import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

import FlipBookPage from "./FlipBookPage";
import FlipBookControls from "./FlipBookControls";
import "./flipbook.css";

// Page geometry. Each "page" is portrait; a two-page spread doubles the width.
// We compute dimensions responsively so the book fits the viewport on every
// device while keeping a consistent magazine aspect ratio (3:4). Using
// size="fixed" (not stretch) gives deterministic, centered sizing.
const PAGE_RATIO = 3 / 4; // width / height

const computePageSize = (isPortrait) => {
  // Leave room for the controls bar and padding.
  const margin = isPortrait ? 170 : 180;
  const maxH = Math.max(window.innerHeight - margin, 360);
  const maxW = isPortrait
    ? Math.min(window.innerWidth - 48, 560)
    : Math.min(window.innerWidth - 80, 1180);

  // Two-page spread has to fit two pages side by side.
  const widthBudget = isPortrait ? maxW : maxW / 2;

  let height = maxH;
  let width = height * PAGE_RATIO;
  if (width > widthBudget) {
    width = widthBudget;
    height = width / PAGE_RATIO;
  }
  return { width: Math.round(width), height: Math.round(height) };
};

/**
 * Heyzine-style flipbook reader powered by PDF.js.
 *
 * @param {object} props
 * @param {string} [props.pdfUrl="https://aia.in.net/webapi/public/assets/pdf/AIA_Times_Magazine.pdf"]
 *   URL to the magazine PDF file.
 * @param {boolean} [props.isPopup=false]
 *   When true, fills its parent container instead of the full viewport.
 * @param {string} [props.alt="AIA Times E-Magazine"]
 *   Alt text base for each page.
 */
export default function FlipBook({
  pdfUrl = "/AIA_Times_Magazine.pdf",
  isPopup = false,
  alt = "AIA Times E-Magazine",
}) {
  const bookRef = useRef(null); // ref to HTMLFlipBook → .current.pageFlip()
  const shellRef = useRef(null); // the fullscreen container

  const [pdf, setPdf] = useState(null);
  const [loadingError, setLoadingError] = useState(null);
  const [ready, setReady] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [orientation, setOrientation] = useState("landscape");
  const [isFlipping, setIsFlipping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageSize, setPageSize] = useState(() =>
    typeof window !== "undefined"
      ? computePageSize(window.matchMedia("(max-width: 768px)").matches)
      : { width: 440, height: 586 },
  );

  // --- Responsive sizing -------------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");

    const onResize = () => setPageSize(computePageSize(mq.matches));
    onResize();

    mq.addEventListener?.("change", onResize);
    window.addEventListener("resize", onResize);
    return () => {
      mq.removeEventListener?.("change", onResize);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // --- Load PDF Document using pdfjs-dist ---------------------------------
  useEffect(() => {
    let active = true;

    const loadPdf = async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        
        // Use CDN worker URL to bypass local server MIME type blocks (.mjs content-type)
        // and avoid dynamic asset hash matching issues in production.
        pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.0.227/build/pdf.worker.min.mjs";

        const loadingTask = pdfjs.getDocument({ url: pdfUrl });
        const pdfDoc = await loadingTask.promise;
        if (active) {
          setPdf(pdfDoc);
          setTotalPages(pdfDoc.numPages);
          setLoadingError(null);
        }
      } catch (err) {
        console.error("Failed to load PDF:", err);
        if (active) {
          setLoadingError(err.message || "Failed to load magazine PDF.");
        }
      }
    };

    loadPdf();

    return () => {
      active = false;
    };
  }, [pdfUrl]);

  // --- Imperative helpers (use the underlying PageFlip instance) ---------
  const getFlip = useCallback(() => bookRef.current?.pageFlip?.(), []);

  const goNext = useCallback(() => {
    const flip = getFlip();
    flip?.flipNext?.();
  }, [getFlip]);

  const goPrev = useCallback(() => {
    const flip = getFlip();
    flip?.flipPrev?.();
  }, [getFlip]);

  // --- Keyboard navigation (← / →) --------------------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onKey = (e) => {
      const target = e.target;
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // --- Fullscreen --------------------------------------------------------
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onFsChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = shellRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  // --- page-flip event wiring -------------------------------------------
  const handleFlip = useCallback((e) => {
    setCurrentPage(e?.data ?? 0);
  }, []);

  const handleChangeOrientation = useCallback((e) => {
    setOrientation(e?.data === "portrait" ? "portrait" : "landscape");
  }, []);

  const handleChangeState = useCallback((e) => {
    setIsFlipping(e?.data !== "read");
  }, []);

  const handleInit = useCallback(() => {
    const flip = getFlip();
    if (!flip) return;
    setTotalPages(flip.getPageCount?.() ?? (pdf ? pdf.numPages : 0));
    setOrientation(
      flip.getOrientation?.() === "portrait" ? "portrait" : "landscape",
    );
    setCurrentPage(flip.getCurrentPageIndex?.() ?? 0);
    setReady(true);
  }, [getFlip, pdf]);

  // --- Derived bounds ----------------------------------------------------
  const isPortrait = orientation === "portrait";
  const canPrev = currentPage > 0;
  const canNext = currentPage < totalPages - 1;

  // --- Memoized pages: build once per pdf set ----------------------------
  const pages = useMemo(() => {
    if (!pdf) return [];
    return Array.from({ length: totalPages }, (_, i) => (
      <FlipBookPage
        key={i}
        pdf={pdf}
        pageNumber={i + 1}
        side={i % 2 === 0 ? "right" : "left"}
        alt={alt}
      />
    ));
  }, [pdf, totalPages, alt]);

  const showBook = ready && pdf && !loadingError;

  return (
    <div
      ref={shellRef}
      className={`fb-shell${isPopup ? " fb-popup" : ""}`}
      aria-label="AIA Times E-Magazine flipbook"
    >
      {loadingError ? (
        <div className="fb-loading fb-error" aria-live="assertive">
          <span className="fb-error-icon">⚠️</span>
          <span className="fb-loading-text">{loadingError}</span>
        </div>
      ) : (
        <div className="fb-stage">
          <div
            className={`fb-book-3d${isPortrait ? " fb-portrait" : ""}`}
            style={{ width: "100%", height: pageSize.height }}
          >
            {pdf && (
              <HTMLFlipBook
                ref={bookRef}
                width={pageSize.width}
                height={pageSize.height}
                size="stretch"
                minWidth={Math.min(pageSize.width, 280)}
                maxWidth={pageSize.width}
                minHeight={Math.min(pageSize.height, 380)}
                maxHeight={pageSize.height}
                autoSize
                drawShadow
                flippingTime={800}
                usePortrait
                startZIndex={0}
                maxShadowOpacity={0.5}
                showCover
                mobileScrollSupport={false}
                clickEventForward
                useMouseEvents
                className="fb-flipbook"
                onInit={handleInit}
                onFlip={handleFlip}
                onChangeOrientation={handleChangeOrientation}
                onChangeState={handleChangeState}
              >
                {pages}
              </HTMLFlipBook>
            )}
          </div>
        </div>
      )}

      {!showBook && !loadingError && (
        <div className="fb-loading" aria-live="polite">
          <span className="fb-spinner" />
          <span className="fb-loading-text">Loading the magazine PDF…</span>
        </div>
      )}

      <FlipBookControls
        currentPage={currentPage}
        totalPages={totalPages}
        orientation={orientation}
        canPrev={canPrev && !isFlipping && ready}
        canNext={canNext && !isFlipping && ready}
        isFullscreen={isFullscreen}
        onPrev={goPrev}
        onNext={goNext}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
}
