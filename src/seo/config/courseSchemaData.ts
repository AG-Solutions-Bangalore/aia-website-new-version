/**
 * @file src/seo/config/courseSchemaData.ts
 * @description Editable business data for Schema.org Course offers and instances.
 *
 * TODO: REPLACE ALL MOCK VALUES BELOW WITH REAL CMS/BUSINESS DATA.
 * The values are intentionally centralized in this file so they can be updated
 * without touching the schema generation logic. Do not rely on the current
 * prices or dates for marketing/legal purposes until they are verified.
 */

import type { CourseInstance, CourseOffer } from "./schemaExamples";

export interface CourseSchemaData {
  offer: CourseOffer;
  courseInstance: CourseInstance;
}

export const courseSchemaData: Record<string, CourseSchemaData> = {
  // TODO: Add the real CFE course price and batch dates.
  "/cfe-curriculum": {
    offer: {
      price: "49999",
      priceCurrency: "INR",
      category: "Paid",
      url: "https://aia.in.net/enroll-now",
    },
    courseInstance: {
      courseMode: "online",
      startDate: "2026-12-01",
      endDate: "2027-02-28",
    },
  },

  // TODO: Add the real CIA course price and batch dates.
  "/cia-curriculum": {
    offer: {
      price: "54999",
      priceCurrency: "INR",
      category: "Paid",
      url: "https://aia.in.net/enroll-now",
    },
    courseInstance: {
      courseMode: "online",
      startDate: "2026-12-01",
      endDate: "2027-02-28",
    },
  },

  // TODO: Add the real CIA Challenge course price and batch dates.
  "/cia-challenge-curriculum": {
    offer: {
      price: "39999",
      priceCurrency: "INR",
      category: "Paid",
      url: "https://aia.in.net/enroll-now",
    },
    courseInstance: {
      courseMode: "online",
      startDate: "2026-12-01",
      endDate: "2027-02-28",
    },
  },

  // TODO: Add the real CAMS course price and batch dates.
  "/cams": {
    offer: {
      price: "44999",
      priceCurrency: "INR",
      category: "Paid",
      url: "https://aia.in.net/enroll-now",
    },
    courseInstance: {
      courseMode: "online",
      startDate: "2026-12-01",
      endDate: "2027-02-28",
    },
  },

  // TODO: Add the real CISA course price and batch dates.
  "/cisa": {
    offer: {
      price: "49999",
      priceCurrency: "INR",
      category: "Paid",
      url: "https://aia.in.net/enroll-now",
    },
    courseInstance: {
      courseMode: "online",
      startDate: "2026-12-01",
      endDate: "2027-02-28",
    },
  },
};
