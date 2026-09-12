/**
 * @file src/prerender.tsx
 * @description Build-time static pre-rendering (SSG) worker module executed by `vitePrerenderPlugin`.
 *
 * @why
 * Web crawlers (Googlebot, Bingbot, social media scrapers) often time out before client-side
 * React hydration completes or fail to index lazy-loaded dynamic meta tags. Pre-rendering pages
 * at build time directly into flat HTML files (`dist/<route>/index.html`) guarantees:
 * 1. 0ms initial crawl response time.
 * 2. Instant First Contentful Paint (FCP) for end users.
 * 3. Immediate detection of title, description, canonical link, and JSON-LD schema without JS execution.
 *
 * @what
 * - Exported `prerender({ url })` function called by `vite-prerender-plugin`.
 * - Uses `renderToString` from `react-dom/server` with `StaticRouter` pointing to `url`.
 * - Strips redundant client-rendered head tags and injects canonical meta tags + single `@graph` JSON-LD.
 * - Extracts internal `<a href="...">` links via `vite-prerender-plugin/parse` and merges them with
 *   known static routes in `ROUTE_SEO` to crawl the full site tree.
 *
 * @responsibility
 * Server-side HTML string generation and static `<head>` element injection for build-time output.
 *
 * @dependencies
 * - react-dom/server: `renderToString`
 * - react-router: `StaticRouter`
 * - react-helmet-async: `HelmetProvider`
 * - vite-prerender-plugin/parse: HTML link extraction (`parseLinks`)
 * - @/routes/AppRoutes: Main application route tree
 * - @/config/site: `getCanonicalUrl`
 * - @/config/seoEngine: `createCompositeGraph`, `getSeoForRoute`, `ROUTE_SEO`
 */

import React from 'react';
import { getCanonicalUrl } from '@/config/site';
import { createCompositeGraph, getSeoForRoute, ROUTE_SEO } from '@/config/seoEngine';

export interface PrerenderData {
  url: string;
}

export interface PrerenderReturn {
  html: string;
  head: {
    lang: string;
    title: string;
    elements: Set<Record<string, unknown>>;
  };
  links: Set<string>;
  data: { url: string };
}

/**
 * Executes build-time pre-rendering for a single route URL.
 *
 * @param data - Target URL to pre-render
 * @returns Pre-rendered HTML, structured head elements, and discovered links
 */
export async function prerender(data: PrerenderData): Promise<PrerenderReturn> {
  const url = data.url || '/';
  const seo = getSeoForRoute(url);
  const canonical = getCanonicalUrl(seo.canonicalPath);

  const [{ renderToString }, { StaticRouter }, { HelmetProvider }] = await Promise.all([
    import('react-dom/server'),
    import('react-router'),
    import('react-helmet-async'),
  ]);
  const { default: AppRoutes } = await import('@/routes/AppRoutes');

  const helmetContext: Record<string, unknown> = {};

  const rawHtml = renderToString(
    React.createElement(
      HelmetProvider,
      { context: helmetContext },
      React.createElement(StaticRouter, { location: url }, React.createElement(AppRoutes)),
    ),
  );

  // Clean raw SSR artifacts so clean tags are injected deterministically into head
  const html = rawHtml
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<meta[^>]*>/gi, '')
    .replace(/<link[^>]*>/gi, '');

  const elements = new Set<Record<string, unknown>>([
    { type: 'meta', props: { name: 'description', content: seo.description } },
    { type: 'meta', props: { name: 'keywords', content: seo.keywords } },
    { type: 'link', props: { rel: 'canonical', href: canonical } },
    {
      type: 'meta',
      props: { name: 'robots', content: seo.noIndex ? 'noindex, nofollow' : 'index, follow' },
    },
    { type: 'meta', props: { property: 'og:title', content: seo.title } },
    { type: 'meta', props: { property: 'og:description', content: seo.description } },
    { type: 'meta', props: { property: 'og:url', content: canonical } },
    { type: 'meta', props: { property: 'og:type', content: 'website' } },
    { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
    { type: 'meta', props: { name: 'twitter:title', content: seo.title } },
    { type: 'meta', props: { name: 'twitter:description', content: seo.description } },
  ]);

  if (seo.schemas.length > 0) {
    elements.add({
      type: 'script',
      props: {
        type: 'application/ld+json',
        id: 'schema-jsonld',
        'data-rh': 'true',
      },
      children: JSON.stringify(createCompositeGraph(seo.schemas)),
    });
  }

  const { parseLinks } = await import('vite-prerender-plugin/parse');
  const discovered: string[] = parseLinks(html);

  return {
    html,
    head: {
      lang: 'en',
      title: seo.title,
      elements,
    },
    links: new Set<string>(['/', ...Object.keys(ROUTE_SEO), ...discovered]),
    data: { url },
  };
}
