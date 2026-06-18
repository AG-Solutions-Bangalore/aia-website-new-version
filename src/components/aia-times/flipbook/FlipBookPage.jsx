import { forwardRef, memo, useEffect, useRef, useState } from "react";

/**
 * A single PDF-rendered flipbook page.
 *
 * Renders page content on an HTML5 `<canvas>` using `pdfjs-dist`.
 */
const FlipBookPageImpl = forwardRef(function FlipBookPage(props, ref) {
  const {
    pdf = null,
    pageNumber = 0,
    side = "right",
    alt = "Magazine page",
  } = props;

  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const renderTaskRef = useRef(null);

  // Render the PDF page to the canvas.
  useEffect(() => {
    if (!pdf || !pageNumber) return;
    let active = true;

    const renderPage = async () => {
      try {
        const page = await pdf.getPage(pageNumber);
        if (!active) return;

        // Use a high resolution scale for sharp text rendering.
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        // Cancel previous render task if active
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;

        if (active) {
          setLoaded(true);
        }
      } catch (err) {
        // Ignore task cancellation errors
        if (err.name !== "RenderingCancelledException") {
          console.error("Error rendering PDF page:", err);
        }
      }
    };

    renderPage();

    return () => {
      active = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdf, pageNumber]);

  return (
    <div ref={ref} className="fb-page-wrapper">
      <div className={`fb-page-inner fb-page-inner--${side}`} data-side={side}>
        {!loaded && <span className="fb-page-shimmer" aria-hidden="true" />}
        <canvas
          ref={canvasRef}
          className="fb-page-canvas"
          role="img"
          aria-label={`${alt}${pageNumber ? ` — page ${pageNumber}` : ""}`}
        />
      </div>
    </div>
  );
});

const FlipBookPage = memo(FlipBookPageImpl);
export default FlipBookPage;
