import React, { lazy } from "react";

import DeferredPopUp from "@/components/common/deferred-popup";
import LazySection from "@/components/common/lazy-section";
import HomeHero from "@/components/home/home-hero";
import certificationCourses from "@/data/certificationCourses";

const AboutSection = lazy(() => import("@/components/about/about-section"));
const Pdf = lazy(() => import("@/components/common/pdf"));
const PdfJoinDialog = lazy(() => import("@/components/common/PdfForm"));
const AboutTestimonial = lazy(
  () => import("@/components/about/about-testimonial"),
);
const AboutMissionSection = lazy(
  () => import("@/components/about/about-mission-section"),
);
const AboutHighlight = lazy(() => import("@/components/about/about-highlight"));
const AboutJourney = lazy(() => import("@/components/about/about-journey"));
const AboutPartner = lazy(() => import("@/components/about/about-partner"));
const AboutReview = lazy(() => import("@/components/about/about-review"));
const OfficeCeleberation = lazy(
  () => import("@/components/common/celeberation"),
);
const HomeCourses = lazy(() => import("@/components/home/home-courses"));
const HomePrCarousel = lazy(() => import("@/components/home/home-pr-carousel"));
const CourseYoutubeLecture = lazy(
  () => import("@/components/courses/common/course-youtube-lecture"),
);


const AboutPage = () => {
  return (
    <div className="min-h-screen ">
      {/* Above the fold */}
      <DeferredPopUp slug="about-aia" />
      <HomeHero slug="about-aia" />

      <LazySection minHeight={420}>
        <AboutSection />
      </LazySection>

      <LazySection minHeight={120}>
        <div className="flex justify-center bg-[#FCFCFD] items-center py-12">
          <PdfJoinDialog
            course="AIA Profile"
            buttonlabel="Download AIA Profile"
            triggerClassName="w-auto"
            buttonClassName="text-xs sm:text-sm font-semibold cursor-pointer px-4 py-2.5 sm:px-5 sm:py-2.5 bg-[#F3831C] text-white rounded-none hover:bg-[#0F3652] transition-colors duration-300"
          />
        </div>
      </LazySection>

      <LazySection minHeight={500}>
        <Pdf />
      </LazySection>

      <LazySection minHeight={500}>
        <AboutTestimonial />
      </LazySection>

      <LazySection minHeight={420}>
        <AboutMissionSection />
      </LazySection>

      <LazySection minHeight={360}>
        <AboutHighlight />
      </LazySection>

      <LazySection minHeight={320}>
        <HomePrCarousel />
      </LazySection>

      <LazySection minHeight={450}>
        <AboutJourney />
      </LazySection>

      <LazySection minHeight={520}>
        <HomeCourses certificationCourses={certificationCourses} />
      </LazySection>

      <LazySection minHeight={320}>
        <AboutPartner />
      </LazySection>

      <LazySection minHeight={420}>
        <CourseYoutubeLecture courseSlug="about-aia" />
      </LazySection>

      <LazySection minHeight={420}>
        <AboutReview />
      </LazySection>

      <LazySection minHeight={320}>
        <OfficeCeleberation
          title="Inside Life at AIA"
          description="Snapshots from AIA’s workplace where teamwork, milestones, and shared wins come together - reflecting the culture behind everything we build."
        />
      </LazySection>
    </div>
  );
};

export default AboutPage;
