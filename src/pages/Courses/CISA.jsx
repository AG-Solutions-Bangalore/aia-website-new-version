import React, { lazy } from "react";

import DeferredPopUp from "@/components/common/deferred-popup";
import LazySection from "@/components/common/lazy-section";
import HomeHero from "@/components/home/home-hero";
import CisaAbout from "@/components/courses/cisa/cisa-about";
import BannerLogos from "@/components/courses/common/banner-logos";

const CourseTopStudent = lazy(
  () => import("@/components/courses/common/course-top-student"),
);
const CisaCourseCurriculum = lazy(
  () => import("@/components/courses/cisa/cisa-course-curriculum"),
);
const CisaEligibility = lazy(
  () => import("@/components/courses/cisa/cisa-eligibility"),
);
const CourseResult = lazy(
  () => import("@/components/courses/common/course-result"),
);
const CisaJourney = lazy(
  () => import("@/components/courses/cisa/cisa-journey"),
);
const CisaWhyAia = lazy(() => import("@/components/courses/cisa/cisa-why-aia"));
const WhatsappCarosal = lazy(
  () => import("@/components/common/whatsapp-carosal"),
);
const CisaHighlight = lazy(
  () => import("@/components/courses/cisa/cisa-highlight"),
);
const CisaIndiaMap = lazy(
  () => import("@/components/courses/cisa/cisa-india-map"),
);
const CourseReview = lazy(() => import("@/components/common/course-review"));
const CourseYoutube = lazy(
  () => import("@/components/courses/common/course-youtube"),
);
const Pdf = lazy(() => import("@/components/common/pdf"));
const CourseYoutubeLecture = lazy(
  () => import("@/components/courses/common/course-youtube-lecture"),
);
const CisaCourseLms = lazy(
  () => import("@/components/courses/cisa/cisa-course-lms"),
);
const CisaUnique = lazy(() => import("@/components/courses/cisa/cisa-unique"));
const CourseAchivers = lazy(
  () => import("@/components/common/course-achivers"),
);
const HomeBlog = lazy(() => import("@/components/home/home-blogs"));
const CamsConnection = lazy(
  () => import("@/components/courses/cams/cams-connection"),
);
const HomeAlumniWork = lazy(
  () => import("@/components/home/home-alumini-work"),
);
const CisaFaq = lazy(() => import("@/components/courses/cisa/cisa-faq"));

const CISA = () => {
  return (
    <div>
      {/* Initial load */}
      <DeferredPopUp slug="CISA" />
      <HomeHero slug="cisa" />
      {/* <BannerLogos /> */}
      <CisaAbout />

      <LazySection minHeight={420}>
        <CourseTopStudent
          courseSlug="all"
          needPrefix="true"
          title="Meet our AIA Certified Achievers"
          subtitle="Meet AIA’s latest achievers who successfully earned their credentials through structured preparation and exam-ready guidance."
        />
      </LazySection>

      {/* Eligibility Requirements */}
      <LazySection minHeight={450}>
        <CisaEligibility />
      </LazySection>

      {/* Journey Guide */}
      <LazySection minHeight={500}>
        <CisaJourney />
      </LazySection>

      {/* Why AIA / Key Advantages (Diamonds) */}
      <LazySection minHeight={450}>
        <CisaWhyAia />
      </LazySection>

      {/* Reflections / Testimonials */}
      <LazySection minHeight={500}>
        <WhatsappCarosal
          title="Unfiltered Reflections from AIA-Trained Professionals"
          description="Heartfelt messages shared by professionals after completing their journey with AIA. Each message reflects a different experience. These reflections provide a genuine view of what preparation looks like in real situations, beyond structured testimonials."
          course="all"
        />
      </LazySection>

      {/* Highlights / Accreditations */}
      <LazySection minHeight={450}>
        <CisaHighlight />
      </LazySection>

      {/* Custom India Map & States List */}
      <LazySection minHeight={500}>
        <CisaIndiaMap />
      </LazySection>

      {/* Google Reviews */}
      <LazySection minHeight={450}>
        <CourseReview
          slug="home"
          title="300+ Professional Experiences Shared"
        />
      </LazySection>

      {/* YouTube Success Interviews */}
      <LazySection minHeight={480}>
        <CourseYoutube
          courseSlug="cisa"
          title="Hear from Our Recently Qualified Professionals on YouTube"
          description="Watch AIA-trained professionals share their CISA journey, exam strategies, and career insights in exclusive interviews with Puneet Sir on YouTube."
        />
      </LazySection>

      {/* Know Your Trainer */}
      <LazySection minHeight={500}>
        <Pdf />
      </LazySection>

      {/* Video Concept Lectures */}
      <LazySection minHeight={420}>
        <CourseYoutubeLecture
          courseSlug="cisa"
          title="Master CISA Concepts with AIA’s Video Learning Series"
          description="Explore concise video sessions by Puneet Sir covering key CISA topics, simplified for practical clarity and exam-focused understanding."
        />
      </LazySection>

      {/* Curriculum Accordion/Tabs */}
      <LazySection minHeight={650}>
        <CisaCourseCurriculum />
      </LazySection>

      {/* Curriculum Results certificates */}
      <LazySection minHeight={500}>
        <CourseResult
          course="cisa"
          queryKey="cisa-certificates"
          title="CISA Exam Results by AIA Professionals"
          description="Actual score results of professionals who cleared the CISA Exam through AIA’s structured, exam-focused preparation."
        />
      </LazySection>

      {/* Study Materials & ISACA Prep Kit slider */}
      <LazySection minHeight={420}>
        <CisaCourseLms image="lms_CISA.webp" />
      </LazySection>

      {/* Unique features checklist */}
      <LazySection minHeight={450}>
        <CisaUnique />
      </LazySection>

      {/* Achievers list */}
      <LazySection minHeight={500}>
        <CourseAchivers
          slug="cisa"
          title="Meet the Professionals Who Earned Their CISA Credential"
          description="Meet AIA proud achievers who advance their careers by achieving the global CISA credential with structured prep and real-world expertise."
        />
      </LazySection>

      {/* Blogs */}
      <LazySection minHeight={420}>
        <HomeBlog />
      </LazySection>

      {/* Right Choice Connection */}
      <LazySection minHeight={420}>
        <CamsConnection
          title="The Right Certification Starts With The Right Choice"
          description="Find the certification that aligns with your background and career stage"
          buttonColors={["#a8e6f3", "#fee1c6", "#e2ffdc", "#f5dbf5"]}
          images={[
            { image: "hiw_cfe.webp", link: "/cfe-curriculum" },
            { image: "hiw_cia.webp", link: "/cia-curriculum" },
            { image: "hiw_ciac.webp", link: "/cia-challenge-curriculum" },
            { image: "hiw_cams.webp", link: "/cams" },
          ]}
        />
      </LazySection>

      {/* Alumni Work marquee */}
      <LazySection minHeight={300}>
        <HomeAlumniWork />
      </LazySection>

      {/* FAQs */}
      <LazySection minHeight={350}>
        <CisaFaq />
      </LazySection>
    </div>
  );
};

export default CISA;
