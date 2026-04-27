import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import PopUp from "../../components/common/pop-up";
import ContactHero from "@/components/contact/contact-hero";
import ContactReachOut from "@/components/contact/contact-reach-out";

const ContactHighlight = lazy(
  () => import("@/components/contact/contact-highlight"),
);
const CourseTopStudent = lazy(
  () => import("@/components/courses/common/course-top-student"),
);
const HomeAlumniWork = lazy(
  () => import("@/components/home/home-alumini-work"),
);
const ContactMap = lazy(() => import("@/components/contact/contact-map"));
const ContactUnique = lazy(() => import("@/components/contact/contact-unique"));
const HomeReview = lazy(() => import("@/components/home/home-review"));
const ContactLocation = lazy(
  () => import("@/components/contact/contact-location"),
);

const Contact = () => {
  const refs = useRef({
    highlight: { current: null },
    students: { current: null },
    alumni: { current: null },
    map: { current: null },
    unique: { current: null },
    review: { current: null },
    location: { current: null },
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
      <PopUp slug="Contact" />
      <ContactHero />
      <ContactReachOut />

      <div ref={refs.highlight}>
        {visible.highlight && (
          <Suspense fallback={null}>
            <ContactHighlight />
          </Suspense>
        )}
      </div>

      <div ref={refs.students}>
        {visible.students && (
          <Suspense fallback={null}>
            <CourseTopStudent
              courseSlug="all"
              needPrefix="false"
              title="Recent Passout Students"
              subtitle="Our successful graduates making a difference in the industry"
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

      <div ref={refs.map}>
        {visible.map && (
          <Suspense fallback={null}>
            <ContactMap />
          </Suspense>
        )}
      </div>

      <div ref={refs.unique}>
        {visible.unique && (
          <Suspense fallback={null}>
            <ContactUnique />
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

      <div ref={refs.location}>
        {visible.location && (
          <Suspense fallback={null}>
            <ContactLocation />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Contact;
