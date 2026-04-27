import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

import PopUp from "@/components/common/pop-up";
import PassoutBanner from "@/components/passout/passout-banner";
import PassoutResult from "@/components/passout/passout-result";

const PassoutSucess = lazy(
  () => import("@/components/passout/passout-success"),
);
const AllYoutube = lazy(() => import("@/components/common/get-all-youtube"));
const WhatsappCarosal = lazy(
  () => import("@/components/common/whatsapp-carosal"),
);
const HomeReview = lazy(() => import("@/components/home/home-review"));
const HomeAlumniWork = lazy(
  () => import("@/components/home/home-alumini-work"),
);

const OurPassout = () => {
  const refs = useRef({
    success: { current: null },
    youtube: { current: null },
    whatsapp: { current: null },
    review: { current: null },
    alumni: { current: null },
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
      <PopUp slug="Passed-Out" />
      <PassoutBanner />
      <PassoutResult />

      <div ref={refs.success}>
        {visible.success && (
          <Suspense fallback={null}>
            <PassoutSucess />
          </Suspense>
        )}
      </div>

      <div ref={refs.youtube}>
        {visible.youtube && (
          <Suspense fallback={null}>
            <AllYoutube
              title="Hear from Our Recently Qualified Professionals on YouTube"
              description="Watch AIA-trained professionals share their success stories, exam strategies, and career insights in exclusive interviews with Puneet Sir on YouTube."
            />
          </Suspense>
        )}
      </div>

      <div ref={refs.whatsapp}>
        {visible.whatsapp && (
          <Suspense fallback={null}>
            <WhatsappCarosal
              title="Unfiltered Reflections from AIA-Trained Professionals"
              description="Heartfelt messages shared by professionals after completing their journey with AIA.
Each message reflects a different experience. These reflections provide a genuine view of what preparation looks like in real situations, beyond structured testimonials"
              course="all"
            />
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

      <div ref={refs.alumni}>
        {visible.alumni && (
          <Suspense fallback={null}>
            <HomeAlumniWork />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default OurPassout;
