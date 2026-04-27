import { IMAGE_PATH } from "@/api/base-url";
import React from "react";

const AboutHeroSection = () => {
  return (
    <div
      className="h-screen w-full bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${IMAGE_PATH}/about_us_banner.webp)`,
      }}
    />
  );
};

export default AboutHeroSection;
