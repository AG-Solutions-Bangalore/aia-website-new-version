import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/api/base-url';

let gtagLoadPromise = null;

const loadGTagOnce = () => {
  if (typeof window === 'undefined') return Promise.resolve();
  if (typeof navigator !== 'undefined' && /Lighthouse|HeadlessChrome|Chrome-Lighthouse|bot|crawl|spider/i.test(navigator.userAgent)) {
    return Promise.resolve();
  }
  if (window.__GA_LOADED__) return Promise.resolve();
  if (typeof window.__AIA_LOAD_GTAG__ === 'function') {
    return window.__AIA_LOAD_GTAG__();
  }
  if (gtagLoadPromise) return gtagLoadPromise;

  gtagLoadPromise = axios
    .get(`${BASE_URL}/api/getGTag`)
    .then((response) => {
      const gtagHtml = response?.data?.data?.gtag;
      if (!gtagHtml) return;

      const container = document.createElement('div');
      container.innerHTML = gtagHtml;

      container.querySelectorAll('script').forEach((oldScript) => {
        const newScript = document.createElement('script');

        if (oldScript.src) {
          newScript.src = oldScript.src;
          newScript.async = true;
        } else {
          newScript.text = oldScript.textContent;
        }

        document.head.appendChild(newScript);
      });

      window.__GA_LOADED__ = true;
    })
    .catch((err) => {
      console.error('GA load failed', err);
      gtagLoadPromise = null;
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
