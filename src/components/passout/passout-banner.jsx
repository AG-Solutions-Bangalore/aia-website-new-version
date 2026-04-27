// import { BASE_URL } from "@/api/base-url";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import React, { useMemo } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// const PassoutBanner = () => {
//   const {
//     data: passOutCarouselData,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["passout-carousel-images"],
//     queryFn: async () => {
//       const res = await axios.get(`${BASE_URL}/api/getStudentOfficeImage`);
//       return res?.data ?? { data: [], image_url: [] };
//     },
//   });

//   const images = useMemo(() => {
//     if (!passOutCarouselData?.data?.length) return [];

//     const studentBaseUrl =
//       passOutCarouselData.image_url?.find(
//         (item) => item.image_for === "Student",
//       )?.image_url || "";

//     const noImage =
//       passOutCarouselData.image_url?.find(
//         (item) => item.image_for === "No Image",
//       )?.image_url || "";

//     return passOutCarouselData.data.map((item) => ({
//       src: item.student_office_image
//         ? `${studentBaseUrl}${item.student_office_image}`
//         : noImage,
//       alt:
//         item.student_office_image_alt || item.student_name || "Student Image",
//     }));
//   }, [passOutCarouselData]);

//   const mid = Math.ceil(images.length / 2);
//   const leftImages = images.slice(0, mid);
//   const rightImages = images.slice(mid).reverse();

//   if (isLoading) {
//     return (
//       <section className="bg-[#0F3652]/10 px-6 lg:px-12 overflow-hidden py-12">
//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
//           <div className="flex-1 max-w-xl">
//             <Skeleton height={48} width="80%" />
//             <Skeleton height={20} count={3} className="mt-4" />
//           </div>

//           <div className="flex-1 relative h-160 w-full overflow-hidden flex gap-4">
//             {[1, 2].map((col) => (
//               <div key={col} className="w-1/2">
//                 {Array.from({ length: 4 }).map((_, i) => (
//                   <Skeleton key={i} height={192} className="mb-4 rounded-2xl" />
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (isError || !images.length) {
//     return (
//       <section className="bg-[#0F3652]/10 px-6 lg:px-12 py-12 text-center">
//         <p className="text-red-500">
//           Unable to load student reflections at the moment.
//         </p>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-[#0F3652]/10 px-6 lg:px-12 overflow-hidden max-h-[600px] md:max-h-[450px]">
//       <div className="mx-auto flex flex-col lg:flex-row items-center gap-12 mt-6 max-h-[600px] md:max-h-[450px]">
//         {/* TEXT SIDE */}
//         <div className="flex-1 max-w-xl">
//           <h1 className="text-3xl md:text-5xl font-bold text-[#0F3652] mb-2">
//             Guidance That Goes
//           </h1>
//           <h1 className="text-3xl md:text-5xl font-bold text-[#F3831C] mb-4">
//             Beyond Training
//           </h1>
//           <p className="text-[#0F3652] text-lg leading-relaxed text-justify">
//             Genuine moments shared by professionals who completed their global
//             certification preparation with AIA and experienced guidance that
//             went beyond structured learning.
//           </p>
//         </div>

//         {/* IMAGE COLUMNS SIDE */}
//         <div className="flex-1 relative overflow-hidden flex justify-center gap-4 self-stretch md:min-h-[450px]">
//           {/* LEFT COLUMN */}
//           <div className="relative w-[200px] overflow-hidden">
//             <div className="animate-marquee-up flex flex-col">
//               {[...leftImages, ...leftImages].map((img, idx) => (
//                 <div
//                   key={idx}
//                   className="mb-4 rounded-2xl overflow-hidden shadow-lg border border-[#F3831C]/20 md:w-[200px] flex-shrink-0"
//                 >
//                   <img
//                     src={img.src}
//                     alt={img.alt}
//                     className="w-full h-auto object-cover"
//                     loading="lazy"
//                     onError={(e) => {
//                       e.currentTarget.src =
//                         passOutCarouselData.image_url?.find(
//                           (i) => i.image_for === "No Image",
//                         )?.image_url || "";
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT COLUMN — offset down */}
//           <div
//             className="relative w-[200px] overflow-hidden"
//             style={{ paddingTop: "80px" }}
//           >
//             <div className="animate-marquee-up flex flex-col">
//               {[...rightImages, ...rightImages].map((img, idx) => (
//                 <div
//                   key={idx}
//                   className="mb-4 rounded-2xl overflow-hidden shadow-lg border border-[#F3831C]/20 md:w-[200px] flex-shrink-0"
//                 >
//                   <img
//                     src={img.src}
//                     alt={img.alt}
//                     className="w-full h-auto object-cover"
//                     loading="lazy"
//                     onError={(e) => {
//                       e.currentTarget.src =
//                         passOutCarouselData.image_url?.find(
//                           (i) => i.image_for === "No Image",
//                         )?.image_url || "";
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Fade top */}
//           <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#eef2f5] to-transparent z-10 pointer-events-none" />
//           {/* Fade bottom */}
//           <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#eef2f5] to-transparent z-10 pointer-events-none" />
//         </div>
//       </div>

//       <style>{`
//         @keyframes marquee-up {
//           0% {
//             transform: translateY(0);
//           }
//           100% {
//             transform: translateY(-50%);
//           }
//         }
//         .animate-marquee-up {
//           animation: marquee-up 40s linear infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default PassoutBanner;
import { BASE_URL } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PassoutBanner = () => {
  const {
    data: passOutCarouselData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["passout-carousel-images"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getStudentOfficeImage`);
      return res?.data ?? { data: [], image_url: [] };
    },
  });

  const images = useMemo(() => {
    if (!passOutCarouselData?.data?.length) return [];

    const studentBaseUrl =
      passOutCarouselData.image_url?.find(
        (item) => item.image_for === "Student"
      )?.image_url || "";

    const noImage =
      passOutCarouselData.image_url?.find(
        (item) => item.image_for === "No Image"
      )?.image_url || "";

    return passOutCarouselData.data.map((item) => ({
      src: item.student_office_image
        ? `${studentBaseUrl}${item.student_office_image}`
        : noImage,
      alt:
        item.student_office_image_alt || item.student_name || "Student Image",
    }));
  }, [passOutCarouselData]);

  const mid = Math.ceil(images.length / 2);
  const leftImages = images.slice(0, mid);
  const rightImages = images.slice(mid).reverse();

  if (isLoading) {
    return (
      <section className="bg-[#0F3652]/10 px-6 lg:px-12 overflow-hidden py-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          <div className="flex-1 max-w-xl">
            <Skeleton height={48} width="80%" />
            <Skeleton height={20} count={3} className="mt-4" />
          </div>

          <div className="flex-1 relative h-160 w-full overflow-hidden flex gap-4">
            {[1, 2].map((col) => (
              <div key={col} className="w-1/2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} height={192} className="mb-4 rounded-2xl" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !images.length) {
    return (
      <section className="bg-[#0F3652]/10 px-6 lg:px-12 py-12 text-center">
        <p className="text-red-500">
          Unable to load student reflections at the moment.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-[#0F3652]/10 px-6 lg:px-12 overflow-hidden max-h-[600px] md:max-h-[700px] lg:max-h-[500px]">
      <div className="mx-auto flex flex-col lg:flex-row items-center gap-12  max-h-[600px] md:max-h-[700px] lg:max-h-[500px]">
        {/* TEXT SIDE */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold text-[#0F3652] mb-2">
            Guidance That Goes
          </h1>
          <h1 className="text-3xl md:text-5xl font-bold text-[#F3831C] mb-4">
            Beyond Training
          </h1>
          <p className="text-[#0F3652] text-lg leading-relaxed text-justify">
            Genuine moments shared by professionals who completed their global
            certification preparation with AIA and experienced guidance that
            went beyond structured learning.
          </p>
        </div>

        {/* IMAGE COLUMNS SIDE */}
        <div className="flex-1 relative overflow-hidden flex justify-center gap-4 self-stretch min-h-[500px] md:min-h-[600px] lg:min-h-[450px]">
          {/* LEFT COLUMN */}
          <div className="relative w-[200px] overflow-hidden">
            <div className="animate-marquee-up flex flex-col">
              {[...leftImages, ...leftImages].map((img, idx) => (
                <div
                  key={idx}
                  className="mb-4 rounded-2xl overflow-hidden shadow-lg border border-[#F3831C]/20 md:w-[200px] flex-shrink-0"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        passOutCarouselData.image_url?.find(
                          (i) => i.image_for === "No Image"
                        )?.image_url || "";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — offset down */}
          <div
            className="relative w-[200px] overflow-hidden"
            style={{ paddingTop: "80px" }}
          >
            <div className="animate-marquee-up flex flex-col">
              {[...rightImages, ...rightImages].map((img, idx) => (
                <div
                  key={idx}
                  className="mb-4 rounded-2xl overflow-hidden shadow-lg border border-[#F3831C]/20 md:w-[200px] flex-shrink-0"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        passOutCarouselData.image_url?.find(
                          (i) => i.image_for === "No Image"
                        )?.image_url || "";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Fade top */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#eef2f5] to-transparent z-10 pointer-events-none" />
          {/* Fade bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#eef2f5] to-transparent z-10 pointer-events-none" />
        </div>
      </div>

      <style>{`
        @keyframes marquee-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-marquee-up {
          animation: marquee-up 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PassoutBanner;
