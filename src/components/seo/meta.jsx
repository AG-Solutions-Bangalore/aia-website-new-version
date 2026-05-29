import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { buildCanonicalUrl, SITE_URL } from "@/lib/seo";
import metaDataConfig from "../../meta/meta.json";

const DEFAULT_META = {
  title: "Best Training Institute For Top Certification Courses- AIA",
  description:
    "Academy of Internal Audit (AIA) is Online Training Institute for Global Certification Courses like CIA, CFE, and other International Certification Courses.",
  keywords: "CIA, CFE, CAMS, Internal Audit, Training Institute, Fraud Examiner",
};

const UPPERCASE_WORDS = {
  aia: "AIA",
  cams: "CAMS",
  cfe: "CFE",
  cia: "CIA",
  ciac: "CIAC",
};

function titleFromSlug(value = "") {
  return decodeURIComponent(value)
    .split("-")
    .filter(Boolean)
    .map((word) => UPPERCASE_WORDS[word.toLowerCase()] || `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function cfeModuleTitle(value = "") {
  const match = value.match(/^cfe-(\d+)$/i);
  return match ? `CFE Module ${match[1]}` : titleFromSlug(value);
}

function buildDynamicMeta(pathname) {
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] === "blogs" && parts[1] === "course" && parts[2]) {
    const courseName = titleFromSlug(parts[2]);
    return {
      title: `${courseName} Certification Articles | Academy of Internal Audit`,
      description: `Explore ${courseName} certification articles, exam tips, syllabus guidance, and career insights from Academy of Internal Audit experts.`,
      keywords: `${courseName} blogs, ${courseName} certification articles, ${courseName} exam tips`,
    };
  }

  if (parts[0] === "cfe-free-resource" && parts[1]) {
    const moduleName = cfeModuleTitle(parts[1]);
    return {
      title: `${moduleName} Practice Questions | Free CFE Resources`,
      description: `Practice ${moduleName} questions with answers and explanations from Academy of Internal Audit to strengthen your CFE exam preparation.`,
      keywords: `${moduleName} practice questions, CFE free resources, CFE exam preparation`,
    };
  }

  if (parts[0] === "passout-stories" && parts[1]) {
    const storyName = titleFromSlug(parts[1]);
    return {
      title: `${storyName} | Student Success Story | AIA`,
      description: `Read ${storyName}'s AIA success story after clearing CIA, CFE or CAMS exams. Get inspired by their journey, preparation strategy, and results.`,
      keywords: `${storyName} success story, AIA alumni, CIA CFE CAMS results`,
    };
  }

  return null;
}

function matchRoute(pathname) {
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";

  return Object.keys(metaDataConfig)
    .sort((a, b) => b.split("/").length - a.split("/").length)
    .find((route) => {
      if (!route.includes(":")) return route === normalizedPathname;

      const routeParts = route.split("/").filter(Boolean);
      const pathParts = normalizedPathname.split("/").filter(Boolean);

      return (
        routeParts.length === pathParts.length &&
        routeParts.every((part, index) => part.startsWith(":") || part === pathParts[index])
      );
    });
}

export default function Meta() {
  const { pathname } = useLocation();
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
  const routeKey = matchRoute(pathname);
  const pageMeta = buildDynamicMeta(normalizedPathname) || metaDataConfig[routeKey] || DEFAULT_META;

  const baseUrl = SITE_URL;
  const rootUrl = `${baseUrl}/`;
  const canonicalUrl = buildCanonicalUrl(pathname);

  // Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AIA",
    "alternateName": "Academy of Internal Audit",
    "url": rootUrl,
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
  const pathParts = normalizedPathname.split("/").filter(Boolean);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": rootUrl
    }
  ];

  pathParts.forEach((part, index) => {
    const url = buildCanonicalUrl(`/${pathParts.slice(0, index + 1).join("/")}`);
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
    "url": rootUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/blogs/?s={search_term_string}`,
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
