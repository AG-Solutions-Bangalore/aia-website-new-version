# 🤖 Universal AI Agent Migration & Implementation Prompt (`prompt.md`)

> **File:** `docs/prompt.md`  
> **Target Audience:** Autonomous AI Coding Agents (Antigravity, Cursor, Claude, Copilot, Devin) & Senior Fullstack Engineers  
> **Language:** Hinglish (Hindi + English) with Production-Ready Code Templates & Architecture Diagrams  
> **Goal:** Kisi bhi existing ya naye React + Vite SPA project me ye exact **Enterprise SEO, Dynamic SSG Pre-rendering & Google Rich Results Architecture** autonomously implement karna without losing any data or breaking existing functionality.

---

## 🛑 AGENT INSTRUCTION & SYSTEM DIRECTIVE

```text
You are an expert Autonomous AI Senior Fullstack & SEO Engineer.
Your objective is to upgrade the current React + Vite codebase to a production-grade 
Enterprise SEO Architecture with Build-Time Static Site Generation (SSG), Type-Safe Schema.org 
Graph (@graph), Canonical URL management, Automated Sitemaps, and Single-Script Runtime Deduplication.

CRITICAL DIRECTIVES:
1. NEVER lose existing project metadata (titles, descriptions, routes, branding, business info).
   You MUST backup all existing data to `temp.md` before touching or deleting any code.
2. CLEANLY remove any legacy/conflicting SEO plugins (e.g. react-snap, react-helmet v5/v6 synchronous) 
   or duplicate hardcoded JSON-LD scripts.
3. HANDLE DYNAMIC CONTENT WITH SSR PRE-HYDRATION: Never emit empty loading skeletons. Fetch dynamic 
   catalogs (blogs, reviews, products) at build time and pre-hydrate React Query state during SSR.
4. PREVENT BUILD HANGING: Always apply the Node MessagePort unref patch in vite.config.ts.
5. USE WEB STREAMS: Never use synchronous renderToString with React.lazy; use Web Standard 
   renderToReadableStream with `await stream.allReady`.
6. STRICT SINGLE-SCRIPT SCHEMAS: Never place JSON-LD inside <Helmet>. Use the dedicated DOM hook in 
   SEOPageLayout.tsx to synchronize exactly ONE <script id="schema-jsonld"> in document.head.
7. ALWAYS USE `schema-dts` TYPES FOR ALL SCHEMAS: Never write untyped objects or loose `any` for Schema.org entities. Always import specific types (e.g. `BlogPosting`, `Review`, `Product`, `Course`, `Organization`, `WebPage`, `WebSite`, `FAQPage`, `BreadcrumbList`, `Graph`, `Thing`) from `'schema-dts'`. This prevents silent typos (like lowercase `@type` or misspelled property names), guarantees full IDE autocomplete, and ensures strict compile-time compliance.
8. STRICT ISO-8601 TIMEZONE ENFORCEMENT: Never output plain SQL dates (e.g., "2026-06-23" or "2026-01-01") for `datePublished` or `dateModified`. Always normalize timestamps via `formatIsoDateWithTimezone()` to include an explicit timezone offset (e.g., `+05:30` or `Z`) to prevent Google Rich Results "missing a timezone" and "Invalid datetime value" warnings.
9. RESTORE all backed-up data from `temp.md` into the new `ROUTE_SEO` engine.
10. VERIFY via automated build, local schema validator, and single-script runtime checks.
```

---

## 📋 Table of Phases
- [Phase 0: Backup Existing Metadata to `temp.md`](#phase-0-backup-existing-metadata-to-tempmd)
- [Phase 1: Cleanup Legacy / Conflicting Code & Dependencies](#phase-1-cleanup-legacy--conflicting-code--dependencies)
- [Phase 2: Install Core Dependencies](#phase-2-install-core-dependencies)
- [Phase 3: Core Architecture Implementation (Step-by-Step)](#phase-3-core-architecture-implementation)
  - [Step 3.1: Site Constants (`src/config/site.ts`)](#step-31-site-constants-srcconfigsitets)
  - [Step 3.2: Reusable Schema Factories (`src/config/schemaExamples.ts`)](#step-32-reusable-schema-factories-srcconfigschemaexamplests)
  - [Step 3.3: Build-Time Dynamic Data Cache (`src/config/dynamicData.ts`)](#step-33-build-time-dynamic-data-cache-srcconfigdynamicdatats)
  - [Step 3.4: Master SEO Engine & Route Resolver (`src/config/seoEngine.ts`)](#step-34-master-seo-engine--route-resolver-srcconfigseoenginets)
  - [Step 3.5: Bulletproof SEO Layout Wrapper (`src/components/SEOPageLayout.tsx`)](#step-35-bulletproof-seo-layout-wrapper-srccomponentsseopagelayouttsx)
  - [Step 3.6: Web Stream Static Pre-renderer (`src/prerender.tsx`)](#step-36-web-stream-static-pre-renderer-srcprerendertsx)
  - [Step 3.7: Decoupled Route Table (`src/routes/AppRoutes.tsx`)](#step-37-decoupled-route-table-srcroutesapproutestsx)
  - [Step 3.8: Client Entry Point Hydration (`src/main.tsx`)](#step-38-client-entry-point-hydration-srcmaintsx)
  - [Step 3.9: Event Loop Unblocker in `vite.config.ts`](#step-39-event-loop-unblocker-in-viteconfigts)
  - [Step 3.10: Automated Sitemap & Robots Script (`scripts/generateSitemap.ts`)](#step-310-automated-sitemap--robots-script-scriptsgeneratesitemapts)
  - [Step 3.11: Offline Schema Validator CLI (`scripts/validateSchemas.ts`)](#step-311-offline-schema-validator-cli-scriptsvalidateschemasts)
  - [Step 3.12: Clean Production Server Routing (`public/.htaccess`)](#step-312-clean-production-server-routing-publichtaccess)
- [Phase 4: Common Edge Cases, Migration Traps, & Bugs to Avoid](#phase-4-common-edge-cases-migration-traps--bugs-to-avoid)
- [Phase 5: Restore Data From `temp.md`](#phase-5-restore-data-from-tempmd)
- [Phase 6: Final Verification & Quality Gate](#phase-6-final-verification--quality-gate)

---

## Phase 0: Backup Existing Metadata to `temp.md`

> **MANDATORY FIRST STEP:** Purana koi bhi component, meta file, ya script delete/edit karne se pehle, repository ko scan karein aur saara metadata `temp.md` me save karein.

### Agent Action:
Ek temporary file banayein: `temp.md`. Project ke components, `index.html`, aur config files ko scan karke niche diya gaya data extract karein:

```markdown
# 📦 Temporary Project Metadata Backup (`temp.md`)

## 1. Brand & Site Info
- Site Name: [e.g. Academy of Internal Audit]
- Production Domain / Origin: [e.g. https://aia.in.net]
- Logo URL: [e.g. https://aia.in.net/logo.svg]
- Telephone / Phone: [e.g. +91-9876543210]
- Contact Email: [e.g. info@example.com]
- Physical Address: [Street, City, State, Postal Code, Country]
- Social Media Links: [Facebook, LinkedIn, Twitter, YouTube URLs]

## 2. Existing Routes & Metadata
| Route Path | Page Title | Meta Description | Keywords | Custom Schemas Found |
| :--- | :--- | :--- | :--- | :--- |
| `/` | ... | ... | ... | ... |
| `/about` | ... | ... | ... | ... |
| `/contact` | ... | ... | ... | ... |
| `/courses/*` | ... | ... | ... | ... |
| [Other Routes...] | ... | ... | ... | ... |

## 3. Existing Custom JSON-LD or Meta Tags
[Paste any existing schema blocks or hardcoded meta tags found in index.html, App.jsx, or page components]
```

---

## Phase 1: Cleanup Legacy / Conflicting Code & Dependencies

### Agent Action:
1. **Remove Conflicting & Obsolete Packages:**
   * Uninstall `react-snap` if present (`package.json` se `reactSnap` config block bhi remove karein — `react-snap` Puppeteer-based hai, unmaintained hai, aur React 18/19 par hang ho jata hai).
   * Uninstall synchronous `react-helmet` (v5/v6) — React 18/19 me memory leak aur hydration mismatches create karta hai. Replace it with `react-helmet-async`.
2. **Remove Hardcoded JSON-LD Scripts:**
   * Root `index.html` ya individual components me agar hardcoded `<script type="application/ld+json">` tags hain, unhe hata dein (hamara centralized `@graph` engine unhe replace karega).
3. **Clean Root `index.html` Head:**
   * Root `index.html` ke `<head>` ko clean rakhein: sirf viewport, charset aur favicon rehne dein. Static `<title>` ya `<meta name="description">` hata dein taaki SSG pre-renderer aur Helmet clean head tags inject kar sakein.
4. **Delete Legacy SEO Files & Folders:**
   * Agar project me `src/components/seo/`, `src/meta/`, `src/lib/schema.js`, `src/lib/seo.js`, ya `scripts/generate-sitemap.js` jaisi purani files hain, unhe safely delete karein.

---

## Phase 2: Install Core Dependencies

Run the package manager command:

```bash
# Using bun (or npm / pnpm / yarn)
bun add schema-dts react-helmet-async @tanstack/react-query
bun add -D vite-prerender-plugin node-html-parser
```

### Why these exact packages?
* `schema-dts`: Google-compliant Schema.org official TypeScript definitions (guarantees zero typos in `@type`, `@id`, or properties).
* `react-helmet-async`: Thread-safe, React 18/19-compatible client-side `<head>` manager.
* `@tanstack/react-query`: Pre-hydrates asynchronous server state during SSG and eliminates empty loading skeletons.
* `vite-prerender-plugin`: Fast build-time static pre-rendering (SSG) for 0ms crawler wait time.
* `node-html-parser`: Fast CLI HTML parser used by our automated CI schema validation test.

---

## Phase 3: Core Architecture Implementation

Niche di gayi files ko exact structure, error-handling, aur safety guards ke sath create/update karein:

---

### Step 3.1: Site Constants (`src/config/site.ts`)
```typescript
/**
 * @file src/config/site.ts
 * Single source of truth for canonical URLs, domain origin, and site branding.
 */
export const SITE_NAME = 'Academy of Internal Audit';
export const SITE_ORIGIN = 'https://aia.in.net';
export const SITE_LOGO = `${SITE_ORIGIN}/android-chrome-512x512.png`;
export const SITE_PHONE = '+91-9876543210';

/**
 * Deterministically formats any path into an absolute canonical URL without duplicate slashes.
 */
export function getCanonicalUrl(pathname: string): string {
  const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  return cleanPath ? `${SITE_ORIGIN}/${cleanPath}` : SITE_ORIGIN;
}
```

---

### Step 3.2: Reusable Schema Factories (`src/config/schemaExamples.ts`)
```typescript
/**
 * @file src/config/schemaExamples.ts
 * Type-safe Schema.org factory functions providing Rich Results compliant JSON-LD structures.
 *
 * CRITICAL RULE: ALWAYS import and use strict Schema.org types from 'schema-dts'.
 * Never write untyped objects or 'any'. Using 'schema-dts' provides 100% IDE autocomplete,
 * catches schema typos at compile time, and guarantees full compliance with Google Search.
 */
import type {
  BlogPosting,
  BreadcrumbList,
  Course,
  FAQPage,
  Graph,
  LocalBusiness,
  Organization,
  Product,
  Review,
  Thing,
  WebPage,
  WebSite,
} from 'schema-dts';
import { SITE_LOGO, SITE_NAME, SITE_ORIGIN, SITE_PHONE, getCanonicalUrl } from './site';

/**
 * Normalizes any date string (e.g. "2026-06-23", "2026-01-01", etc.)
 * into a strict ISO-8601 string containing explicit timezone information (+05:30 or Z).
 * Prevents Google Rich Results "missing a timezone" and "Invalid datetime value" warnings.
 */
export function formatIsoDateWithTimezone(dateStr?: string): string {
  const DEFAULT_DATE = '2026-01-01T00:00:00+05:30';
  if (!dateStr || typeof dateStr !== 'string' || !dateStr.trim()) return DEFAULT_DATE;
  const trimmed = dateStr.trim();
  if (trimmed.includes('T') && (trimmed.includes('+') || trimmed.endsWith('Z'))) return trimmed;
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return `${trimmed}T00:00:00+05:30`;
  const d = new Date(trimmed);
  return isNaN(d.getTime()) ? DEFAULT_DATE : d.toISOString();
}

export const organizationSchema: Thing = {
  '@type': 'Organization',
  '@id': `${SITE_ORIGIN}#organization`,
  name: SITE_NAME,
  url: SITE_ORIGIN,
  logo: { '@type': 'ImageObject', url: SITE_LOGO },
  telephone: SITE_PHONE,
  sameAs: [
    'https://www.facebook.com/example',
    'https://www.linkedin.com/company/example',
  ],
} as Thing;

export const localBusinessSchema: Thing = {
  '@type': 'LocalBusiness',
  '@id': `${SITE_ORIGIN}#localbusiness`,
  name: `${SITE_NAME} HQ`,
  image: SITE_LOGO,
  telephone: SITE_PHONE,
  priceRange: '$$',
  url: SITE_ORIGIN,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sector-81',
    addressLocality: 'Faridabad',
    addressRegion: 'Delhi - NCR',
    postalCode: '121002',
    addressCountry: 'IN',
  },
  parentOrganization: { '@id': `${SITE_ORIGIN}#organization` },
} as Thing;

export const websiteSchema: Thing = {
  '@type': 'WebSite',
  '@id': `${SITE_ORIGIN}#website`,
  url: SITE_ORIGIN,
  name: SITE_NAME,
  publisher: { '@id': `${SITE_ORIGIN}#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_ORIGIN}/blogs?s={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
} as Thing;

export function createWebPageSchema(canonicalPath: string, title: string, description: string): Thing {
  const url = getCanonicalUrl(canonicalPath);
  const schema: WebPage = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': `${SITE_ORIGIN}#website` },
    about: { '@id': `${SITE_ORIGIN}#organization` },
  };
  return schema as Thing;
}

export function createCourseSchema(course: { name: string; description: string; path: string }): Thing {
  const schema: Course = {
    '@type': 'Course',
    '@id': `${getCanonicalUrl(course.path)}#course`,
    name: course.name,
    description: course.description,
    provider: { '@id': `${SITE_ORIGIN}#organization` },
    url: getCanonicalUrl(course.path),
  };
  return schema as Thing;
}

export function createBlogPostingSchema(blog: {
  blog_slug: string;
  blog_heading: string;
  blog_short_description?: string;
  blog_meta_description?: string;
  blog_created?: string;
  blog_updated?: string;
  blog_images?: string;
  blog_course?: string;
}): Thing {
  const canonicalUrl = getCanonicalUrl(`/blogs/${blog.blog_slug}`);
  const schema: BlogPosting = {
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#blogposting`,
    headline: blog.blog_heading,
    description: blog.blog_meta_description || blog.blog_short_description || blog.blog_heading,
    image: blog.blog_images ? `https://aia.in.net/webapi/public/assets/images/blog_images/${blog.blog_images}` : SITE_LOGO,
    datePublished: formatIsoDateWithTimezone(blog.blog_created),
    dateModified: formatIsoDateWithTimezone(blog.blog_updated || blog.blog_created),
    mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
    author: { '@id': `${SITE_ORIGIN}#organization` },
    publisher: { '@id': `${SITE_ORIGIN}#organization` },
    articleSection: blog.blog_course || 'Professional Certification',
    inLanguage: 'en-US',
  };
  return schema as Thing;
}

export function createFaqSchema(faqs: Array<{ faq_que: string; faq_ans: string }>, canonicalPath: string): Thing {
  const canonicalUrl = getCanonicalUrl(canonicalPath);
  const schema: FAQPage = {
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.faq_que,
      acceptedAnswer: {
        '@type': 'Answer',
        // Strip WYSIWYG HTML tags so Googlebot receives clean crawlable text
        text: f.faq_ans.replace(/<[^>]*>?/gm, '').trim(),
      },
    })),
  };
  return schema as Thing;
}

export function createStudentReviewSchema(story: {
  student_slug: string;
  student_name: string;
  student_course?: string;
  student_story_short_description?: string;
  student_story_details?: string;
  student_story_date?: string;
}): Thing {
  const canonicalUrl = getCanonicalUrl(`/passout-stories/${story.student_slug}`);
  const schema: Review = {
    '@type': 'Review',
    '@id': `${canonicalUrl}#review`,
    itemReviewed: { '@id': `${SITE_ORIGIN}#organization` },
    author: { '@type': 'Person', name: story.student_name },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    reviewBody: (story.student_story_short_description || story.student_story_details?.replace(/<[^>]*>?/gm, '') || '').slice(0, 300),
    datePublished: formatIsoDateWithTimezone(story.student_story_date),
  };
  return schema as Thing;
}

export function createBreadcrumbSchema(items: Array<{ name: string; path: string }>, currentPath: string): Thing {
  const url = getCanonicalUrl(currentPath);
  const schema: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
  return schema as Thing;
}

export function createCompositeGraph(schemas: Thing[]): Graph {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}
```

---

### Step 3.3: Build-Time Dynamic Data Cache (`src/config/dynamicData.ts`)
```typescript
/**
 * @file src/config/dynamicData.ts
 * Build-time API fetcher and in-memory cache enabling 100% pre-rendered dynamic content.
 */
import { BASE_URL } from '@/api/base-url';

let dynamicBlogsMap = new Map<string, any>();
let dynamicStoriesMap = new Map<string, any>();
let dynamicCourseSlugs = new Set<string>();
let isLoaded = false;
let loadPromise: Promise<void> | null = null;

export async function loadDynamicData(): Promise<void> {
  if (isLoaded) return;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      console.log('🔄 [SSG] Pre-fetching dynamic data from API...');

      // 1. Fetch catalogs in parallel
      const [blogsRes, storiesRes] = await Promise.all([
        fetch(`${BASE_URL}/api/getAllBlogs`).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`${BASE_URL}/api/getStudentsStory`).then((r) => r.json()).catch(() => ({ data: [] })),
      ]);

      const blogList = blogsRes?.data || [];
      const storyList = storiesRes?.data || [];

      for (const story of storyList) {
        if (story.student_slug) dynamicStoriesMap.set(story.student_slug, { data: story, image_url: storiesRes.image_url || [] });
      }

      for (const blog of blogList) {
        if (blog.blog_course) dynamicCourseSlugs.add(blog.blog_course.trim().toLowerCase());
      }

      // 2. Fetch full blog details in polite batches of 15 (prevents API socket drops)
      const batchSize = 15;
      for (let i = 0; i < blogList.length; i += batchSize) {
        const batch = blogList.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (b: any) => {
            try {
              const res = await fetch(`${BASE_URL}/api/getBlogbySlug/${b.blog_slug}`).then((r) => r.json());
              dynamicBlogsMap.set(b.blog_slug, res || { data: b });
            } catch {
              dynamicBlogsMap.set(b.blog_slug, { data: b });
            }
          }),
        );
      }

      isLoaded = true;
      console.log(`✅ [SSG] Loaded ${dynamicBlogsMap.size} blogs and ${dynamicStoriesMap.size} student stories.`);
    } catch (err) {
      console.error('❌ [SSG] Error loading dynamic data:', err);
      isLoaded = true;
    }
  })();

  return loadPromise;
}

export function getDynamicBlog(slug: string) {
  return dynamicBlogsMap.get(slug);
}

export function getDynamicStudentStory(slug: string) {
  return dynamicStoriesMap.get(slug);
}

export function getAllDynamicRouteUrls(): string[] {
  const urls: string[] = [];
  for (const slug of dynamicBlogsMap.keys()) urls.push(`/blogs/${slug}`);
  for (const course of dynamicCourseSlugs) urls.push(`/blogs/course/${course}`);
  for (const slug of dynamicStoriesMap.keys()) urls.push(`/passout-stories/${slug}`);
  return urls;
}
```

---

### Step 3.4: Master SEO Engine & Route Resolver (`src/config/seoEngine.ts`)
```typescript
/**
 * @file src/config/seoEngine.ts
 * Master SEO dictionary and dynamic route parameter matcher.
 */
import type { Thing } from 'schema-dts';
import { SITE_NAME } from './site';
import {
  createBlogPostingSchema,
  createBreadcrumbSchema,
  createFaqSchema,
  createStudentReviewSchema,
  createWebPageSchema,
  organizationSchema,
  websiteSchema,
} from './schemaExamples';
import { getDynamicBlog, getDynamicStudentStory } from './dynamicData';

export interface RouteSeoEntry {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  noIndex?: boolean;
  schemas: Thing[];
}

export const ROUTE_SEO: Record<string, RouteSeoEntry> = {
  '/': {
    title: `${SITE_NAME} | Home`,
    description: 'Premier training institute for global certification courses.',
    keywords: 'CIA, CFE, CAMS training',
    canonicalPath: '/',
    schemas: [organizationSchema, websiteSchema, createWebPageSchema('/', 'Home', 'Description')],
  },
  // Static routes restored from temp.md
};

export function getSeoForRoute(url: string): RouteSeoEntry {
  const path = url.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';

  // 1. Static match
  if (ROUTE_SEO[path]) return ROUTE_SEO[path];

  // 2. Dynamic blog match (/blogs/:slug)
  const blogMatch = path.match(/^\/blogs\/([^/]+)$/);
  if (blogMatch && blogMatch[1] !== 'course') {
    const slug = blogMatch[1];
    const blogData = getDynamicBlog(slug);
    if (blogData && blogData.data) {
      const b = blogData.data;
      const title = b.blog_meta_title || `${b.blog_heading} | ${SITE_NAME}`;
      const description = b.blog_meta_description || b.blog_short_description;
      const schemas: Thing[] = [
        organizationSchema,
        websiteSchema,
        createWebPageSchema(path, title, description),
        createBlogPostingSchema(b),
      ];
      if (blogData.faq?.length > 0) schemas.push(createFaqSchema(blogData.faq, path));
      return { title, description, keywords: b.blog_meta_keywords || '', canonicalPath: path, schemas };
    }
  }

  // 3. Dynamic student story match (/passout-stories/:slug)
  const passoutMatch = path.match(/^\/passout-stories\/([^/]+)$/);
  if (passoutMatch) {
    const slug = passoutMatch[1];
    const storyData = getDynamicStudentStory(slug);
    if (storyData && storyData.data) {
      const s = storyData.data;
      const title = `${s.student_name} - ${s.student_course} Success Story | ${SITE_NAME}`;
      const description = s.student_story_short_description || `Read how ${s.student_name} cleared the exam.`;
      return {
        title,
        description,
        keywords: `${s.student_name} success story`,
        canonicalPath: path,
        schemas: [organizationSchema, createWebPageSchema(path, title, description), createStudentReviewSchema(s)],
      };
    }
  }

  // 4. Fallback 404
  return {
    title: `${SITE_NAME} | Page Not Found`,
    description: 'The requested page could not be found.',
    keywords: '404',
    canonicalPath: path,
    noIndex: true,
    schemas: [organizationSchema],
  };
}
```

---

### Step 3.5: Bulletproof SEO Layout Wrapper (`src/components/SEOPageLayout.tsx`)
```tsx
/**
 * @file src/components/SEOPageLayout.tsx
 * Bulletproof SEO page wrapper: <Helmet> handles meta/canonical; dedicated useEffect manages exactly ONE #schema-jsonld.
 */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { Thing } from 'schema-dts';
import { getCanonicalUrl } from '@/config/site';
import { type RouteSeoEntry } from '@/config/seoEngine';
import { createCompositeGraph } from '@/config/schemaExamples';

export default function SEOPageLayout({
  seo,
  structuredSchemas = [],
  children,
}: {
  seo: RouteSeoEntry;
  structuredSchemas?: Thing[];
  children: React.ReactNode;
}): React.JSX.Element {
  const finalCanonical = getCanonicalUrl(seo.canonicalPath);
  const pageGraphPayload = structuredSchemas.length > 0 ? createCompositeGraph(structuredSchemas) : null;

  React.useEffect(() => {
    if (!pageGraphPayload) return;
    const jsonStr = JSON.stringify(pageGraphPayload);
    const existing = document.getElementById('schema-jsonld') as HTMLScriptElement | null;

    if (existing) {
      if (existing.textContent !== jsonStr) existing.textContent = jsonStr;
    } else {
      const script = document.createElement('script');
      script.id = 'schema-jsonld';
      script.type = 'application/ld+json';
      script.textContent = jsonStr;
      document.head.appendChild(script);
    }

    // Safety deduplication: Purge any stray duplicate application/ld+json scripts
    const allLdScripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    if (allLdScripts.length > 1) {
      for (let i = 1; i < allLdScripts.length; i++) allLdScripts[i].remove();
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
```

---

### Step 3.6: Web Stream Static Pre-renderer (`src/prerender.tsx`)
```tsx
/**
 * @file src/prerender.tsx
 * Static site generator worker using Web Standard renderToReadableStream with React Query pre-hydration.
 */
import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import { getCanonicalUrl, SITE_LOGO } from '@/config/site';
import { getSeoForRoute, ROUTE_SEO } from '@/config/seoEngine';
import { createCompositeGraph } from '@/config/schemaExamples';
import { getAllDynamicRouteUrls, getDynamicBlog, getDynamicStudentStory, loadDynamicData } from '@/config/dynamicData';

async function renderToStringAsync(element: React.ReactNode): Promise<string> {
  const { renderToReadableStream } = await import('react-dom/server');
  const stream = await renderToReadableStream(element, {
    onError(err) {
      console.warn('⚠️ [SSG SSR warning]:', err);
    },
  });
  // Await stream.allReady to guarantee all React.lazy chunks and Suspense boundaries resolve
  await stream.allReady;
  return await new Response(stream).text();
}

export async function prerender(data: { url: string }) {
  await loadDynamicData();
  const url = data.url || '/';
  const cleanPath = url.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  const seo = getSeoForRoute(url);
  const canonical = getCanonicalUrl(seo.canonicalPath);

  // Setup SSR QueryClient with pre-cached dynamic state so pages emit full HTML instead of skeletons
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  const blogMatch = cleanPath.match(/^\/blogs\/([^/]+)$/);
  if (blogMatch && blogMatch[1] !== 'course') {
    const slug = blogMatch[1];
    const blogData = getDynamicBlog(slug);
    if (blogData) queryClient.setQueryData(['blog-details', slug], blogData);
  }

  const passoutMatch = cleanPath.match(/^\/passout-stories\/([^/]+)$/);
  if (passoutMatch) {
    const slug = passoutMatch[1];
    const storyData = getDynamicStudentStory(slug);
    if (storyData) queryClient.setQueryData(['passout-stories-slug', slug], storyData);
  }

  const [{ StaticRouter }, { HelmetProvider }] = await Promise.all([
    import('react-router'),
    import('react-helmet-async'),
  ]);
  const { default: AppRoutes } = await import('@/routes/AppRoutes');

  const rawHtml = await renderToStringAsync(
    React.createElement(
      HelmetProvider,
      {},
      React.createElement(StaticRouter, { location: url }, React.createElement(AppRoutes, { queryClient })),
    ),
  );

  // Strip raw SSR artifacts from body
  const html = rawHtml
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<meta[^>]*>/gi, '')
    .replace(/<link[^>]*>/gi, '');

  const elements = new Set<Record<string, unknown>>([
    { type: 'meta', props: { name: 'description', content: seo.description } },
    { type: 'meta', props: { name: 'keywords', content: seo.keywords } },
    { type: 'link', props: { rel: 'canonical', href: canonical } },
    { type: 'meta', props: { property: 'og:title', content: seo.title } },
    { type: 'meta', props: { property: 'og:description', content: seo.description } },
    { type: 'meta', props: { property: 'og:url', content: canonical } },
    { type: 'meta', props: { property: 'og:type', content: 'website' } },
  ]);

  if (seo.schemas.length > 0) {
    elements.add({
      type: 'script',
      props: { type: 'application/ld+json', id: 'schema-jsonld', 'data-rh': 'true' },
      children: JSON.stringify(createCompositeGraph(seo.schemas)),
    });
  }

  const { parseLinks } = await import('vite-prerender-plugin/parse');
  const dynamicUrls = getAllDynamicRouteUrls();

  return {
    html,
    head: { lang: 'en', title: seo.title, elements },
    // Passing dynamicUrls here causes the crawler to discover and log them as [from /]
    links: new Set<string>(['/', ...Object.keys(ROUTE_SEO), ...dynamicUrls, ...parseLinks(html)]),
    data: { url },
  };
}
```

---

### Step 3.7: Decoupled Route Table (`src/routes/AppRoutes.tsx`)
```tsx
import React, { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '@/layout/Layout';
import SEOPageLayout from '@/components/SEOPageLayout';
import { getSeoForRoute } from '@/config/seoEngine';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Home = lazy(() => import('@/pages/Home/Home'));
const BlogDetails = lazy(() => import('@/pages/Blog/blog-details'));

function PageSEO({ path, children }: { path?: string; children: React.ReactNode }) {
  const location = useLocation();
  const currentPath = path || location.pathname;
  const seo = getSeoForRoute(currentPath);
  return (
    <SEOPageLayout seo={seo} structuredSchemas={seo.schemas}>
      <Suspense fallback={null}>{children}</Suspense>
    </SEOPageLayout>
  );
}

export default function AppRoutes({ queryClient: initialQueryClient }: { queryClient?: QueryClient } = {}) {
  const [queryClient] = React.useState(() => initialQueryClient || new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path="/" element={<PageSEO path="/"><Home /></PageSEO>} />
          <Route path="/blogs/:id" element={<PageSEO><BlogDetails /></PageSEO>} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
}
```

---

### Step 3.8: Client Entry Point Hydration (`src/main.tsx`)
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import '@/index.css';

const containerElement = document.getElementById('root') as HTMLElement;

if (containerElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    containerElement,
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>,
  );
} else {
  ReactDOM.createRoot(containerElement).render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>,
  );
}
```

---

### Step 3.9: Event Loop Unblocker in `vite.config.ts`
> ⚠️ **CRITICAL VITE SCHEDULER FIX:** React 18/19 keeps a Node `MessagePort` open, causing Vite builds to hang indefinitely. Wrap `MessagePort.prototype.onmessage` as shown below:

```typescript
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';
import { MessagePort } from 'node:worker_threads';

// CRITICAL EVENT-LOOP UNBLOCK FIX
if (MessagePort && MessagePort.prototype) {
  const origOn = Object.getOwnPropertyDescriptor(MessagePort.prototype, 'onmessage');
  if (origOn && origOn.set) {
    Object.defineProperty(MessagePort.prototype, 'onmessage', {
      set(fn) {
        origOn.set!.call(this, fn);
        if (fn && typeof (this as any).unref === 'function') {
          (this as any).unref();
        }
      },
      get() {
        return origOn.get?.call(this);
      },
      configurable: true,
      enumerable: true,
    });
  }
}

export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      prerenderScript: path.resolve(__dirname, 'src/prerender.tsx'),
      renderTarget: '#root',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

### Step 3.10: Automated Sitemap & Robots Script (`scripts/generateSitemap.ts`)
```typescript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE_ORIGIN } from '../src/config/site';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');

function getHtmlFiles(dir: string, baseDir: string = dir): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      results = results.concat(getHtmlFiles(filePath, baseDir));
    } else if (file === 'index.html') {
      const rel = path.relative(baseDir, filePath).replace(/\\/g, '/').replace(/index\.html$/, '');
      results.push(rel === '' ? '/' : `/${rel.replace(/\/$/, '')}`);
    }
  }
  return results;
}

function getPriority(route: string) {
  if (route === '/') return { priority: '1.0', changefreq: 'daily' };
  if (route.startsWith('/blogs')) return { priority: '0.8', changefreq: 'weekly' };
  if (route.startsWith('/passout-stories')) return { priority: '0.7', changefreq: 'monthly' };
  return { priority: '0.6', changefreq: 'weekly' };
}

const routes = getHtmlFiles(distDir).sort();
const today = new Date().toISOString().split('T')[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const { priority, changefreq } = getPriority(route);
    return `  <url>
    <loc>${SITE_ORIGIN}${route === '/' ? '' : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml.trim(), 'utf8');
if (fs.existsSync(publicDir)) fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml.trim(), 'utf8');

const robotsTxt = `User-agent: *\nAllow: /\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt.trim(), 'utf8');
if (fs.existsSync(publicDir)) fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt.trim(), 'utf8');

console.log(`✅ [Sitemap Generator] Generated sitemap.xml with ${routes.length} pre-rendered URLs.`);
```

---

### Step 3.11: Offline Schema Validator CLI (`scripts/validateSchemas.ts`)
```typescript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'node-html-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

function findHtmlFiles(dir: string): string[] {
  let files: string[] = [];
  if (!fs.existsSync(dir)) return files;
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) files = files.concat(findHtmlFiles(fullPath));
    else if (item.endsWith('.html')) files.push(fullPath);
  }
  return files;
}

const htmlFiles = findHtmlFiles(distDir);
let hasError = false;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const root = parse(content);
  const scripts = root.querySelectorAll('script[type="application/ld+json"]');

  if (scripts.length === 0) {
    console.error(`❌ [${path.relative(distDir, file)}] Missing JSON-LD script!`);
    hasError = true;
  } else if (scripts.length > 1) {
    console.error(`❌ [${path.relative(distDir, file)}] DUPLICATE SCRIPTS FOUND (${scripts.length})!`);
    hasError = true;
  } else {
    try {
      const json = JSON.parse(scripts[0].text);
      if (!json['@context'] || !json['@graph']) {
        console.error(`❌ [${path.relative(distDir, file)}] Missing @context or @graph!`);
        hasError = true;
      } else {
        // Validate Google Rich Results datetime rules (strict ISO 8601 with timezone offset)
        for (const item of json['@graph']) {
          if (item.datePublished) {
            const hasTz = item.datePublished.includes('T') && (item.datePublished.includes('+') || item.datePublished.endsWith('Z'));
            if (!hasTz || isNaN(new Date(item.datePublished).getTime())) {
              console.error(`❌ [${path.relative(distDir, file)}] datePublished "${item.datePublished}" missing timezone or invalid ISO!`);
              hasError = true;
            }
          }
          if (item.dateModified) {
            const hasTz = item.dateModified.includes('T') && (item.dateModified.includes('+') || item.dateModified.endsWith('Z'));
            if (!hasTz || isNaN(new Date(item.dateModified).getTime())) {
              console.error(`❌ [${path.relative(distDir, file)}] dateModified "${item.dateModified}" missing timezone or invalid ISO!`);
              hasError = true;
            }
          }
        }
      }
    } catch {
      console.error(`❌ [${path.relative(distDir, file)}] Malformed JSON-LD!`);
      hasError = true;
    }
  }
}

if (hasError) process.exit(1);
console.log(`🎉 Success! All ${htmlFiles.length} HTML schemas passed validation.`);
```

---

### Step 3.12: Clean Production Server Routing (`public/.htaccess`)
```apache
Options -MultiViews

<IfModule mod_rewrite.c>
RewriteEngine On

# Canonical HTTPS & Host Enforcement
RewriteCond %{HTTPS} !=on [OR]
RewriteCond %{HTTP_HOST} ^www\.aia\.in\.net$ [NC]
RewriteRule ^ https://aia.in.net%{REQUEST_URI} [R=301,L]

# Directory Trailing Slash
RewriteCond %{REQUEST_URI} !^/webapi/ [NC]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !/$
RewriteCond %{REQUEST_URI} !\.[^/]+$
RewriteRule ^(.+)$ /$1/ [R=301,L]

# Serve Pre-rendered Static HTML (0ms response time)
RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
RewriteRule ^(.*)$ /$1/index.html [L]

# SPA Fallback for Unrendered Dynamic Routes
RewriteCond %{REQUEST_URI} !^/webapi/ [NC]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
</IfModule>
```

---

## Phase 4: Common Edge Cases, Migration Traps, & Bugs to Avoid

| Bug / Edge Case | Root Cause | Permanent Solution |
| :--- | :--- | :--- |
| **Vite build hangs indefinitely** | React 18/19 scheduler uses Node `MessagePort`, which keeps the event loop alive unless unreferenced. | Apply the `MessagePort.prototype.onmessage` `.unref()` patch in `vite.config.ts`. |
| **`renderToString` fails on `React.lazy()`** | Synchronous `renderToString` cannot await code-split chunks or dynamic imports. | Use Web Standard `renderToReadableStream` from `react-dom/server` + `await stream.allReady`. |
| **Dynamic pages emit empty loading skeletons** | Client-side `useEffect` never runs in SSR. | Upgrade to `@tanstack/react-query` (`useQuery`), fetch data at build time, and pre-hydrate `queryClient.setQueryData()` in `prerender.tsx`. |
| **Duplicate `<script>` tags on route change** | Placing JSON-LD inside `<Helmet>` appends scripts without tearing down old ones. | Keep `<Helmet>` for meta only. Use a dedicated `useEffect` in `SEOPageLayout.tsx` to sync `#schema-jsonld`. |
| **Schema typos & missing properties** | Writing untyped raw JSON objects or loose `any` allows typos (e.g. `@type: "blogposting"` or invalid Google properties) to fail silently. | ALWAYS import and use strict Schema.org types from `'schema-dts'` (`BlogPosting`, `Review`, `Product`, `Course`, `FAQPage`, etc.) for compile-time safety and 100% IDE autocomplete. |
| **Google Rich Results warning: "missing a timezone"** | Passing plain SQL date strings like "2026-06-23" or fallback "2026-01-01" without ISO-8601 timezone offset triggers 4 non-critical warnings. | Normalize all timestamps with `formatIsoDateWithTimezone()` to output `YYYY-MM-DDTHH:mm:ss+05:30` (or `Z`) and audit via `scripts/validateSchemas.ts`. |
| **Why `[from /]` appears in build logs** | `vite-prerender-plugin` is a crawler discovering links from the root `/` seed. | Normal behavior indicating link discovery provenance. |
| **"Canonicalised" Red Warning in SEO Extensions (Trailing Slash Mismatch)** | Internal links open URLs with trailing slash (e.g. `/blogs/slug/`), while the canonical tag enforces non-trailing slash (`/blogs/slug`). This mismatch causes SEO tools (e.g. Detailed SEO) to flag "Canonicalised" instead of "Self-Canonical". | Google Search Central strictly enforces consistency across Sitemap, Canonical, and Internal links. Standardize all internal links (`<a>`, `window.open`, `navigate`), sitemaps, and canonical tags to clean non-trailing slash format (`/blogs/slug`), ensuring 100% "Self-Canonical" green status. |
| **Obsolete `.htaccess` redirect bloat** | Manually writing 50+ individual rewrite rules for old blogs in `.htaccess`. | Remove redundant rules. React Router handles them on the frontend, and modern hosts like Vercel don't use `.htaccess`. |

---

## Phase 5: Restore Data From `temp.md`

1. Open `temp.md`.
2. Copy the backed-up **Brand Name**, **Domain Origin**, and **Logo** into `src/config/site.ts`.
3. Map each page's backed-up `title`, `description`, and `keywords` into `ROUTE_SEO` in `src/config/seoEngine.ts`.
4. Wrap every page in `<PageSEO>` inside `AppRoutes.tsx`.
5. **Delete `temp.md`** only when `bun run build` and `bun run test:schema` succeed!

---

## Phase 6: Final Verification & Quality Gate

Run these commands to verify the migration:

```bash
# 1. Typecheck the entire codebase (zero errors required)
bun x tsc --noEmit

# 2. Build for production (compiles assets, runs SSG pre-rendering, generates sitemap & robots.txt)
bun run build

# 3. Audit all generated HTML files for valid Schema.org graphs
bun run test:schema
```

### Final Acceptance Criteria:
* [x] `bun run build` compiles with 0 errors and generates flat HTML files in `dist/`.
* [x] `bun run test:schema` prints `🎉 Success! All HTML schemas passed validation` with 0 duplicates.
* [x] Browser DOM evaluation has exactly 1 script:  
  `document.querySelectorAll('script[type="application/ld+json"]').length === 1`
* [x] Google Rich Results test confirms 0 errors and detected `BlogPosting`, `FAQPage`, `Review`, `Course`, and `Organization` entities.
