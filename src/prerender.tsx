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
 * 4. 100% pre-rendered content for dynamic articles and student stories without empty loading skeletons.
 * 5. Web standard `renderToReadableStream` to fully resolve lazy imports (`React.lazy`) and Suspense boundaries.
 *
 * @what
 * - Loads dynamic blogs, stories, and testimonials once at build time.
 * - Injects pre-hydrated QueryClient state so dynamic routes render full article/story markup in SSR.
 * - Uses `renderToReadableStream` with `await stream.allReady` to ensure all `React.lazy` chunks resolve into the static HTML.
 * - Strips redundant client-rendered head tags and injects canonical meta tags + single `@graph` JSON-LD.
 * - Injects all dynamic URLs into the crawler queue alongside `ROUTE_SEO` static routes.
 *
 * @responsibility
 * Server-side HTML string generation and static `<head>` element injection for build-time output.
 *
 * @dependencies
 * - react-dom/server: `renderToReadableStream`
 * - react-router: `StaticRouter`
 * - react-helmet-async: `HelmetProvider`
 * - @tanstack/react-query: `QueryClient`
 * - vite-prerender-plugin/parse: HTML link extraction (`parseLinks`)
 * - @/routes/AppRoutes: Main application route tree
 * - @/config/site: `getCanonicalUrl`, `SITE_LOGO`
 * - @/config/seoEngine: `createCompositeGraph`, `getSeoForRoute`, `ROUTE_SEO`
 * - @/config/dynamicData: `loadDynamicData`, `getDynamicBlog`, `getDynamicStudentStory`, `getAllDynamicRouteUrls`
 */

import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import { getCanonicalUrl, SITE_LOGO } from '@/config/site';
import { getSeoForRoute, ROUTE_SEO } from '@/config/seoEngine';
import { createCompositeGraph } from './config/schemaExamples';
import {
  getAllDynamicRouteUrls,
  getDynamicBlog,
  getDynamicStudentStory,
  loadDynamicData,
} from './config/dynamicData';

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
 * Asynchronously renders a React element to string using Web standard `renderToReadableStream`.
 * 
 * WHY `renderToReadableStream` INSTEAD OF `renderToString`:
 * 1. Synchronous `renderToString` throws an error or aborts when encountering `React.lazy()` chunks
 *    and Suspense boundaries because dynamic imports are inherently asynchronous.
 * 2. Node's `renderToPipeableStream` depends on `node:stream` Writable instances which fail in browser-like
 *    build sandbox environments bundled by Vite plugins.
 * 3. `renderToReadableStream` is part of the official React DOM Server Web Stream API, supported universally
 *    across modern Node, Bun, and browser-like environments. Awaiting `stream.allReady` guarantees that all
 *    lazy chunks and data queries resolve completely before returning the final HTML string.
 */
async function renderToStringAsync(element: React.ReactNode): Promise<string> {
  const { renderToReadableStream } = await import('react-dom/server');
  const stream = await renderToReadableStream(element, {
    onError(err) {
      console.warn('⚠️ [SSG SSR warning]:', err);
    },
  });
  // Wait until all Suspense boundaries, lazy components, and promises resolve
  await stream.allReady;
  return await new Response(stream).text();
}

/**
 * Executes build-time pre-rendering for a single route URL.
 *
 * @param data - Target URL to pre-render (e.g., { url: '/' } or { url: '/blogs/cfe-module-1' })
 * @returns Pre-rendered HTML, structured head elements, and discovered links
 */
export async function prerender(data: PrerenderData): Promise<PrerenderReturn> {
  // 1. Ensure all dynamic data (blogs, student stories, testimonials) is loaded into memory before rendering
  await loadDynamicData();

  const url = data.url || '/';
  const cleanPath = url.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  const seo = getSeoForRoute(url);
  const canonical = getCanonicalUrl(seo.canonicalPath);

  /**
   * 2. Setup SSR QueryClient with pre-cached dynamic state.
   * 
   * WHY REACT QUERY PRE-HYDRATION IN SSR:
   * Normally in an SPA, pages fetch data inside client-side `useEffect` or `useQuery` after mounting in the browser.
   * In SSR/SSG, `useEffect` never runs! Without pre-populating the cache, components like `BlogDetails` or
   * `PassoutStoriesSlug` would render their initial `loading: true` state (empty skeleton screen).
   * By calling `queryClient.setQueryData(queryKey, data)` here, the component immediately finds data in its cache
   * on the first synchronous render pass, generating 100% complete article text and markup in static HTML.
   */
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  let ogImage = SITE_LOGO;

  // Pre-populate blog query cache for /blogs/:slug
  const blogMatch = cleanPath.match(/^\/blogs\/([^/]+)$/);
  if (blogMatch && blogMatch[1] !== 'course') {
    const slug = blogMatch[1];
    const blogData = getDynamicBlog(slug);
    if (blogData) {
      queryClient.setQueryData(['blog-details', slug], blogData);
      if (blogData.data?.blog_images) {
        ogImage = `https://aia.in.net/webapi/public/assets/images/blog_images/${blogData.data.blog_images}`;
      }
    }
  }

  // Pre-populate student story query cache for /passout-stories/:slug
  const passoutMatch = cleanPath.match(/^\/passout-stories\/([^/]+)$/);
  if (passoutMatch) {
    const slug = passoutMatch[1];
    const storyData = getDynamicStudentStory(slug);
    if (storyData) {
      queryClient.setQueryData(['passout-stories-slug', slug], storyData);
      if (storyData.data?.student_story_banner_image) {
        ogImage = `https://aia.in.net/webapi/public/assets/images/student_images/${storyData.data.student_story_banner_image}`;
      }
    }
  }

  // 3. Dynamically import server router and helmet provider to avoid bundling Node-only modules into client code
  const [{ StaticRouter }, { HelmetProvider }] = await Promise.all([
    import('react-router'),
    import('react-helmet-async'),
  ]);
  const { default: AppRoutes } = await import('@/routes/AppRoutes');

  const helmetContext: Record<string, unknown> = {};

  // 4. Render React tree to full HTML string via our asynchronous web stream renderer
  const rawHtml = await renderToStringAsync(
    React.createElement(
      HelmetProvider,
      { context: helmetContext },
      React.createElement(
        StaticRouter,
        { location: url },
        React.createElement(AppRoutes, { queryClient }),
      ),
    ),
  );

  /**
   * 5. Clean raw SSR artifacts from rendered body.
   * 
   * WHY HEAD CLEANUP:
   * React Helmet and subcomponents might inject tags into the component markup string during render.
   * If left alone, duplicate <title> or <meta> tags would appear in both <head> and <body>.
   * We strip any stray <title>, <meta>, <link>, or <script type="application/ld+json"> tags from the HTML body,
   * then inject the single, authoritative set of head elements through the plugin's `head.elements` below.
   */
  const html = rawHtml
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<meta[^>]*>/gi, '')
    .replace(/<link[^>]*>/gi, '');

  const isArticle = url.startsWith('/blogs/') && !url.includes('/course/');

  // 6. Build the authoritative head elements (title, canonical, robots, OpenGraph, Twitter)
  const elements = new Set<Record<string, unknown>>([
    { type: 'meta', props: { name: 'description', content: seo.description, 'data-rh': 'true' } },
    { type: 'meta', props: { name: 'keywords', content: seo.keywords, 'data-rh': 'true' } },
    { type: 'link', props: { rel: 'canonical', href: canonical, 'data-rh': 'true' } },
    {
      type: 'meta',
      props: { name: 'robots', content: seo.noIndex ? 'noindex, nofollow' : 'index, follow', 'data-rh': 'true' },
    },
    { type: 'meta', props: { property: 'og:title', content: seo.title, 'data-rh': 'true' } },
    { type: 'meta', props: { property: 'og:description', content: seo.description, 'data-rh': 'true' } },
    { type: 'meta', props: { property: 'og:url', content: canonical, 'data-rh': 'true' } },
    { type: 'meta', props: { property: 'og:type', content: isArticle ? 'article' : 'website', 'data-rh': 'true' } },
    { type: 'meta', props: { property: 'og:image', content: ogImage, 'data-rh': 'true' } },
    { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image', 'data-rh': 'true' } },
    { type: 'meta', props: { name: 'twitter:title', content: seo.title, 'data-rh': 'true' } },
    { type: 'meta', props: { name: 'twitter:description', content: seo.description, 'data-rh': 'true' } },
    { type: 'meta', props: { name: 'twitter:image', content: ogImage, 'data-rh': 'true' } },
  ]);

  // 7. Inject single unified Schema.org @graph JSON-LD script tag
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

  /**
   * 8. Discover child links and inject into crawler queue.
   * 
   * WHY YOU SEE `[from /]` IN THE BUILD LOG:
   * `vite-prerender-plugin` works as an automated website crawler. It starts by pre-rendering `/` (the home page).
   * When `/` finishes, the plugin inspects the `links` Set returned below.
   * Here, we provide:
   *   `new Set<string>(['/', ...Object.keys(ROUTE_SEO), ...dynamicUrls, ...discovered])`
   * Because the crawler first encountered all these static routes and dynamic blog/story URLs while processing `/`,
   * it tracks the referrer URL and logs `/blogs/<slug> [from /]` or `/passout-stories/<slug> [from /]`.
   * The `[from /]` label simply means: "This URL was discovered from the root page (`/`) link set."
   */
  const { parseLinks } = await import('vite-prerender-plugin/parse');
  const discovered: string[] = parseLinks(html);
  const dynamicUrls = getAllDynamicRouteUrls();

  return {
    html,
    head: {
      lang: 'en',
      title: seo.title,
      elements,
    },
    links: new Set<string>(['/', ...Object.keys(ROUTE_SEO), ...dynamicUrls, ...discovered]),
    data: { url },
  };
}
