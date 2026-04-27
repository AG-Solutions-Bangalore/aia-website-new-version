import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const setMetaTag = (selector, attr, value) => {
  let tag = document.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");

    if (selector.includes("property")) {
      tag.setAttribute("property", attr);
    } else {
      tag.setAttribute("name", attr);
    }

    document.head.appendChild(tag);
  }

  tag.setAttribute("content", value);
};

export default function Meta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const routeKey = matchRoute(pathname);
    const metaData = meta[routeKey] || DEFAULT_META;

    // ✅ Title
    document.title = metaData.title;

    // ✅ Description
    setMetaTag("meta[name='description']", "description", metaData.description);

    // ✅ Open Graph (VERY IMPORTANT)
    setMetaTag("meta[property='og:title']", "og:title", metaData.title);
    setMetaTag("meta[property='og:description']", "og:description", metaData.description);

    // ✅ Optional (not important but okay)
    setMetaTag("meta[name='title']", "title", metaData.title);

  }, [pathname]);

  return null;
}