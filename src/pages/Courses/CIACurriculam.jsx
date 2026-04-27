import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import PopUp from "@/components/common/pop-up";
import HomeHero from "@/components/home/home-hero";
import CiaCurrAbout from "@/components/courses/cia-curriculam/cia-curr-about";

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
const AboutTrainerSection = lazy(
  () => import("@/components/about/about-trainer-section"),
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
      <PopUp slug="CIA-Curriculum" />
      <HomeHero slug="cia-curriculum" />
      <CiaCurrAbout />

      <div ref={refs.topStudent}>
        {visible.topStudent && (
          <Suspense fallback={null}>
            <CourseTopStudent
              courseSlug="cia"
              needPrefix="false"
              title="We Stand by Results "
              subtitle="Meet the latest AIA-trained professionals who successfully earned their CIA credential through structured preparation and expert guidance."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.curriculum}>
        {visible.curriculum && (
          <Suspense fallback={null}>
            <CiaCurrCourseCurriculum />
          </Suspense>
        )}
      </div>

      <div ref={refs.result}>
        {visible.result && (
          <Suspense fallback={null}>
            <CourseResult
              course="cia"
              queryKey="cia-certificates"
              title="Proof of Excellence: Real CIA Results of AIA Students!"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.journey}>
        {visible.journey && (
          <Suspense fallback={null}>
            <CiaCurrJourney />
          </Suspense>
        )}
      </div>

      <div ref={refs.why}>
        {visible.why && (
          <Suspense fallback={null}>
            <CiaCurrWhyAia />
          </Suspense>
        )}
      </div>

      <div ref={refs.whatsapp}>
        {visible.whatsapp && (
          <Suspense fallback={null}>
            <WhatsappCarosal
              title="Unfiltered Reflections from AIA-Trained Professionals"
              description="Heartfelt messages shared by professionals after completing their journey with AIA. Each message reflects a different experience. These reflections provide a genuine view of what preparation looks like in real situations, beyond structured testimonials"
              course="CIA"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.highlight}>
        {visible.highlight && (
          <Suspense fallback={null}>
            <CiaCurrHighlight />
          </Suspense>
        )}
      </div>

      <div ref={refs.map}>
        {visible.map && (
          <Suspense fallback={null}>
            <CourseMap courseCode="CIA" />
          </Suspense>
        )}
      </div>

      <div ref={refs.review}>
        {visible.review && (
          <Suspense fallback={null}>
            <CourseReview slug="CIA" />
          </Suspense>
        )}
      </div>

      <div ref={refs.youtube}>
        {visible.youtube && (
          <Suspense fallback={null}>
            <CourseYoutube
              courseSlug="CIA"
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
              path="faculty_cia.webp"
              messageimage="message_cia.webp"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.lecture}>
        {visible.lecture && (
          <Suspense fallback={null}>
            <CourseYoutubeLecture
              courseSlug="cia-curriculum"
              title="Master CIA Concepts with AIA’s Video Learning Series"
              description="Explore concise video sessions by Puneet Sir covering key CIA topics, simplified for practical clarity and exam-focused understanding."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.lms}>
        {visible.lms && (
          <Suspense fallback={null}>
            <CiaCurrCourseLms image="lms_CIA.webp" />
          </Suspense>
        )}
      </div>

      <div ref={refs.unique}>
        {visible.unique && (
          <Suspense fallback={null}>
            <CfeCurrUnique />
          </Suspense>
        )}
      </div>

      <div ref={refs.achievers}>
        {visible.achievers && (
          <Suspense fallback={null}>
            <CourseAchivers
              slug="CIA"
              title="From Aspirants to Certified Internal Auditors - Our Recent CIA Achievers"
              description="Meet AIA proud achievers who advance their careers by achieving the global CIA credential with structured prep and real-world expertise."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.blog}>
        {visible.blog && (
          <Suspense fallback={null}>
            <CourseBlog
              course="CIA"
              title="Expert articles, exam tips, and real-world insights for CIA aspirants."
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
              buttonColors={["#a8e6f3", "#e2ffdc", "#ffe38f"]}
              images={[
                { image: "hiw_cfe.webp", link: "/cfe-curriculum" },
                { image: "hiw_ciac.webp", link: "/cia-challenge-curriculum" },
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
            <CiaCurrFaq />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default CIACurriculam;
