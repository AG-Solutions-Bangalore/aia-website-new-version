import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import HomeHero from "@/components/home/home-hero";
import CorporateWhy from "@/components/corporate-training/corporate-why";
import HomeCourses from "@/components/home/home-courses";
import { CorporatecertificationCourses } from "@/data/certificationCourses";

const CorporateWhyAia = lazy(
  () => import("@/components/corporate-training/corporate-why-aia"),
);
const AboutPartner = lazy(() => import("@/components/about/about-partner"));
const CorporateQuoteDialog = lazy(
  () => import("@/components/corporate-training/corporate-quote"),
);
const CorporateDeliver = lazy(
  () => import("@/components/corporate-training/corporate-deliver"),
);
const CorporateCarousel = lazy(
  () => import("@/components/corporate-training/corporate-carousel"),
);
const CamsConnection = lazy(
  () => import("@/components/courses/cams/cams-connection"),
);
const CorporateHighlight = lazy(
  () => import("@/components/corporate-training/corporate-highlight"),
);
const CorporateFaq = lazy(
  () => import("@/components/corporate-training/corporate-faq"),
);
const CorporateTrainer = lazy(
  () => import("@/components/corporate-training/corporate-trainer"),
);
const CorporateReview = lazy(
  () => import("@/components/corporate-training/corporate-review"),
);

const CorporateTraining = () => {
  const refs = useRef({
    whyAia: { current: null },
    partner: { current: null },
    quote1: { current: null },
    deliver: { current: null },
    carousel: { current: null },
    connection: { current: null },
    quote2: { current: null },
    highlight: { current: null },
    faq: { current: null },
    trainer: { current: null },
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
    <>
      {/* Initial render */}
      <HomeHero slug="corporate-training" />
      <CorporateWhy />
      <HomeCourses certificationCourses={CorporatecertificationCourses} />

      <div ref={refs.whyAia}>
        {visible.whyAia && (
          <Suspense fallback={null}>
            <CorporateWhyAia />
          </Suspense>
        )}
      </div>

      <div ref={refs.partner}>
        {visible.partner && (
          <Suspense fallback={null}>
            <AboutPartner />
          </Suspense>
        )}
      </div>

      <div ref={refs.quote1}>
        {visible.quote1 && (
          <Suspense fallback={null}>
            <CorporateQuoteDialog
              triggerText="Level Up Your Team"
              title="Level Up Your Team"
              description="Fill in your details and our experts will contact you shortly"
              userType="Corporate-Quote"
              quote="Invest in people because untrained teams can't execute great strategies."
              bottomcontent="Leadership Insight"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.deliver}>
        {visible.deliver && (
          <Suspense fallback={null}>
            <CorporateDeliver />
          </Suspense>
        )}
      </div>

      <div ref={refs.carousel}>
        {visible.carousel && (
          <Suspense fallback={null}>
            <CorporateCarousel />
          </Suspense>
        )}
      </div>

      <div ref={refs.connection}>
        {visible.connection && (
          <Suspense fallback={null}>
            <CamsConnection
              path="how_it_works_corporate.webp"
              title="Here's Why Top Organizations Partner With Us"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.quote2}>
        {visible.quote2 && (
          <Suspense fallback={null}>
            <CorporateQuoteDialog
              triggerText="Talk to our Training Expert"
              title="Talk to our Training Expert"
              description="Fill in your details and our training experts will design a custom plan for your team"
              userType="Corporate-Training"
              quote="Let's Design Your Custom Training Plan Today!"
              topcontent={true}
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.highlight}>
        {visible.highlight && (
          <Suspense fallback={null}>
            <CorporateHighlight />
          </Suspense>
        )}
      </div>

      <div ref={refs.faq}>
        {visible.faq && (
          <Suspense fallback={null}>
            <CorporateFaq />
          </Suspense>
        )}
      </div>

      <div ref={refs.trainer}>
        {visible.trainer && (
          <Suspense fallback={null}>
            <CorporateTrainer />
          </Suspense>
        )}
      </div>

      <div ref={refs.review}>
        {visible.review && (
          <Suspense fallback={null}>
            <CorporateReview />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default CorporateTraining;
