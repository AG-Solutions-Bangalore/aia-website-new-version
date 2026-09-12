/**
 * ============================================================================
 * @file src/lib/prerender.ts
 * ============================================================================
 * 
 * WHY:
 * In a hybrid SSG + Client Hydrated React architecture, certain client-side
 * browser APIs (like `window`, `document`, `requestIdleCallback`) do not exist
 * during Node.js build-time pre-rendering. Furthermore, non-critical DOM elements
 * (like delayed modals, chatbots, or off-screen banners) should be deferred until
 * the main thread is idle to achieve perfect Core Web Vitals (INP, LCP, CLS).
 * 
 * WHAT:
 * This module provides environment-aware utilities:
 * 1. `isBrowser`: Safe boolean flag indicating if code is executing in a browser DOM.
 * 2. `isSSGPrerender`: Boolean check for Node.js build-time pre-rendering phase.
 * 3. `isReactSnapPrerender`: Legacy backwards-compatible shim retained to avoid
 *    breaking existing components that defer non-critical widgets during prerendering.
 * 4. `scheduleIdle`: Safe wrapper around `requestIdleCallback` with fallback to `setTimeout`
 *    and automatic cleanup cancellation to prevent memory leaks.
 * 
 * RESPONSIBILITY:
 * - Decouple browser-only operations from build-time server-side pre-rendering.
 * - Manage idle execution scheduling for heavy client widgets without degrading INP/TBT.
 * - Provide clean cancellation callbacks for React useEffect cleanup lifecycles.
 * 
 * DEPENDENCIES:
 * - Native browser Web APIs: `window`, `requestIdleCallback`, `setTimeout`, `clearTimeout`.
 * - Zero external npm dependencies.
 * ============================================================================
 */

export const isBrowser: boolean = typeof window !== 'undefined';

/**
 * Checks if the current execution context is Node.js build-time pre-rendering.
 */
export function isSSGPrerender(): boolean {
  return !isBrowser;
}

/**
 * Legacy compatibility shim for components previously checking ReactSnap.
 * In the modern SSG pipeline, this returns true during SSR to keep non-critical
 * components deferred, or checks user agent in browser if specified.
 */
export function isReactSnapPrerender(): boolean {
  if (!isBrowser) return false;
  return /ReactSnap/i.test(window.navigator?.userAgent || '');
}

export interface ScheduleIdleOptions {
  delay?: number;
  timeout?: number;
}

/**
 * Schedules non-critical work when the browser main thread is idle.
 * Safely falls back to setTimeout if requestIdleCallback is unsupported.
 * Returns a teardown function to cancel pending tasks on component unmount.
 * 
 * @param callback - Function to execute when idle
 * @param options - Configuration containing delay (ms) and timeout (ms)
 * @returns Cleanup function
 */
export function scheduleIdle(
  callback: () => void,
  { delay = 0, timeout = 2000 }: ScheduleIdleOptions = {}
): () => void {
  if (!isBrowser) return () => {};

  let idleId: number | null = null;
  const timerId = window.setTimeout(() => {
    if ('requestIdleCallback' in window) {
      idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number })
        .requestIdleCallback(callback, { timeout });
      return;
    }

    callback();
  }, delay);

  return () => {
    window.clearTimeout(timerId);
    if (idleId !== null && 'cancelIdleCallback' in window) {
      (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
    }
  };
}
