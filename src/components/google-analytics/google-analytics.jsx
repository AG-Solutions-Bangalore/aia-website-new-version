import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_TRACKING_ID = 'AW-16531559648';
let gtagLoadPromise = null;

const loadGTagOnce = () => {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.__GA_LOADED__) return Promise.resolve();
  if (typeof window.__AIA_LOAD_GTAG__ === 'function') {
    return window.__AIA_LOAD_GTAG__();
  }
  if (gtagLoadPromise) return gtagLoadPromise;

  gtagLoadPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    script.onload = () => {
      if (typeof window.gtag === 'function') {
        window.gtag('config', GA_TRACKING_ID);
      }
      window.__GA_LOADED__ = true;
      resolve();
    };
    script.onerror = () => {
      window.__GA_LOADED__ = true;
      resolve();
    };
    document.head.appendChild(script);
  });

  return gtagLoadPromise;
};

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    loadGTagOnce();
  }, []);

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location.pathname, location.search]);

  return null;
};

export default GoogleAnalytics;
