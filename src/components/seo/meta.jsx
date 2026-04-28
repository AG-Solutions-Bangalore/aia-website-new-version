import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import meta from "../../meta/meta.json";

const DEFAULT_META = {
  title: "AIA | Best Training Institute for Certification Courses",
  description:
    "Academy of Internal Audit is an online training institute offering globally recognized professional certification courses such as CIA, CFE, and CAMS, along with other international certifications.",
};

function matchRoute(pathname) {
  return Object.keys(meta).find((route) => {
    if (!route.includes(":")) return route === pathname;

    const base = route.split("/:")[0];
    return pathname === base || pathname.startsWith(base + "/");
  });
}

export default function Meta() {
  const { pathname } = useLocation();
  const routeKey = matchRoute(pathname);
  const metaData = meta[routeKey] || DEFAULT_META;

  const baseUrl = "https://aia.in.net";
  const canonicalUrl = `${baseUrl}${pathname}`;

  return (
    <Helmet>
      <title>{metaData.title}</title>
      <meta name="title" content={metaData.title} />
      <meta name="description" content={metaData.description} />

      <meta property="og:title" content={metaData.title} />
      <meta property="og:description" content={metaData.description} />
      <meta property="og:url" content={canonicalUrl} />

      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
