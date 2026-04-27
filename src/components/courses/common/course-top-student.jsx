import { useQuery } from "@tanstack/react-query";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { BASE_URL } from "@/api/base-url";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { CardCarousel } from "@/components/ui/card-carousel";
import axios from "axios";

const CourseTopStudent = ({
  courseSlug,
  title,
  needPrefix,
  subtitle = "Our successful graduates making a difference in the industry",
}) => {
  const {
    data: camsPassoutData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["recent-passout-students", courseSlug],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/api/getTopStudentbyCourse/${courseSlug}`,
      );
      return res.data;
    },
  });

  const studentData = React.useMemo(() => {
    if (!camsPassoutData?.data) return [];

    const studentImageUrlObj = camsPassoutData.image_url?.find(
      (item) => item.image_for === "Student",
    );
    const studentNoImageUrlObj = camsPassoutData.image_url?.find(
      (item) => item.image_for === "No Image",
    );
    const studentImageUrl = studentImageUrlObj?.image_url || "";

    return camsPassoutData.data.map((student) => ({
      src: `${student.student_marks_image
        ? studentImageUrl + student.student_marks_image
        : studentNoImageUrlObj?.image_url || ""
        }`,
      alt: student.student_marks_image_alt || "Marks Image",
    }));
  }, [camsPassoutData]);

  if (isLoading) {
    return (
      <div className="relative w-full  py-8">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 30%, #7c3aed 1px, transparent 1.5px), radial-gradient(circle at 30% 70%, #db2777 1px, transparent 1.5px)",
              backgroundSize: "60px 60px",
              animation: "moveBackground 20s infinite alternate",
            }}
          ></div>
        </div>

        <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="mb-8 text-center gap-4">
            <div className="relative z-30">
              <Skeleton height={40} width={400} className="mx-auto" />
              <Skeleton height={20} width={200} className="mx-auto mt-2" />
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-64 h-80">
                <Skeleton height={320} width={256} />
                <Skeleton height={20} width={150} className="mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative w-full  py-8">
        <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <div className="text-red-500">
            Error loading students. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full  py-8">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <SectionHeading title={title} description={subtitle} align="center" />
        <CardCarousel
          studentData={studentData}
          autoplayDelay={3000}
          showPagination={true}
          showNavigation={true}
          className="showcase-student-carousel relative z-0"
        />
      </div>
      <style>{`
        .showcase-student-carousel .swiper {
          width: 100%;
          padding-bottom: 50px;
        }
        
        .showcase-student-carousel .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 300px;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        .showcase-student-carousel .swiper-slide img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 8px;
          transform: translateZ(0);
          will-change: transform;
        }
        
        .showcase-student-carousel .swiper-3d .swiper-slide-shadow-left,
        .showcase-student-carousel .swiper-3d .swiper-slide-shadow-right {
          background-image: none;
        }
        
        .showcase-student-carousel .swiper-pagination {
          display: none !important;
        }
        
        /* Animation for the background */
        @keyframes moveBackground {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .showcase-student-carousel .swiper {
            transition: none;
          }
          .showcase-student-carousel .swiper-slide {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default CourseTopStudent;
