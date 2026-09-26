import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import HomeHero from "@/components/home/home-hero";
import PopUp from "@/components/common/pop-up";

const CourseYoutubeLecture = lazy(() =>
  import("@/components/courses/common/course-youtube-lecture")
);
const FreeResourceFlashCard = lazy(() =>
  import("@/components/cisa-free-resource/cisa-flash-card")
);
const FreeResourcePracticeQuestion = lazy(() =>
  import("@/components/cisa-free-resource/cisa-practice-questions")
);
const FreeResourceDistractor = lazy(() =>
  import("@/components/common/free-resource-distractor")
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

const CISAFreeResources = () => {
  const refs = useRef({
    youtube: { current: null },
    flash: { current: null },
    practice: { current: null },
    distractor: { current: null },
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
      <PopUp slug="cisa-free-resources" />

      <HomeHero slug="cisa-free-resources" />

      <div ref={refs.youtube}>
        {visible.youtube && (
          <Suspense fallback={null}>
            <CourseYoutubeLecture
              courseSlug="CISA-Free-Resources"
              title="Explore CISA with AIA's Insightful Videos"
              description="Watch YouTube videos featuring insights, guidance, and conversations around the CISA certification to help you take your next step."
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

      <div ref={refs.distractor}>
        {visible.distractor && (
          <Suspense fallback={null}>
            <FreeResourceDistractor
              course="CISA"
              heading="CISA Free Distractor - Section Wise"
              subHeading="Select any module to access free distractors that help you test your knowledge, identify common mistakes, improve concept clarity, and strengthen your CISA preparation."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.achievers}>
        {visible.achievers && (
          <Suspense fallback={null}>
            <CourseAchivers
              slug="cisa"
              title="From Aspirants to Certified Information Systems Auditors - Our Recent CISA Achievers"
              description="Meet AIA proud achievers who advanced their careers by achieving the globally recognized CISA credential with structured prep and real-world expertise."
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
            <FreeResourceReview slug="CISA" />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default CISAFreeResources;
