import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import PopUp from "@/components/common/pop-up";
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
const AboutTrainerSection = lazy(
  () => import("@/components/about/about-trainer-section"),
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
  const refs = useRef({
    topStudent: { current: null },
    curriculum: { current: null },
    result: { current: null },
    journey: { current: null },
    why: { current: null },
    whatsapp: { current: null },
    highlight: { current: null },
    map: { current: null },
    review: { current: null },
    youtube: { current: null },
    trainer: { current: null },
    lecture: { current: null },
    lms: { current: null },
    unique: { current: null },
    achievers: { current: null },
    blog: { current: null },
    connection: { current: null },
    alumni: { current: null },
    faq: { current: null },
  }).current;

  const [visible, setVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.dataset.section;

            setVisible((prev) => ({
              ...prev,
              [key]: true,
            }));

            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "150px",
        threshold: 0.1,
      },
    );

    Object.keys(refs).forEach((key) => {
      const ref = refs[key];

      if (ref.current) {
        ref.current.dataset.section = key;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [refs]);

  return (
    <div>
      {/* Initial render */}
      <PopUp slug="CFE-Curriculum" />
      <HomeHero slug="cfe-curriculum" />
      <CfeAbout />

      <div ref={refs.topStudent}>
        {visible.topStudent && (
          <Suspense fallback={null}>
            <CourseTopStudent
              courseSlug="cfe"
              subtitle="Professionals trained by AIA who achieved 90% and above, reflecting strong exam readiness and depth of subject knowledge."
              needPrefix="false"
              title="Professionals Who Excelled in the CFE Exam with 90%+ Scores"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.curriculum}>
        {visible.curriculum && (
          <Suspense fallback={null}>
            <CfeCourseCurriculum />
          </Suspense>
        )}
      </div>

      <div ref={refs.result}>
        {visible.result && (
          <Suspense fallback={null}>
            <CourseResult
              course="CFE"
              queryKey="cfe-certificates"
              title="Verified CFE Exam Results Achieved by AIA Learners"
              description="Each certificate represents a real CFE exam achievement, verified by ACFE, highlighting their successful completion of the globally recognized certification."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.journey}>
        {visible.journey && (
          <Suspense fallback={null}>
            <CfeJourney />
          </Suspense>
        )}
      </div>

      <div ref={refs.why}>
        {visible.why && (
          <Suspense fallback={null}>
            <CfeWhyAia />
          </Suspense>
        )}
      </div>

      <div ref={refs.whatsapp}>
        {visible.whatsapp && (
          <Suspense fallback={null}>
            <WhatsappCarosal
              title="Unfiltered Reflections from AIA-Trained Professionals"
              description="Heartfelt messages shared by professionals after completing their journey with AIA.
Each message reflects a different experience. These reflections provide a genuine view of what preparation looks like in real situations, beyond structured testimonials"
              course="CFE"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.highlight}>
        {visible.highlight && (
          <Suspense fallback={null}>
            <CfeHighlight />
          </Suspense>
        )}
      </div>

      <div ref={refs.map}>
        {visible.map && (
          <Suspense fallback={null}>
            <CourseMap courseCode="CFE" />
          </Suspense>
        )}
      </div>

      <div ref={refs.review}>
        {visible.review && (
          <Suspense fallback={null}>
            <CourseReview slug="CFE" />
          </Suspense>
        )}
      </div>

      <div ref={refs.youtube}>
        {visible.youtube && (
          <Suspense fallback={null}>
            <CourseYoutube
              courseSlug="cfe"
              title="Hear from Our Recently Qualified Professionals on YouTube"
              description="Watch AIA-trained professionals share their CFE journey, exam strategies, and career insights in exclusive interviews with Puneet Sir on YouTube."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.trainer}>
        {visible.trainer && (
          <Suspense fallback={null}>
            <AboutTrainerSection
              path="faculty_cfe.webp"
              messageimage="message_cfe.webp"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.lecture}>
        {visible.lecture && (
          <Suspense fallback={null}>
            <CourseYoutubeLecture
              courseSlug="cfe-curriculum"
              title="Master CFE Concepts with AIA’s Video Learning Series"
              description="Explore concise video sessions by Puneet Sir covering key CFE topics, simplified for practical clarity and exam-focused understanding"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.lms}>
        {visible.lms && (
          <Suspense fallback={null}>
            <CfeCourseLms image="lms_CFE.webp" />
          </Suspense>
        )}
      </div>

      <div ref={refs.unique}>
        {visible.unique && (
          <Suspense fallback={null}>
            <CfeUnique />
          </Suspense>
        )}
      </div>

      <div ref={refs.achievers}>
        {visible.achievers && (
          <Suspense fallback={null}>
            <CourseAchivers
              slug="cfe"
              title="Meet the Professionals Who Successfully Cleared the CFE with AIA"
              description="Meet AIA proud achievers who advance their careers by achieving the global CFE credential with structured prep and real-world expertise."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.blog}>
        {visible.blog && (
          <Suspense fallback={null}>
            <CourseBlog
              course="CFE"
              title="Expert articles, exam tips, and real-world insights for CFE aspirants."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.connection}>
        {visible.connection && (
          <Suspense fallback={null}>
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
          </Suspense>
        )}
      </div>

      <div ref={refs.alumni}>
        {visible.alumni && (
          <Suspense fallback={null}>
            <HomeAlumniWork />
          </Suspense>
        )}
      </div>

      <div ref={refs.faq}>
        {visible.faq && (
          <Suspense fallback={null}>
            <CfeFaq />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default CFECurriculam;
