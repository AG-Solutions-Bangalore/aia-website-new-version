import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";

const Footer = lazy(() => import("./footer"));

const DeferredFooter = () => {
  const { pathname } = useLocation();
  const [showFooter, setShowFooter] = useState(pathname !== "/");

  useEffect(() => {
    if (pathname !== "/") {
      setShowFooter(true);
      return;
    }

    setShowFooter(false);
    const renderFooter = () => setShowFooter(true);
    const timer = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(renderFooter, { timeout: 3000 });
      } else {
        renderFooter();
      }
    }, 12000);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!showFooter) return null;

  return (
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="grow min-h-screen">{children}</main>

      <DeferredFooter />
    </div>
  );
};

export default Layout;
