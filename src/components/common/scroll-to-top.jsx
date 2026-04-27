import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    const scroll = () => {
      window.scrollTo(0, 0);
    };

    const timeout = setTimeout(scroll, 50);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
