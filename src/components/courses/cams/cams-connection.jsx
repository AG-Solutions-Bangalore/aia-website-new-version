import { IMAGE_PATH } from "@/api/base-url";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import React from "react";
import { useNavigate } from "react-router-dom";

const CamsConnection = ({
  title,
  highlight1,
  images = [],
  description,
  description1,
  buttonText = "Know More",
  buttonColors = [],
}) => {
  const navigate = useNavigate();

  return (
    <div className="py-8">
      {images.length > 0 && (
        <>
          <div className="px-4">
            <SectionHeading
              title={title || ""}
              highlight1={highlight1 || ""}
              align="center"
              description={description || ""}
              description1={description1 || ""}
            />
          </div>

          {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 px-4 sm:px-8 md:px-16 justify-items-center">
            {images.map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg group flex flex-col"
              >
                <img
                  src={`${IMAGE_PATH}/${item.image}`}
                  alt={`Cams Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                <button
                  style={{
                    backgroundColor: buttonColors[index] || "#fee1c6",
                  }}
                  onClick={() => navigate(item.link)}
                  className="
                    absolute bottom-[13%] left-[8%]
                    px-4 py-1.5 sm:px-5 sm:py-2
                    text-xs sm:text-sm font-semibold
                    rounded-full
                    shadow-md
                    transition-all duration-300
                    hover:opacity-90
                    cursor-pointer
                    group-hover:scale-105
                    whitespace-nowrap
                  "
                >
                  {buttonText}
                </button>
              </div>
            ))}
          </div> */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 md:px-16 justify-items-center">
            {images.map((item, index) => {
              const isLast = index === images.length - 1;
              const isOdd = images.length % 2 !== 0;

              return (
                <div
                  key={index}
                  className={`
          relative overflow-hidden rounded-lg group flex flex-col
          ${isLast && isOdd ? "md:col-span-2 lg:col-span-1" : ""}
        `}
                >
                  <img
                    src={`${IMAGE_PATH}/${item.image}`}
                    alt={`Cams Image ${index + 1}`}
                    className="w-[400px] h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  <button
                    style={{
                      backgroundColor: buttonColors[index] || "#fee1c6",
                    }}
                    onClick={() => navigate(item.link)}
                    className="absolute bottom-[13%] left-[8%] px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all duration-300 hover:opacity-90 cursor-pointer group-hover:scale-105 whitespace-nowrap"
                  >
                    {buttonText}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CamsConnection;
