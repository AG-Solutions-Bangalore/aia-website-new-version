import { useRef } from "react";
import OptimizedImage from "../common/optmized-image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const CardCarousel = ({
  studentData,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
  className = "",
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <section className={`py-6 ${className}`}>

      <div className="mx-auto px-4">
        <div className="relative mx-auto flex w-full flex-col">
          <div className="flex w-full items-center justify-center">
            <div className="w-full max-w-6xl relative">
              {showNavigation && (
                <div className="md:hidden">
                  <button
                    ref={prevRef}
                    className="carousel-nav-btn carousel-nav-prev"
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
                    ref={nextRef}
                    className="carousel-nav-btn carousel-nav-next"
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
                </div>
              )}

              <Swiper
                onSwiper={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                navigation={
                  showNavigation ? { prevEl: null, nextEl: null } : false
                }
                autoplay={
                  studentData.length > 1
                    ? {
                      delay: autoplayDelay,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                    : false
                }
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={studentData.length > 1}
                loop={studentData.length > 3}
                slidesPerView={studentData.length < 3 ? studentData.length : 3}
                speed={800}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: studentData.length <= 5 ? 80 : 120,
                  modifier: 2.8,
                  slideShadows: false,
                }}
                pagination={showPagination ? { clickable: true } : false}
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                watchSlidesProgress={true}
                resistanceRatio={0.85}
                threshold={15}
                updateOnWindowResize={true}
                breakpoints={{
                  0: { slidesPerView: 1, spaceBetween: 20 },
                  640: {
                    slidesPerView: studentData.length < 2 ? 1 : 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView:
                      studentData.length < 3 ? studentData.length : 3,
                    spaceBetween: 40,
                  },
                }}
              >
                {studentData.map((student, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative bg-white shadow-lg shadow-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50">
                      <div className="border !rounded-none border-[#0F3652]">
                        <OptimizedImage
                          src={student.src}
                          className="w-full h-auto object-contain !rounded-none"
                          alt={student.alt}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
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
