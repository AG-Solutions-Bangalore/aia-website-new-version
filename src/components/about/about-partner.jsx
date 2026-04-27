import { BASE_URL } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";

const AboutPartner = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["efforts"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/api/getEfforts`);
      return response.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">Error loading data</div>
    );
  }

  const efforts = data?.data || [];

  const imageBaseUrl =
    data?.image_url?.find((img) => img.image_for === "Efforts")?.image_url ||
    "";
  return (
    <div className="bg-white">
      <div className="max-w-full mx-auto">
        <div className="max-w-full mx-auto">
          <section className="relative space-y-10 bg-[#0F3652] p-8 overflow-hidden mt-6">
            <SectionHeading
              title="Corporate Training Delivered to Leading Organisations"
              description="Trusted by Corporations for Fraud & Risk Capability Building"
              align="center"
              titleClass="text-white"
              descriptionClass="text-white"
              underlineColor="#fff"
            />
            <div className="relative z-10 max-w-340 mx-auto">
              <div className="grid max-w-340 mx-auto md:grid-cols-2 gap-8 items-center mt-10">
                <div className="order-2 md:order-1">
                  <div className="p-1">
                    <img
                      src={`${imageBaseUrl}${efforts[2]?.efforts_image}`}
                      alt={efforts[2]?.efforts_heading}
                      className="w-full md:h-[340px]  object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="order-1 md:order-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {efforts[2].efforts_heading}
                  </h3>
                  <p className="text-white text-lg hidden md:block text-justify">
                    {efforts[2].efforts_description}
                  </p>
                </div>
                <div className="order-3 md:hidden">
                  <p className="text-white text-lg text-justify">
                    {efforts[2].efforts_description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="p-8 max-w-340 mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-1">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F3652] mb-3">
                  {efforts[0].efforts_heading}
                </h3>
                <p className="text-[#0F3652] text-lg hidden md:block text-justify">
                  {efforts[0].efforts_description}
                </p>
              </div>
              <div className="order-3 md:hidden">
                <p className="text-[#0F3652] text-lg text-justify">
                  {efforts[0].efforts_description}
                </p>
              </div>

              <div className="order-2">
                <div className="p-1">
                  <img
                    src={`${imageBaseUrl}${efforts[0]?.efforts_image}`}
                    alt={efforts[0]?.efforts_heading}
                    className="w-full md:h-[340px] object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="relative bg-[#0F3652] p-8 overflow-hidden">
            <div className="relative z-10 max-w-340 mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="p-1">
                    <img
                      src={`${imageBaseUrl}${efforts[1]?.efforts_image}`}
                      alt={efforts[1]?.efforts_heading}
                      className="w-full md:h-[340px]  object-contain"
                       loading="lazy"
                    />
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {efforts[1].efforts_heading}
                  </h3>
                  <p className="text-white text-lg hidden md:block text-justify">
                    {efforts[1].efforts_description}
                  </p>
                </div>
                <div className="order-3 md:hidden">
                  <p className="text-white text-lg text-justify">
                    {efforts[1].efforts_description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPartner;
