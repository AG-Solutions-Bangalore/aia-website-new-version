import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { BASE_URL } from "@/api/base-url";
import SectionHeading from "../SectionHeading/SectionHeading";

const HomePassout = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["home-passout-students"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getAllPassoutStudentsNew`);
      return res.data;
    },
  });

  const studentImageBase =
    data?.image_url?.find((img) => img.image_for === "Student")?.image_url ||
    "";
  const companyImageBase =
    data?.image_url?.find((img) => img.image_for === "Student Company")
      ?.image_url || "";

  const testimonials =
    data?.data?.map((item) => ({
      image: item.student_image
        ? `${studentImageBase}${item.student_image}`
        : "",
      alt: item.student_image_alt || "Student",
      course: item.student_course,
      name: item.student_name,
      student_designation: item.student_designation,

      comapany_image: item.student_company_image
        ? `${companyImageBase}${item.student_company_image}`
        : "",
      company_alt: item.student_company_image_alt || "Student",
    })) || [];

  const firstColumn = testimonials.filter((item) => item.course === "CFE");
  const secondColumn = testimonials.filter(
    (item) => item.course != "CFE" && item.course != "CAMS",
  );
  const thirdColumn = testimonials.filter((item) => item.course === "CAMS");
  return (
    <section className="bg-linear-to-b from-[#0F3652]/10 via-transparent to-transparent relative pb-10">
      <div className="mx-auto pt-10 max-w-340 z-10">
        <div className="flex flex-col items-center justify-center  mx-auto px-6">
          <SectionHeading
            title="AIA Certified Achievers"
            description="Professionals who turned global certifications into career milestones with AIA."
            align="center"
          />
        </div>

        {isLoading && (
          <div className="text-center mt-10 text-gray-500">
            Loading testimonials...
          </div>
        )}

        {isError && (
          <div className="text-center mt-10 text-red-500">
            Failed to load testimonials
          </div>
        )}

        {!isLoading && !isError && testimonials.length > 0 && (

          <div
            className="relative mt-10"
      
          >
            <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-25 mt-10   max-h-[300px] sm:max-h-[380px] md:max-h-[460px] lg:max-h-[540px] overflow-hidden px-2">
              <TestimonialsColumn testimonials={firstColumn} duration={20} />
              <TestimonialsColumn
                testimonials={secondColumn}
                duration={20}
                className="mt-40"
              />
              <TestimonialsColumn testimonials={thirdColumn} duration={20} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePassout;
