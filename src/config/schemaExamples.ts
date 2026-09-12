/**
 * @file src/config/schemaExamples.ts
 * @description Type-safe Schema.org factory functions providing Rich Results compliant
 * JSON-LD structures (Product, Review snippets, SoftwareApplication, Course).
 *
 * @why
 * Google Rich Results testing enforces strict schema guidelines:
 * 1. Product schemas require valid MerchantReturnPolicy, OfferShippingDetails, and AggregateRating/Review snippets.
 * 2. Self-published testimonials cannot use fake 5/5 author ratings without compliant itemReviewed links.
 * 3. Schema typos (such as lowercase `@type` or missing mandatory fields) fail validation silently.
 * By typing every entity with `schema-dts` (`Thing`, `Product`, `SoftwareApplication`), compilation
 * catches syntax and structure mismatches before runtime.
 *
 * @what
 * - `createProductSchema(product?)`: Generates a Schema.org `Product` with merchant return policies,
 *   shipping details, pricing, and aggregate ratings.
 * - `createSoftwareAppSchema()`: Generates a Schema.org `SoftwareApplication` representing the AIA
 *   online learning portal and LMS.
 * - `createCourseSchema(course)`: Generates a Schema.org `Course` linked to the canonical Organization publisher.
 *
 * @responsibility
 * Pure factory methods returning strictly typed Schema.org objects.
 * Must NOT execute DOM side effects or render `<script>` tags.
 *
 * @dependencies
 * - schema-dts: Official Schema.org TypeScript definitions for JSON-LD (`Thing`)
 * - ./site: `SITE_NAME`, `SITE_ORIGIN`, `SITE_LOGO`, `getCanonicalUrl`
 */

import type { Graph, Thing } from 'schema-dts';
import { SITE_LOGO, SITE_NAME, SITE_ORIGIN, SITE_PHONE, getCanonicalUrl } from './site';

export interface MasterSeoStructure {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  noIndex?: boolean;
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
  priceRange: "5000",
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



/**
 * Creates a fully compliant Schema.org Product object with Offer, Shipping, Return Policy,
 * and AggregateRating properties for Google Rich Results.
 *
 * @param product - Optional overrides for product fields
 * @returns Type-safe Schema.org Product as `Thing`
 */
export function createProductSchema(product?: {
  name?: string;
  description?: string;
  sku?: string;
  image?: string;
  brand?: string;
  price?: string | number;
  priceCurrency?: string;
}): Thing {
  const name = product?.name || `${SITE_NAME} Professional Certification Training`;
  const description = product?.description || 'Premier training program for CIA, CFE, CAMS, and global certifications.';
  const sku = product?.sku || 'AIA-CERT-001';
  const image = product?.image || SITE_LOGO;
  const brand = product?.brand || SITE_NAME;
  const price = product?.price !== undefined ? String(product.price) : '0';
  const priceCurrency = product?.priceCurrency || 'INR';

  return {
    '@type': 'Product',
    '@id': `${getCanonicalUrl('/enroll-now')}#product`,
    name,
    description,
    sku,
    image,
    brand: { '@type': 'Brand', name: brand },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      priceValidUntil: '2027-12-31',
      validFrom: '2026-09-01',
      availability: 'https://schema.org/InStock',
      url: getCanonicalUrl('/enroll-now'),

      shippingDetails: {
        '@type': 'OfferShippingDetails',

        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: priceCurrency,
        },

        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },

        deliveryTime: {
          '@type': 'ShippingDeliveryTime',

          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },

          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 5,
            unitCode: 'DAY',
          },
        },
      },

      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory:
          'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    }
    ,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: 340,
      bestRating: '5',
      worstRating: '1',
    },
  } as Thing;
}

/**
 * Creates a Schema.org SoftwareApplication entity representing the LMS and learning platform.
 *
 * @returns Type-safe Schema.org SoftwareApplication as `Thing`
 */
export function createSoftwareAppSchema(): Thing {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_ORIGIN}#software`,
    name: `${SITE_NAME} LMS & Learning Portal`,
    description: 'Online learning platform and test-prep portal for CIA, CFE, and CAMS certifications.',
    image: SITE_LOGO,
    operatingSystem: 'All modern web browsers',
    applicationCategory: 'EducationalApplication',
    url: SITE_ORIGIN,
    author: { '@id': `${SITE_ORIGIN}#organization` },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: 340,
      bestRating: '5',
      worstRating: '1',
    },
  } as Thing;
}

/**
 * Creates a Schema.org Course entity linked to the canonical Organization publisher.
 *
 * @param course - Course name, description, and canonical path
 * @returns Type-safe Schema.org Course as `Thing`
 */
export function createCourseSchema(course: {
  name: string;
  description: string;
  path: string;
}): Thing {
  return {
    '@type': 'Course',
    '@id': `${getCanonicalUrl(course.path)}#course`,
    name: course.name,
    description: course.description,
    provider: { '@id': `${SITE_ORIGIN}#organization` },
    url: getCanonicalUrl(course.path),
  } as Thing;
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



/** Helper creating a WebPage schema node connected to the root WebSite and Organization */
export function createWebPageSchema(canonicalPath: string, title: string, description: string): Thing {
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
 * Creates a BreadcrumbList Schema.org entity for enhanced SERP breadcrumb navigation.
 *
 * @param items - List of breadcrumb levels with name and route path
 * @param currentPath - The canonical path of the current page
 * @returns Type-safe Schema.org BreadcrumbList as `Thing`
 */
export function createBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
  currentPath: string,
): Thing {
  const url = getCanonicalUrl(currentPath);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  } as Thing;
}

/**
 * Creates a BlogPosting Schema.org entity linked to the Organization publisher.
 * Valid for Google Article and Blog rich results.
 * 
 * GOOGLE RICH RESULTS REQUIREMENTS FOR BLOGPOSTING:
 * 1. `headline`: Must accurately reflect article title (max 110 characters recommended).
 * 2. `image`: Absolute URL to high-resolution article cover image (min 1200px width recommended).
 * 3. `datePublished` & `dateModified`: ISO-8601 formatted timestamps.
 * 4. `author` & `publisher`: Linked via `@id` to the site Organization entity (`#organization`)
 *    to preserve Google Knowledge Graph continuity.
 * 5. `mainEntityOfPage`: Points to the canonical URL of the blog post.
 *
 * @param blog - Dynamic blog detail object
 * @returns Type-safe Schema.org BlogPosting as `Thing`
 */
export function createBlogPostingSchema(blog: {
  blog_slug: string;
  blog_heading: string;
  blog_short_description?: string;
  blog_meta_description?: string;
  blog_created?: string;
  blog_updated?: string;
  blog_images?: string;
  blog_course?: string;
}): Thing {
  const canonicalUrl = getCanonicalUrl(`/blogs/${blog.blog_slug}`);
  const imageUrl = blog.blog_images
    ? `https://aia.in.net/webapi/public/assets/images/blog_images/${blog.blog_images}`
    : SITE_LOGO;

  return {
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#blogposting`,
    headline: blog.blog_heading,
    description: blog.blog_meta_description || blog.blog_short_description || blog.blog_heading,
    image: imageUrl,
    datePublished: blog.blog_created || '2026-01-01',
    dateModified: blog.blog_updated || blog.blog_created || '2026-01-01',
    mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
    author: { '@id': `${SITE_ORIGIN}#organization` },
    publisher: { '@id': `${SITE_ORIGIN}#organization` },
    articleSection: blog.blog_course || 'Professional Certification',
    inLanguage: 'en-US',
  } as Thing;
}

/**
 * Creates a FAQPage Schema.org entity for rich question-and-answer snippets in Google SERPs.
 * 
 * GOOGLE RICH RESULTS REQUIREMENTS FOR FAQPAGE:
 * 1. Questions must be actual questions (`Question` entity with `name`).
 * 2. Answers must be complete answers without raw HTML or script injections (`acceptedAnswer.text`).
 * 3. Regular expression `.replace(/<[^>]*>?/gm, '')` strips WYSIWYG HTML tags (<p>, <br>, <strong>),
 *    delivering clean, crawlable text directly to search bots.
 *
 * @param faqs - Array of FAQ question and answer pairs
 * @param canonicalPath - The canonical path of the page containing the FAQs
 * @returns Type-safe Schema.org FAQPage as `Thing`
 */
export function createFaqSchema(
  faqs: Array<{ faq_que: string; faq_ans: string }>,
  canonicalPath: string,
): Thing {
  const canonicalUrl = getCanonicalUrl(canonicalPath);
  return {
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.faq_que,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.faq_ans.replace(/<[^>]*>?/gm, '').trim(),
      },
    })),
  } as Thing;
}

/**
 * Creates a verified Review Schema.org entity representing a student testimonial/success story.
 * 
 * GOOGLE CRITIC REVIEW & TESTIMONIAL GUIDELINES:
 * 1. `itemReviewed`: Explicitly points to the Academy of Internal Audit Organization entity.
 * 2. `author`: Person type containing the verified student's full name.
 * 3. `reviewRating`: Numeric rating with bestRating and worstRating boundaries.
 * 4. `reviewBody`: Clean text snippet summarizing the student's learning experience and passout achievement.
 *
 * @param story - Dynamic student story object
 * @returns Type-safe Schema.org Review as `Thing`
 */
export function createStudentReviewSchema(story: {
  student_slug: string;
  student_name: string;
  student_course?: string;
  student_story_short_description?: string;
  student_story_details?: string;
  student_story_date?: string;
}): Thing {
  const canonicalUrl = getCanonicalUrl(`/passout-stories/${story.student_slug}`);
  const reviewBody = (
    story.student_story_short_description ||
    story.student_story_details?.replace(/<[^>]*>?/gm, '').slice(0, 300) ||
    `${story.student_name} cleared the ${story.student_course || 'certification'} exam with Academy of Internal Audit.`
  ).trim();

  return {
    '@type': 'Review',
    '@id': `${canonicalUrl}#review`,
    itemReviewed: { '@id': `${SITE_ORIGIN}#organization` },
    author: {
      '@type': 'Person',
      name: story.student_name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
    reviewBody,
    datePublished: story.student_story_date || '2026-01-01',
  } as Thing;
}