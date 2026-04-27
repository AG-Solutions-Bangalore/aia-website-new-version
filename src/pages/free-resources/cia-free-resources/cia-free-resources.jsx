import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import HomeHero from "@/components/home/home-hero";
import PopUp from "@/components/common/pop-up";
const CourseYoutubeLecture = lazy(() =>
  import("@/components/courses/common/course-youtube-lecture")
);
const FreeResourceFlashCard = lazy(() =>
  import("@/components/cia-free-resource/cia-flash-card")
);
const FreeResourcePracticeQuestion = lazy(() =>
  import("@/components/cia-free-resource/cia-practice-questions")
);
const CourseAchivers = lazy(() =>
  import("@/components/common/course-achivers")
);
const HomeAlumniWork = lazy(() =>
  import("@/components/home/home-alumini-work")
);
const FreeResourceReview = lazy(() =>
  import("@/components/cfe-free-resource/free-resource-review")
);

const CIAFreeResources = () => {
  const refs = useRef({
    youtube: { current: null },
    flash: { current: null },
    practice: { current: null },
    achievers: { current: null },
    alumni: { current: null },
    review: { current: null },
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
      }
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
    <>
      {/* Initial render */}
      

<PopUp slug="cia-free-resources" />


      <HomeHero slug="cia-free-resources" />

      <div ref={refs.youtube}>
        {visible.youtube && (
          <Suspense fallback={null}>
            <CourseYoutubeLecture
              courseSlug="CIA-Free-Resources"
              title="Strengthen Your Internal Audit Concepts with AIA’s Learning Videos"
              description="Learn key CIA topics through focused sessions by Puneet Sir, designed to break down concepts clearly and help you apply them confidently in exams."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.flash}>
        {visible.flash && (
          <Suspense fallback={null}>
            <FreeResourceFlashCard />
          </Suspense>
        )}
      </div>

      <div ref={refs.practice}>
        {visible.practice && (
          <Suspense fallback={null}>
            <FreeResourcePracticeQuestion />
          </Suspense>
        )}
      </div>

      <div ref={refs.achievers}>
        {visible.achievers && (
          <Suspense fallback={null}>
            <CourseAchivers
              slug="cia"
              title="From Learners to Certified Internal Auditors – Our CIA Achievers"
              description="Get inspired by AIA achievers who have successfully earned the globally recognized CIA certification through focused preparation and strong conceptual understanding."
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

      <div ref={refs.review}>
        {visible.review && (
          <Suspense fallback={null}>
            <FreeResourceReview slug="CIA" />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default CIAFreeResources;
