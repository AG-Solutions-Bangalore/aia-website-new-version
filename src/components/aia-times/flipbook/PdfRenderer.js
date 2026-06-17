import * as pdfjsLib from "pdfjs-dist";

// Vite resolves ?url to the on-disk asset URL, which the Web Worker can load.
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

/**
 * Render every page of a PDF into an array of data-URL strings.
 *
 * Each page is rendered at `scale` (default 2) onto a canvas, then exported
 * as a PNG data-URL so it can be fed straight into an <img> for the flipbook.
 *
 * @param {string}   src   – URL or data-URL of the PDF.
 * @param {object}   [opts]
 * @param {number}   [opts.scale=2]             Device-pixel ratio for rendering.
 * @param {(n:number, t:number) => void} [opts.onProgress] Called with (loaded, total).
 * @returns {Promise<string[]>} Array of data-URLs, one per page.
 */
export async function renderPdfPages(src, { scale = 2, onProgress } = {}) {
  const loadingTask = pdfjsLib.getDocument(src);
  const pdf = await loadingTask.promise;
  const totalPages = pdf.numPages;
  const pages = new Array(totalPages);

  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);

    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;

    // Export as PNG data-URL so the flipbook can use a plain <img>.
    pages[i - 1] = canvas.toDataURL("image/png");

    // Release the page resources promptly.
    page.cleanup();

    onProgress?.(i, totalPages);
  }

  return pages;
}
