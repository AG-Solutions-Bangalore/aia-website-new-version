/**
 * @file src/components/SEOPageLayout.tsx
 * @description Bulletproof SEO page wrapper providing head meta tag synchronization via `react-helmet-async`
 * and single-script runtime JSON-LD deduplication.
 *
 * @why
 * In a React SPA, placing `<script type="application/ld+json">` inside `<Helmet>` causes severe
 * hydration duplicates: Helmet frequently injects a new `<script>` on route change without tearing
 * down previous tags, causing Google Search Console to flag "Duplicate schema" and "Multiple unlinked entities".
 * This component solves this by:
 * 1. Handling document `<title>`, meta descriptions, canonical `<link>`, OG, and Twitter tags through `<Helmet>`.
 * 2. Synchronizing the `@graph` JSON-LD payload into a dedicated `<script id="schema-jsonld">` using a
 *    targeted `useEffect` hook.
 * 3. Actively purging any duplicate or dangling JSON-LD scripts from `document.head`.
 *
 * @what
 * - `<SEOPageLayout seo={seo} structuredSchemas={schemas}>{children}</SEOPageLayout>`
 * - Injects dynamic title, description, keywords, canonical link, and OpenGraph/Twitter cards.
 * - Synchronizes the single `#schema-jsonld` script tag with the page's composite `@graph`.
 * - Removes stale or duplicate application/ld+json tags automatically.
 *
 * @responsibility
 * Component-level head management and client-side JSON-LD single-script deduplication.
 *
 * @dependencies
 * - react: Component lifecycle (`useEffect`)
 * - react-helmet-async: Thread-safe client-side `<head>` manager (`Helmet`)
 * - schema-dts: `Thing` type definition
 * - @/config/site: `getCanonicalUrl`
 * - @/config/seoEngine: `MasterSeoStructure`, `createCompositeGraph`
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { Thing } from 'schema-dts';
import { getCanonicalUrl } from '@/config/site';
import { type MasterSeoStructure, createCompositeGraph } from '@/config/seoEngine';

export interface ModularPageProps {
  seo: MasterSeoStructure;
  structuredSchemas?: Thing[];
  children: React.ReactNode;
}

export default function SEOPageLayout({
  seo,
  structuredSchemas = [],
  children,
}: ModularPageProps): React.JSX.Element {
  const finalCanonical = getCanonicalUrl(seo.canonicalPath);
  const pageGraphPayload =
    structuredSchemas.length > 0 ? createCompositeGraph(structuredSchemas) : null;

  React.useEffect(() => {
    if (!pageGraphPayload) return;
    const jsonStr = JSON.stringify(pageGraphPayload);
    const existing = document.getElementById('schema-jsonld') as HTMLScriptElement | null;

    if (existing) {
      if (existing.textContent !== jsonStr) {
        existing.textContent = jsonStr;
      }
    } else {
      const script = document.createElement('script');
      script.id = 'schema-jsonld';
      script.type = 'application/ld+json';
      script.textContent = jsonStr;
      document.head.appendChild(script);
    }

    // Deduplication safety guard: remove any conflicting or duplicate ld+json tags
    const allLdScripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    if (allLdScripts.length > 1) {
      for (let i = 1; i < allLdScripts.length; i++) {
        allLdScripts[i].remove();
      }
    }
  }, [pageGraphPayload]);

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={finalCanonical} />
        <meta name="robots" content={seo.noIndex ? 'noindex, nofollow' : 'index, follow'} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={finalCanonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
      </Helmet>
      {children}
    </>
  );
}
