import { BASE_URL } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { WhatsappTestimonialsSectionCourse } from "../courses/common/whatsapp-testimonial-with-marquee-course";
import { TestimonialsSectionCourse } from "../courses/common/testimonials-with-marquee-course";

const OfficeCeleberation = ({ title, description }) => {
  const {
    data: certificatesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["whatsapp-celeberation"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getOfficeCelebration`);
      return res.data;
    },
  });

  const testimonials = React.useMemo(() => {
    if (!certificatesData?.data) return [];

    return certificatesData.data.map((imageUrl, index) => ({
      author: {
        avatar: imageUrl,
      },
      alt: `Office Celebration ${index + 1}`,
    }));
  }, [certificatesData]);

  if (isLoading) {
    return (
      <div className="relative w-full py-12 sm:py-24 md:py-32">
        <div className="mx-auto max-w-container flex flex-col items-center gap-4 text-center sm:gap-16">
          <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
            <Skeleton height={40} width={400} />
            <Skeleton height={20} width={250} />
          </div>

          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="w-[225px] h-[400px]">
                <Skeleton height={400} width={225} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative w-full py-12 sm:py-24 md:py-32">
        <div className="mx-auto max-w-container text-center text-red-500">
          Error loading celebration images. Please try again later.
        </div>
      </div>
    );
  }

  if (!testimonials.length) return null;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <TestimonialsSectionCourse
        title={title || "Office Celebrations at AIA"}
        description={
          description || "Take a glimpse into our office celebration moments."
        }
        testimonials={testimonials}
        sucessstory={false}
        border={false}
      />
    </div>
  );
};

export default OfficeCeleberation;
