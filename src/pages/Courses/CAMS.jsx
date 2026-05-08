import React, { lazy } from "react";

import DeferredPopUp from "@/components/common/deferred-popup";
import LazySection from "@/components/common/lazy-section";
import HomeHero from "@/components/home/home-hero";
import CamsAbout from "@/components/courses/cams/cams-about";

const CourseTopStudent = lazy(
  () => import("@/components/courses/common/course-top-student"),
);
const CamsCourseCurriculum = lazy(
  () => import("@/components/courses/cams/cams-course-curriculum"),
);
const CourseResult = lazy(
  () => import("@/components/courses/common/course-result"),
);
const CamsJourney = lazy(
  () => import("@/components/courses/cams/cams-journey"),
);
const CamsWhyAia = lazy(() => import("@/components/courses/cams/cams-why-aia"));
const WhatsappCarosal = lazy(
  () => import("@/components/common/whatsapp-carosal"),
);
const CamsHighlight = lazy(
  () => import("@/components/courses/cams/cams-highlight"),
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
const CamsCourseLms = lazy(
  () => import("@/components/courses/cams/cams-course-lms"),
);
const CamsUnique = lazy(() => import("@/components/courses/cams/cams-unique"));
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
const CamsFaq = lazy(() => import("@/components/courses/cams/cams-faq"));

const CAMS = () => {
  return (
    <div>
      {/* Initial Render */}
      <DeferredPopUp slug="CAMS" />
      <HomeHero slug="cams" />
      <CamsAbout />

      <LazySection minHeight={420}>
        <CourseTopStudent
          courseSlug="cams"
          needPrefix="true"
          title="Meet our CAMS-Certified Professionals"
          subtitle="Meet AIA’s latest achievers who successfully earned their CAMS credential through structured preparation and exam-ready guidance."
        />
      </LazySection>

      <LazySection minHeight={650}>
        <CamsCourseCurriculum />
      </LazySection>

      <LazySection minHeight={500}>
        <CourseResult
          course="CAMS"
          queryKey="cams-certificates"
          title="Proof of Excellence: Real ACAMS Results of Our Learners!"
          description="Verified ACAMS certificates earned by qualified professionals who achieved the CAMS credential with AIA."
        />
      </LazySection>

      <LazySection minHeight={500}>
        <CamsJourney />
      </LazySection>

      <LazySection minHeight={450}>
        <CamsWhyAia />
      </LazySection>

      <LazySection minHeight={500}>
        <WhatsappCarosal
          title="Unfiltered Reflections from AIA-Trained Professionals"
          description="Heartfelt messages shared by professionals after completing their journey with AIA. Each message reflects a different experience. These reflections provide a genuine view of what preparation looks like in real situations, beyond structured testimonials"
          course="CAMS"
        />
      </LazySection>

      <LazySection minHeight={450}>
        <CamsHighlight />
      </LazySection>

      <LazySection minHeight={500}>
        <CourseMap courseCode="CAMS" />
      </LazySection>

      <LazySection minHeight={450}>
        <CourseReview slug="CAMS" />
      </LazySection>

      <LazySection minHeight={480}>
        <CourseYoutube
          courseSlug="cams"
          title="Hear from Our Recently Qualified Professionals on YouTube"
          description="Watch AIA-trained professionals share their CAMS journey, exam strategies, and career insights in exclusive interviews with Puneet Sir on YouTube."
        />
      </LazySection>

      <LazySection minHeight={500}>
        <Pdf />
      </LazySection>

      <LazySection minHeight={420}>
        <CourseYoutubeLecture
          courseSlug="cams"
          title="Master CAMS Concepts with AIA’s Video Learning Series"
          description="Explore concise video sessions by Puneet Sir covering key CAMS topics, simplified for practical clarity and exam-focused understanding."
        />
      </LazySection>

      <LazySection minHeight={420}>
        <CamsCourseLms
          title="Join AiA CAMS LMS"
          subtitle="Online Training and Certification Course"
          course="CAMS"
          buttonlabel="Talk to Us"
          image="lms_CAMS.webp"
        />
      </LazySection>

      <LazySection minHeight={450}>
        <CamsUnique />
      </LazySection>

      <LazySection minHeight={500}>
        <CourseAchivers
          slug="CAMS"
          title="Meet the Professionals Who Successfully Cleared the CAMS with AIA"
          description="Meet AIA proud achievers who advance their careers by achieving the global CAMS credential with structured prep and real-world expertise."
          titleClass="!text-[1rem] md:!text-3xl"
        />
      </LazySection>

      <LazySection minHeight={420}>
        <CourseBlog
          course="CAMS"
          title="Expert articles, exam tips, and real-world insights for  CAMS aspirants."
        />
      </LazySection>

      <LazySection minHeight={420}>
        <CamsConnection
          title="The Right Certification Starts With The Right Choice"
          description="Find the certification that aligns with your background and career stage"
          images={[
            { image: "hiw_cfe.webp", link: "/cfe-curriculum" },
            { image: "hiw_cia.webp", link: "/cia-curriculum" },
            { image: "hiw_ciac.webp", link: "/cia-challenge-curriculum" },
          ]}
          buttonColors={["#a8e6f3", "#fee1c6", "#e2ffdc"]}
        />
      </LazySection>

      <LazySection minHeight={300}>
        <HomeAlumniWork />
      </LazySection>

      <LazySection minHeight={350}>
        <CamsFaq />
      </LazySection>
    </div>
  );
};

export default CAMS;
