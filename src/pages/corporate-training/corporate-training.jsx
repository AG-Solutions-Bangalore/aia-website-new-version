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

const lazySectionOrder = [
  "whyAia",
  "partner",
  "quote1",
  "deliver",
  "carousel",
  "connection",
  "quote2",
  "highlight",
  "faq",
  "trainer",
  "review",
];

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

  const [visible, setVisible] = useState({ whyAia: true });

  useEffect(() => {
    const nextSectionIndex = lazySectionOrder.findIndex(
      (key) => !visible[key],
    );

    if (nextSectionIndex === -1) return undefined;

    const nextSection = lazySectionOrder[nextSectionIndex];
    const target = refs[nextSection].current;
    const previousSection =
      nextSectionIndex > 0 ? lazySectionOrder[nextSectionIndex - 1] : null;
    const previousTarget = previousSection
      ? refs[previousSection].current
      : null;

    if (!target) return undefined;

    target.dataset.section = nextSection;

    const revealNextSection = () => {
      if (
        previousTarget &&
        previousTarget.getBoundingClientRect().height <= 1
      ) {
        return;
      }

      const targetTop = target.getBoundingClientRect().top;

      if (targetTop <= window.innerHeight + 150) {
        setVisible((prev) =>
          prev[nextSection] ? prev : { ...prev, [nextSection]: true },
        );
      }
    };

    const resizeObserver = previousTarget
      ? new ResizeObserver(revealNextSection)
      : null;
    const animationFrame = window.requestAnimationFrame(revealNextSection);
    const interval = window.setInterval(revealNextSection, 200);

    resizeObserver?.observe(previousTarget);
    window.addEventListener("scroll", revealNextSection, { passive: true });
    window.addEventListener("resize", revealNextSection);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearInterval(interval);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", revealNextSection);
      window.removeEventListener("resize", revealNextSection);
    };
  }, [refs, visible]);

  return (
    <>
      {/* Initial render */}
      <HomeHero slug="corporate-training" />
      <CorporateWhy />
      <HomeCourses certificationCourses={CorporatecertificationCourses} />

      <div ref={refs.whyAia} className="min-h-px">
        {visible.whyAia && (
          <Suspense fallback={null}>
            <CorporateWhyAia />
          </Suspense>
        )}
      </div>

      <div ref={refs.partner} className="min-h-px">
        {visible.partner && (
          <Suspense fallback={null}>
            <AboutPartner />
          </Suspense>
        )}
      </div>

      <div ref={refs.quote1} className="min-h-px">
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

      <div ref={refs.deliver} className="min-h-px">
        {visible.deliver && (
          <Suspense fallback={null}>
            <CorporateDeliver />
          </Suspense>
        )}
      </div>

      <div ref={refs.carousel} className="min-h-px">
        {visible.carousel && (
          <Suspense fallback={null}>
            <CorporateCarousel />
          </Suspense>
        )}
      </div>

      <div ref={refs.connection} className="min-h-px">
        {visible.connection && (
          <Suspense fallback={null}>
            <CamsConnection
              path="how_it_works_corporate.webp"
              title="Here's Why Top Organizations Partner With Us"
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.quote2} className="min-h-px">
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

      <div ref={refs.highlight} className="min-h-px">
        {visible.highlight && (
          <Suspense fallback={null}>
            <CorporateHighlight />
          </Suspense>
        )}
      </div>

      <div ref={refs.faq} className="min-h-px">
        {visible.faq && (
          <Suspense fallback={null}>
            <CorporateFaq />
          </Suspense>
        )}
      </div>

      <div ref={refs.trainer} className="min-h-px">
        {visible.trainer && (
          <Suspense fallback={null}>
            <CorporateTrainer />
          </Suspense>
        )}
      </div>

      <div ref={refs.review} className="min-h-px">
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
