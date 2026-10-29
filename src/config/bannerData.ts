/**
 * @file src/config/bannerData.ts
 * @description Build-time banner snapshot shared by the SSG prerenderer and the client hero.
 *
 * @why
 * `HomeHero` used to start from a hard-coded fallback slide and then replace it with the
 * API banner inside `useEffect`. That made the real LCP image undiscoverable until after
 * hydration + an API round-trip (~1.8s in Lighthouse), producing a 5.7s mobile LCP.
 * Fetching the banners once during `vite build`, rendering the real first slide into the
 * static HTML, and preloading it removes the late LCP candidate entirely.
 *
 * @what
 * - `loadBannerData()`: singleton build-time fetcher for every hero slug.
 * - `getBannerForSlug()`: synchronous lookup. During SSG it reads the build cache; in the
 *   browser it reads the per-route `window.__SSG_BANNERS__` snapshot injected by prerender.
 *
 * @responsibility
 * Keeping the server-rendered hero identical to the client's first hydration render.
 *
 * @dependencies
 * - @/api/base-url: `BASE_URL` constant
 */

import { BASE_URL } from '@/api/base-url';

export interface BannerSlide {
  id: number;
  imageUrl: string;
  link: string | null;
  alt: string;
}

export interface BannerAnnouncement {
  id: number;
  title: string | null;
  subtext: string | null;
  link: string | null;
}

export interface BannerSet {
  slides: BannerSlide[];
  announcements: BannerAnnouncement[];
}

export const BANNER_SLUGS = [
  'home',
  'about-aia',
  'cfe-curriculum',
  'cia-curriculum',
  'cia-challenge-curriculum',
  'cams',
  'cisa',
  'corporate-training',
  'cia-free-resources',
  'cams-free-resources',
  'cfe-free-resources',
  'cisa-free-resources',
] as const;

export const BANNER_ROUTE_SLUGS: Record<string, string> = {
  '/': 'home',
  '/about-aia': 'about-aia',
  '/cfe-curriculum': 'cfe-curriculum',
  '/cia-curriculum': 'cia-curriculum',
  '/cia-challenge-curriculum': 'cia-challenge-curriculum',
  '/cams': 'cams',
  '/cisa': 'cisa',
  '/corporate-training': 'corporate-training',
  '/cia-free-resources': 'cia-free-resources',
  '/cams-free-resources': 'cams-free-resources',
  '/cfe-free-resources': 'cfe-free-resources',
  '/cisa-free-resources': 'cisa-free-resources',
};

interface BannerApiItem {
  banner_image: string;
  banner_image_alt?: string;
  banner_link?: string | null;
  banner_text?: string | null;
  banner_sub_text?: string | null;
}

interface BannerApiResponse {
  data?: BannerApiItem[];
  image_url?: Array<{ image_for: string; image_url: string }>;
}

const bannerCache = new Map<string, BannerSet>();
let isLoaded = false;
let loadPromise: Promise<void> | null = null;

/**
 * Fetches every hero banner once at build time. Failures are non-fatal: the affected
 * route keeps using its hard-coded fallback slide.
 */
export async function loadBannerData(): Promise<void> {
  if (isLoaded) return;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    console.log('🔄 [SSG] Pre-fetching hero banners...');

    await Promise.all(
      BANNER_SLUGS.map(async (slug) => {
        try {
          const response = await fetch(`${BASE_URL}/api/getBanner/${slug}`, {
            headers: { Accept: 'application/json' },
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);

          const payload = (await response.json()) as BannerApiResponse;
          if (!payload?.data?.length || !payload.image_url?.length) return;

          const baseImageUrl =
            payload.image_url.find((item) => item.image_for === 'Banner')?.image_url || '';
          if (!baseImageUrl) return;

          const slides: BannerSlide[] = payload.data.map((banner, index) => ({
            id: index + 1,
            imageUrl: `${baseImageUrl}${banner.banner_image}`,
            link: banner.banner_link ?? null,
            alt: banner.banner_image_alt || '',
          }));

          const announcements: BannerAnnouncement[] = payload.data.map((banner, index) => ({
            id: index + 1,
            title: banner.banner_text ?? null,
            subtext: banner.banner_sub_text ?? null,
            link: banner.banner_link ?? null,
          }));

          if (slides.length > 0) {
            bannerCache.set(slug, { slides, announcements });
          }
        } catch (error) {
          console.warn(`⚠️ [SSG] Failed to fetch banner "${slug}":`, error);
        }
      }),
    );

    isLoaded = true;
    console.log(`✅ [SSG] Loaded ${bannerCache.size}/${BANNER_SLUGS.length} hero banners.`);
  })();

  return loadPromise;
}

/**
 * Synchronous banner lookup for the current route.
 *
 * On the server it resolves from the build-time cache so `HomeHero` renders the real
 * first banner into the static HTML. In the browser it resolves from the inline
 * `window.__SSG_BANNERS__` snapshot emitted for that route, guaranteeing hydration matches
 * the SSR markup before the client refresh request completes.
 */
export function getBannerForSlug(slug: string): BannerSet | null {
  if (typeof window !== 'undefined') {
    const snapshot = (window as unknown as { __SSG_BANNERS__?: Record<string, BannerSet> })
      .__SSG_BANNERS__;
    const fromSnapshot = snapshot?.[slug];
    if (fromSnapshot?.slides?.length) return fromSnapshot;
  }

  return bannerCache.get(slug) ?? null;
}
