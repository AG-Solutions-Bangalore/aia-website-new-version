import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import PopUp from "@/components/common/pop-up";
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
const AboutTrainerSection = lazy(
  () => import("@/components/about/about-trainer-section"),
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
      {/* Initial Render */}
      <PopUp slug="CAMS" />
      <HomeHero slug="cams" />
      <CamsAbout />

      <div ref={refs.topStudent}>
        {visible.topStudent && (
          <Suspense fallback={null}>
            <CourseTopStudent
              courseSlug="cams"
              needPrefix="true"
              title="Meet our CAMS-Certified Professionals"
              subtitle="Meet AIA’s latest achievers who successfully earned their CAMS credential through structured preparation and exam-ready guidance."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.curriculum}>
        {visible.curriculum && (
          <Suspense fallback={null}>
            <CamsCourseCurriculum />
          </Suspense>
        )}
      </div>

      <div ref={refs.result}>
        {visible.result && (
          <Suspense fallback={null}>
            <CourseResult
              course="CAMS"
              queryKey="cams-certificates"
              title="Proof of Excellence: Real ACAMS Results of Our Learners!"
              description="Verified ACAMS certificates earned by qualified professionals who achieved the CAMS credential with AIA."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.journey}>
        {visible.journey && (
          <Suspense fallback={null}>
            <CamsJourney />
          </Suspense>
        )}
      </div>

      <div ref={refs.why}>
        {visible.why && (
          <Suspense fallback={null}>
            <CamsWhyAia />
          </Suspense>
        )}
      </div>

      <div ref={refs.whatsapp}>
        {visible.whatsapp && (
          <Suspense fallback={null}>
            <WhatsappCarosal
              title="Unfiltered Reflections from AIA-Trained Professionals"
              description="Heartfelt messages shared by professionals after completing their journey with AIA. Each message reflects a different experience. These reflections provide a genuine view of what preparation looks like in real situations, beyond structured testimonials"
              course="CAMS"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.highlight}>
        {visible.highlight && (
          <Suspense fallback={null}>
            <CamsHighlight />
          </Suspense>
        )}
      </div>

      <div ref={refs.map}>
        {visible.map && (
          <Suspense fallback={null}>
            <CourseMap courseCode="CAMS" />
          </Suspense>
        )}
      </div>

      <div ref={refs.review}>
        {visible.review && (
          <Suspense fallback={null}>
            <CourseReview slug="CAMS" />
          </Suspense>
        )}
      </div>

      <div ref={refs.youtube}>
        {visible.youtube && (
          <Suspense fallback={null}>
            <CourseYoutube
              courseSlug="cams"
              title="Hear from Our Recently Qualified Professionals on YouTube"
              description="Watch AIA-trained professionals share their CAMS journey, exam strategies, and career insights in exclusive interviews with Puneet Sir on YouTube."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.trainer}>
        {visible.trainer && (
          <Suspense fallback={null}>
            <AboutTrainerSection
              path="faculty_cams.webp"
              messageimage="message_cams.webp"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.lecture}>
        {visible.lecture && (
          <Suspense fallback={null}>
            <CourseYoutubeLecture
              courseSlug="cams"
              title="Master CAMS Concepts with AIA’s Video Learning Series"
              description="Explore concise video sessions by Puneet Sir covering key CAMS topics, simplified for practical clarity and exam-focused understanding."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.lms}>
        {visible.lms && (
          <Suspense fallback={null}>
            <CamsCourseLms
              title="Join AiA CAMS LMS"
              subtitle="Online Training and Certification Course"
              course="CAMS"
              buttonlabel="Talk to Us"
              image="lms_CAMS.webp"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.unique}>
        {visible.unique && (
          <Suspense fallback={null}>
            <CamsUnique />
          </Suspense>
        )}
      </div>

      <div ref={refs.achievers}>
        {visible.achievers && (
          <Suspense fallback={null}>
            <CourseAchivers
              slug="CAMS"
              title="Meet the Professionals Who Successfully Cleared the CAMS with AIA"
              description="Meet AIA proud achievers who advance their careers by achieving the global CAMS credential with structured prep and real-world expertise."
              titleClass="!text-[1rem] md:!text-3xl"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.blog}>
        {visible.blog && (
          <Suspense fallback={null}>
            <CourseBlog
              course="CAMS"
              title="Expert articles, exam tips, and real-world insights for  CAMS aspirants."
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
                { image: "hiw_cfe.webp", link: "/cfe-curriculum" },
                { image: "hiw_cia.webp", link: "/cia-curriculum" },
                { image: "hiw_ciac.webp", link: "/cia-challenge-curriculum" },
              ]}
              buttonColors={["#a8e6f3", "#fee1c6", "#e2ffdc"]}
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
            <CamsFaq />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default CAMS;
