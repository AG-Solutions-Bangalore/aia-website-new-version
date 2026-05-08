import React, { lazy } from "react";

import DeferredPopUp from "@/components/common/deferred-popup";
import LazySection from "@/components/common/lazy-section";
import HomeHero from "@/components/home/home-hero";
import CiaCurrAbout from "@/components/courses/cia-curriculam/cia-curr-about";
import BannerLogos from "@/components/courses/common/banner-logos";

const CourseTopStudent = lazy(
  () => import("@/components/courses/common/course-top-student"),
);
const CiaCurrCourseCurriculum = lazy(
  () =>
    import("@/components/courses/cia-curriculam/cia-curr-cource-curriculam"),
);
const CourseResult = lazy(
  () => import("@/components/courses/common/course-result"),
);
const CiaCurrJourney = lazy(
  () => import("@/components/courses/cia-curriculam/cia-curr-journey"),
);
const CiaCurrWhyAia = lazy(
  () => import("@/components/courses/cia-curriculam/cia-curr-why-aia"),
);
const WhatsappCarosal = lazy(
  () => import("@/components/common/whatsapp-carosal"),
);
const CiaCurrHighlight = lazy(
  () => import("@/components/courses/cia-curriculam/cia-curr-highlight"),
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
const CiaCurrCourseLms = lazy(
  () => import("@/components/courses/cia-curriculam/cia-curr-course-lms"),
);
const CfeCurrUnique = lazy(
  () => import("@/components/courses/cia-curriculam/cfe-curr-unique"),
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
const CiaCurrFaq = lazy(
  () => import("@/components/courses/cia-curriculam/cia-curr-faq"),
);

const CIACurriculam = () => {
  return (
    <div>
      {/* Initial Render */}
      <DeferredPopUp slug="CIA-Curriculum" />
      <HomeHero slug="cia-curriculum" />
      <BannerLogos />
      <CiaCurrAbout />

      <LazySection minHeight={420}>
        <CourseTopStudent
          courseSlug="cia"
          needPrefix="false"
          title="We Stand by Results "
          subtitle="Meet the latest AIA-trained professionals who successfully earned their CIA credential through structured preparation and expert guidance."
        />
      </LazySection>

      <LazySection minHeight={650}>
        <CiaCurrCourseCurriculum />
      </LazySection>

      <LazySection minHeight={500}>
        <CourseResult
          course="cia"
          queryKey="cia-certificates"
          title="Proof of Excellence: Real CIA Results of AIA Students!"
        />
      </LazySection>

      <LazySection minHeight={500}>
        <CiaCurrJourney />
      </LazySection>

      <LazySection minHeight={450}>
        <CiaCurrWhyAia />
      </LazySection>

      <LazySection minHeight={500}>
        <WhatsappCarosal
          title="Unfiltered Reflections from AIA-Trained Professionals"
          description="Heartfelt messages shared by professionals after completing their journey with AIA. Each message reflects a different experience. These reflections provide a genuine view of what preparation looks like in real situations, beyond structured testimonials"
          course="CIA"
        />
      </LazySection>

      <LazySection minHeight={450}>
        <CiaCurrHighlight />
      </LazySection>

      <LazySection minHeight={500}>
        <CourseMap courseCode="CIA" />
      </LazySection>

      <LazySection minHeight={450}>
        <CourseReview slug="CIA" />
      </LazySection>

      <LazySection minHeight={480}>
        <CourseYoutube
          courseSlug="CIA"
          title="Hear from Our Recently Qualified Professionals on YouTube"
          description="Watch AIA-trained professionals share their CFE journey, exam strategies, and career insights in exclusive interviews with Puneet Sir on YouTube."
        />
      </LazySection>

      <LazySection minHeight={500}>
        <Pdf />
      </LazySection>

      <LazySection minHeight={420}>
        <CourseYoutubeLecture
          courseSlug="cia-curriculum"
          title="Master CIA Concepts with AIA’s Video Learning Series"
          description="Explore concise video sessions by Puneet Sir covering key CIA topics, simplified for practical clarity and exam-focused understanding."
        />
      </LazySection>

      <LazySection minHeight={420}>
        <CiaCurrCourseLms image="lms_CIA.webp" />
      </LazySection>

      <LazySection minHeight={450}>
        <CfeCurrUnique />
      </LazySection>

      <LazySection minHeight={500}>
        <CourseAchivers
          slug="CIA"
          title="From Aspirants to Certified Internal Auditors - Our Recent CIA Achievers"
          description="Meet AIA proud achievers who advance their careers by achieving the global CIA credential with structured prep and real-world expertise."
        />
      </LazySection>

      <LazySection minHeight={420}>
        <CourseBlog
          course="CIA"
          title="Expert articles, exam tips, and real-world insights for CIA aspirants."
        />
      </LazySection>

      <LazySection minHeight={420}>
        <CamsConnection
          title="The Right Certification Starts With The Right Choice"
          description="Find the certification that aligns with your background and career stage"
          buttonColors={["#a8e6f3", "#e2ffdc", "#ffe38f"]}
          images={[
            { image: "hiw_cfe.webp", link: "/cfe-curriculum" },
            { image: "hiw_ciac.webp", link: "/cia-challenge-curriculum" },
            { image: "hiw_cams.webp", link: "/cams" },
          ]}
        />
      </LazySection>

      <LazySection minHeight={300}>
        <HomeAlumniWork />
      </LazySection>

      <LazySection minHeight={350}>
        <CiaCurrFaq />
      </LazySection>
    </div>
  );
};

export default CIACurriculam;
