
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { BASE_URL } from "@/api/base-url";
import OptimizedImage from "@/components/common/optmized-image";

const HOME_BANNER_BASE =
  "https://aia.in.net/webapi/public/assets/images/banner_images/";

const HOME_FALLBACK_SLIDES = [
  {
    id: 1,
    imageUrl: `${HOME_BANNER_BASE}2.webp`,
    link: "contact",
    alt: "cia-cfe-cams-certification",
  },
  {
    id: 2,
    imageUrl: `${HOME_BANNER_BASE}11.webp`,
    link: "cams",
    alt: "cams-passout",
  },
  {
    id: 3,
    imageUrl: `${HOME_BANNER_BASE}10.webp`,
    link: "cams",
    alt: "CAMS Certification",
  },
  {
    id: 4,
    imageUrl: `${HOME_BANNER_BASE}6.webp`,
    link: "cfe-curriculum",
    alt: "CFE-Passouts",
  },
  {
    id: 5,
    imageUrl: `${HOME_BANNER_BASE}3.webp`,
    link: "cfe-curriculum",
    alt: "CFE Banner",
  },
  {
    id: 6,
    imageUrl: `${HOME_BANNER_BASE}5.webp`,
    link: "cia-challenge-curriculum",
    alt: "CIA-Passouts",
  },
  {
    id: 7,
    imageUrl: `${HOME_BANNER_BASE}9.webp`,
    link: "cia-challenge-curriculum",
    alt: "CIA Challenge Curriculum",
  },
  {
    id: 8,
    imageUrl: `${HOME_BANNER_BASE}4.webp`,
    link: "our-passouts",
    alt: "CIA-Passouts",
  },
  {
    id: 9,
    imageUrl: `${HOME_BANNER_BASE}8.webp`,
    link: "cia-curriculum",
    alt: "CIA Curriculum",
  },
  {
    id: 10,
    imageUrl: `${HOME_BANNER_BASE}7.webp`,
    link: "cfe-curriculum",
    alt: "CFE-Passout",
  },
];

const BANNER_FALLBACKS = {
  home: {
    image: "2.webp",
    alt: "cia-cfe-cams-certification",
    link: "contact",
  },
  "about-aia": {
    image: "12.webp",
    alt: "about-us",
    link: null,
  },
  "cfe-curriculum": {
    image: "13.webp",
    alt: "cfe-curriculum",
    link: null,
  },
  "cia-curriculum": {
    image: "15.webp",
    alt: "cia-curriculum",
    link: null,
  },
  "cia-challenge-curriculum": {
    image: "17.webp",
    alt: "cia-challenge-curriculum",
    link: null,
  },
  cams: {
    image: "19.webp",
    alt: "cia-challenge-curriculum",
    link: null,
  },
  "cia-free-resources": {
    image: "24.webp",
    alt: "CIA Free Resources",
    link: "contact",
  },
  "cams-free-resources": {
    image: "25.webp",
    alt: "CAMS Free Resources",
    link: "contact",
  },
  "cfe-free-resources": {
    image: "21.webp",
    alt: "cfe-free-resources",
    link: "contact",
  },
};

const HOME_FALLBACK_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Have Questions?",
    subtext: "Connect with experts and plan your preparation the smarter way.",
    link: "contact",
  },
  {
    id: 2,
    title: "Begin your CAMS Success journey here",
    subtext: "Start your CAMS journey with expert support and proven preparation.",
    link: "cams",
  },
  {
    id: 3,
    title: "Looking for a smarter way to prepare for CAMS?",
    subtext: "Switch to focused CAMS prep designed for real professional needs.",
    link: "cams",
  },
  {
    id: 4,
    title: "Want to build a career in fraud investigation?",
    subtext: "Explore our CFE Program & join a growing community of professionals.",
    link: "cfe-curriculum",
  },
  {
    id: 5,
    title: "Want to escape a bulky 2,000 pages manual?",
    subtext: "We've got you covered. Crack CFE with AIA's 250 pages quick notes.",
    link: "cfe-curriculum",
  },
  {
    id: 6,
    title: "Add the CIA credential to your professional profile",
    subtext: "Clear CIA Challenge with AIA's exclusive study material & approach.",
    link: "cia-challenge-curriculum",
  },
  {
    id: 7,
    title: "Struggling with heavy books? Not anymore.",
    subtext: "Switch to AIA's premium study resources & make your prep smarter.",
    link: "cia-challenge-curriculum",
  },
  {
    id: 8,
    title: "CIA Passouts",
    subtext: "CIA Passouts",
    link: "our-passouts",
  },
  {
    id: 9,
    title: "Want to crack the CIA on your first attempt?",
    subtext: "Choose the smart way, not the hard way - clear CIA with expert guidance.",
    link: "cia-curriculum",
  },
  {
    id: 10,
    title: "Trusted by professionals across 36+ countries worldwide.",
    subtext: "Join the global CFE network and build a career in fraud examination.",
    link: "cfe-curriculum",
  },
];

const getFallbackSlides = (slug) => {
  const fallback = BANNER_FALLBACKS[slug];
  if (!fallback) return [];

  return [
    {
      id: 1,
      imageUrl: `${HOME_BANNER_BASE}${fallback.image}`,
      link: fallback.link,
      alt: fallback.alt,
    },
  ];
};

export default function HomeHero({ slug, bottombar = false }) {
  const hasFallback = Boolean(BANNER_FALLBACKS[slug]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [carouselSlides, setCarouselSlides] = useState(() =>
    slug === "home" ? HOME_FALLBACK_SLIDES : getFallbackSlides(slug),
  );
  const [announcements, setAnnouncements] = useState(
    slug === "home" ? HOME_FALLBACK_ANNOUNCEMENTS : [],
  );
  const [isLoading, setIsLoading] = useState(!hasFallback);
  const [error, setError] = useState(null);
  const touchStartX = useRef(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    let loadTimer;
    let idleCallbackId;

    const loadBanner = async () => {
      try {
        if (!hasFallback) setIsLoading(true);
        setError(null);
        const response = await fetch(`${BASE_URL}/api/getBanner/${slug}`, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Banner request failed: ${response.status}`);
        }

        const data = await response.json();
        if (!data?.data || !data?.image_url) return;

        const bannerImageUrlObj = data.image_url.find(
          (item) => item.image_for === "Banner",
        );
        const baseImageUrl = bannerImageUrlObj?.image_url || "";

        const slides = data.data.map((banner, index) => ({
          id: index + 1,
          imageUrl: `${baseImageUrl}${banner.banner_image}`,
          link: banner.banner_link,
          alt: banner.banner_image_alt,
        }));

        const announcementsData = data.data.map((banner, index) => ({
          id: index + 1,
          title: banner.banner_text,
          subtext: banner.banner_sub_text,
          link: banner.banner_link,
        }));

        setCarouselSlides(slides);
        setAnnouncements(announcementsData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    const scheduleBannerLoad = () => {
      if (hasFallback) {
        loadTimer = window.setTimeout(() => {
          if ("requestIdleCallback" in window) {
            idleCallbackId = window.requestIdleCallback(loadBanner, {
              timeout: 3000,
            });
          } else {
            loadBanner();
          }
        }, 6000);
        return;
      }

      loadBanner();
    };

    scheduleBannerLoad();

    return () => {
      controller.abort();
      window.clearTimeout(loadTimer);
      if (idleCallbackId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
    };
  }, [hasFallback, slug]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsAutoPlaying(true), 8000);
    return () => window.clearTimeout(timer);
  }, []);

  const nextSlide = useCallback(() => {
    if (carouselSlides.length > 0)
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  }, [carouselSlides.length]);

  const prevSlide = useCallback(() => {
    if (carouselSlides.length > 0)
      setCurrentSlide(
        (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length,
      );
  }, [carouselSlides.length]);

  const goToSlide = useCallback((index) => setCurrentSlide(index), []);

  const handleTouchStart = useCallback((event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    suppressClick.current = false;
  }, []);

  const handleTouchEnd = useCallback(
    (event) => {
      if (touchStartX.current == null) return;

      const endX = event.changedTouches[0]?.clientX;
      if (endX == null) return;

      const deltaX = endX - touchStartX.current;
      touchStartX.current = null;

      if (Math.abs(deltaX) < 40) return;

      suppressClick.current = true;
      setIsAutoPlaying(false);

      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    },
    [nextSlide, prevSlide],
  );

  useEffect(() => {
    if (!isAutoPlaying || carouselSlides.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselSlides.length, nextSlide]);

  if (isLoading) {
    return (

      <section className="relative">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "11/5" }}
        >
          <div className="absolute inset-0 bg-gray-200 shimmer" />
        </div>

        {bottombar && (
          <>

            <div
              className="hidden lg:block"
              style={{ height: 44 }}
              aria-hidden="true"
            />

            {/* The actual skeleton bottombar — matches real bottombar structure */}
            <div className="lg:absolute lg:w-[500px] lg:bottom-0 lg:left-5 lg:z-20 lg:translate-y-1/2">
              {/* Orange gradient bar */}
              <div className="h-[3px] bg-gray-300 animate-pulse" />

              {/* Card body */}
              <div className="bg-gray-200 shimmer">
                {/* Row 1: accent bar + text lines + CTA button */}
                <div className="px-4 pt-4 pb-3 flex items-start gap-3">
                  <div className="shrink-0 w-[3px] h-14 bg-gray-300 rounded-full" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                    <div className="h-3 bg-gray-300 rounded w-1/2" />
                  </div>
                  <div className="w-20 h-7 bg-gray-300 rounded shrink-0" />
                </div>

                {/* Row 2: counter + dots + arrows */}
                <div className="px-4 pb-3 flex items-center justify-between border-t border-gray-300/30 pt-2">
                  <div className="w-10 h-2.5 bg-gray-300 rounded" />
                  <div className="flex items-center gap-2">
                    {/* Fixed-width dot containers — matches the real dots fix */}
                    <div className="w-4 h-[3px] bg-gray-300 rounded-full" />
                    <div className="w-4 h-[3px] bg-gray-300 rounded-full" />
                    <div className="w-4 h-[3px] bg-gray-300 rounded-full" />
                  </div>
                  <div className="flex gap-0.5">
                    <div className="w-6 h-6 bg-gray-300 rounded" />
                    <div className="w-6 h-6 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative h-[420px] bg-red-50 flex items-center justify-center">
        <span className="text-xs text-red-400 font-medium">
          Failed to load banners: {error?.message}
        </span>
      </section>
    );
  }

  if (carouselSlides.length === 0) {
    return (
      <section className="relative h-[420px] bg-gray-100 flex items-center justify-center">
        <span className="text-xs text-gray-400 font-medium">
          No banners available
        </span>
      </section>
    );
  }

  const activeSlide = carouselSlides[currentSlide];
  const current = announcements[currentSlide];
  const slideHref = activeSlide?.link
    ? activeSlide.link.startsWith("http")
      ? activeSlide.link
      : `/${activeSlide.link.replace(/^\/+/, "")}`
    : undefined;
  const isExternalSlide = Boolean(slideHref?.startsWith("http"));
  const currentHref = current?.link
    ? current.link.startsWith("http")
      ? current.link
      : `/${current.link.replace(/^\/+/, "")}`
    : undefined;
  const isExternalCurrent = Boolean(currentHref?.startsWith("http"));

  return (
    <section className="relative">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full" style={{ aspectRatio: "11/5" }}>
          {activeSlide && (
            <a
              key={activeSlide.id}
              href={slideHref}
              target={isExternalSlide ? "_blank" : undefined}
              rel={isExternalSlide ? "noopener noreferrer" : undefined}
              className="absolute inset-0 z-10"
              aria-label={activeSlide.alt || "Open banner link"}
              onClick={(event) => {
                if (suppressClick.current) {
                  event.preventDefault();
                  suppressClick.current = false;
                }
              }}
            >
              <OptimizedImage
                src={activeSlide.imageUrl}
                alt={activeSlide.alt}
                priority={currentSlide === 0}
                width={1600}
                height={727}
                sizes="100vw"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/1200x400?text=Banner";
                }}
              />
            </a>
          )}

          {carouselSlides.length > 1 &&
            [
              {
                dir: "prev",
                Icon: ChevronLeft,
                onClick: prevSlide,
                side: "left-4",
              },
              {
                dir: "next",
                Icon: ChevronRight,
                onClick: nextSlide,
                side: "right-4",
              },
            ].map(({ dir, Icon, onClick, side }) => (
              <button
                key={dir}
                onClick={onClick}
                aria-label={`${dir === "prev" ? "Previous" : "Next"} slide`}
                className={`absolute ${side} top-1/2 -translate-y-1/2 z-20
                w-11 h-11 flex items-center justify-center
                rounded-full bg-black/25 hover:bg-black/55
                text-white backdrop-blur-sm border border-white/10
                transition-all duration-200 hover:scale-105 active:scale-95`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            ))}
        </div>
      </div>

      {current != null && bottombar && (
        <div className="lg:absolute lg:w-[500px] lg:bottom-0 lg:left-5 lg:z-20 lg:translate-y-1/2">
          <div className="h-[3px] bg-gradient-to-r from-[#F3831C] via-[#F3831C]/70 to-transparent" />

          <div className="bg-black/85 backdrop-blur-md border border-t-0 border-white/10">
            {/* Row 1 — Text + CTA */}
            <div className="px-4 pt-3.5 pb-2.5 flex items-start gap-3">
              <div className="shrink-0 w-[3px] self-stretch bg-gradient-to-b from-[#F3831C] to-[#F3831C]/20 rounded-full" />

              <div className="flex-1">
                <p className="text-[13px] font-semibold text-white leading-snug">
                  {current.title}
                </p>
                {current.subtext && (
                  <p className="text-[11.5px] text-white/80 mt-1 leading-snug font-normal">
                    {current.subtext}
                  </p>
                )}
              </div>

              <a
                href={currentHref}
                target={isExternalCurrent ? "_blank" : undefined}
                rel={isExternalCurrent ? "noopener noreferrer" : undefined}
                aria-label={`Learn more about: ${current.title}`}
                className="shrink-0 inline-flex items-center gap-1 px-3.5 py-1.5
                  text-[10.5px] font-bold uppercase tracking-widest
                  min-h-11 text-white bg-[#B45309] hover:bg-[#92400E] active:bg-[#78350F]
                  transition-colors duration-150 whitespace-nowrap self-start"
              >
                Know More.
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="px-4 pb-3 flex items-center justify-between border-t border-white/5 pt-2">
              <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">
                {String(currentSlide + 1).padStart(2, "0")} /{" "}
                {String(announcements.length).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-2">
                {announcements.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className="min-h-6 min-w-6 flex items-center justify-center overflow-hidden"
                    aria-current={index === currentSlide ? "true" : undefined}
                  >
                    <span
                      className="h-[3px] w-4 overflow-hidden rounded-full"
                      style={{ background: "rgba(255,255,255,0.45)" }}
                    >
                      <span
                        className="block h-full transition-all duration-300"
                        style={{
                          width: index === currentSlide ? "100%" : "0%",
                          background: "#F3831C",
                        }}
                      />
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="min-h-11 min-w-11 flex items-center justify-center
                    text-white/80 hover:text-white transition-colors duration-150 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="min-h-11 min-w-11 flex items-center justify-center
                    text-white/80 hover:text-white transition-colors duration-150 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
