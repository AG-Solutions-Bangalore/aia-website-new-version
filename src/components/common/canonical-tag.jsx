import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const CanonicalTag = () => {
  const { pathname } = useLocation();
  const baseUrl = "https://aia.in.net";

  const canonicalUrl = `${baseUrl}${pathname}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default CanonicalTag;
