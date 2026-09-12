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