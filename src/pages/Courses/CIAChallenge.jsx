import React, { lazy } from "react";

import DeferredPopUp from "@/components/common/deferred-popup";
import LazySection from "@/components/common/lazy-section";
import HomeHero from "@/components/home/home-hero";
import CiaAbout from "@/components/courses/cia-challenge/cia-about";
import BannerLogos from "@/components/courses/common/banner-logos";

const CourseTopStudent = lazy(
  () => import("@/components/courses/common/course-top-student"),
);
const CiaCourseCurriculum = lazy(
  () => import("@/components/courses/cia-challenge/cia-cource-curriculam"),
);
const CourseResult = lazy(
  () => import("@/components/courses/common/course-result"),
);
const CiaJourney = lazy(
  () => import("@/components/courses/cia-challenge/cia-journey"),
);
const CiaWhyAia = lazy(
  () => import("@/components/courses/cia-challenge/cia-why-aia"),
);
const WhatsappCarosal = lazy(
  () => import("@/components/common/whatsapp-carosal"),
);
const CiaHighlight = lazy(
  () => import("@/components/courses/cia-challenge/cia-highlight"),
);
const CourseMap = lazy(() => import("@/components/courses/common/course-map"));
const CourseReview = lazy(() => import("@/components/common/course-review"));
const CourseYoutube = lazy(
  () => import("@/components/courses/common/course-youtube"),
);
const Pdf = lazy(
  () => import("@/components/common/pdf"),
);
const CourseYoutubeLecture = lazy(
  () => import("@/components/courses/common/course-youtube-lecture"),
);
const CiaCourseLms = lazy(
  () => import("@/components/courses/cia-challenge/cia-course-lms"),
);
const CiaUnique = lazy(
  () => import("@/components/courses/cia-challenge/cia-unique"),
);
const CourseAchivers = lazy(
  () => import("@/components/common/course-achivers"),
);
const CourseBlog = lazy(
  () => import("@/components/courses/common/course-blog"),
);
const CamsConnection = lazy(
  () => import("@/components/courses/cams/cams-connection"),
);
const HomeAlumniWork = lazy(
  () => import("@/components/home/home-alumini-work"),
);
const CiaFaq = lazy(() => import("@/components/courses/cia-challenge/cia-faq"));

const CIAChallenge = () => {
  return (
    <div>
      {/* Initial load */}
      <DeferredPopUp slug="CIA-Challenge-Curriculum" />
      <HomeHero slug="cia-challenge-curriculum" />
      <BannerLogos />
      <CiaAbout />

      <LazySection minHeight={420}>
        <CourseTopStudent
          courseSlug="ciac"
          needPrefix="false"
          title="We Stand by Results"
          subtitle="Meet our Latest CIA Challenge Achievers of February 2026!"
        />
      </LazySection>

      <LazySection minHeight={650}>
        <CiaCourseCurriculum />
      </LazySection>

      <LazySection minHeight={500}>
        <CourseResult
          course="CIAC"
          queryKey="cia-challenge-certificates"
          title="CIA Challenge Exam Results by AIA Professionals"
          description="Actual score results of professionals who cleared the CIA Challenge Exam through AIA’s structured, exam-focused preparation."
        />
      </LazySection>

      <LazySection minHeight={500}>
        <CiaJourney />
      </LazySection>

      <LazySection minHeight={450}>
        <CiaWhyAia />
      </LazySection>

      <LazySection minHeight={500}>
        <WhatsappCarosal
          title="Unfiltered Reflections from AIA-Trained Professionals"
          description="Heartfelt messages shared by professionals after completing their journey with AIA. Each message reflects a different experience. These reflections provide a genuine view of what preparation looks like in real situations, beyond structured testimonials"
          course="CIAC"
        />
      </LazySection>

      <LazySection minHeight={450}>
        <CiaHighlight />
      </LazySection>

      <LazySection minHeight={500}>
        <CourseMap courseCode="CIAC" />
      </LazySection>

      <LazySection minHeight={450}>
        <CourseReview slug="CIAC" title="300+ Professional Experiences Shared" />
      </LazySection>

      <LazySection minHeight={480}>
        <CourseYoutube
          courseSlug="ciac"
          title="Hear from Our Recently Qualified Professionals on YouTube"
          description="Watch AIA-trained professionals share their CIA journey, exam strategies, and career insights in exclusive interviews with Puneet Sir on YouTube."
        />
      </LazySection>

      <LazySection minHeight={500}>
        <Pdf />
      </LazySection>


      <LazySection minHeight={420}>
        <CourseYoutubeLecture
          courseSlug="cia-challenge-curriculum"
          title="Master CIA Concepts with AIA’s Video Learning Series"
          description="Explore concise video sessions by Puneet Sir covering key CIA topics, simplified for practical clarity and exam-focused understanding."
        />
      </LazySection>

      <LazySection minHeight={420}>
        <CiaCourseLms image="lms_CIAC.webp" />
      </LazySection>

      <LazySection minHeight={450}>
        <CiaUnique />
      </LazySection>

      <LazySection minHeight={500}>
        <CourseAchivers
          slug="ciac"
          title="Meet the Professionals Who Earned Their CIA Credential"
          description="Meet AIA proud achievers who advance their careers by achieving the global CIA credential with structured prep and real-world expertise."
        />
      </LazySection>

      <LazySection minHeight={420}>
        <CourseBlog
          course="CIAC"
          title="Expert articles, exam tips, and real-world insights for CIAC aspirants."
        />
      </LazySection>

      <LazySection minHeight={420}>
        <CamsConnection
          title="The Right Certification Starts With The Right Choice"
          description="Find the certification that aligns with your background and career stage"
          buttonColors={["#a8e6f3", "#fee1c6", "#e2ffdc"]}
          images={[
            { image: "hiw_cfe.webp", link: "/cfe-curriculum" },
            { image: "hiw_cia.webp", link: "/cia-curriculum" },
            { image: "hiw_cams.webp", link: "/cams" },
          ]}
        />
      </LazySection>

      <LazySection minHeight={300}>
        <HomeAlumniWork />
      </LazySection>

      <LazySection minHeight={350}>
        <CiaFaq />
      </LazySection>
    </div>
  );
};

export default CIAChallenge;
