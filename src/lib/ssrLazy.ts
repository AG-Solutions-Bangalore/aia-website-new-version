/**
 * @file src/lib/ssrLazy.ts
 * @description SSR-safe wrapper around `React.lazy` for components that cannot
 * be imported in Node.js (e.g. Leaflet maps touching `window` at module scope).
 *
 * @why
 * `React.lazy(() => import('leaflet-map'))` evaluates the target module during
 * build-time pre-rendering. Leaflet reads `window` at module top-level, so the
 * dynamic import rejects in Node and the whole Suspense boundary degrades to
 * its skeleton fallback (see `⚠️ [SSG SSR warning]` build logs). Skipping the
 * import entirely on the server renders `null` for that island while keeping
 * every surrounding section intact — and browsers still lazy-load normally.
 *
 * @what
 * - Server (`typeof window === 'undefined'`): resolves instantly to a
 *   `() => null` component — the dynamic import never executes.
 * - Browser: identical behaviour to `React.lazy`.
 */

import React from 'react';

export function ssrLazy<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
): React.LazyExoticComponent<T> {
  return React.lazy(() => {
    if (typeof window === 'undefined') {
      const Empty = (() => null) as unknown as T;
      return Promise.resolve({ default: Empty });
    }
    return factory();
  });
}
