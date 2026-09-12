/**
 * @file src/config/seoEngine.ts
 * @description Centralized Master SEO and Schema.org Graph Engine for the entire application.
 *
 * @why
 * Traditional SPAs emit fragmented, competing JSON-LD `<script>` tags across individual components
 * and FAQ accordions. This results in:
 * 1. Conflicting entity definitions (duplicate Organization or WebSite schemas).
 * 2. Dangling `@id` references that search engines cannot resolve into a unified knowledge graph.
 * 3. Inability for Googlebot to associate Course or Product pages with the primary business entity.
 * This file centralizes all site-wide schemas (`organizationSchema`, `localBusinessSchema`, `websiteSchema`)
 * and merges per-route entities into a single connected `@graph` with stable, deterministic `@id` URIs.
 *
 * @what
 * - `MasterSeoStructure`: Interface for title, description, keywords, canonicalPath, and robots directive.
 * - `RouteSeoEntry`: Extends `MasterSeoStructure` with an array of typed Schema.org `Thing` objects.
 * - `createCompositeGraph(schemas)`: Combines an array of entities into a single JSON-LD `@graph`.
 * - `ROUTE_SEO`: Canonical lookup table mapping all static routes to their SEO metadata and schemas.
 * - `getSeoForRoute(url)`: Universal route resolver supporting exact static matches, dynamic course blogs,
 *   individual blog slugs, practice modules, passout stories, and 404 fallbacks.
 *
 * @responsibility
 * Single source of truth for all page-level SEO metadata and structured data graphs.
 * Can be safely imported in both client-side React code and server-side/Node pre-rendering environments.
 *
 * @dependencies
 * - schema-dts: TypeScript Schema.org definitions (`Graph`, `Thing`)
 * - ./site: Site constants and canonical URL generator
 * - ./schemaExamples: Rich Results schema factories (`createSoftwareAppSchema`, `createProductSchema`, `createCourseSchema`)
 */

import type { Graph, Thing } from 'schema-dts';
import { SITE_NAME, SITE_ORIGIN, SITE_LOGO, SITE_PHONE, getCanonicalUrl } from './site';
import { createSoftwareAppSchema, createProductSchema, createCourseSchema } from './schemaExamples';

export interface MasterSeoStructure {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  noIndex?: boolean;
}

/**
 * Packs multiple Schema.org entities into a single unified JSON-LD graph.
 * Prevents multiple disconnected script tags from confusing search crawlers.
 *
 * @param schemas - Array of Schema.org Thing entities
 * @returns Complete Schema.org Graph object
 */
export function createCompositeGraph(schemas: Thing[]): Graph {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

export interface RouteSeoEntry extends MasterSeoStructure {
  schemas: Thing[];
}

/** Root Organization entity representing Academy of Internal Audit */
export const organizationSchema: Thing = {
  '@type': 'Organization',
  '@id': `${SITE_ORIGIN}#organization`,
  name: SITE_NAME,
  alternateName: ['AIA', 'AIA Institute', 'Academy of Internal Audit'],
  url: SITE_ORIGIN,
  logo: {
    '@type': 'ImageObject',
    url: SITE_LOGO,
  },
  sameAs: [
    'https://www.facebook.com/academyofinternalaudit',
    'https://twitter.com/AcademyAudit',
    'https://www.instagram.com/academyofia/',
    'https://www.linkedin.com/company/academy-of-internal-audit',
    'https://in.pinterest.com/academyofia/',
    'https://www.youtube.com/@academyofia',
  ],
} as Thing;

/** LocalBusiness entity providing verified physical office address and phone */
export const localBusinessSchema: Thing = {
  '@type': 'LocalBusiness',
  '@id': `${SITE_ORIGIN}#localbusiness`,
  name: `${SITE_NAME} HQ`,
  image: `${SITE_ORIGIN}/android-chrome-512x512.png`,
  telephone: SITE_PHONE,
  url: SITE_ORIGIN,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C826-828, Vipul Plaza, Sector-81',
    addressLocality: 'Faridabad',
    addressRegion: 'Delhi - NCR',
    postalCode: '121002',
    addressCountry: 'IN',
  },
  parentOrganization: { '@id': `${SITE_ORIGIN}#organization` },
} as Thing;

/** WebSite entity with SearchAction declaration */
export const websiteSchema: Thing = {
  '@type': 'WebSite',
  '@id': `${SITE_ORIGIN}#website`,
  url: SITE_ORIGIN,
  name: SITE_NAME,
  publisher: { '@id': `${SITE_ORIGIN}#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_ORIGIN}/blogs?s={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
} as Thing;

/** Helper creating a WebPage schema node connected to the root WebSite and Organization */
function createWebPageSchema(canonicalPath: string, title: string, description: string): Thing {
  const url = getCanonicalUrl(canonicalPath);
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': `${SITE_ORIGIN}#website` },
    about: { '@id': `${SITE_ORIGIN}#organization` },
  } as Thing;
}

/**
 * Complete catalog of static application routes and their pre-configured SEO payloads.
 */
export const ROUTE_SEO: Record<string, RouteSeoEntry> = {
  '/': {
    title: 'Academy of Internal Audit | Best Training Institute For Top Certification Courses - AIA',
    description:
      'Academy of Internal Audit (AIA) is Online Training Institute for Global Certification Courses like CIA, CFE, and other International Certification Courses.',
    keywords: 'CIA training, CFE certification, CAMS course, Internal Audit institute, Academy of Internal Audit',
    canonicalPath: '/',
    schemas: [
      organizationSchema,
      localBusinessSchema,
      websiteSchema,
      createWebPageSchema(
        '/',
        'Academy of Internal Audit | Best Training Institute For Top Certification Courses - AIA',
        'Academy of Internal Audit (AIA) is Online Training Institute for Global Certification Courses like CIA, CFE, and other International Certification Courses.',
      ),
      createSoftwareAppSchema(),
      createProductSchema(),
    ],
  },
  '/about-aia': {
    title: 'About - Academy of Internal Audit',
    description:
      'Academy of Internal Audit is a well-known Training Institute for Professional Courses Training, skilled faculty, and comprehensive guidance services.',
    keywords: 'About AIA, Academy of Internal Audit history, AIA success rate, professional training institute',
    canonicalPath: '/about-aia',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/about-aia',
        'About - Academy of Internal Audit',
        'Academy of Internal Audit is a well-known Training Institute for Professional Courses Training, skilled faculty, and comprehensive guidance services.',
      ),
    ],
  },
  '/cfe-curriculum': {
    title: 'Certified Fraud Examiner Course | CFE Certification Course',
    description:
      'Get Certification in Certified Fraud Examiner Course with AIA Institute to become a skilled Certified Fraud Investigator and unlock fraud prevention mystery.',
    keywords: 'CFE course, Certified Fraud Examiner, fraud detection training, CFE exam prep',
    canonicalPath: '/cfe-curriculum',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/cfe-curriculum',
        'Certified Fraud Examiner Course | CFE Certification Course',
        'Get Certification in Certified Fraud Examiner Course with AIA Institute to become a skilled Certified Fraud Investigator and unlock fraud prevention mystery.',
      ),
      createCourseSchema({
        name: 'Certified Fraud Examiner (CFE) Training',
        description: 'CFE certification training by the Academy of Internal Audit: exam-focused study guidance and practice questions.',
        path: '/cfe-curriculum',
      }),
    ],
  },
  '/cia-curriculum': {
    title: 'Certified Internal Auditor Course | CIA Certification Course',
    description:
      'Elevate your auditing career with AIA Institute which help you to ace your Certified Internal Auditor Course (CIA) and get your Internal Audit Certification.',
    keywords: 'CIA course, Certified Internal Auditor, internal audit training, CIA exam preparation',
    canonicalPath: '/cia-curriculum',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/cia-curriculum',
        'Certified Internal Auditor Course | CIA Certification Course',
        'Elevate your auditing career with AIA Institute which help you to ace your Certified Internal Auditor Course (CIA) and get your Internal Audit Certification.',
      ),
      createCourseSchema({
        name: 'Certified Internal Auditor (CIA) Training',
        description: 'CIA certification training by the Academy of Internal Audit: comprehensive exam preparation and guidance.',
        path: '/cia-curriculum',
      }),
    ],
  },
  '/cia-challenge-curriculum': {
    title: 'CIA Challenge Exam Prep | Clear in One Attempt with AIA Guidance',
    description:
      "Short on time? AIA's CIA Challenge Prep helps busy auditors fast-track their certification with flexible notes, expert-recorded lectures, and 1:1 live support. Enroll today!",
    keywords: 'CIA Challenge exam, CIA fast track, CIA challenge prep, internal auditor certification',
    canonicalPath: '/cia-challenge-curriculum',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/cia-challenge-curriculum',
        'CIA Challenge Exam Prep | Clear in One Attempt with AIA Guidance',
        "Short on time? AIA's CIA Challenge Prep helps busy auditors fast-track their certification with flexible notes, expert-recorded lectures, and 1:1 live support. Enroll today!",
      ),
      createCourseSchema({
        name: 'CIA Challenge Exam Training',
        description: 'Fast-track CIA Challenge exam training by the Academy of Internal Audit for qualified professionals.',
        path: '/cia-challenge-curriculum',
      }),
    ],
  },
  '/cams': {
    title: 'Certified Anti Money Laundering Specialist | CAMS Course',
    description:
      "Prepare to excel in CAMS Certification Exam with AIA's CAMS Study Guide and CAMS Practice Questions provided for Certified Anti Money Laundering Specialist.",
    keywords: 'CAMS course, Anti-money laundering certification, CAMS exam prep, CAMS specialist',
    canonicalPath: '/cams',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/cams',
        'Certified Anti Money Laundering Specialist | CAMS Course',
        "Prepare to excel in CAMS Certification Exam with AIA's CAMS Study Guide and CAMS Practice Questions provided for Certified Anti Money Laundering Specialist.",
      ),
      createCourseSchema({
        name: 'Certified Anti-Money Laundering Specialist (CAMS) Training',
        description: 'CAMS certification preparation by Academy of Internal Audit: expert guidance and study materials.',
        path: '/cams',
      }),
    ],
  },
  '/cisa': {
    title: 'Certified Information Systems Auditor | CISA Course',
    description:
      "Prepare to excel in CISA Certification Exam with AIA's CISA Prep Course. Get access to official ISACA study resource kits, recorded video lectures, and doubt sessions.",
    keywords: 'CISA course, Certified Information Systems Auditor, CISA exam prep, CISA certification training, ISACA CISA',
    canonicalPath: '/cisa',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/cisa',
        'Certified Information Systems Auditor | CISA Course',
        "Prepare to excel in CISA Certification Exam with AIA's CISA Prep Course. Get access to official ISACA study resource kits, recorded video lectures, and doubt sessions.",
      ),
      createCourseSchema({
        name: 'Certified Information Systems Auditor (CISA) Training',
        description: 'Comprehensive CISA certification course prep by Academy of Internal Audit.',
        path: '/cisa',
      }),
    ],
  },
  '/blogs': {
    title: 'Guide For Professional Courses like CIA, CFE, CIAC, CAMS - AIA',
    description:
      'Read Latest Blogs on professional courses like CIA, CFE, CAMS and CIA Challenge | Information that you need to know to grow your skills and career as well.',
    keywords: 'AIA blog, CIA tips, CFE guides, CAMS certification news, internal audit articles',
    canonicalPath: '/blogs',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/blogs',
        'Guide For Professional Courses like CIA, CFE, CIAC, CAMS - AIA',
        'Read Latest Blogs on professional courses like CIA, CFE, CAMS and CIA Challenge | Information that you need to know to grow your skills and career as well.',
      ),
    ],
  },
  '/alumni-network': {
    title: 'AIA Alumni Network - Academy of Internal Audit',
    description:
      'Academy of Internal Audit celebrates 99.6% + pass rate - featuring recent CFE, CIA, CAMS alumni from 40+ countries around the globe sharing their success stories.',
    keywords: 'AIA alumni, student success stories, CIA pass outs, CFE results, CAMS success',
    canonicalPath: '/alumni-network',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/alumni-network',
        'AIA Alumni Network - Academy of Internal Audit',
        'Academy of Internal Audit celebrates 99.6% + pass rate - featuring recent CFE, CIA, CAMS alumni from 40+ countries around the globe sharing their success stories.',
      ),
    ],
  },
  '/fillter': {
    title: 'Alumni Filter Directory | Academy of Internal Audit',
    description: 'Search and filter through the Academy of Internal Audit global professional network and alumni directory.',
    keywords: 'AIA alumni directory, filter alumni, CFE directory, CIA directory, CAMS directory',
    canonicalPath: '/fillter',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/fillter',
        'Alumni Filter Directory | Academy of Internal Audit',
        'Search and filter through the Academy of Internal Audit global professional network and alumni directory.',
      ),
    ],
  },
  '/filter': {
    title: 'Alumni Filter Directory | Academy of Internal Audit',
    description: 'Search and filter through the Academy of Internal Audit global professional network and alumni directory.',
    keywords: 'AIA alumni directory, filter alumni, CFE directory, CIA directory, CAMS directory',
    canonicalPath: '/filter',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/filter',
        'Alumni Filter Directory | Academy of Internal Audit',
        'Search and filter through the Academy of Internal Audit global professional network and alumni directory.',
      ),
    ],
  },
  '/aia-times': {
    title: 'AIA Times - Magazines, News, and PR Highlights | AIA',
    description:
      'Explore AIA Times for the latest Magazines, news, media coverage, PR mentions, expert insights, and key updates from the Academy of Internal Audit.',
    keywords: 'AIA Times, AIA magazine, Academy of Internal Audit news, fraud examination insights, audit magazine',
    canonicalPath: '/aia-times',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/aia-times',
        'AIA Times - Magazines, News, and PR Highlights | AIA',
        'Explore AIA Times for the latest Magazines, news, media coverage, PR mentions, expert insights, and key updates from the Academy of Internal Audit.',
      ),
    ],
  },
  '/cfe-free-resources': {
    title: 'Certified Fraud Examiner Free Resources - AIA',
    description:
      'Access CFE Free resources at the Academy of Internal: practice questions, flashcards, and video lectures to boost your exam preparation.',
    keywords: 'free CFE resources, CFE practice questions, CFE flashcards, CFE study material',
    canonicalPath: '/cfe-free-resources',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/cfe-free-resources',
        'Certified Fraud Examiner Free Resources - AIA',
        'Access CFE Free resources at the Academy of Internal: practice questions, flashcards, and video lectures to boost your exam preparation.',
      ),
    ],
  },
  '/cia-free-resources': {
    title: 'Certified Internal Audit Free Resources - AIA',
    description:
      'Access CIA Free resources at the Academy of Internal: practice questions, flashcards, and video lectures to boost your exam preparation.',
    keywords: 'free CIA resources, CIA practice questions, CIA study guide, internal audit free prep',
    canonicalPath: '/cia-free-resources',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/cia-free-resources',
        'Certified Internal Audit Free Resources - AIA',
        'Access CIA Free resources at the Academy of Internal: practice questions, flashcards, and video lectures to boost your exam preparation.',
      ),
    ],
  },
  '/cams-free-resources': {
    title: 'Certified Anti Money Laundering Specialist Free Resources - AIA',
    description:
      'Access CAMS Free resources at the Academy of Internal: practice questions, flashcards, and video lectures to boost your exam preparation.',
    keywords: 'free CAMS resources, CAMS practice questions, CAMS study material',
    canonicalPath: '/cams-free-resources',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/cams-free-resources',
        'Certified Anti Money Laundering Specialist Free Resources - AIA',
        'Access CAMS Free resources at the Academy of Internal: practice questions, flashcards, and video lectures to boost your exam preparation.',
      ),
    ],
  },
  '/corporate-training': {
    title: 'Corporate Training Programs of Academy of Internal Audit',
    description:
      "Upskill your team with AIA's corporate training in Internal Audit, Fraud Detection & Risk Management. Customized programs for organizations.",
    keywords: 'corporate audit training, risk management training, fraud detection for organizations',
    canonicalPath: '/corporate-training',
    schemas: [
      organizationSchema,
      localBusinessSchema,
      createWebPageSchema(
        '/corporate-training',
        'Corporate Training Programs of Academy of Internal Audit',
        "Upskill your team with AIA's corporate training in Internal Audit, Fraud Detection & Risk Management. Customized programs for organizations.",
      ),
    ],
  },
  '/enroll-now': {
    title: 'Enroll Now | Academy of Internal Audit',
    description:
      'Enroll with Academy of Internal Audit for CIA, CFE, CAMS, and other global certification training programs led by expert faculty.',
    keywords: 'enroll AIA, CIA enrollment, CFE enrollment, CAMS enrollment, audit certification admission',
    canonicalPath: '/enroll-now',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/enroll-now',
        'Enroll Now | Academy of Internal Audit',
        'Enroll with Academy of Internal Audit for CIA, CFE, CAMS, and other global certification training programs led by expert faculty.',
      ),
      createProductSchema(),
    ],
  },
  '/contact': {
    title: 'Contact Us | Academy of Internal Audit',
    description:
      'Reach out to Academy of Internal Audit for dedicated support in your journey to obtain professional course certifications. We will be happy to help you.',
    keywords: 'contact AIA, Academy of Internal Audit phone, AIA email, audit training support',
    canonicalPath: '/contact',
    schemas: [
      organizationSchema,
      localBusinessSchema,
      createWebPageSchema(
        '/contact',
        'Contact Us | Academy of Internal Audit',
        'Reach out to Academy of Internal Audit for dedicated support in your journey to obtain professional course certifications. We will be happy to help you.',
      ),
    ],
  },
  '/policies': {
    title: 'Policies | Academy of Internal Audit (AIA)',
    description: 'Read AIA policies including privacy policy, refund policy, and terms related to courses, payments, and student services.',
    keywords: 'AIA policies, privacy policy, refund policy',
    canonicalPath: '/policies',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/policies',
        'Policies | Academy of Internal Audit (AIA)',
        'Read AIA policies including privacy policy, refund policy, and terms related to courses, payments, and student services.',
      ),
    ],
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions | AIA Courses & Services',
    description: 'Review the terms and conditions for enrolling in AIA courses, including usage policies, payments, access rights, and guidelines.',
    keywords: 'AIA terms and conditions, course usage policy',
    canonicalPath: '/terms-and-conditions',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/terms-and-conditions',
        'Terms and Conditions | AIA Courses & Services',
        'Review the terms and conditions for enrolling in AIA courses, including usage policies, payments, access rights, and guidelines.',
      ),
    ],
  },
};

/**
 * Formats URL slug strings into readable title case.
 * Capitalizes known acronyms (AIA, CIA, CFE, CAMS, CISA, CIAC).
 */
function formatSlugToTitle(slug: string): string {
  return decodeURIComponent(slug)
    .split('-')
    .filter(Boolean)
    .map((word) => {
      const upper = word.toUpperCase();
      if (['AIA', 'CIA', 'CFE', 'CAMS', 'CISA', 'CIAC'].includes(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Core route resolver determining the exact SEO metadata and Schema.org graph for any URL.
 * Handles both registered static routes and dynamic parameterized patterns.
 *
 * @param url - Relative route URL or full pathname (e.g. '/cfe-curriculum' or '/blogs/aml-career')
 * @returns Complete `RouteSeoEntry`
 */
export function getSeoForRoute(url: string): RouteSeoEntry {
  const path = url.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';

  // 1. Direct match in ROUTE_SEO
  if (ROUTE_SEO[path]) {
    return ROUTE_SEO[path];
  }

  // 2. Dynamic pattern match: /blogs/course/:courseName
  const courseMatch = path.match(/^\/blogs\/course\/([^/]+)$/);
  if (courseMatch) {
    const courseTitle = formatSlugToTitle(courseMatch[1]);
    const title = `${courseTitle} Certification Articles | ${SITE_NAME}`;
    const description = `Explore ${courseTitle} certification articles, exam tips, syllabus guidance, and career insights from ${SITE_NAME} experts.`;
    return {
      title,
      description,
      keywords: `${courseTitle} blogs, ${courseTitle} certification articles, ${courseTitle} exam tips`,
      canonicalPath: path,
      schemas: [
        organizationSchema,
        createWebPageSchema(path, title, description),
      ],
    };
  }

  // 3. Dynamic pattern match: /blogs/:id
  const blogMatch = path.match(/^\/blogs\/([^/]+)$/);
  if (blogMatch && blogMatch[1] !== 'course') {
    const blogTitle = formatSlugToTitle(blogMatch[1]);
    const title = `${blogTitle} | ${SITE_NAME}`;
    const description = `Read expert insights and detailed exam preparation guide on ${blogTitle} by ${SITE_NAME}.`;
    return {
      title,
      description,
      keywords: `${blogTitle}, internal audit blog, exam prep, AIA articles`,
      canonicalPath: path,
      schemas: [
        organizationSchema,
        createWebPageSchema(path, title, description),
        {
          '@type': 'BlogPosting',
          '@id': `${getCanonicalUrl(path)}#blogposting`,
          headline: blogTitle,
          description,
          mainEntityOfPage: { '@id': `${getCanonicalUrl(path)}#webpage` },
          publisher: { '@id': `${SITE_ORIGIN}#organization` },
          author: { '@id': `${SITE_ORIGIN}#organization` },
        } as Thing,
      ],
    };
  }

  // 4. Dynamic pattern match: /cfe-free-resource/:questions_module
  const cfeResourceMatch = path.match(/^\/cfe-free-resource\/([^/]+)$/);
  if (cfeResourceMatch) {
    const modTitle = formatSlugToTitle(cfeResourceMatch[1]);
    const title = `${modTitle} Practice Questions | Free CFE Resources - ${SITE_NAME}`;
    const description = `Practice free ${modTitle} questions with answers and explanations from ${SITE_NAME} to strengthen your CFE exam preparation.`;
    return {
      title,
      description,
      keywords: `${modTitle} practice questions, CFE free resources, CFE exam preparation`,
      canonicalPath: path,
      schemas: [
        organizationSchema,
        createWebPageSchema(path, title, description),
      ],
    };
  }

  // 5. Dynamic pattern match: /passout-stories/:slug
  const passoutMatch = path.match(/^\/passout-stories\/([^/]+)$/);
  if (passoutMatch) {
    const studentName = formatSlugToTitle(passoutMatch[1]);
    const title = `${studentName} | Student Success Story | ${SITE_NAME}`;
    const description = `Read ${studentName}'s success story after clearing CIA, CFE or CAMS exams with ${SITE_NAME}.`;
    return {
      title,
      description,
      keywords: `${studentName} success story, AIA alumni, CIA CFE CAMS results`,
      canonicalPath: path,
      schemas: [
        organizationSchema,
        createWebPageSchema(path, title, description),
      ],
    };
  }

  // Fallback 404
  return {
    title: `${SITE_NAME} | Page Not Found`,
    description: 'The requested page could not be found.',
    keywords: '404, not found',
    canonicalPath: path,
    noIndex: true,
    schemas: [organizationSchema],
  };
}
