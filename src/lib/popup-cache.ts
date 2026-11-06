/**
 * @file src/lib/popup-cache.ts
 * @description Shared popup request cache used to start the popup API call as
 * early as possible and reuse the response across component remounts.
 *
 * WHY:
 * The popup component is lazy-loaded. If it starts its own request after the
 * lazy chunk resolves, the API round-trip is serialized behind the JS chunk
 * download. Prefetching from the lightweight `DeferredPopUp` wrapper lets the
 * chunk download and the popup API request run in parallel, so the popup can
 * open as soon as the page hydrates.
 *
 * This module intentionally uses native `fetch` (not axios) so importing it
 * from the app entry chunk does not pull the axios vendor chunk into the
 * critical path. Requests are cached in memory, deduplicated by slug, and
 * automatically evicted on failure so a later mount can retry.
 */

import { BASE_URL } from '@/api/base-url';

export interface PopupImageConfig {
  image_for?: string;
  image_url?: string;
}

export interface PopupRecord {
  popup_required?: string;
  popup_heading?: string;
  popup_image?: string;
  popup_image_alt?: string;
  [key: string]: unknown;
}

export interface PopupApiResponse {
  data?: PopupRecord;
  image_url?: PopupImageConfig[];
}

interface PopupCacheEntry {
  promise: Promise<PopupApiResponse>;
  timestamp: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000;
const popupCache = new Map<string, PopupCacheEntry>();

/**
 * Returns (and starts if needed) the popup payload request for a slug.
 * Concurrent callers share the same promise, and successful responses are
 * reused for a short TTL to keep client-side navigation instant.
 */
export function prefetchPopup(slug: string): Promise<PopupApiResponse> {
  const cached = popupCache.get(slug);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.promise;
  }

  const promise = fetch(
    `${BASE_URL}/api/getPopupbySlug/${encodeURIComponent(slug)}`,
    {
      headers: { Accept: 'application/json' },
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Popup request failed with status ${response.status}`);
      }
      return response.json() as Promise<PopupApiResponse>;
    })
    .catch((error) => {
      popupCache.delete(slug);
      throw error;
    });

  popupCache.set(slug, { promise, timestamp: Date.now() });
  return promise;
}
