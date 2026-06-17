import { forwardRef, memo, useEffect, useState } from "react";

/**
 * A single flipbook page.
 *
 * `react-pageflip` clones each child and attaches a DOM ref to it, so the
 * outer element here MUST be a real DOM node (a <div>) that forwards its ref.
 * We therefore wrap in forwardRef (memo alone would strip the ref).
 *
 * Image loading + multi-source fallback are handled inline (rather than via
 * SourceFallbackImage) so we get precise onLoad/onError control and a clean
 * per-page loading shimmer. Pages render once and are memoized — only the
 * page whose image finishes loading re-renders; siblings are untouched
 * during a flip.
 *
 * `side` ("left" | "right") drives the inner gutter/spine shadow so a
 * two-page spread reads like a real magazine. In single-page (portrait)
 * mode the parent wrapper drops the gutter shadow.
 */
const FlipBookPageImpl = forwardRef(function FlipBookPage(props, ref) {
  const {
    sources = [],
    alt = "Magazine page",
    side = "right",
    number = 0,
  } = props;

  const [sourceIndex, setSourceIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const currentSrc = sources[sourceIndex];

  // Reset when the source list changes (e.g. different magazine).
  useEffect(() => {
    setSourceIndex(0);
    setLoaded(false);
  }, [sources]);

  // No more candidate sources to try — stop showing the shimmer.
  useEffect(() => {
    if (!currentSrc) setLoaded(true);
  }, [currentSrc]);

  return (
    <div ref={ref} className="fb-page-wrapper">
      <div className={`fb-page-inner fb-page-inner--${side}`} data-side={side}>
        {!loaded && <span className="fb-page-shimmer" aria-hidden="true" />}
        {currentSrc && (
          <img
            key={currentSrc}
            src={currentSrc}
            alt={`${alt}${number ? ` — page ${number}` : ""}`}
            className="fb-page-img"
            loading="eager"
            decoding="async"
            draggable={false}
            onLoad={() => setLoaded(true)}
            onError={() => {
              // Try the next candidate source; if none remain, hide shimmer.
              setSourceIndex((i) => i + 1);
            }}
          />
        )}
      </div>
    </div>
  );
});

const FlipBookPage = memo(FlipBookPageImpl);
export default FlipBookPage;
