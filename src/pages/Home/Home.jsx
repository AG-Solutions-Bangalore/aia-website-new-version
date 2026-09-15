import HomeHero from "@/components/home/home-hero";
import DeferredPopUp from "@/components/common/deferred-popup";
import LazySection from "@/components/common/lazy-section";
import { lazy, Suspense } from "react";

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
const CfeRoadmapDialog = lazy(() =>
  import("@/components/common/CfeRoadmapDialog")
);

const homeSectionProps = {
  prerender: false,
  deferUntilIdle: true,
  idleDelay: 2400,
  idleTimeout: 1200,
  rootMargin: "120px",
};

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <DeferredPopUp slug="home" />

      <HomeHero slug="home" bottombar="true" />
      <LazySection
        {...homeSectionProps}
        minHeight="400px"
        prerender
        deferUntilIdle={false}
      >
        <HomeAbout />
      </LazySection>

      <LazySection {...homeSectionProps} minHeight="600px" rootMargin="0px">
        <HomeContact />
      </LazySection>

      <LazySection {...homeSectionProps} minHeight="500px">
        <HomeCourses />
      </LazySection>

      <LazySection {...homeSectionProps} minHeight="400px" withQuery QueryProvider={AppQueryProvider}>
        <HomePassout />
      </LazySection>

      <section className="bg-slate-50 border-y border-slate-200 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F3652] mb-5 leading-snug">
            Get Access to the free CFE 60-day roadmap in your inbox.
          </h2>
          <Suspense fallback={null}>
            <CfeRoadmapDialog
              buttonlabel="Download Now"
              buttonClassName="bg-[#F3831C] text-white px-8 py-3 rounded-none font-semibold hover:bg-[#D16E27] active:bg-[#AE5B1D] transition-colors cursor-pointer text-base"
            />
          </Suspense>
        </div>
      </section>

      <LazySection {...homeSectionProps} minHeight="500px" withQuery QueryProvider={AppQueryProvider}>
        <HomeResults
          title="We Stand by Results - Actual Certificates Earned by AIA Learners"
          description="Actual certificates earned by professionals across CFE, CIA, and CAMS after structured preparation with AIA."
        />
      </LazySection>

      <LazySection {...homeSectionProps} minHeight="300px">
        <HomeAccredited />
      </LazySection>

      <LazySection {...homeSectionProps} minHeight="400px" withQuery QueryProvider={AppQueryProvider}>
        <WhatsappCarosal
          course="all"
          title="Unfiltered Reflections from AIA-Trained Professionals"
          description="Heartfelt messages shared by professionals after completing their journey with AIA. Each message reflects a different experience. These reflections provide a genuine view of what preparation looks like in real situations, beyond structured testimonials"
        />
      </LazySection>

      <section className="bg-[#0F3652] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 leading-snug">
            Working Full-Time + Preparing For CFE?<br /> You need a structured study schedule.
          </h2>
          <Suspense fallback={null}>
            <CfeRoadmapDialog
              buttonlabel="Download the CFE Roadmap"
              buttonClassName="bg-[#F3831C] text-white px-8 py-3 rounded-none font-semibold hover:bg-[#D16E27] active:bg-[#AE5B1D] transition-colors cursor-pointer text-base"
            />
          </Suspense>
        </div>
      </section>

      <LazySection {...homeSectionProps} minHeight="400px" withQuery QueryProvider={AppQueryProvider}>
        <HomeReview />
      </LazySection>

      <LazySection {...homeSectionProps} minHeight="350px" withQuery QueryProvider={AppQueryProvider}>
        <AllYoutube />
      </LazySection>

      <LazySection {...homeSectionProps} minHeight="300px" withQuery QueryProvider={AppQueryProvider}>
        <HomeCorporatePartner />
      </LazySection>

      <LazySection {...homeSectionProps} minHeight="300px" withQuery QueryProvider={AppQueryProvider}>
        <HomePrCarousel />
      </LazySection>

      <LazySection {...homeSectionProps} minHeight="300px" withQuery QueryProvider={AppQueryProvider}>
        <HomeAlumniWork />
      </LazySection>

      <LazySection {...homeSectionProps} minHeight="400px" withQuery QueryProvider={AppQueryProvider}>
        <CourseYoutubeLecture
          courseSlug="home"
          title="Watch & Learn! Everything You Need to"
          highlight1="Crack the CFE, CIA & CAMS"
        />
      </LazySection>

      <LazySection {...homeSectionProps} minHeight="400px" withQuery QueryProvider={AppQueryProvider}>
        <HomeBlogs />
      </LazySection>

      <LazySection {...homeSectionProps} minHeight="300px" withQuery QueryProvider={AppQueryProvider}>
        <HomeFaq />
      </LazySection>
    </div>
  );
}
