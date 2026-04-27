import { BASE_URL, IMAGE_PATH } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeading from "../SectionHeading/SectionHeading";
import HomeMap from "./home-map";

const HomeReview = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["aia-testimonials"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getAllTestimonials`);
      return res.data;
    },
  });

  const studentImageBase = useMemo(
    () =>
      data?.image_url?.find((img) => img.image_for === "Student")?.image_url ||
      "",
    [data?.image_url],
  );

  const noImageUrl = useMemo(
    () =>
      data?.image_url?.find((img) => img.image_for === "No Image")?.image_url ||
      "",
    [data?.image_url],
  );

  const testimonials = useMemo(
    () =>
      data?.data?.map((item) => ({
        name: item.student_name,
        course: item.student_course,
        message: item.student_testimonial,
        link: item.student_testimonial_link,
        update: item.updated_at,
        image: item.student_image
          ? `${studentImageBase}${item.student_image}`
          : noImageUrl,
        alt: item.student_image_alt || item.student_name,
      })) || [],
    [data?.data, studentImageBase, noImageUrl],
  );

  // Limit to 25 items to reduce DOM size (3300+ elements reported)
  const displayedTestimonials = useMemo(() => testimonials.slice(0, 25), [testimonials]);
  const truncateText = (text, limit = 430) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };
  return (
    <section className="py-12 bg-white">
      {!isLoading && !isError && testimonials.length > 0 && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Academy of Internal Audit",
              url: "https://aia.in.net/",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                bestRating: "5",
                worstRating: "1",
                reviewCount: testimonials.length.toString(),
              },
              review: testimonials.map((t) => ({
                "@type": "Review",
                author: { "@type": "Person", name: t.name },
                reviewBody: t.message,
                datePublished: new Date(t.update).toISOString().split("T")[0],
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5",
                  worstRating: "1",
                },
              })),
            })}
          </script>
        </Helmet>
      )}

      <div className="max-w-340 mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="md:hidden">
          <SectionHeading
            title="Trusted by Learners Across the Globe"
            description="Real experiences shared by professionals on how AIA helped them achieve their certification goals."
            align="center"
          />
        </div>
        <div className="hidden md:block">
          <SectionHeading
            title="Trusted by Learners Across the Globe"
            description="Real experiences shared by professionals on how AIA helped them achieve their certification goals."
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <HomeMap />
          </div>

          <div className="w-full lg:w-1/2 px-4">
            {isLoading && <p className="text-[#0F3652]">loading......</p>}

            {isError && !isLoading && (
              <div className="flex items-center justify-center bg-[#F3831C]/10 text-[#F3831C] rounded-lg p-4 mb-6">
                <AlertCircle className="mr-2" size={18} />
                <span>Failed to load testimonials</span>
                <button
                  className="ml-3 px-3 py-1 text-sm border border-[#F3831C] text-[#F3831C] rounded hover:bg-[#F3831C] hover:text-white transition-colors"
                  onClick={refetch}
                >
                  <RefreshCcw className="mr-1 inline" size={14} />
                  Try Again
                </button>
              </div>
            )}

            {!isLoading && !isError && testimonials.length > 0 && (
              <>
                <div className="mb-6 flex gap-2">
                  <img
                    src={`${IMAGE_PATH}/g_logo.webp`}
                    alt="Google Logo"
                    className="h-10 w-10 md:w-12 md:h-12"
                    loading="lazy"
                  />
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0F3652]">
                    300+ Professional Experiences Shared
                  </h2>
                </div>
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  loop
                  className="testimonial-swiper"
                >
                  {displayedTestimonials.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="bg-white rounded-xl p-4 md:p-6 border border-[#F3831C]/20">
                        <div className="flex items-start gap-4 mb-4">
                          <LazyLoadImage
                            src={item.image}
                            alt={item.alt}
                            className="w-14 h-14 min-w-14 min-h-14 rounded-full object-cover border-2 border-[#0F3652] flex-shrink-0"
                            effect="blur"
                          />
                          <div>
                            <h4 className="text-lg font-semibold text-[#0F3652]">
                              {item.name}
                            </h4>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="w-4 h-4 text-[#F3831C]"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>

                          <svg
                            className="w-10 h-10 text-[#0F3652] ml-auto"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>

                        <p className="text-[#0F3652] pl-2 border-l-2 border-[#F3831C]/50 text-justify">
                          {truncateText(item.message)}

                          {item?.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-[#F3831C] font-medium text-sm hover:underline cursor-pointer"
                            >
                              Read more
                            </a>
                          )}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeReview;
