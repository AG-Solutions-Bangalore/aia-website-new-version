/**
 * @file src/seo/config/seoEngine.ts
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

import type { Thing } from "schema-dts";
import {
  getDynamicBlog,
  getDynamicFaqBySlug,
  getDynamicStudentStory,
  getDynamicTestimonialsByRoute,
} from "./dynamicData";
import {
  createArticleSchema,
  createBlogPostingSchema,
  createBreadcrumbSchema,
  createCourseSchema,
  createFaqSchema,
  createStudentReviewSchema,
  createTestimonialReviewSchema,
  createWebPageSchema,
  localBusinessSchema,
  organizationSchema,
  RouteSeoEntry,
  websiteSchema,
} from "./schemaExamples";
import { DEFAULT_AUTHOR, DEFAULT_PUBLISHER, SITE_NAME } from "./site";
import { getMetaKeywords } from "./pageKeywords";
import { courseSchemaData } from "./courseSchemaData";

export interface MasterSeoStructure {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  author?: string;
  publisher?: string;
  noIndex?: boolean;
  robots?: string;
  schemas?: Thing[];
  isFallback?: boolean;
}

/**
 * Canonical course entities reused across the homepage list and each course route.
 *
 * NOTE (course structured data fix): `offer` (price + priceCurrency) and
 * `courseInstance` (courseMode + dates) values come from
 * `src/seo/config/courseSchemaData.ts`. That file currently contains MOCK
 * placeholders with TODO markers; replace them with verified business data
 * before relying on the Course rich-result output.
 */
const COURSE_SCHEMAS = {
  "/cfe-curriculum": {
    name: "Certified Fraud Examiner (CFE) Training",
    description:
      "Get Certification in Certified Fraud Examiner Course with AIA Institute to become a skilled Certified Fraud Investigator and unlock fraud prevention mystery.",
    path: "/cfe-curriculum",
    ...courseSchemaData["/cfe-curriculum"],
  },
  "/cia-curriculum": {
    name: "Certified Internal Auditor (CIA) Training",
    description:
      "Elevate your auditing career with AIA Institute which help you to ace your Certified Internal Auditor Course (CIA) and get your Internal Audit Certification.",
    path: "/cia-curriculum",
    ...courseSchemaData["/cia-curriculum"],
  },
  "/cia-challenge-curriculum": {
    name: "CIA Challenge Exam Training",
    description:
      "Short on time? AIA's CIA Challenge Prep helps busy auditors fast-track their certification with flexible notes, expert-recorded lectures, and 1:1 live support. Enroll today!",
    path: "/cia-challenge-curriculum",
    ...courseSchemaData["/cia-challenge-curriculum"],
  },
  "/cams": {
    name: "Certified Anti-Money Laundering Specialist (CAMS) Training",
    description:
      "Prepare to excel in CAMS Certification Exam with AIA's CAMS Study Guide and CAMS Practice Questions provided for Certified Anti Money Laundering Specialist.",
    path: "/cams",
    ...courseSchemaData["/cams"],
  },
  "/cisa": {
    name: "Certified Information Systems Auditor (CISA) Training",
    description:
      "Prepare to excel in CISA Certification Exam with AIA's CISA Prep Course. Get access to official ISACA study resource kits, recorded video lectures, and doubt sessions.",
    path: "/cisa",
    ...courseSchemaData["/cisa"],
  },
} as const;

const HOME_COURSE_SCHEMAS = Object.values(COURSE_SCHEMAS).map(createCourseSchema);

/**
 * Complete catalog of static application routes and their pre-configured SEO payloads.
 */
export const ROUTE_SEO: Record<string, RouteSeoEntry> = {
  "/": {
    title: "Expert Training for CFE, CIA, CAMS & CISA Certification | AIA",
    description:
      "Academy of Internal Audit offers expert-led CIA, CFE, CAMS & CISA training with a 99.6% success rate, helping professionals achieve global certifications.",
    keywords: getMetaKeywords("homepage"),
    canonicalPath: "/",
    author: "Academy of Internal Audit",
    publisher: "Academy of Internal Audit (AIA)",
    schemas: [
      organizationSchema,
      localBusinessSchema,
      websiteSchema,
      createWebPageSchema(
        "/",
        "Expert Training for CFE, CIA, CAMS & CISA Certification | AIA",
        "Academy of Internal Audit offers expert-led CIA, CFE, CAMS & CISA training with a 99.6% success rate, helping professionals achieve global certifications.",
      ),
      ...HOME_COURSE_SCHEMAS,
    ],
  },
  "/about-aia": {
    title: "About Academy of Internal Audit (AIA) | Our Expertise",
    description:
      "Learn about Academy of Internal Audit, our professional certification training, experienced faculty and learning support for audit, fraud and compliance",
    keywords:
      "About AIA, Academy of Internal Audit history, AIA success rate, professional training institute",
    canonicalPath: "/about-aia",
    author: "Academy of Internal Audit",
    publisher: "Academy of Internal Audit (AIA)",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/about-aia",
        "About Academy of Internal Audit (AIA) | Our Expertise",
        "Learn about Academy of Internal Audit, our professional certification training, experienced faculty and learning support for audit, fraud and compliance",
      ),
    ],
  },
  "/cfe-curriculum": {
    title: "Certified Fraud Examiner (CFE) Course & Training | AIA",
    description:
      "Get Certification in Certified Fraud Examiner Course with AIA Institute to become a skilled Certified Fraud Investigator and unlock fraud prevention mystery.",
    keywords: getMetaKeywords("cfe"),
    canonicalPath: "/cfe-curriculum",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/cfe-curriculum",
        "Certified Fraud Examiner (CFE) Course & Training | AIA",
        "Get Certification in Certified Fraud Examiner Course with AIA Institute to become a skilled Certified Fraud Investigator and unlock fraud prevention mystery.",
      ),
      createCourseSchema(COURSE_SCHEMAS["/cfe-curriculum"]),
    ],
  },
  "/cia-curriculum": {
    title: "Certified Internal Auditor (CIA) Course & Training | AIA",
    description:
      "Elevate your auditing career with AIA Institute which help you to ace your Certified Internal Auditor Course (CIA) and get your Internal Audit Certification.",
    keywords: getMetaKeywords("cia"),
    canonicalPath: "/cia-curriculum",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/cia-curriculum",
        "Certified Internal Auditor (CIA) Course & Training | AIA",
        "Elevate your auditing career with AIA Institute which help you to ace your Certified Internal Auditor Course (CIA) and get your Internal Audit Certification.",
      ),
      createCourseSchema(COURSE_SCHEMAS["/cia-curriculum"]),
    ],
  },
  "/cia-challenge-curriculum": {
    title: "CIA Challenge Exam Prep Course & Study Support | AIA",
    description:
      "Short on time? AIA's CIA Challenge Prep helps busy auditors fast-track their certification with flexible notes, expert-recorded lectures, and 1:1 live support. Enroll today!",
    keywords: getMetaKeywords("ciaChallenge"),
    canonicalPath: "/cia-challenge-curriculum",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/cia-challenge-curriculum",
        "CIA Challenge Exam Prep Course & Study Support | AIA",
        "Short on time? AIA's CIA Challenge Prep helps busy auditors fast-track their certification with flexible notes, expert-recorded lectures, and 1:1 live support. Enroll today!",
      ),
      createCourseSchema(COURSE_SCHEMAS["/cia-challenge-curriculum"]),
    ],
  },
  "/cams": {
    title: "CAMS Course: Certified Anti-Money Laundering Specialist",
    description:
      "Prepare to excel in CAMS Certification Exam with AIA's CAMS Study Guide and CAMS Practice Questions provided for Certified Anti Money Laundering Specialist.",
    keywords: getMetaKeywords("cams"),
    canonicalPath: "/cams",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/cams",
        "CAMS Course: Certified Anti-Money Laundering Specialist",
        "Prepare to excel in CAMS Certification Exam with AIA's CAMS Study Guide and CAMS Practice Questions provided for Certified Anti Money Laundering Specialist.",
      ),
      createCourseSchema(COURSE_SCHEMAS["/cams"]),
    ],
  },
  "/cisa": {
    title: "CISA Certification Course & Exam Training | AIA",
    description:
      "Prepare to excel in CISA Certification Exam with AIA's CISA Prep Course. Get access to official ISACA study resource kits, recorded video lectures, and doubt sessions.",
    keywords: getMetaKeywords("cisa"),
    canonicalPath: "/cisa",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/cisa",
        "CISA Certification Course & Exam Training | AIA",
        "Prepare to excel in CISA Certification Exam with AIA's CISA Prep Course. Get access to official ISACA study resource kits, recorded video lectures, and doubt sessions.",
      ),
      createCourseSchema(COURSE_SCHEMAS["/cisa"]),
    ],
  },
  "/blogs": {
    title: "Audit Certification Blogs: CIA, CFE, CAMS & CISA | AIA",
    description:
      "Read expert insights and practical guides on CIA, CFE, CAMS, CISA, internal audit, fraud examination and anti-money laundering certifications.",
    keywords: getMetaKeywords("blogs"),
    canonicalPath: "/blogs",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/blogs",
        "Audit Certification Blogs: CIA, CFE, CAMS & CISA | AIA",
        "Read expert insights and practical guides on CIA, CFE, CAMS, CISA, internal audit, fraud examination and anti-money laundering certifications.",
      ),
    ],
  },
  "/alumni-network": {
    title: "AIA Alumni Network | CIA, CFE & CAMS Success Stories",
    description:
      "Discover AIA alumni stories and professional milestones from CIA, CFE and CAMS learners across countries. Explore the network and their certification journeys.",
    keywords:
      "AIA alumni, student success stories, CIA pass outs, CFE results, CAMS success",
    canonicalPath: "/alumni-network",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/alumni-network",
        "AIA Alumni Network | CIA, CFE & CAMS Success Stories",
        "Discover AIA alumni stories and professional milestones from CIA, CFE and CAMS learners across countries. Explore the network and their certification journeys.",
      ),
    ],
  },
  "/fillter": {
    title: "Alumni Filter Directory | Academy of Internal Audit",
    description:
      "Search and filter through the Academy of Internal Audit global professional network and alumni directory.",
    keywords:
      "AIA alumni directory, filter alumni, CFE directory, CIA directory, CAMS directory",
    canonicalPath: "/fillter",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/fillter",
        "Alumni Filter Directory | Academy of Internal Audit",
        "Search and filter through the Academy of Internal Audit global professional network and alumni directory.",
      ),
    ],
  },
  "/filter": {
    title: "Alumni Filter Directory | Academy of Internal Audit",
    description:
      "Search and filter through the Academy of Internal Audit global professional network and alumni directory.",
    keywords:
      "AIA alumni directory, filter alumni, CFE directory, CIA directory, CAMS directory",
    canonicalPath: "/fillter",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/fillter",
        "Alumni Filter Directory | Academy of Internal Audit",
        "Search and filter through the Academy of Internal Audit global professional network and alumni directory.",
      ),
    ],
  },
  "/aia-times": {
    title: "AIA Times | News, Magazines & Media Updates",
    description:
      "Explore AIA Times for magazines, news, media coverage, press mentions, expert insights and updates from the Academy of Internal Audit.",
    keywords:
      "AIA Times, AIA magazine, Academy of Internal Audit news, fraud examination insights, audit magazine",
    canonicalPath: "/aia-times",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/aia-times",
        "AIA Times | News, Magazines & Media Updates",
        "Explore AIA Times for magazines, news, media coverage, press mentions, expert insights and updates from the Academy of Internal Audit.",
      ),
    ],
  },
  "/aia-times/flip-book": {
    title: "AIA Times Flip Book - Interactive Magazine Reader | AIA",
    description:
      "Read the AIA Times magazine in an interactive flip book experience with expert insights, news, and updates from the Academy of Internal Audit.",
    keywords:
      "AIA Times flip book, AIA magazine reader, audit magazine online, fraud examination insights",
    canonicalPath: "/aia-times/flip-book",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/aia-times/flip-book",
        "AIA Times Flip Book - Interactive Magazine Reader | AIA",
        "Read the AIA Times magazine in an interactive flip book experience with expert insights, news, and updates from the Academy of Internal Audit.",
      ),
    ],
  },
  "/cfe-free-resources": {
    title: "Free CFE Study Material, Practice Questions & Resources",
    description:
      "Access free CFE study material, practice questions, flashcards and video resources to support your Certified Fraud Examiner exam preparation.",
    keywords:
      "free CFE resources, CFE practice questions, CFE flashcards, CFE study material",
    canonicalPath: "/cfe-free-resources",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/cfe-free-resources",
        "Free CFE Study Material, Practice Questions & Resources",
        "Access free CFE study material, practice questions, flashcards and video resources to support your Certified Fraud Examiner exam preparation.",
      ),
    ],
  },
  "/cia-free-resources": {
    title: "Free CIA Study Material, Practice Questions & Resources",
    description:
      "Explore free CIA study material, practice questions, flashcards and video resources to support your Certified Internal Auditor exam preparation.",
    keywords:
      "free CIA resources, CIA practice questions, CIA study guide, internal audit free prep",
    canonicalPath: "/cia-free-resources",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/cia-free-resources",
        "Free CIA Study Material, Practice Questions & Resources",
        "Explore free CIA study material, practice questions, flashcards and video resources to support your Certified Internal Auditor exam preparation.",
      ),
    ],
  },
  "/cams-free-resources": {
    title: "Free CAMS Study Material, Practice Questions & Resources",
    description:
      "Access free CAMS study material, practice questions and learning resources to build your understanding of anti-money laundering and CAMS exam topics.",
    keywords:
      "free CAMS resources, CAMS practice questions, CAMS study material",
    canonicalPath: "/cams-free-resources",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/cams-free-resources",
        "Free CAMS Study Material, Practice Questions & Resources",
        "Access free CAMS study material, practice questions and learning resources to build your understanding of anti-money laundering and CAMS exam topics.",
      ),
    ],
  },
  "/cisa-free-resources": {
    title: "Free CISA Study Material, Practice Questions & Resources",
    description:
      "Explore free CISA study material, domain-wise practice questions, flashcards and videos to support your Certified Information Systems Auditor exam preparation.",
    keywords:
      "free CISA resources, CISA practice questions, CISA flashcards, CISA study material, ISACA CISA prep",
    canonicalPath: "/cisa-free-resources",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/cisa-free-resources",
        "Free CISA Study Material, Practice Questions & Resources",
        "Explore free CISA study material, domain-wise practice questions, flashcards and videos to support your Certified Information Systems Auditor exam preparation.",
      ),
    ],
  },
  "/corporate-training": {
    title: "Corporate Internal Audit Training & Risk Management | AIA",
    description:
      "Build team capabilities with corporate training in internal audit, fraud detection and risk management. Explore tailored learning programs for organisations.",
    keywords:
      "corporate audit training, risk management training, fraud detection for organizations",
    canonicalPath: "/corporate-training",
    schemas: [
      organizationSchema,
      localBusinessSchema,
      createWebPageSchema(
        "/corporate-training",
        "Corporate Internal Audit Training & Risk Management | AIA",
        "Build team capabilities with corporate training in internal audit, fraud detection and risk management. Explore tailored learning programs for organisations.",
      ),
    ],
  },
  "/enroll-now": {
    title: "Enroll in CIA, CFE, CAMS & CISA Courses | AIA",
    description:
      "Enrol in AIA’s CIA, CFE, CAMS and CISA certification training programs. Connect with the team for course details and enrolment assistance.",
    keywords:
      "enroll AIA, CIA enrollment, CFE enrollment, CAMS enrollment, audit certification admission",
    canonicalPath: "/enroll-now",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/enroll-now",
        "Enroll in CIA, CFE, CAMS & CISA Courses | AIA",
        "Enrol in AIA’s CIA, CFE, CAMS and CISA certification training programs. Connect with the team for course details and enrolment assistance.",
      ),
    ],
  },
  "/contact": {
    title: "Contact Academy of Internal Audit (AIA) | Get in Touch",
    description:
      "Contact Academy of Internal Audit for information about CIA, CFE, CAMS and CISA courses, enrolment, training support and certification preparation.",
    keywords:
      "contact AIA, Academy of Internal Audit phone, AIA email, audit training support",
    canonicalPath: "/contact",
    schemas: [
      organizationSchema,
      localBusinessSchema,
      createWebPageSchema(
        "/contact",
        "Contact Academy of Internal Audit (AIA) | Get in Touch",
        "Contact Academy of Internal Audit for information about CIA, CFE, CAMS and CISA courses, enrolment, training support and certification preparation.",
      ),
    ],
  },
  "/thank-you": {
    title: "Thank You for Choosing AIA | Your Journey Starts Here",
    description:
      "Thank you for contacting Academy of Internal Audit. Our team will connect with you shortly to assist with your CFE, CIA, CAMS, CISA certifications enquiries.",
    keywords:
      "thank you AIA, Academy of Internal Audit, CFE, CIA, CAMS, CISA certification enquiries",
    canonicalPath: "/thank-you",
    noIndex: true,
    robots: "noindex, nofollow",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/thank-you",
        "Thank You for Choosing AIA | Your Journey Starts Here",
        "Thank you for contacting Academy of Internal Audit. Our team will connect with you shortly to assist with your CFE, CIA, CAMS, CISA certifications enquiries.",
      ),
    ],
  },
  "/policies": {
    title: "AIA Policies | Privacy, Refund & Course Policies",
    description:
      "Review Academy of Internal Audit policies, including privacy, refunds, payments, course access and student service guidelines.",
    keywords: "AIA policies, privacy policy, refund policy",
    canonicalPath: "/policies",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/policies",
        "AIA Policies | Privacy, Refund & Course Policies",
        "Review Academy of Internal Audit policies, including privacy, refunds, payments, course access and student service guidelines.",
      ),
    ],
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | Academy of Internal Audit",
    description:
      "Read the terms and conditions governing AIA courses and services, including enrolment, payments, course access and applicable user responsibilities.",
    keywords: "AIA terms and conditions, course usage policy",
    canonicalPath: "/terms-and-conditions",
    schemas: [
      organizationSchema,
      createWebPageSchema(
        "/terms-and-conditions",
        "Terms & Conditions | Academy of Internal Audit",
        "Read the terms and conditions governing AIA courses and services, including enrolment, payments, course access and applicable user responsibilities.",
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
    .split("-")
    .filter(Boolean)
    .map((word) => {
      const upper = word.toUpperCase();
      if (["AIA", "CIA", "CFE", "CAMS", "CISA", "CIAC"].includes(upper))
        return upper;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Constructs production-grade SEO metadata and Schema.org graph for a dynamic blog article.
 * Can be called both during SSG pre-rendering and on client-side React hydration when API data arrives.
 */
export function buildDynamicBlogSeo(
  blog: {
    blog_slug: string;
    blog_heading: string;
    blog_meta_title?: string;
    blog_meta_description?: string;
    blog_short_description?: string;
    blog_meta_keywords?: string;
    blog_course?: string;
    blog_created?: string;
    blog_updated?: string;
    blog_images?: string;
    blog_index?: string;
  },
  faq: Array<{ faq_que: string; faq_ans: string }> = [],
  path?: string,
): RouteSeoEntry {
  const b = blog;
  const canonicalPath = path || `/blogs/${b.blog_slug}`;
  const title = b.blog_meta_title || `${b.blog_heading} | ${SITE_NAME}`;
  const description =
    b.blog_meta_description ||
    b.blog_short_description ||
    `Read expert insights and exam preparation guide on ${b.blog_heading} by ${SITE_NAME}.`;
  const keywords =
    b.blog_meta_keywords ||
    `${b.blog_heading}, ${b.blog_course || "Internal Audit"} exam prep, AIA articles`;
  const schemas: Thing[] = [
    organizationSchema,
    websiteSchema,
    createWebPageSchema(canonicalPath, title, description),
    createBreadcrumbSchema(
      [
        { name: "Home", path: "/" },
        { name: "Blogs", path: "/blogs" },
        { name: b.blog_heading, path: canonicalPath },
      ],
      canonicalPath,
    ),
    createArticleSchema(b),
  ];

  if (faq && faq.length > 0) {
    schemas.push(createFaqSchema(faq, canonicalPath));
  }

  return {
    title,
    description,
    keywords,
    canonicalPath,
    author: DEFAULT_AUTHOR,
    publisher: DEFAULT_PUBLISHER,
    ...(b.blog_index === "no"
      ? { noIndex: true, robots: "noindex, follow" }
      : {}),
    schemas,
    isFallback: false,
  };
}

/**
 * Constructs production-grade SEO metadata and Schema.org Review graph for a dynamic student passout story.
 */
export function buildDynamicStudentStorySeo(
  story: {
    student_slug: string;
    student_name: string;
    student_course?: string;
    student_story_short_description?: string;
    student_testimonial?: string;
    [key: string]: any;
  },
  path?: string,
): RouteSeoEntry {
  const s = story;
  const canonicalPath = path || `/passout-stories/${s.student_slug}`;
  const title = `${s.student_name} - ${s.student_course || "AIA"} Success Story | ${SITE_NAME}`;
  const description =
    s.student_story_short_description ||
    `Read how ${s.student_name} cleared the ${s.student_course || "certification"} exam with the Academy of Internal Audit.`;
  const keywords = `${s.student_name} success story, ${s.student_course || "AIA"} passout, AIA alumni, CIA CFE CAMS results`;

  return {
    title,
    description,
    keywords,
    canonicalPath,
    author: DEFAULT_AUTHOR,
    publisher: DEFAULT_PUBLISHER,
    noIndex: true,
    robots: "noindex, follow",
    schemas: [
      organizationSchema,
      websiteSchema,
      createWebPageSchema(canonicalPath, title, description),
      createBreadcrumbSchema(
        [
          { name: "Home", path: "/" },
          { name: "Alumni Network", path: "/alumni-network" },
          { name: `${s.student_name} Story`, path: canonicalPath },
        ],
        canonicalPath,
      ),
      createStudentReviewSchema(s as any),
    ],
    isFallback: false,
  };
}

const ROUTE_FAQ_MAP: Record<string, string> = {
  "/": "home",
  "/cfe-curriculum": "cfe-curriculum",
  "/cams": "cams",
  "/cia-challenge-curriculum": "cia-challenge-curriculum",
  "/cia-curriculum": "cia-curriculum",
  "/cisa": "cisa",
};

/**
 * Breadcrumb hierarchy for every static route. Course pages use their actual
 * Course schema names since no dedicated `/courses` hub page exists.
 */
const ROUTE_BREADCRUMBS: Record<
  string,
  Array<{ name: string; path: string }>
> = {
  "/": [{ name: "Home", path: "/" }],
  "/about-aia": [
    { name: "Home", path: "/" },
    { name: "About AIA", path: "/about-aia" },
  ],
  "/cfe-curriculum": [
    { name: "Home", path: "/" },
    {
      name: COURSE_SCHEMAS["/cfe-curriculum"].name,
      path: "/cfe-curriculum",
    },
  ],
  "/cia-curriculum": [
    { name: "Home", path: "/" },
    {
      name: COURSE_SCHEMAS["/cia-curriculum"].name,
      path: "/cia-curriculum",
    },
  ],
  "/cia-challenge-curriculum": [
    { name: "Home", path: "/" },
    {
      name: COURSE_SCHEMAS["/cia-challenge-curriculum"].name,
      path: "/cia-challenge-curriculum",
    },
  ],
  "/cams": [
    { name: "Home", path: "/" },
    { name: COURSE_SCHEMAS["/cams"].name, path: "/cams" },
  ],
  "/cisa": [
    { name: "Home", path: "/" },
    { name: COURSE_SCHEMAS["/cisa"].name, path: "/cisa" },
  ],
  "/blogs": [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
  ],
  "/alumni-network": [
    { name: "Home", path: "/" },
    { name: "Alumni Network", path: "/alumni-network" },
  ],
  "/fillter": [
    { name: "Home", path: "/" },
    { name: "Alumni Network", path: "/alumni-network" },
    { name: "Alumni Directory", path: "/fillter" },
  ],
  "/filter": [
    { name: "Home", path: "/" },
    { name: "Alumni Network", path: "/alumni-network" },
    { name: "Alumni Directory", path: "/fillter" },
  ],
  "/aia-times": [
    { name: "Home", path: "/" },
    { name: "AIA Times", path: "/aia-times" },
  ],
  "/aia-times/flip-book": [
    { name: "Home", path: "/" },
    { name: "AIA Times", path: "/aia-times" },
    { name: "Flip Book", path: "/aia-times/flip-book" },
  ],
  "/cfe-free-resources": [
    { name: "Home", path: "/" },
    { name: "CFE Free Resources", path: "/cfe-free-resources" },
  ],
  "/cia-free-resources": [
    { name: "Home", path: "/" },
    { name: "CIA Free Resources", path: "/cia-free-resources" },
  ],
  "/cams-free-resources": [
    { name: "Home", path: "/" },
    { name: "CAMS Free Resources", path: "/cams-free-resources" },
  ],
  "/cisa-free-resources": [
    { name: "Home", path: "/" },
    { name: "CISA Free Resources", path: "/cisa-free-resources" },
  ],
  "/corporate-training": [
    { name: "Home", path: "/" },
    { name: "Corporate Training", path: "/corporate-training" },
  ],
  "/enroll-now": [
    { name: "Home", path: "/" },
    { name: "Enroll Now", path: "/enroll-now" },
  ],
  "/contact": [
    { name: "Home", path: "/" },
    { name: "Contact Us", path: "/contact" },
  ],
  "/thank-you": [
    { name: "Home", path: "/" },
    { name: "Thank You", path: "/thank-you" },
  ],
  "/policies": [
    { name: "Home", path: "/" },
    { name: "Policies", path: "/policies" },
  ],
  "/terms-and-conditions": [
    { name: "Home", path: "/" },
    { name: "Terms and Conditions", path: "/terms-and-conditions" },
  ],
};

/**
 * Core route resolver determining the exact SEO metadata and Schema.org graph for any URL.
 * Handles both registered static routes and dynamic parameterized patterns.
 *
 * RESOLUTION PIPELINE:
 * 1. Normalize Path: Strips query params, trailing slashes, and hash fragments.
 * 2. Static Route Lookup: Instant O(1) match against pre-compiled `ROUTE_SEO`.
 * 3. Dynamic Course Blogs (`/blogs/course/:courseName`): Generates course-specific collection metadata
 *    and breadcrumbs linking Home -> Blogs -> Course.
 * 4. Dynamic Blog Post (`/blogs/:id`): Reads article details, headings, and FAQs from the build-time
 *    `dynamicBlogsMap` cache. Generates valid `BlogPosting` and `FAQPage` schemas.
 * 5. Dynamic Practice Questions (`/cfe-free-resource/:questions_module`): Formats module title and breadcrumbs.
 * 6. Dynamic Student Stories (`/passout-stories/:slug`): Retrieves student testimonials and produces
 *    type-safe Schema.org `Review` entities for Google Rich Results.
 * 7. 404 Fallback: Marks unmatched routes with `noIndex: true` and generic metadata.
 *
 * @param url - Relative route URL or full pathname (e.g. '/cfe-curriculum' or '/blogs/aml-career')
 * @returns Complete `RouteSeoEntry`
 */
function resolveRawSeoForRoute(url: string): RouteSeoEntry {
  const path = url.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";

  // 1. Direct match in ROUTE_SEO table
  if (ROUTE_SEO[path]) {
    const baseEntry = ROUTE_SEO[path];
    const schemas = [...(baseEntry.schemas || [])];

    // Automatically inject BreadcrumbList schema for static routes
    const breadcrumbTrail = ROUTE_BREADCRUMBS[path];
    if (
      breadcrumbTrail &&
      !schemas.some((s) => (s as any)["@type"] === "BreadcrumbList")
    ) {
      schemas.push(
        createBreadcrumbSchema(
          breadcrumbTrail,
          baseEntry.canonicalPath || path,
        ),
      );
    }

    // Automatically inject verified FAQPage schema if available for this route
    const faqSlug = ROUTE_FAQ_MAP[path];
    if (faqSlug) {
      const faqs = getDynamicFaqBySlug(faqSlug);
      if (
        faqs &&
        faqs.length > 0 &&
        !schemas.some((s) => (s as any)["@type"] === "FAQPage")
      ) {
        schemas.push(createFaqSchema(faqs, path));
      }
    }
    // Automatically inject Review schema from testimonials on matching route (when data exists)
    try {
      const testimonials = getDynamicTestimonialsByRoute(path);
      if (
        testimonials &&
        testimonials.length > 0 &&
        !schemas.some((s) => (s as any)["@type"] === "Review")
      ) {
        testimonials.forEach((t) => {
          if (!t) return;
          schemas.push(createTestimonialReviewSchema(t, path));
        });
      }
    } catch (err) {
      console.warn(`⚠️ [SEO] Testimonial schema injection failed for ${path}:`, err);
    }

    return {
      ...baseEntry,
      schemas,
    };
  }

  // 2. Dynamic pattern match: /blogs/course/:courseName (e.g., /blogs/course/cfe)
  const courseMatch = path.match(/^\/blogs\/course\/([^/]+)$/);
  if (courseMatch) {
    const courseSlug = courseMatch[1];
    const courseTitle = formatSlugToTitle(courseSlug);
    const title = `${courseTitle} Certification Articles & Guides | ${SITE_NAME}`;
    const description = `Explore comprehensive ${courseTitle} certification articles, exam preparation tips, syllabus updates, and career insights from ${SITE_NAME} experts.`;
    return {
      title,
      description,
      keywords: `${courseTitle} blogs, ${courseTitle} certification articles, ${courseTitle} exam tips, AIA`,
      canonicalPath: path,
      schemas: [
        organizationSchema,
        websiteSchema,
        createWebPageSchema(path, title, description),
        createBreadcrumbSchema(
          [
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blogs" },
            { name: `${courseTitle} Articles`, path },
          ],
          path,
        ),
      ],
    };
  }

  // 3. Dynamic pattern match: /blogs/:id (e.g., /blogs/cfe-module-1)
  const blogMatch = path.match(/^\/blogs\/([^/]+)$/);
  if (blogMatch && blogMatch[1] !== "course") {
    const slug = blogMatch[1];
    // Retrieve live article from pre-fetched build-time cache
    const dynamicBlog = getDynamicBlog(slug);

    if (dynamicBlog && dynamicBlog.data) {
      return buildDynamicBlogSeo(dynamicBlog.data, dynamicBlog.faq || [], path);
    }

    // Graceful fallback if not yet loaded in memory
    const blogTitle = formatSlugToTitle(slug);
    const title = `${blogTitle} | ${SITE_NAME}`;
    const description = `Read expert insights and detailed exam preparation guide on ${blogTitle} by ${SITE_NAME}.`;
    return {
      title,
      description,
      keywords: `${blogTitle}, internal audit blog, exam prep, AIA articles`,
      canonicalPath: path,
      schemas: [
        organizationSchema,
        websiteSchema,
        createWebPageSchema(path, title, description),
        createBreadcrumbSchema(
          [
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blogs" },
            { name: blogTitle, path },
          ],
          path,
        ),
        createArticleSchema({
          blog_slug: slug,
          blog_heading: blogTitle,
          blog_short_description: description,
        }),
      ],
      isFallback: true,
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
        createBreadcrumbSchema(
          [
            { name: "Home", path: "/" },
            { name: "CFE Free Resources", path: "/cfe-free-resources" },
            { name: `${modTitle} Questions`, path },
          ],
          path,
        ),
      ],
    };
  }

  // 5. Dynamic pattern match: /passout-stories/:slug (e.g., /passout-stories/sahil-babbar-ciac)
  const passoutMatch = path.match(/^\/passout-stories\/([^/]+)$/);
  if (passoutMatch) {
    const slug = passoutMatch[1];
    // Retrieve student story from pre-fetched build-time cache
    const dynamicStory = getDynamicStudentStory(slug);

    if (dynamicStory && dynamicStory.data) {
      return buildDynamicStudentStorySeo(dynamicStory.data, path);
    }

    const studentName = formatSlugToTitle(slug);
    const title = `${studentName} | Student Success Story | ${SITE_NAME}`;
    const description = `Read ${studentName}'s success story after clearing CIA, CFE or CAMS exams with ${SITE_NAME}.`;
    return {
      title,
      description,
      keywords: `${studentName} success story, AIA alumni, CIA CFE CAMS results`,
      canonicalPath: path,
      noIndex: true,
      robots: "noindex, follow",
      schemas: [
        organizationSchema,
        createWebPageSchema(path, title, description),
        createBreadcrumbSchema(
          [
            { name: "Home", path: "/" },
            { name: "Alumni Network", path: "/alumni-network" },
            { name: studentName, path },
          ],
          path,
        ),
        createStudentReviewSchema({
          student_slug: slug,
          student_name: studentName,
          student_story_short_description: description,
        }),
      ],
      isFallback: true,
    };
  }

  // 6. Fallback 404 handler for unknown routes
  return {
    title: `${SITE_NAME} | Page Not Found`,
    description: "The requested page could not be found.",
    keywords: "404, not found",
    canonicalPath: path,
    noIndex: true,
    schemas: [
      organizationSchema,
      createBreadcrumbSchema(
        [
          { name: "Home", path: "/" },
          { name: "Page Not Found", path },
        ],
        path,
      ),
    ],
  };
}

export function getSeoForRoute(url: string): RouteSeoEntry {
  const result = resolveRawSeoForRoute(url);
  return {
    ...result,
    author: result.author || DEFAULT_AUTHOR,
    publisher: result.publisher || DEFAULT_PUBLISHER,
  };
}
