import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import PopUp from "@/components/common/pop-up";
import HomeHero from "@/components/home/home-hero";

const CourseYoutubeLecture = lazy(() =>
  import("@/components/courses/common/course-youtube-lecture")
);
const FreeResourceFlashCard = lazy(() =>
  import("@/components/cams-free-resource/cams-flash-card")
);
const FreeResourcePracticeQuestion = lazy(() =>
  import("@/components/cams-free-resource/cams-practice-questions")
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

const CAMSFreeResources = () => {
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
      

<PopUp slug="cams-free-resources" />


      <HomeHero slug="cams-free-resources" />

      <div ref={refs.youtube}>
        {visible.youtube && (
          <Suspense fallback={null}>
            <CourseYoutubeLecture
              courseSlug="CAMS-Free-Resources"
              title="Deep Dive into CAMS Concepts with AIA’s Expert Video sessions"
              description="Go through short and practical videos by Puneet Sir covering important CAMS topics, making complex regulations easier to understand and revise."
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
              slug="cams"
              title="From Learners to Certified AML Experts – Our CAMS Achievers"
              description="Discover AIA achievers who have earned the globally recognized CAMS certification with the right guidance, practical knowledge, and structured preparation."
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
            <FreeResourceReview slug="CAMS" />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default CAMSFreeResources;
