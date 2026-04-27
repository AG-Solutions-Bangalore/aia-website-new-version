import { BASE_URL } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TestimonialsSectionColor } from "./testimonialsection-color";

const HomeResults = ({ title, description }) => {
  const {
    data: certificatesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course-results-common"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getAllCertificate`);
      return res?.data ?? { data: [], image_url: [] };
    },
  });

  const testimonials = useMemo(() => {
    if (!certificatesData?.data?.length) return [];

    const studentImageBaseUrl =
      certificatesData.image_url?.find((item) => item.image_for === "Student")
        ?.image_url || "";

    return certificatesData?.data.map((certificate) => ({
      author: {
        avatar: `${studentImageBaseUrl}${certificate.student_other_certificate_image}`,
      },
      alt:
        certificate.student_other_certificate_image_alt || "Certificate Image",
      youtubeLink: certificate.student_linkedin_link || "",
      course: certificate.student_course || "",
    })).slice(0, 24); // Limit to 24 items for DOM performance
  }, [certificatesData]);

  if (isLoading) {
    return (
      <div className="relative w-full py-12 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl flex flex-col items-center gap-10 text-center px-4">
          {/* Title Skeleton */}
          <div className="flex flex-col items-center gap-4">
            <Skeleton height={40} width={420} />
            <Skeleton height={18} width={260} />
          </div>

          {/* Cards Skeleton */}
          <div className="flex gap-4 overflow-hidden w-full justify-center">
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                className="rounded-xl"
                height={180}
                width={300}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative w-full py-12 sm:py-24 md:py-32 text-center">
        <p className="text-red-500">
          Error loading certificates. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <TestimonialsSectionColor
      title={
        title ||
        "Proof of Excellence: CIA Challenge Exam Success Stories of AIA Achievers"
      }
      description={description}
      testimonials={testimonials}
      customDuration={40}
      imageclassName="w-[280px] h-[180px] md:w-[340px] md:h-[220px]"
    />
  );
};

export default HomeResults;
