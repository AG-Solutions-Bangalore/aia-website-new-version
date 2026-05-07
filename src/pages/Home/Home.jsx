import HomeHero from "@/components/home/home-hero";
import certificationCourses from "@/data/certificationCourses";
import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

const PopUp = lazy(() => import("@/components/common/pop-up"));
const AppQueryProvider = lazy(() => import("@/lib/query-provider"));
const HomeAbout = lazy(() => import("@/components/home/home-about"));
const HomeContact = lazy(() => import("@/components/home/home-contact"));
const HomeCourses = lazy(() => import("@/components/home/home-courses"));
const HomePassout = lazy(() => import("@/components/home/home-passout"));
const HomeResults = lazy(() => import("@/components/home/home-results"));
const HomeAccredited = lazy(() => import("@/components/home/home-accredited"));
const WhatsappCarosal = lazy(() =>
  import("@/components/common/whatsapp-carosal")
);
const HomeReview = lazy(() => import("@/components/home/home-review"));
const AllYoutube = lazy(() => import("@/components/common/get-all-youtube"));
const HomeCorporatePartner = lazy(() =>
  import("@/components/home/home-corporate-partner")
);
const HomePrCarousel = lazy(() => import("@/components/home/home-pr-carousel"));
const HomeAlumniWork = lazy(() =>
  import("@/components/home/home-alumini-work")
);
const CourseYoutubeLecture = lazy(() =>
  import("@/components/courses/common/course-youtube-lecture")
);
const HomeBlogs = lazy(() => import("@/components/home/home-blogs"));
const HomeFaq = lazy(() => import("@/components/home/home-faq"));

const SectionSkeleton = ({ height }) => (
  <div
    style={{ minHeight: height, background: "transparent" }}
    aria-hidden="true"
  />
);

const LazySection = ({
  children,
  rootMargin = "200px",
  minHeight = "200px",
  priority = false,
  withQuery = false,
}) => {
  const [isVisible, setIsVisible] = useState(priority);
  const [isPending, startTransition] = useTransition();
  const [reservedHeight, setReservedHeight] = useState(minHeight);
  const ref = useRef(null);
  const contentRef = useRef(null);
  const hasRendered = useRef(false);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRendered.current) {
          hasRendered.current = true;
          startTransition(() => setIsVisible(true));
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [priority, rootMargin]);

  useEffect(() => {
    if (!isVisible || !contentRef.current) return;

    const ro = new ResizeObserver(([entry]) => {
      const h = entry.contentRect.height;
      if (h > 0) setReservedHeight(`${h}px`);
    });
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={ref}
      style={{
        minHeight: isVisible && !isPending ? undefined : reservedHeight,
      }}
    >
      {isVisible ? (
        <Suspense fallback={<SectionSkeleton height={reservedHeight} />}>
          <div ref={contentRef}>
            {withQuery ? (
              <AppQueryProvider>{children}</AppQueryProvider>
            ) : (
              children
            )}
          </div>
        </Suspense>
      ) : (
        <SectionSkeleton height={reservedHeight} />
      )}
    </div>
  );
};

const DelayedPopUp = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const show = () => setShouldRender(true);
    const timer = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(show, { timeout: 2000 });
      } else {
        show();
      }
    }, 16000);

    return () => window.clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <Suspense fallback={null}>
      <PopUp slug="home" />
    </Suspense>
  );
};

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <DelayedPopUp />

      <HomeHero slug="home" bottombar="true" />
      <LazySection minHeight="400px" rootMargin="500px">
        <HomeAbout />
      </LazySection>

      <LazySection minHeight="600px" rootMargin="0px">
        <HomeContact />
      </LazySection>

      <LazySection minHeight="500px">
        <HomeCourses certificationCourses={certificationCourses} />
      </LazySection>

      <LazySection minHeight="400px" withQuery>
        <HomePassout />
      </LazySection>

      <LazySection minHeight="500px" withQuery>
        <HomeResults
          title="We Stand by Results - Actual Certificates Earned by AIA Learners"
          description="Actual certificates earned by professionals across CFE, CIA, and CAMS after structured preparation with AIA."
        />
      </LazySection>

      <LazySection minHeight="300px">
        <HomeAccredited />
      </LazySection>

      <LazySection minHeight="400px" withQuery>
        <WhatsappCarosal
          course="all"
          title="Unfiltered Reflections from AIA-Trained Professionals"
          description="Heartfelt messages shared by professionals after completing their journey with AIA. Each message reflects a different experience. These reflections provide a genuine view of what preparation looks like in real situations, beyond structured testimonials"
        />
      </LazySection>

      <LazySection minHeight="400px" withQuery>
        <HomeReview />
      </LazySection>

      <LazySection minHeight="350px" withQuery>
        <AllYoutube />
      </LazySection>

      <LazySection minHeight="300px" withQuery>
        <HomeCorporatePartner />
      </LazySection>

      <LazySection minHeight="300px" withQuery>
        <HomePrCarousel />
      </LazySection>

      <LazySection minHeight="300px" withQuery>
        <HomeAlumniWork />
      </LazySection>

      <LazySection minHeight="400px" withQuery>
        <CourseYoutubeLecture
          courseSlug="home"
          title="Watch & Learn! Everything You Need to"
          highlight1="Crack the CFE, CIA & CAMS"
        />
      </LazySection>

      <LazySection minHeight="400px" withQuery>
        <HomeBlogs />
      </LazySection>

      <LazySection minHeight="300px" withQuery>
        <HomeFaq />
      </LazySection>
    </div>
  );
}
