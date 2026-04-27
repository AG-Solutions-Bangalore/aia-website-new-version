import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import EnrollHighlight from "@/components/enroll/enroll-highlight";

const EnroolTopStudent = lazy(
  () => import("@/components/enroll/enrool-top-student"),
);
const HomeAlumniWork = lazy(
  () => import("@/components/home/home-alumini-work"),
);
const CourseYoutubeLecture = lazy(
  () => import("@/components/courses/common/course-youtube-lecture"),
);
const HomeReview = lazy(() => import("@/components/home/home-review"));
const EnrollFaq = lazy(() => import("@/components/enroll/enroll-faq"));

const Enrool = () => {
  const refs = useRef({
    topStudent: { current: null },
    alumni: { current: null },
    youtube: { current: null },
    review: { current: null },
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
      <EnrollHighlight />

      <div ref={refs.topStudent}>
        {visible.topStudent && (
          <Suspense fallback={null}>
            <EnroolTopStudent />
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

      <div ref={refs.youtube}>
        {visible.youtube && (
          <Suspense fallback={null}>
            <CourseYoutubeLecture courseSlug="enroll-now" />
          </Suspense>
        )}
      </div>

      <div ref={refs.review}>
        {visible.review && (
          <Suspense fallback={null}>
            <HomeReview />
          </Suspense>
        )}
      </div>

      <div ref={refs.faq}>
        {visible.faq && (
          <Suspense fallback={null}>
            <EnrollFaq />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Enrool;
