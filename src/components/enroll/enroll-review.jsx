 
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BASE_URL, IMAGE_PATH } from "@/api/base-url";

const ServiceCard = React.forwardRef(
  ({ testimonial, i, progress, range, targetScale, imageUrl }, ref) => {
    const scale = useTransform(progress, range, [1, targetScale]);
    const opacity = useTransform(progress, [i * 0.25, (i + 1) * 0.25], [1, 1]);

    return (
      <div
        ref={ref}
        className="h-screen  flex items-center justify-center sticky top-0"
      >
        <motion.div
          style={{
            backgroundColor: i % 2 === 0 ? "#ffffff" : "#0F3652",
            scale,
            opacity,
            top: 0,
          }}
          className="relative w-full rounded-3xl p-8 shadow-2xl border-2 border-[#F3831C]/20 min-h-125 flex flex-col justify-between origin-top"
        >
          <div>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#F3831C]">
                  <img
                    src={`${imageUrl}${testimonial.student_image}`}
                    alt={testimonial.student_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `${IMAGE_PATH}/no_image.jpg`;
                    }}
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: i % 2 === 0 ? "#0F3652" : "#ffffff" }}
                  >
                    {testimonial.student_name}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: i % 2 === 0 ? "#64748b" : "#d1d5db" }}
                  >
                    {testimonial.student_course} Student
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-5 h-5 text-[#F3831C] fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div
                className="text-lg italic"
                style={{ color: i % 2 === 0 ? "#0F3652" : "#ffffff" }}
              >
                "{testimonial.student_testimonial}"
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6">
            <div className="text-3xl font-bold text-[#F3831C] opacity-20">
              {String(i + 1).padStart(2, "0")}
            </div>
          </div>
        </motion.div>
      </div>
    );
  },
);

ServiceCard.displayName = "ServiceCard";

const EnrollReview = () => {
  const container = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const cardRefs = useRef([]);
  const [isReady, setIsReady] = useState(false);

  const {
    data: testimonialsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["enroll-testimonials"],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/api/getTestimonialbyCourse/Enroll-Now`,
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (testimonialsData) {
      const studentImageUrlObj = testimonialsData.image_url?.find(
        (item) => item.image_for === "Student",
      );
      const studentImageUrl = studentImageUrlObj?.image_url || "";
      setImageUrl(studentImageUrl);

      const testimonialsWithCount = (testimonialsData.data || []).map(
        (t, index) => ({
          ...t,
          _index: index,
          _totalCount: testimonialsData.data.length,
        }),
      );
      setTestimonials(testimonialsWithCount);
      cardRefs.current = testimonialsWithCount.map(() => React.createRef());
      setTimeout(() => setIsReady(true), 0);
    }
  }, [testimonialsData]);

  if (isLoading) {
    return (
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Skeleton height={500} />
          </div>
          <div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="mb-8">
                <Skeleton height={400} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-[#F3831C]">
          Error loading testimonials. Please try again later.
        </div>
      </div>
    );
  }

  //   if (testimonials.length === 0) {
  //     return null;
  //   }

  return (
    <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="md:sticky md:top-0 md:h-screen md:flex md:items-center md:justify-center">
          <img
            src={`${IMAGE_PATH}/rated.webp`}
            alt="Rated testimonial"
            className="w-full h-auto max-w-full object-contain transform -scale-x-100"
            style={{ maxHeight: "90vh" }}
             loading="lazy"
          />
        </div>

        {isReady && (
          <ScrollableTestimonials
            testimonials={testimonials}
            imageUrl={imageUrl}
            containerRef={container}
          />
        )}
      </div>
    </div>
  );
};

const ScrollableTestimonials = ({ testimonials, imageUrl, containerRef }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardRefs = useRef(testimonials.map(() => React.createRef()));

  return (
    <div
      ref={containerRef}
      className="relative "
      style={{ height: `${testimonials.length * 100}vh` }}
    >
      {testimonials.map((testimonial, i) => {
        const targetScale = 1 - (testimonials.length - i) * 0.05;
        const start = i / testimonials.length;
        const end = start + 1 / testimonials.length;

        return (
          <ServiceCard
            key={testimonial.id}
            ref={cardRefs.current[i]}
            testimonial={testimonial}
            i={i}
            progress={scrollYProgress}
            range={[start, end]}
            targetScale={targetScale}
            imageUrl={imageUrl}
          />
        );
      })}
    </div>
  );
};

export default EnrollReview;
