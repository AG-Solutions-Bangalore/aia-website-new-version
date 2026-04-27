// import { BASE_URL } from "@/api/base-url";
// import { Button } from "@/components/ui/button";
// import CircularTestimonials from "@/components/ui/circular-testimonial";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import SectionHeading from "../SectionHeading/SectionHeading";
// import OptimizedImage from "../common/optmized-image";

// const HomeCorporatePartner = () => {
//   const location = useLocation();
//   const {
//     data: effortsData,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["efforts"],
//     queryFn: async () => {
//       const response = await axios.get(`${BASE_URL}/api/getEfforts`);
//       return response.data;
//     },
//   });

//   const imageBaseUrl =
//     effortsData?.image_url?.find((item) => item.image_for === "Efforts")
//       ?.image_url || "";

//   const testimonials =
//     effortsData?.data?.map((effort) => ({
//       quote: effort.efforts_heading,
//       src: `${imageBaseUrl}${effort.efforts_image}`,
//     })) || [];

//   const [currentEffortIndex, setCurrentEffortIndex] = useState(0);

//   const handleTestimonialChange = (index) => {
//     setCurrentEffortIndex(index);
//   };

//   const currentDescription =
//     effortsData?.data?.[currentEffortIndex]?.efforts_description ||
//     "From engaging with national leaders to presenting the SIGA Pre-Budget Memo, hosting insightful Apparel Talks, and organizing the grand SIGA Fair, our association works tirelessly to represent the garment industry's voice. These moments capture our ongoing commitment to strengthening connections between industry stakeholders, policymakers, and the business community.";
//   const currentTitle = effortsData?.data?.[currentEffortIndex]?.efforts_heading;
//   return (
//     <div className="w-full">
//       {/* //small screen */}
//       <div className="bg-white md:hidden">
//         <div className="max-w-full mx-auto">
//           <div className="max-w-full mx-auto">
//             <section className="relative space-y-10 bg-[#0F3652] p-4 overflow-hidden mt-6">
//               <SectionHeading
//                 title="AIA Empowers Organisations Through Audit & Fraud Risk Excellences"
//                 description="Industry-aligned certification training designed to strengthen fraud prevention, detection, investigation, and audit capabilities across organisations."
//                 align="center"
//                 titleClass="text-white text-[1.1rem] md:text-3xl"
//                 descriptionClass="text-white text-[1.2rem] md:text-3xl"
//                 underlineColor="#fff"
//               />
//               <div className="relative z-10 max-w-340 mx-auto">
//                 <div className="grid max-w-340 mx-auto md:grid-cols-2 gap-8 items-center mt-10">
//                   <div className="order-2 md:order-1">
//                     <div className="p-1">
//                       <OptimizedImage
//                         src={`${imageBaseUrl}${effortsData?.data?.[2]?.efforts_image}`}
//                         alt={effortsData?.data?.[2]?.efforts_heading}
//                         className="w-full  md:h-[340px]  object-contain"
//                       />
//                     </div>
//                   </div>

//                   <div className="order-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
//                       {effortsData?.data[2].efforts_heading}
//                     </h3>
//                   </div>
//                   <div className="order-2">
//                     <p className="text-white text-justify text-lg">
//                       {effortsData?.data[2].efforts_description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             <section className="p-8 max-w-340 mx-auto">
//               <div className="grid md:grid-cols-2 gap-8 items-center">
//                 <div>
//                   <h3 className="text-2xl md:text-3xl font-bold text-[#0F3652] mb-3">
//                     {effortsData?.data[0].efforts_heading}
//                   </h3>
//                 </div>

//                 <div>
//                   <div className="p-1">
//                     <OptimizedImage
//                       src={`${imageBaseUrl}${effortsData?.data[0]?.efforts_image}`}
//                       alt={effortsData?.data[0]?.efforts_heading}
//                       className="w-full md:h-[340px] object-contain"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-[#0F3652] text-justify  text-lg">
//                     {effortsData?.data[0].efforts_description}
//                   </p>
//                 </div>
//               </div>
//             </section>

//             <section className="relative bg-[#0F3652] p-8 overflow-hidden">
//               <div className="relative z-10 max-w-340 mx-auto">
//                 <div className="grid md:grid-cols-2 gap-8 items-center">
//                   <div>
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
//                       {effortsData?.data[1].efforts_heading}{" "}
//                     </h3>
//                   </div>
//                   <div>
//                     <div className="p-1">
//                       <OptimizedImage
//                         src={`${imageBaseUrl}${effortsData?.data[1]?.efforts_image}`}
//                         alt={effortsData?.data[1]?.efforts_heading}
//                         className="w-full md:h-[340px]  object-contain"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <p className="text-white text-justify text-lg">
//                       {effortsData?.data[1].efforts_description}{" "}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//       {/* //large screen */}
//       <div className="mx-auto hidden md:block">
//         <section className="relative w-full overflow-hidden bg-[#0F3652] pt-6">
//           <div className="px-6">
//             <SectionHeading
//               title="AIA Empowers Organisations Through Audit & Fraud Risk Excellences"
//               description="Industry-aligned certification training designed to strengthen fraud prevention, detection, investigation, and audit capabilities across organisations."
//               align="center"
//               titleClass="text-white text-[1.1rem] md:text-3xl"
//               descriptionClass="text-white"
//               underlineColor="#fff"
//             />
//           </div>
//           <div className="relative z-10 w-full px-8 pb-4 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-340 mx-auto">
//             <div>
//               <h3 className="text-3xl font-semibold">
//                 {currentTitle?.split("X").map((part, index, arr) => (
//                   <span key={index}>
//                     <span className="text-[#F3831C]">{part}</span>
//                     {index < arr.length - 1 && (
//                       <span className="text-white">X</span>
//                     )}
//                   </span>
//                 ))}
//               </h3>
//               <p className="text-base md:text-lg text-white my-4 text-justify">
//                 {currentDescription}
//               </p>
//               {location.pathname != "/corporate-training" && (
//                 <Button
//                   className=" mb-4  relative cursor-pointer overflow-hidden group  px-4 py-2  text-xs bg-[#F3831C] text-white rounded-none hover:bg-[#0F3652] transition-colors duration-300 "
//                   variant="ghost"
//                   aria-label="Explore Siga"
//                 >
//                   <Link to={"/corporate-training"}>
//                     <span className="relative z-10 text-white">
//                       <span>Know More</span>
//                     </span>
//                   </Link>
//                 </Button>
//               )}
//             </div>

//             {!isLoading && !isError && testimonials.length > 0 && (
//               <CircularTestimonials
//                 testimonials={testimonials}
//                 autoplay={true}
//                 onIndexChange={handleTestimonialChange}
//                 colors={{
//                   name: "#0F3652",
//                   designation: "#0F3652",
//                   testimony: "#0F3652",
//                   arrowBackground: "#F3831C",
//                   arrowForeground: "#ffffff",
//                   arrowHoverBackground: "#0F3652",
//                 }}
//                 fontSizes={{
//                   name: "28px",
//                   designation: "20px",
//                   quote: "20px",
//                 }}
//               />
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default HomeCorporatePartner;
import { BASE_URL } from "@/api/base-url";
import { Button } from "@/components/ui/button";
import CircularTestimonials from "@/components/ui/circular-testimonial";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SectionHeading from "../SectionHeading/SectionHeading";
import OptimizedImage from "../common/optmized-image";

const HomeCorporatePartner = () => {
  const location = useLocation();
  const {
    data: effortsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["efforts"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/api/getEfforts`);
      return response.data;
    },
  });

  const imageBaseUrl =
    effortsData?.image_url?.find((item) => item.image_for === "Efforts")
      ?.image_url || "";

  const testimonials =
    effortsData?.data?.map((effort) => ({
      quote: effort.efforts_heading,
      src: `${imageBaseUrl}${effort.efforts_image}`,
    })) || [];

  const [currentEffortIndex, setCurrentEffortIndex] = useState(0);

  const handleTestimonialChange = (index) => {
    setCurrentEffortIndex(index);
  };

  const currentDescription =
    effortsData?.data?.[currentEffortIndex]?.efforts_description ||
    "From engaging with national leaders...";
  const currentTitle = effortsData?.data?.[currentEffortIndex]?.efforts_heading;

  return (
    <div className="w-full">
      {/* ── Small + MD screens (< 1024px) ── */}
      <div className="bg-white lg:hidden">
        {/* Section 1 – dark bg, item index [2] */}
        <section className="bg-[#0F3652] p-4 mt-6 overflow-hidden">
          <SectionHeading
            title="AIA Empowers Organisations Through Audit & Fraud Risk Excellences"
            description="Industry-aligned certification training designed to strengthen fraud prevention, detection, investigation, and audit capabilities across organisations."
            align="center"
            titleClass="text-white text-[1.1rem] lg:text-3xl"
            descriptionClass="text-white text-base lg:text-3xl"
            underlineColor="#fff"
          />

          {/* stacked: title → image → description, always single column */}
          <div className="mt-8 space-y-6 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white">
              {effortsData?.data?.[2]?.efforts_heading}
            </h3>
            <OptimizedImage
              src={`${imageBaseUrl}${effortsData?.data?.[2]?.efforts_image}`}
              alt={effortsData?.data?.[2]?.efforts_heading}
              className="w-full max-h-[340px] object-contain"
            />
            <p className="text-white text-justify text-base md:text-lg">
              {effortsData?.data?.[2]?.efforts_description}
            </p>
          </div>
        </section>

        {/* Section 2 – white bg, item index [0] */}
        <section className="p-6 md:p-10 max-w-3xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#0F3652]">
              {effortsData?.data?.[0]?.efforts_heading}
            </h3>
            <OptimizedImage
              src={`${imageBaseUrl}${effortsData?.data?.[0]?.efforts_image}`}
              alt={effortsData?.data?.[0]?.efforts_heading}
              className="w-full max-h-[340px] object-contain"
            />
            <p className="text-[#0F3652] text-justify text-base md:text-lg">
              {effortsData?.data?.[0]?.efforts_description}
            </p>
          </div>
        </section>

        {/* Section 3 – dark bg, item index [1] */}
        <section className="bg-[#0F3652] p-6 md:p-10 overflow-hidden">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white">
              {effortsData?.data?.[1]?.efforts_heading}
            </h3>
            <OptimizedImage
              src={`${imageBaseUrl}${effortsData?.data?.[1]?.efforts_image}`}
              alt={effortsData?.data?.[1]?.efforts_heading}
              className="w-full max-h-[340px] object-contain"
            />
            <p className="text-white text-justify text-base md:text-lg">
              {effortsData?.data?.[1]?.efforts_description}
            </p>
          </div>
        </section>
      </div>

      {/* ── Large screens (1024px+) ── */}
      <div className="mx-auto hidden lg:block">
        <section className="relative w-full overflow-hidden bg-[#0F3652] pt-6">
          <div className="px-6">
            <SectionHeading
              title="AIA Empowers Organisations Through Audit & Fraud Risk Excellences"
              description="Industry-aligned certification training designed to strengthen fraud prevention, detection, investigation, and audit capabilities across organisations."
              align="center"
              titleClass="text-white text-[1.1rem] lg:text-3xl"
              descriptionClass="text-white"
              underlineColor="#fff"
            />
          </div>
          <div className="relative z-10 w-full px-8 pb-4 grid grid-cols-2 items-center gap-8 max-w-340 mx-auto">
            <div>
              <h3 className="text-3xl font-semibold">
                {currentTitle?.split("X").map((part, index, arr) => (
                  <span key={index}>
                    <span className="text-[#F3831C]">{part}</span>
                    {index < arr.length - 1 && (
                      <span className="text-white">X</span>
                    )}
                  </span>
                ))}
              </h3>
              <p className="text-lg text-white my-4 text-justify">
                {currentDescription}
              </p>
              {location.pathname !== "/corporate-training" && (
                <Button
                  className="mb-4 relative cursor-pointer overflow-hidden group px-4 py-2 text-xs bg-[#F3831C] text-white rounded-none hover:bg-[#0F3652] transition-colors duration-300"
                  variant="ghost"
                  aria-label="Explore Siga"
                >
                  <Link to={"/corporate-training"}>
                    <span className="relative z-10 text-white">Know More</span>
                  </Link>
                </Button>
              )}
            </div>

            {!isLoading && !isError && testimonials.length > 0 && (
              <CircularTestimonials
                testimonials={testimonials}
                autoplay={true}
                onIndexChange={handleTestimonialChange}
                colors={{
                  name: "#0F3652",
                  designation: "#0F3652",
                  testimony: "#0F3652",
                  arrowBackground: "#F3831C",
                  arrowForeground: "#ffffff",
                  arrowHoverBackground: "#0F3652",
                }}
                fontSizes={{
                  name: "28px",
                  designation: "20px",
                  quote: "20px",
                }}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeCorporatePartner;
