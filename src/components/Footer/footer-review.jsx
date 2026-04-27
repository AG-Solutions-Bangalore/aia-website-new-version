import { IMAGE_PATH } from "@/api/base-url";
import React from "react";
import { FaStar } from "react-icons/fa";

const FooterReviews = ({ footer = true, title = "white" }) => {
  const reviews = [
    {
      name: "Google",
      rating: "5.0",
      img: `${IMAGE_PATH}/footer-3.webp`,
      alt: "IIA",
      bgColor: "bg-[#2D3748]",
      link: "https://share.google/oM14oVPaO0YbwCdzS",
    },
    {
      name: "Ambition Box",
      rating: "5.0",
      img: `${IMAGE_PATH}/footer-5.webp`,
      alt: "IIA",
      bgColor: "bg-[#2D3748]",
      link: "https://www.ambitionbox.com/reviews/academy-of-internal-audit-reviews",
    },
    {
      name: "Just dial",
      rating: "4.9",
      img: `${IMAGE_PATH}/footer-1.webp`,
      alt: "IIA",
      bgColor: "bg-[#2D3748]",
      link: "https://www.justdial.com/Faridabad/Academy-Of-Internal-Audit-Bptp-Faridabad-Sector-81/011PXX11-XX11-240417200220-E3R9_BZDET?trkid=&term=&ncatid=10180006&area=&search=Showing%20Results%20for%20%22Academy%20Of%20Internal%20Audit%20Srs%20City%20Faridabad%20Sector%2081%22%20in%20Faridabad%20Nit,%20Faridabad&mncatname=Academy%20Of%20Internal%20Audit%20Srs%20City%20Faridabad%20Sector%2081&ftterm=Academy%20Of%20Internal%20Audit%20Srs%20City%20Faridabad%20Sector%2081&csell=&oncatid=10180006&abd_btn=&abd_heading=&isFreetxt=1&bd=2&cat_b2b_flag=&searchfrom=lst&thumbnail=",
    },
    {
      name: "G2",
      rating: "4.5",
      img: `${IMAGE_PATH}/footer-4.webp`,
      alt: "IIA",
      bgColor: "bg-[#2D3748]",
      link: "https://www.g2.com/products/academy-of-internal-audit/reviews",
    },
    {
      name: "Trustpilot",
      rating: "3.8",
      img: `${IMAGE_PATH}/footer-2.webp`,
      alt: "IIA",
      bgColor: "bg-[#2D3748]",
      link: "https://www.trustpilot.com/review/aia.in.net",
    },
  ];

  return (
    <section className="py-6 md:py-8 border-b border-white/10 w-full">
      <div>
        {footer ? (
          <div className="flex flex-col justify-start">
            <div className="mb-8">
              <h2 className="text-3xl  font-bold text-[#0c2340]">
                Top Ratings Across Platforms{" "}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-2xl w-full">
              {reviews.map((item, index) => {
                const CardWrapper = item.link ? "a" : "div";
                const isLast = index === reviews.length - 1;
                const isOdd = reviews.length % 2 !== 0;

                return (
                  <CardWrapper
                    key={index}
                    href={item.link || undefined}
                    target={item.link ? "_blank" : undefined}
                    rel={item.link ? "noopener noreferrer" : undefined}
                    className={`flex items-center ${item.bgColor} 
        max-h-18 rounded-lg overflow-hidden 
        hover:scale-105 transition-transform duration-300 
        cursor-pointer shadow-lg
        ${isLast && isOdd ? "col-span-2 justify-self-center sm:w-1/2" : ""}
        `}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border-r border-white/10">
                      <img
                        src={item.img}
                        className="w-14 h-14"
                        alt={item.alt}
                        loading="lazy"
                      />
                    </div>

                    <div className="px-4 md:px-6 py-3 md:py-4 flex items-center gap-2">
                      <span className="text-white font-bold text-xl md:text-2xl">
                        {item.rating}
                      </span>
                      <FaStar className="text-orange-500 text-base md:text-lg" />
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center lg:hidden px-3">
              <div className="text-center mb-8">
                <h2 className={`text-3xl font-bold ${title == "white" ? "text-white" : "text-black"}`}>
                  Top Ratings Across Platforms{" "}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-2xl w-full">
                {reviews.map((item, index) => {
                  const CardWrapper = item.link ? "a" : "div";
                  const isLast = index === reviews.length - 1;
                  const isOdd = reviews.length % 2 !== 0;

                  return (
                    <CardWrapper
                      key={index}
                      href={item.link || undefined}
                      target={item.link ? "_blank" : undefined}
                      rel={item.link ? "noopener noreferrer" : undefined}
                      className={`flex items-center ${item.bgColor} 
        max-h-14 rounded-lg overflow-hidden 
        hover:scale-105 transition-transform duration-300 
        cursor-pointer shadow-lg
        ${isLast && isOdd ? "col-span-2 justify-self-center md:w-1/2" : ""}
        `}
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border-r border-white/10">
                        <img
                          src={item.img}
                          className="w-10 h-10 md:w-14 md:h-14"
                          alt={item.alt}
                          loading="lazy"
                        />
                      </div>

                      <div className="px-4 md:px-6 py-3 md:py-4 flex items-center gap-2">
                        <span className="text-white font-bold text-xl md:text-2xl">
                          {item.rating}
                        </span>
                        <FaStar className="text-orange-500 text-base md:text-lg" />
                      </div>
                    </CardWrapper>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:flex flex-row items-center justify-between gap-8 px-8">
              <div className="text-left">
                <h2 className="text-4xl  font-bold text-white">Top Ratings</h2>
                <h2 className="text-3xl  font-bold text-white mt-2">
                  Across Platforms{" "}
                </h2>
              </div>

              {/* <div className="flex flex-wrap justify-end gap-3 md:gap-4"> */}
              <div className="flex flex-wrap xl:flex-nowrap justify-end gap-3 md:gap-4 overflow-hidden">
                {reviews.map((item, index) => {
                  const CardWrapper = item.link ? "a" : "div";

                  return (
                    <CardWrapper
                      key={index}
                      href={item.link || undefined}
                      target={item.link ? "_blank" : undefined}
                      rel={item.link ? "noopener noreferrer" : undefined}
                      className={`flex items-center ${item.bgColor} 
min-w-0 
max-h-16 
rounded-lg 
overflow-hidden 
hover:scale-105 
transition-transform 
duration-300 
cursor-pointer 
shadow-lg`}
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border-r border-white/10">
                        <img
                          src={item.img}
                          className="w-14 h-14"
                          alt={item.alt}
                          loading="lazy"
                        />
                      </div>
                      <div className="px-4 md:px-6 py-3 md:py-4 flex items-center gap-2">
                        <span className="text-white font-bold text-xl md:text-2xl">
                          {item.rating}
                        </span>
                        <FaStar className="text-orange-500 text-base md:text-lg" />
                      </div>
                    </CardWrapper>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FooterReviews;
