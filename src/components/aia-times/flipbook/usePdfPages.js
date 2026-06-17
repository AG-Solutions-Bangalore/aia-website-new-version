import { useEffect, useRef, useState } from "react";
import { renderPdfPages } from "./PdfRenderer";

/**
 * React hook that loads a PDF, renders every page to a data-URL, and exposes
 * them as an array ready for the flipbook.
 *
 * Pages are rendered once and memoized — the hook won't re-render them if the
 * component re-renders; only a new `pdfSrc` triggers a fresh load.
 *
 * @param {string | null | undefined} pdfSrc – URL of the PDF (or null to idle).
 * @returns {{ pages: string[], loading: boolean, progress: number, error: Error | null, totalPages: number | null }}
 */
export function usePdfPages(pdfSrc) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  // Track the latest pdfSrc so stale renders can be discarded.
  const latestSrc = useRef(pdfSrc);

  useEffect(() => {
    latestSrc.current = pdfSrc;
  }, [pdfSrc]);

  useEffect(() => {
    if (!pdfSrc) {
      setLoading(false);
      setPages([]);
      setProgress(0);
      setError(null);
      setTotalPages(null);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      setProgress(0);
      setPages([]);

      try {
        const rendered = await renderPdfPages(pdfSrc, {
          scale: 2,
          onProgress(loaded, total) {
            if (!cancelled) {
              setProgress(Math.round((loaded / total) * 100));
              setTotalPages(total);
            }
          },
        });

        // Discard if the user navigated away or pdfSrc changed mid-load.
        if (cancelled || latestSrc.current !== pdfSrc) return;

        setPages(rendered);
      } catch (err) {
        if (!cancelled && latestSrc.current === pdfSrc) {
          setError(err);
        }
      } finally {
        if (!cancelled && latestSrc.current === pdfSrc) {
          setLoading(false);
          setProgress(100);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pdfSrc]);

  return { pages, loading, progress, error, totalPages };
}
