import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

export const PrCardCarousel = ({
  studentData,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
  className = "",
}) => {
  return (
    <section className={`py-6 ${className}`}>
      <div className="mx-auto px-4">
        <div className="relative mx-auto w-full max-w-6xl">
          {showNavigation && (
            <>
              <button className="swiper-button-prev-custom carousel-nav-btn carousel-nav-prev">
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
              <button className="swiper-button-next-custom carousel-nav-btn carousel-nav-next">
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
            </>
          )}

          <Swiper
            autoplay={{
              delay: autoplayDelay,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            speed={800}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={showPagination ? { clickable: true } : false}
            navigation={
              showNavigation
                ? {
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }
                : false
            }
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
            breakpoints={{
              0: { spaceBetween: 10 },
              640: { spaceBetween: 40 },
            }}
          >
            {studentData.map((student, index) => (
              <SwiperSlide key={index} className="max-w-xs">
                <div className="relative bg-white shadow-lg shadow-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="border border-[#0F3652]">
                    <a
                      href={student.link}
                      target="_blank"
                      rel="nofollow noreferrer"
                    >
                      <img
                        src={student.src}
                        className="w-full h-48 object-contain"
                        alt={student.alt}
                        loading="lazy"
                      />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .carousel-nav-btn {
          position: absolute;
          top: 50%;
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
          left: -20px;
        }
        .carousel-nav-next {
          right: -20px;
        }

        .carousel-nav-btn:hover {
          background: #0f3652;
          color: #ffffff;
          border-color: #0f3652;
          box-shadow:
            0 4px 16px rgba(15, 54, 82, 0.2),
            0 2px 6px rgba(15, 54, 82, 0.12);
          transform: translateY(-50%) scale(1.06);
        }

        .carousel-nav-btn:active {
          transform: translateY(-50%) scale(0.97);
          box-shadow: 0 2px 6px rgba(15, 54, 82, 0.12);
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
