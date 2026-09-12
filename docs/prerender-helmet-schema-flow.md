# Pre-render, Helmet & Single-Script Schema Architecture (`prerender-helmet-schema-flow.md`)

> **Project:** Academy of Internal Audit (`aia-website`)  
> **Topic:** Deep-dive technical explanation of how Build-Time Pre-rendering (`prerender.tsx`), Head Meta Management (`react-helmet-async`), and Single-Script Schema.org Graphs (`#schema-jsonld`) interact without duplicate tags or hydration conflicts.

---

## 1. Executive Problem Statement: Why Traditional Helmet Fails for JSON-LD

In a standard React Single Page Application (SPA), developers frequently write:

```tsx
// ❌ ANTI-PATTERN: DO NOT DO THIS!
<Helmet>
  <title>{pageTitle}</title>
  <meta name="description" content={description} />
  <script type="application/ld+json">
    {JSON.stringify(schemaData)}
  </script>
</Helmet>
```

### Why Placing JSON-LD Inside `<Helmet>` Causes Severe SEO Bugs:
1. **Hydration Duplication on Route Transitions:**  
   `react-helmet` (and `react-helmet-async`) handles `<title>` and `<meta>` tags by replacing their content when attributes match. However, with `<script>` tags, Helmet frequently appends a **new** `<script>` element to `document.head` on route transition without tearing down the previous page's script.
2. **"Multiple Unlinked Entities" Google Search Console Warning:**  
   As the user navigates from Home $\rightarrow$ Courses $\rightarrow$ Blog, the `<head>` accumulates 3, 4, or 5 conflicting `<script type="application/ld+json">` tags simultaneously. Search crawlers flag duplicate `Organization`, `WebSite`, and broken `@id` references.
3. **SSR Body Artifact Pollution:**  
   During static server-side rendering, if components render Helmet tags inside the body, the HTML body can end up containing duplicated `<title>` and `<meta>` tags in both the `<head>` and inside `<body>`.

---

## 2. The Solution: The Two-Tiered Separation of Concerns

To eliminate duplicates permanently, we enforce a strict separation of concerns:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SEO RESPONSIBILITY SPLIT                        │
├───────────────────────────────────┬────────────────────────────────────┤
│         react-helmet-async        │      Dedicated DOM Effect Sync     │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Document <title>                │ • EXACTLY ONE <script> in <head>   │
│ • <meta name="description">       │ • id="schema-jsonld"               │
│ • <meta name="keywords">          │ • type="application/ld+json"       │
│ • <link rel="canonical">          │ • Encapsulates the entire @graph   │
│ • OpenGraph (og:title, og:image)  │ • Purges stray or duplicate scripts│
│ • Twitter Cards                   │ • Synchronizes on every navigation │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 3. End-to-End Architectural Trace

```mermaid
sequenceDiagram
    autonumber
    participant Crawler as Web Crawler (Googlebot)
    participant Server as Build Output / Static Host
    participant Prerender as src/prerender.tsx
    participant SSR as renderToReadableStream
    participant Browser as Browser Window (User)
    participant Layout as SEOPageLayout.tsx
    participant DOM as document.head

    Note over Crawler,Prerender: Step A: Build-Time Static Site Generation (SSG)
    Prerender->>SSR: Render React tree with StaticRouter & HelmetProvider
    SSR-->>Prerender: Return raw HTML string
    Prerender->>Prerender: Strip raw SSR tags from body (.replace(/<title.../gi, ''))
    Prerender->>Prerender: Inject single <script id="schema-jsonld"> into head.elements
    Prerender-->>Server: Output dist/<route>/index.html

    Note over Crawler,Server: Step B: Zero-JS Initial Crawl / Request
    Crawler->>Server: GET /blogs/cfe-module-1
    Server-->>Crawler: 200 OK with Flat HTML (Complete Article + Single JSON-LD)
    Note over Crawler: Crawler immediately indexes title, canonical, and @graph (0ms FCP)

    Note over Browser,DOM: Step C: Client Hydration & Route Change
    Browser->>Server: GET /blogs/cfe-module-1
    Server-->>Browser: Complete HTML
    Browser->>Browser: ReactDOM.hydrateRoot()
    Browser->>Layout: User clicks internal link to /cams
    Layout->>DOM: Helmet updates <title> and <meta name="description">
    Layout->>DOM: useEffect updates textContent of #schema-jsonld
    Layout->>DOM: Safety cleanup removes any extra application/ld+json scripts
    Note over DOM: Exactly 1 #schema-jsonld remains in document.head
```

---

## 4. Implementation Deep-Dive

### A. Build-Time Pre-rendering ([src/prerender.tsx](file:///d:/JOB_PROJECTS/igli/src/prerender.tsx))

During `vite build`, `prerender({ url })` performs three critical safety operations:

#### 1. Asynchronous Stream Rendering with Lazy Resolution:
```typescript
async function renderToStringAsync(element: React.ReactNode): Promise<string> {
  const { renderToReadableStream } = await import('react-dom/server');
  const stream = await renderToReadableStream(element, {
    onError(err) {
      console.warn('⚠️ [SSG SSR warning]:', err);
    },
  });
  // Await stream.allReady to guarantee all React.lazy() imports and Suspense boundaries resolve
  await stream.allReady;
  return await new Response(stream).text();
}
```

#### 2. Body Artifact Sanitization:
```typescript
// Strip raw tags emitted inside the body during component rendering
const html = rawHtml
  .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
  .replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<meta[^>]*>/gi, '')
  .replace(/<link[^>]*>/gi, '');
```

#### 3. Deterministic Head & Schema Injection:
```typescript
// Authoritative head elements
const elements = new Set<Record<string, unknown>>([
  { type: 'meta', props: { name: 'description', content: seo.description } },
  { type: 'link', props: { rel: 'canonical', href: canonical } },
  // ... OpenGraph and Twitter tags
]);

// Inject single unified @graph script
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
```

---

### B. Client-Side Runtime Deduplication ([src/components/SEOPageLayout.tsx](file:///d:/JOB_PROJECTS/igli/src/components/SEOPageLayout.tsx))

In the browser, every page component is wrapped in `<SEOPageLayout>`:

```tsx
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

    // 1. In-place update of existing script tag
    if (existing) {
      if (existing.textContent !== jsonStr) {
        existing.textContent = jsonStr;
      }
    } else {
      // 2. Create if not yet present
      const script = document.createElement('script');
      script.id = 'schema-jsonld';
      script.type = 'application/ld+json';
      script.textContent = jsonStr;
      document.head.appendChild(script);
    }

    // 3. Purge any duplicate or stray application/ld+json tags in document.head
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
```

---

## 5. Verification: How to Confirm 0 Duplicate Schemas

You can verify that this architecture is functioning properly using three independent tests:

### 1. Automated CI Test:
```bash
bun run test:schema
```
* Parses all 190 HTML files in `dist/`.
* Throws an immediate error if `scripts.length !== 1` on any page.

### 2. Browser Console Verification:
Open DevTools Console on any page (Home, Blog, Course) and run:
```javascript
document.querySelectorAll('script[type="application/ld+json"]').length
// Result MUST be: 1

JSON.parse(document.getElementById('schema-jsonld').textContent)
// Result MUST show valid @context: "https://schema.org" and non-empty @graph
```

### 3. Google Rich Results Test:
Submit any URL to [Google Rich Results Test](https://search.google.com/test/rich-results).
* Verified: **No duplicate entity warnings**.
* Verified: **Connected Knowledge Graph** (`Organization` links to `WebSite`, `WebPage`, `Course`, `Review`, and `BlogPosting`).
