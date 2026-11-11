import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { Thing } from 'schema-dts';
import { getCanonicalUrl } from './site';
import type { MasterSeoStructure } from './engine';
import { createCompositeGraph } from './schema';
import { useDynamicRouteSeo } from './dynamicRouteSeo';

export interface ModularPageProps {
  seo: MasterSeoStructure;
  structuredSchemas?: Thing[];
  children: React.ReactNode;
}

export interface DynamicSeoContextValue {
  setDynamicSeo: (seo: MasterSeoStructure | null) => void;
}

export const DynamicSeoContext = React.createContext<DynamicSeoContextValue | null>(null);

export function useDynamicSeo(): DynamicSeoContextValue | null {
  return React.useContext(DynamicSeoContext);
}

function syncMeta(name: string, content: string): void {
  const tags = document.querySelectorAll(`meta[name="${name}"]`);
  const element = (tags[0] as HTMLMetaElement | undefined) || document.createElement('meta');
  element.setAttribute('name', name);
  element.setAttribute('content', content);
  if (!tags[0]) document.head.appendChild(element);
  for (let index = 1; index < tags.length; index += 1) tags[index].remove();
}

function syncProperty(property: string, content: string): void {
  const tags = document.querySelectorAll(`meta[property="${property}"]`);
  const element = (tags[0] as HTMLMetaElement | undefined) || document.createElement('meta');
  element.setAttribute('property', property);
  element.setAttribute('content', content);
  if (!tags[0]) document.head.appendChild(element);
  for (let index = 1; index < tags.length; index += 1) tags[index].remove();
}

export default function SEOPageLayout({
  seo: initialSeo,
  structuredSchemas = [],
  children,
}: ModularPageProps): React.JSX.Element {
  const [dynamicSeo, setDynamicSeo] = React.useState<MasterSeoStructure | null>(null);
  const routePath = typeof window === 'undefined' ? initialSeo.canonicalPath : window.location.pathname;

  React.useEffect(() => {
    setDynamicSeo(null);
  }, [initialSeo.canonicalPath]);

  const routeSeo = useDynamicRouteSeo(routePath, initialSeo);
  const seo = dynamicSeo || routeSeo || initialSeo;
  const finalCanonical = getCanonicalUrl(seo.canonicalPath);
  const activeSchemas = seo.schemas || dynamicSeo?.schemas || structuredSchemas;
  const pageGraphPayload = activeSchemas.length > 0 ? createCompositeGraph(activeSchemas) : null;
  const hasHydratedRef = React.useRef(false);

  React.useEffect(() => {
    const isFirstMount = !hasHydratedRef.current;
    hasHydratedRef.current = true;

    if (isFirstMount && initialSeo.isFallback && !dynamicSeo) {
      const existingScript = document.getElementById('schema-jsonld');
      if (existingScript?.textContent) return;
    }

    if (seo.title) document.title = seo.title;

    const canonicals = document.querySelectorAll('link[rel="canonical"]');
    const canonical = (canonicals[0] as HTMLLinkElement | undefined) || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', finalCanonical);
    if (!canonicals[0]) document.head.appendChild(canonical);
    for (let index = 1; index < canonicals.length; index += 1) canonicals[index].remove();

    syncMeta('robots', seo.robots || (seo.noIndex ? 'noindex, nofollow' : 'index, follow'));
    syncMeta('description', seo.description || '');
    syncMeta('keywords', seo.keywords || '');
    const authorContent = seo.author || DEFAULT_AUTHOR;
    const publisherContent = seo.publisher || DEFAULT_PUBLISHER;
    syncMeta('author', authorContent);
    syncMeta('publisher', publisherContent);
    syncProperty('og:title', seo.title || '');
    syncProperty('og:description', seo.description || '');
    syncProperty('og:url', finalCanonical);

    if (!pageGraphPayload) return;
    const jsonStr = JSON.stringify(pageGraphPayload);
    const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    const schemaScript = (document.getElementById('schema-jsonld') as HTMLScriptElement | null) || document.createElement('script');
    schemaScript.id = 'schema-jsonld';
    schemaScript.type = 'application/ld+json';
    if (schemaScript.textContent !== jsonStr) schemaScript.textContent = jsonStr;
    if (!schemaScript.parentElement) document.head.appendChild(schemaScript);
    scripts.forEach((script) => {
      if (script !== schemaScript) script.remove();
    });
  }, [dynamicSeo, finalCanonical, initialSeo.isFallback, pageGraphPayload, seo]);

  return (
    <DynamicSeoContext.Provider value={{ setDynamicSeo }}>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="author" content={seo.author || DEFAULT_AUTHOR} />
        <meta name="publisher" content={seo.publisher || DEFAULT_PUBLISHER} />
        <link rel="canonical" href={finalCanonical} />
        <meta name="robots" content={seo.robots || (seo.noIndex ? 'noindex, nofollow' : 'index, follow')} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={finalCanonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
      </Helmet>
      {children}
    </DynamicSeoContext.Provider>
  );
}
