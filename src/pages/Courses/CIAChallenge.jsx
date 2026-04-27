import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import PopUp from "@/components/common/pop-up";
import HomeHero from "@/components/home/home-hero";
import CiaAbout from "@/components/courses/cia-challenge/cia-about";

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
const AboutTrainerSection = lazy(
  () => import("@/components/about/about-trainer-section"),
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
      {/* Initial load */}
      <PopUp slug="CIA-Challenge-Curriculum" />
      <HomeHero slug="cia-challenge-curriculum" />
      <CiaAbout />

      <div ref={refs.topStudent}>
        {visible.topStudent && (
          <Suspense fallback={null}>
            <CourseTopStudent
              courseSlug="ciac"
              needPrefix="false"
              title="We Stand by Results"
              subtitle="Meet our Latest CIA Challenge Achievers of February 2026!"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.curriculum}>
        {visible.curriculum && (
          <Suspense fallback={null}>
            <CiaCourseCurriculum />
          </Suspense>
        )}
      </div>

      <div ref={refs.result}>
        {visible.result && (
          <Suspense fallback={null}>
            <CourseResult
              course="CIAC"
              queryKey="cia-challenge-certificates"
              title="CIA Challenge Exam Results by AIA Professionals"
              description="Actual score results of professionals who cleared the CIA Challenge Exam through AIA’s structured, exam-focused preparation."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.journey}>
        {visible.journey && (
          <Suspense fallback={null}>
            <CiaJourney />
          </Suspense>
        )}
      </div>

      <div ref={refs.why}>
        {visible.why && (
          <Suspense fallback={null}>
            <CiaWhyAia />
          </Suspense>
        )}
      </div>

      <div ref={refs.whatsapp}>
        {visible.whatsapp && (
          <Suspense fallback={null}>
            <WhatsappCarosal
              title="Unfiltered Reflections from AIA-Trained Professionals"
              description="Heartfelt messages shared by professionals after completing their journey with AIA. Each message reflects a different experience. These reflections provide a genuine view of what preparation looks like in real situations, beyond structured testimonials"
              course="CIAC"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.highlight}>
        {visible.highlight && (
          <Suspense fallback={null}>
            <CiaHighlight />
          </Suspense>
        )}
      </div>

      <div ref={refs.map}>
        {visible.map && (
          <Suspense fallback={null}>
            <CourseMap courseCode="CIAC" />
          </Suspense>
        )}
      </div>

      <div ref={refs.review}>
        {visible.review && (
          <Suspense fallback={null}>
            <CourseReview
              slug="CIAC"
              title="300+ Professional Experiences Shared"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.youtube}>
        {visible.youtube && (
          <Suspense fallback={null}>
            <CourseYoutube
              courseSlug="ciac"
              title="Hear from Our Recently Qualified Professionals on YouTube"
              description="Watch AIA-trained professionals share their CIA journey, exam strategies, and career insights in exclusive interviews with Puneet Sir on YouTube."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.trainer}>
        {visible.trainer && (
          <Suspense fallback={null}>
            <AboutTrainerSection
              path="faculty_cia_challenge.webp"
              messageimage="message_cia.webp"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.lecture}>
        {visible.lecture && (
          <Suspense fallback={null}>
            <CourseYoutubeLecture
              courseSlug="cia-challenge-curriculum"
              title="Master CIA Concepts with AIA’s Video Learning Series"
              description="Explore concise video sessions by Puneet Sir covering key CIA topics, simplified for practical clarity and exam-focused understanding."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.lms}>
        {visible.lms && (
          <Suspense fallback={null}>
            <CiaCourseLms image="lms_CIAC.webp" />
          </Suspense>
        )}
      </div>

      <div ref={refs.unique}>
        {visible.unique && (
          <Suspense fallback={null}>
            <CiaUnique />
          </Suspense>
        )}
      </div>

      <div ref={refs.achievers}>
        {visible.achievers && (
          <Suspense fallback={null}>
            <CourseAchivers
              slug="ciac"
              title="Meet the Professionals Who Earned Their CIA Credential"
              description="Meet AIA proud achievers who advance their careers by achieving the global CIA credential with structured prep and real-world expertise."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.blog}>
        {visible.blog && (
          <Suspense fallback={null}>
            <CourseBlog
              course="CIAC"
              title="Expert articles, exam tips, and real-world insights for CIAC aspirants."
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
              buttonColors={["#a8e6f3", "#fee1c6", "#ffe38f"]}
              images={[
                { image: "hiw_cfe.webp", link: "/cfe-curriculum" },
                { image: "hiw_cia.webp", link: "/cia-curriculum" },
                { image: "hiw_cams.webp", link: "/cams" },
              ]}
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
            <CiaFaq />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default CIAChallenge;
