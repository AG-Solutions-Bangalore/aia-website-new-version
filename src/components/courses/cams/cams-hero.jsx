import { IMAGE_PATH } from "@/api/base-url";
import React from "react";

const CamsHero = () => {
  return (
    <div>
      <img
        src={`${IMAGE_PATH}/banner_images/3.webp`}
        alt="CAMS Hero Banner"
        className=" inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default CamsHero;
