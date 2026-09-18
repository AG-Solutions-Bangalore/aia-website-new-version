import { BASE_URL } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionHeading from "../SectionHeading/SectionHeading";

const WEEK_ACHIEVERS_BASE = `${BASE_URL}/assets/images/week_achievers/`;

const WeeklyAchievers = ({
  title = "Meet AIA’s Weekly Achievers of 2026 - Representing Global Credentials",
  description = "Every week, more professionals earn globally recognised certifications with AIA, upgrade their expertise with real-world skills, and take a step towards making an impact worldwide.",
}) => {
  const {
    data: achieversData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["week-achievers"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getWeekAchievers`);
      return res?.data ?? { data: [], image_url: [] };
    },
  });

  const images = useMemo(() => {
    if (!achieversData?.data?.length) return [];

    const achieversBase =
      achieversData.image_url?.find((item) =>
        ["Week Achievers", "Weekly Achievers", "Week", "Weekly"].includes(
          item.image_for,
        ),
      )?.image_url || WEEK_ACHIEVERS_BASE;

    const noImage =
      achieversData.image_url?.find((item) => item.image_for === "No Image")
        ?.image_url || `${BASE_URL}/assets/images/no_image.jpg`;

    return achieversData.data.map((item) => ({
      src: item.weekly_achievers_image
        ? `${achieversBase}${item.weekly_achievers_image}`
        : noImage,
      alt: item.weekly_achievers_alt || "AIA Weekly Achiever",
    }));
  }, [achieversData]);

  if (isLoading) {
    return (
      <section className="bg-white py-12 px-6 lg:px-12 md:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <Skeleton height={40} width={420} className="mx-auto" />
          <Skeleton height={18} width={300} className="mx-auto mt-3" />
          <div className="mt-8 flex justify-center gap-4 overflow-hidden">
            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                height={320}
                width={250}
                className="rounded-xl"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !images.length) return null;

  return (
    <section className="bg-white py-12 px-6 lg:px-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={title}
          description={description}
          align="center"
        />

        <div className="weekly-achievers-carousel relative mt-8">
          <button
            aria-label="Previous achievers"
            className="weekly-achievers-prev carousel-nav-btn carousel-nav-prev"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            aria-label="Next achievers"
            className="weekly-achievers-next carousel-nav-btn carousel-nav-next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="mx-auto w-full max-w-6xl">
            <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              grabCursor
              loop={images.length > 4}
              speed={700}
              slidesPerView={1}
              spaceBetween={16}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".weekly-achievers-next",
                prevEl: ".weekly-achievers-prev",
              }}
              modules={[Autoplay, Navigation, Pagination]}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
            >
              {images.map((img, index) => (
                <SwiperSlide key={`${img.src}-${index}`}>
                  <div className="overflow-hidden rounded-xl border border-[#0F3652]/10 bg-white shadow-md transition-all duration-300 hover:border-[#F3831C]/50 hover:shadow-xl">
                    <div className="aspect-[4/5] w-full overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.alt}
                        title={img.alt}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = `${BASE_URL}/assets/images/no_image.jpg`;
                        }}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style>{`
        .weekly-achievers-carousel .swiper {
          width: 100%;
          padding-bottom: 44px;
        }
        .weekly-achievers-carousel .swiper-slide {
          height: auto;
        }
        .weekly-achievers-carousel .swiper-pagination {
          bottom: 0;
        }
        .weekly-achievers-carousel .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .weekly-achievers-carousel .swiper-pagination-bullet-active {
          background: #F3831C;
          width: 32px;
          border-radius: 9999px;
        }
        .carousel-nav-btn {
          position: absolute;
          top: 42%;
          transform: translateY(-50%);
          z-index: 20;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 1.5px solid rgba(15, 54, 82, 0.15);
          color: #0f3652;
          box-shadow:
            0 2px 8px rgba(15, 54, 82, 0.08),
            0 1px 3px rgba(15, 54, 82, 0.06);
          cursor: pointer;
          transition:
            background 0.22s ease,
            color 0.22s ease,
            border-color 0.22s ease,
            box-shadow 0.22s ease,
            transform 0.22s ease;
        }
        .carousel-nav-prev {
          left: -8px;
        }
        .carousel-nav-next {
          right: -8px;
        }
        @media (min-width: 1280px) {
          .carousel-nav-prev {
            left: -20px;
          }
          .carousel-nav-next {
            right: -20px;
          }
        }
        .carousel-nav-btn:hover {
          background: #0f3652;
          color: #ffffff;
          border-color: #0f3652;
          transform: translateY(-50%) scale(1.06);
        }
        .carousel-nav-btn:active {
          transform: translateY(-50%) scale(0.97);
        }
        .carousel-nav-btn.swiper-button-disabled {
          opacity: 0.35;
          pointer-events: none;
        }
        .carousel-nav-btn svg {
          display: block;
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
};

export default WeeklyAchievers;
