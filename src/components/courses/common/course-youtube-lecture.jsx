import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/api/base-url";
import "react-loading-skeleton/dist/skeleton.css";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CourseYoutubeLecture = ({
  courseSlug,
  title,
  highlight1,
  description,
}) => {
  const [activeTab, setActiveTab] = useState("");
  const scrollContainerRef = useRef(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`${courseSlug}-youtubeleture`],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/api/getLectureYoutubebySlug/${courseSlug}`,
      );
      return res.data;
    },
  });
  const tabs = data?.data
    ? Array.from(
        new Set(data.data.map((item) => item.youtube_language)),
      ).filter(Boolean)
    : [];
  useEffect(() => {
    if (tabs.length > 0 && !activeTab) {
      setActiveTab(tabs[0]);
    }
  }, [tabs, activeTab]);

  const filteredVideos =
    data?.data && activeTab
      ? data.data.filter((video) => video.youtube_language === activeTab)
      : [];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -350 : 350;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const getImageUrl = (imageName) => {
    if (!data?.image_url || !imageName) return "";

    const lectureImage = data.image_url.find(
      (item) => item.image_for === "Lecture Youtube",
    );
    if (lectureImage) {
      return `${lectureImage.image_url}${imageName}`;
    }

    const noImage = data.image_url.find(
      (item) => item.image_for === "No Image",
    );
    return noImage ? noImage.image_url : "";
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-340 mx-auto text-center">
          <p>Loading videos...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-340 mx-auto text-center text-red-600">
          <p>Failed to load videos. Please try again later.</p>
        </div>
      </div>
    );
  }
  if (filteredVideos.length === 0) return null;

  return (
    <div className="w-full  px-4 py-8 sm:px-6 lg:px-8 md:py-18">
      <div className="max-w-340 mx-auto">
        <SectionHeading
          title={title || "Visit Our Youtube Channel"}
          highlight1={highlight1}
          description={description}
          align="center"
        />
        {tabs.length > 0 && (
          <div className="mb-8 border-b border-gray-200">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium text-sm whitespace-nowrap cursor-pointer transition-all duration-200 border-b-2 ${
                    activeTab === tab
                      ? "border-[#F3831C] text-[#F3831C]"
                      : "border-transparent text-[#0F3652] hover:text-[#F3831C] hover:border-[#F3831C]/40"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}

        {filteredVideos.length > 0 && (
          <div className="relative group">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50 -ml-4 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-72 group/card cursor-pointer border p-2 rounded-md bg-white"
                >
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden bg-gray-100">
                      <img
                        src={getImageUrl(video.youtube_image)}
                        alt={video.youtube_image_alt || video.youtube_language}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <p className="  font-semibold px-1 mt-1 ">
                    {video.youtube_title}
                  </p>
                </a>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50 -mr-4 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}

        {filteredVideos.length === 0 && activeTab && (
          <div className="text-center py-8 text-gray-500">
            <p>No videos available for {activeTab}</p>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          className=" mb-4  relative cursor-pointer overflow-hidden group  px-4 py-2  text-xs bg-[#F3831C] text-white rounded-none hover:bg-[#0F3652] transition-colors duration-300 "
          variant="ghost"
          aria-label="Visit Our YouTube Channel"
        >
          <Link to={"https://www.youtube.com/@academyofia"} target="_blank">
            <span className="relative z-10 text-white">
              <span>Visit Our YouTube Channel</span>
            </span>
          </Link>
        </Button>{" "}
      </div>
    </div>
  );
};

export default CourseYoutubeLecture;
