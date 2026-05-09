import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildCanonicalUrl, SITE_URL } from "@/lib/seo";
import metaDataConfig from "../../meta/meta.json";

const DEFAULT_META = {
  title: "AIA | Best Training Institute for Certification Courses",
  description:
    "Academy of Internal Audit (AIA) is Online Training Institute for Global Certification Courses like CIA, CFE, and other International Certification Courses.",
  keywords: "CIA, CFE, CAMS, Internal Audit, Training Institute, Fraud Examiner",
};

function matchRoute(pathname) {
  return Object.keys(metaDataConfig)
    .sort((a, b) => b.split("/").length - a.split("/").length)
    .find((route) => {
      if (!route.includes(":")) return route === pathname;

      const routeParts = route.split("/").filter(Boolean);
      const pathParts = pathname.split("/").filter(Boolean);

      return (
        routeParts.length === pathParts.length &&
        routeParts.every((part, index) => part.startsWith(":") || part === pathParts[index])
      );
    });
}

export default function Meta() {
  const { pathname } = useLocation();
  const routeKey = matchRoute(pathname);
  const pageMeta = metaDataConfig[routeKey] || DEFAULT_META;

  const baseUrl = SITE_URL;
  const canonicalUrl = buildCanonicalUrl(pathname);

  // Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AIA",
    "alternateName": "Academy of Internal Audit",
    "url": baseUrl,
    "logo": `${baseUrl}/webapi/public/assets/images/web_images/new_logo.webp`,
    "sameAs": [
      "https://www.facebook.com/@academyofinternalaudit",
      "https://twitter.com/AcademyAudit",
      "https://www.instagram.com/academyofia/",
      "https://www.linkedin.com/company/academy-of-internal-audit",
      "https://in.pinterest.com/academyofia/",
      "https://www.youtube.com/@academyofia"
    ]
  };

  // Breadcrumb Schema
  const pathParts = pathname.split("/").filter(Boolean);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }
  ];

  pathParts.forEach((part, index) => {
    const url = `${baseUrl}/${pathParts.slice(0, index + 1).join("/")}`;
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
      "item": url
    });
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AIA",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/blogs?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageMeta.title}</title>
      <meta name="title" content={pageMeta.title} />
      <meta name="description" content={pageMeta.description} />
      <meta name="keywords" content={pageMeta.keywords || DEFAULT_META.keywords} />
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageMeta.title} />
      <meta property="og:description" content={pageMeta.description} />
      <meta property="og:image" content={`${baseUrl}/android-chrome-512x512.png`} />
      <meta property="og:site_name" content="AIA" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={pageMeta.title} />
      <meta property="twitter:description" content={pageMeta.description} />
      <meta property="twitter:image" content={`${baseUrl}/android-chrome-512x512.png`} />
      <meta name="twitter:site" content="@AcademyAudit" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}
