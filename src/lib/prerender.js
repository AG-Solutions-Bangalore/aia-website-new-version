export const isBrowser = typeof window !== "undefined";

export function isReactSnapPrerender() {
  if (!isBrowser) return false;
  return /ReactSnap/i.test(window.navigator?.userAgent || "");
}

export function scheduleIdle(callback, { delay = 0, timeout = 2000 } = {}) {
  if (!isBrowser) return () => {};

  let idleId = null;
  const timerId = window.setTimeout(() => {
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(callback, { timeout });
      return;
    }

    callback();
  }, delay);

  return () => {
    window.clearTimeout(timerId);
    if (idleId !== null && "cancelIdleCallback" in window) {
      window.cancelIdleCallback(idleId);
    }
  };
}
