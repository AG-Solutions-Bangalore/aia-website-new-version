/**
 * @file src/routes/AppRoutes.tsx
 * @description Decoupled application route tree wrapping every page in `SEOPageLayout`
 * with automatic route metadata and QueryClient context.
 *
 * @why
 * In a hybrid SSG + Client SPA, the route table must be independently renderable by both
 * `StaticRouter` (during build-time `vitePrerenderPlugin` execution) and `BrowserRouter`
 * (during client browser navigation). Embedding routing directly in `App.tsx` tied routing to
 * client-only globals (like window listeners, toaster, or analytics popups). This decoupled route
 * table can be rendered synchronously in Node SSR without window/DOM errors.
 *
 * @what
 * - Defines all primary routes (`/`, `/about-aia`, `/cams`, `/cfe-curriculum`, etc.).
 * - Defines dynamic route patterns (`/blogs/:id`, `/blogs/course/:courseName`, etc.).
 * - Wraps every route element in `<PageSEO path="...">` which automatically retrieves metadata
 *   from `getSeoForRoute()` and passes it to `<SEOPageLayout>`.
 * - Provides QueryClientProvider context to prevent SSR queries from throwing.
 * - Handles 301 legacy redirects via `blog-redirects.ts`.
 *
 * @responsibility
 * Complete route-to-component mapping and per-route SEO wrapper encapsulation.
 *
 * @dependencies
 * - react: Lazy loading and Suspense
 * - react-router-dom: `Routes`, `Route`, `Navigate`, `useLocation`
 * - @tanstack/react-query: `QueryClient`, `QueryClientProvider`
 * - @/layout/Layout: Main site layout shell (Navbar, Footer)
 * - @/components/SEOPageLayout: Dedicated head and schema synchronizer
 * - @/config/seoEngine: `getSeoForRoute`
 */

import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/layout/Layout';
import SEOPageLayout from '@/components/SEOPageLayout';
import { getSeoForRoute } from '@/config/seoEngine';
import { COURSE_ROUTES } from '@/config/site';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import blogRedirects from './blog-redirects';

const Home = lazy(() => import('@/pages/Home/Home'));
const CAMS = lazy(() => import('@/pages/Courses/CAMS'));
const CFECurriculam = lazy(() => import('@/pages/Courses/CFECurriculam'));
const CIAChallenge = lazy(() => import('@/pages/Courses/CIAChallenge'));
const CIACurriculam = lazy(() => import('@/pages/Courses/CIACurriculam'));
const CISA = lazy(() => import('@/pages/Courses/CISA'));
const FreeResources = lazy(() => import('@/pages/free-resources/cfe-free-resources'));
const CAMSFreeResources = lazy(
  () => import('@/pages/free-resources/cams-free-resources/cams-free-resources'),
);
const CIAFreeResources = lazy(
  () => import('@/pages/free-resources/cia-free-resources/cia-free-resources'),
);
const CISAFreeResources = lazy(
  () => import('@/pages/free-resources/cisa-free-resources/cisa-free-resources'),
);
const Blog = lazy(() => import('@/pages/Blog/Blog'));
const OurPassout = lazy(() => import('@/pages/OurPassout/OurPassout'));
const Enrool = lazy(() => import('@/pages/Enroll/Enroll'));
const Contact = lazy(() => import('@/pages/contact/contact'));
const BlogDetails = lazy(() => import('@/pages/Blog/blog-details'));
const AboutPage = lazy(() => import('@/pages/About/About'));
const CorporateTraining = lazy(
  () => import('@/pages/corporate-training/corporate-training'),
);
const AiaTimes = lazy(() => import('@/pages/aia-times/aia-times'));
const Policies = lazy(() => import('@/pages/policies/policies'));
const TermsAndConditions = lazy(
  () => import('@/pages/terms-and-conditions/terms-and-conditions'),
);
const BlogCourse = lazy(() => import('@/pages/Blog/blog-course'));
const CfePracticeQuestion = lazy(
  () => import('@/pages/free-resources/cfe-practice-question'),
);
const PassoutStoriesSlug = lazy(
  () => import('@/components/passout/passout-stories-slug'),
);
const NotFound = lazy(() => import('@/components/common/not-found'));
const FlipbookSection = lazy(
  () => import('@/components/aia-times/flipbook-section'),
);
const FilterPage = lazy(() => import('@/pages/Filter/FilterPage'));

/**
 * Route wrapper component binding the current route path to `getSeoForRoute(currentPath)`
 * and rendering `<SEOPageLayout>`.
 *
 * HOW IT WORKS:
 * 1. If an explicit `path` prop is provided (e.g., `<PageSEO path="/about-aia">`), it is used directly.
 * 2. If no path is provided, it falls back to `location.pathname` (essential for parameterized routes
 *    like `/blogs/:id` or `/passout-stories/:slug` where the actual slug comes from the URL).
 * 3. Injects the resolved title, meta tags, and structured schemas directly into `<SEOPageLayout>`.
 * 4. Wraps page children in `<Suspense fallback={null}>` to support React code splitting (`React.lazy`).
 */
function PageSEO({ path, children }: { path?: string; children: React.ReactNode }) {
  const location = useLocation();
  const currentPath = path || location.pathname;
  const seo = getSeoForRoute(currentPath);
  return (
    <SEOPageLayout seo={seo} structuredSchemas={seo.schemas}>
      <Suspense fallback={null}>{children}</Suspense>
    </SEOPageLayout>
  );
}

function withTrailingSlash(pathname: string): string {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

/**
 * Enforces client-side URL consistency:
 * - Course pages are kept WITHOUT a trailing slash (e.g. /cfe-curriculum).
 * - All other routes are kept WITH a trailing slash (e.g. /about-aia/ or /blogs/).
 */
function TrailingSlashEnforcer() {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const { pathname, search, hash } = location;
    if (pathname === '/') return;

    const clean = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
    const isCourse = COURSE_ROUTES.has(clean);

    if (isCourse) {
      if (pathname.endsWith('/')) {
        navigate(`/${clean}${search}${hash}`, { replace: true });
      }
    } else {
      if (!pathname.endsWith('/')) {
        navigate(`${pathname}/${search}${hash}`, { replace: true });
      }
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
}

export interface AppRoutesProps {
  /**
   * Optional QueryClient instance.
   * During server pre-rendering (`src/prerender.tsx`), a QueryClient populated with
   * cached blog details and student stories is passed in so pages render immediately.
   * On the client side in normal browsing, a fresh QueryClient is instantiated automatically.
   */
  queryClient?: QueryClient;
}

export default function AppRoutes({ queryClient: initialQueryClient }: AppRoutesProps = {}): React.JSX.Element {
  const [queryClient] = React.useState(
    () =>
      initialQueryClient ||
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <TrailingSlashEnforcer />
        <Routes>
          <Route path="/" element={<PageSEO path="/"><Home /></PageSEO>} />
          <Route path="/about-aia" element={<PageSEO path="/about-aia"><AboutPage /></PageSEO>} />
          <Route path="/about-us" element={<Navigate to="/about-aia/" replace />} />
          <Route path="/about-aia/cia-curriculum" element={<Navigate to="/cia-curriculum" replace />} />
          <Route path="/about-aia/cams" element={<Navigate to="/cams" replace />} />
          <Route path="/about-aia/cfe-curriculum" element={<Navigate to="/cfe-curriculum" replace />} />
          <Route path="/about-aia/cia-challenge-curriculum" element={<Navigate to="/cia-challenge-curriculum" replace />} />
          <Route path="/about-aia/cisa" element={<Navigate to="/cisa" replace />} />
          <Route path="/cfe-curriculum" element={<PageSEO path="/cfe-curriculum"><CFECurriculam /></PageSEO>} />
          <Route path="/cia-curriculum" element={<PageSEO path="/cia-curriculum"><CIACurriculam /></PageSEO>} />
          <Route path="/cia-challenge-curriculum" element={<PageSEO path="/cia-challenge-curriculum"><CIAChallenge /></PageSEO>} />
          <Route path="/cisa" element={<PageSEO path="/cisa"><CISA /></PageSEO>} />
          <Route path="/cams" element={<PageSEO path="/cams"><CAMS /></PageSEO>} />
          <Route path="/cia-free-resources" element={<PageSEO path="/cia-free-resources"><CIAFreeResources /></PageSEO>} />
          <Route path="/cams-free-resources" element={<PageSEO path="/cams-free-resources"><CAMSFreeResources /></PageSEO>} />
          <Route path="/cisa-free-resources" element={<PageSEO path="/cisa-free-resources"><CISAFreeResources /></PageSEO>} />
          <Route path="/cfe-free-resources" element={<PageSEO path="/cfe-free-resources"><FreeResources /></PageSEO>} />
          <Route path="/cfe-free-resource/:questions_module" element={<PageSEO><CfePracticeQuestion /></PageSEO>} />
          <Route path="/blogs" element={<PageSEO path="/blogs"><Blog /></PageSEO>} />
          <Route path="/blogs/:id" element={<PageSEO><BlogDetails /></PageSEO>} />
          <Route path="/blogs/course/:courseName" element={<PageSEO><BlogCourse /></PageSEO>} />
          <Route path="/alumni-network" element={<PageSEO path="/alumni-network"><OurPassout /></PageSEO>} />
          <Route path="/fillter" element={<PageSEO path="/fillter"><FilterPage /></PageSEO>} />
          <Route path="/filter" element={<Navigate to="/fillter/" replace />} />
          <Route path="/our-passouts/*" element={<Navigate to="/alumni-network/" replace />} />
          <Route path="/passed-out/*" element={<Navigate to="/alumni-network/" replace />} />
          <Route path="/enroll-now" element={<PageSEO path="/enroll-now"><Enrool /></PageSEO>} />
          <Route path="/contact" element={<PageSEO path="/contact"><Contact /></PageSEO>} />
          <Route path="/passout-stories/:slug" element={<PageSEO><PassoutStoriesSlug /></PageSEO>} />
          <Route path="/corporate-training" element={<PageSEO path="/corporate-training"><CorporateTraining /></PageSEO>} />
          <Route path="/aia-times" element={<PageSEO path="/aia-times"><AiaTimes /></PageSEO>} />
          <Route path="/aia-times/flip-book" element={<PageSEO path="/aia-times"><FlipbookSection /></PageSEO>} />
          <Route path="/corporate-training/cia-curriculum" element={<Navigate to="/cia-curriculum" replace />} />
          <Route path="/corporate-training/cams" element={<Navigate to="/cams" replace />} />
          <Route path="/corporate-training/cfe-curriculum" element={<Navigate to="/cfe-curriculum" replace />} />
          <Route path="/corporate-training/cisa" element={<Navigate to="/cisa" replace />} />
          <Route path="/policies" element={<PageSEO path="/policies"><Policies /></PageSEO>} />
          <Route path="/terms-and-conditions" element={<PageSEO path="/terms-and-conditions"><TermsAndConditions /></PageSEO>} />
          <Route path="*" element={<PageSEO><NotFound /></PageSEO>} />

          {Object.entries(blogRedirects).map(([oldPath, newPath]) => (
            <Route
              key={oldPath}
              path={oldPath}
              element={<Navigate to={withTrailingSlash(newPath)} replace />}
            />
          ))}
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
}
