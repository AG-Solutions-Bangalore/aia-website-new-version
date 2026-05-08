import React, { lazy } from "react";

import DeferredPopUp from "@/components/common/deferred-popup";
import LazySection from "@/components/common/lazy-section";
import HomeHero from "@/components/home/home-hero";
import CfeAbout from "@/components/courses/cfe-curriculam/cfe-about";

const CourseTopStudent = lazy(
  () => import("@/components/courses/common/course-top-student"),
);
const CfeCourseCurriculum = lazy(
  () => import("@/components/courses/cfe-curriculam/cfe-cource-curriculam"),
);
const CourseResult = lazy(
  () => import("@/components/courses/common/course-result"),
);
const CfeJourney = lazy(
  () => import("@/components/courses/cfe-curriculam/cfe-journey"),
);
const CfeWhyAia = lazy(
  () => import("@/components/courses/cfe-curriculam/cfe-why-aia"),
);
const WhatsappCarosal = lazy(
  () => import("@/components/common/whatsapp-carosal"),
);
const CfeHighlight = lazy(
  () => import("@/components/courses/cfe-curriculam/cfe-highlight"),
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
const CfeCourseLms = lazy(
  () => import("@/components/courses/cfe-curriculam/cfe-course-lms"),
);
const CfeUnique = lazy(
  () => import("@/components/courses/cfe-curriculam/cfe-unique"),
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
const CfeFaq = lazy(
  () => import("@/components/courses/cfe-curriculam/cfe-faq"),
);

const CFECurriculam = () => {
  return (
    <div className="min-h-screen">
      {/* Initial render */}
      <DeferredPopUp slug="CFE-Curriculum" />
      <HomeHero slug="cfe-curriculum" />
      <CfeAbout />

      <LazySection minHeight={420}>
        <CourseTopStudent
          courseSlug="cfe"
          subtitle="Professionals trained by AIA who achieved 90% and above, reflecting strong exam readiness and depth of subject knowledge."
          needPrefix="false"
          title="Professionals Who Excelled in the CFE Exam with 90%+ Scores"
        />
      </LazySection>

      <LazySection minHeight={650}>
        <CfeCourseCurriculum />
      </LazySection>

      <LazySection minHeight={500}>
        <CourseResult
          course="CFE"
          queryKey="cfe-certificates"
          title="Verified CFE Exam Results Achieved by AIA Learners"
          description="Each certificate represents a real CFE exam achievement, verified by ACFE, highlighting their successful completion of the globally recognized certification."
        />
      </LazySection>

      <LazySection minHeight={500}>
        <CfeJourney />
      </LazySection>

      <LazySection minHeight={450}>
        <CfeWhyAia />
      </LazySection>

      <LazySection minHeight={500}>
        <WhatsappCarosal
          title="Unfiltered Reflections from AIA-Trained Professionals"
          description="Heartfelt messages shared by professionals after completing their journey with AIA.
Each message reflects a different experience. These reflections provide a genuine view of what preparation looks like in real situations, beyond structured testimonials"
          course="CFE"
        />
      </LazySection>

      <LazySection minHeight={450}>
        <CfeHighlight />
      </LazySection>

      <LazySection minHeight={500}>
        <CourseMap courseCode="CFE" />
      </LazySection>

      <LazySection minHeight={450}>
        <CourseReview slug="CFE" />
      </LazySection>

      <LazySection minHeight={480}>
        <CourseYoutube
          courseSlug="cfe"
          title="Hear from Our Recently Qualified Professionals on YouTube"
          description="Watch AIA-trained professionals share their CFE journey, exam strategies, and career insights in exclusive interviews with Puneet Sir on YouTube."
        />
      </LazySection>

      <LazySection minHeight={500}>
        <Pdf />
      </LazySection>

      <LazySection minHeight={420}>
        <CourseYoutubeLecture
          courseSlug="cfe-curriculum"
          title="Master CFE Concepts with AIA’s Video Learning Series"
          description="Explore concise video sessions by Puneet Sir covering key CFE topics, simplified for practical clarity and exam-focused understanding"
        />
      </LazySection>

      <LazySection minHeight={420}>
        <CfeCourseLms image="lms_CFE.webp" />
      </LazySection>

      <LazySection minHeight={450}>
        <CfeUnique />
      </LazySection>

      <LazySection minHeight={500}>
        <CourseAchivers
          slug="cfe"
          title="Meet the Professionals Who Successfully Cleared the CFE with AIA"
          description="Meet AIA proud achievers who advance their careers by achieving the global CFE credential with structured prep and real-world expertise."
        />
      </LazySection>

      <LazySection minHeight={420}>
        <CourseBlog
          course="CFE"
          title="Expert articles, exam tips, and real-world insights for CFE aspirants."
        />
      </LazySection>

      <LazySection minHeight={420}>
        <CamsConnection
          title="The Right Certification Starts With The Right Choice"
          description="Find the certification that aligns with your background and career stage"
          images={[
            { image: "hiw_cia.webp", link: "/cia-curriculum" },
            { image: "hiw_ciac.webp", link: "/cia-challenge-curriculum" },
            { image: "hiw_cams.webp", link: "/cams" },
          ]}
          buttonColors={["#fee1c6", "#e2ffdc", "#ffe38f"]}
        />
      </LazySection>

      <LazySection minHeight={300}>
        <HomeAlumniWork />
      </LazySection>

      <LazySection minHeight={350}>
        <CfeFaq />
      </LazySection>
    </div>
  );
};

export default CFECurriculam;
