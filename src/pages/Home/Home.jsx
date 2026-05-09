import HomeHero from "@/components/home/home-hero";
import certificationCourses from "@/data/certificationCourses";
import DeferredPopUp from "@/components/common/deferred-popup";
import LazySection from "@/components/common/lazy-section";
import { lazy } from "react";

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

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <DeferredPopUp slug="home" />

      <HomeHero slug="home" bottombar="true" />
      <LazySection minHeight="400px" rootMargin="160px">
        <HomeAbout />
      </LazySection>

      <LazySection minHeight="600px" rootMargin="0px">
        <HomeContact />
      </LazySection>

      <LazySection minHeight="500px">
        <HomeCourses certificationCourses={certificationCourses} />
      </LazySection>

      <LazySection minHeight="400px" withQuery QueryProvider={AppQueryProvider}>
        <HomePassout />
      </LazySection>

      <LazySection minHeight="500px" withQuery QueryProvider={AppQueryProvider}>
        <HomeResults
          title="We Stand by Results - Actual Certificates Earned by AIA Learners"
          description="Actual certificates earned by professionals across CFE, CIA, and CAMS after structured preparation with AIA."
        />
      </LazySection>

      <LazySection minHeight="300px">
        <HomeAccredited />
      </LazySection>

      <LazySection minHeight="400px" withQuery QueryProvider={AppQueryProvider}>
        <WhatsappCarosal
          course="all"
          title="Unfiltered Reflections from AIA-Trained Professionals"
          description="Heartfelt messages shared by professionals after completing their journey with AIA. Each message reflects a different experience. These reflections provide a genuine view of what preparation looks like in real situations, beyond structured testimonials"
        />
      </LazySection>

      <LazySection minHeight="400px" withQuery QueryProvider={AppQueryProvider}>
        <HomeReview />
      </LazySection>

      <LazySection minHeight="350px" withQuery QueryProvider={AppQueryProvider}>
        <AllYoutube />
      </LazySection>

      <LazySection minHeight="300px" withQuery QueryProvider={AppQueryProvider}>
        <HomeCorporatePartner />
      </LazySection>

      <LazySection minHeight="300px" withQuery QueryProvider={AppQueryProvider}>
        <HomePrCarousel />
      </LazySection>

      <LazySection minHeight="300px" withQuery QueryProvider={AppQueryProvider}>
        <HomeAlumniWork />
      </LazySection>

      <LazySection minHeight="400px" withQuery QueryProvider={AppQueryProvider}>
        <CourseYoutubeLecture
          courseSlug="home"
          title="Watch & Learn! Everything You Need to"
          highlight1="Crack the CFE, CIA & CAMS"
        />
      </LazySection>

      <LazySection minHeight="400px" withQuery QueryProvider={AppQueryProvider}>
        <HomeBlogs />
      </LazySection>

      <LazySection minHeight="300px" withQuery QueryProvider={AppQueryProvider}>
        <HomeFaq />
      </LazySection>
    </div>
  );
}
