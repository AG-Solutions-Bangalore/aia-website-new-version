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
export const EnroolCardCarousel = ({
  studentData,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
  className = "",
}) => {
  return (
    <section className={`py-6 ${className}`}>
      <div className="mx-auto px-4">
        <div className="relative mx-auto flex w-full flex-col">
          <div className="flex w-full items-center justify-center">
            <div className="w-full max-w-6xl">
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
                        nextEl: `.${className} .swiper-button-next`,
                        prevEl: `.${className} .swiper-button-prev`,
                      }
                    : false
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                watchSlidesProgress={true}
                resistanceRatio={0.85}
                threshold={15}
                updateOnWindowResize={true}
                breakpoints={{
                  0: { spaceBetween: 10 },
                  640: { spaceBetween: 50 },
                }}
              >
                {studentData.map((student, index) => (
                  <SwiperSlide key={index} className="max-w-xs">
                    <div className="relative bg-white shadow-lg shadow-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50">
                      <div className=" border !rounded-none border-[#0F3652] relative">
                        <img
                          src={student.src}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover !rounded-none "
                          alt={student.alt}
                          loading="lazy"
                        />
                        {student?.course && (
                          <span className="py-0.5  text-white text-xs font-medium rounded absolute top-2 left-2 bg-[#0F3652] px-2">
                            {student?.course}
                          </span>
                        )}
                      </div>

                      <div className="bg-[#0F3652] px-4 py-3">
                        <div className="flex flex-row items-start justify-between w-full">
                          <div className="flex flex-col it space-y-1">
                            <span className="text-white font-bold text-base">
                              {student.name}
                            </span>
                            {student?.designation && (
                              <span className="py-0.5  text-white text-xs font-medium rounded">
                                {student?.designation}
                              </span>
                            )}
                          </div>

                          <div className="flex-shrink-0 pt-1">
                            <div className="w-12 h-12 flex items-center justify-center overflow-hidden ">
                              <img
                                src={student.companyLogo}
                                alt={student.companyLogoAlt}
                                className="max-w-full border border-white !rounded-none  max-h-full object-contain"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
