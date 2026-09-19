import { BASE_URL } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SectionHeading from "../SectionHeading/SectionHeading";
import { CardCarousel } from "../ui/card-carousel";

const WEEK_ACHIEVERS_BASE = `${BASE_URL}/assets/images/week_achievers/`;

const getWeekNumber = (item) => {
  const fromAlt = String(item?.weekly_achievers_alt || "").match(/(\d+)/);
  if (fromAlt) return parseInt(fromAlt[1], 10);
  const fromImg = String(item?.weekly_achievers_image || "").match(/(\d+)/);
  return fromImg ? parseInt(fromImg[1], 10) : -1;
};

const WeeklyAchievers = ({
  title = "Meet AIA’s Weekly Achievers of 2026 - Representing Global Credentials",
  description = "Every week, more professionals earn globally recognised certifications with AIA, upgrade their expertise with real-world skills, and take a step towards making an impact worldwide.",
}) => {
  const {
    data: achieversData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["week-achievers"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getWeekAchievers`);
      return res?.data ?? { data: [], image_url: [] };
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedIndex]);

  const images = useMemo(() => {
    if (!achieversData?.data?.length) return [];

    const achieversBase =
      achieversData.image_url?.find((item) =>
        ["Week Achievers", "Weekly Achievers", "Week", "Weekly"].includes(
          item.image_for,
        ),
      )?.image_url || WEEK_ACHIEVERS_BASE;

    const noImage =
      achieversData.image_url?.find((item) => item.image_for === "No Image")
        ?.image_url || `${BASE_URL}/assets/images/no_image.jpg`;

    // Descending order: 37 - 36 - 35 - ... - 1 (newest week first)
    const sorted = [...achieversData.data].sort(
      (a, b) => getWeekNumber(b) - getWeekNumber(a),
    );

    return sorted.map((item) => ({
      week: getWeekNumber(item),
      src: item.weekly_achievers_image
        ? `${achieversBase}${item.weekly_achievers_image}`
        : noImage,
      alt: item.weekly_achievers_alt || "AIA Weekly Achiever",
    }));
  }, [achieversData]);

  if (isLoading) {
    return (
      <div className="relative w-full  py-8">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 30%, #7c3aed 1px, transparent 1.5px), radial-gradient(circle at 30% 70%, #db2777 1px, transparent 1.5px)",
              backgroundSize: "60px 60px",
              animation: "moveBackground 20s infinite alternate",
            }}
          ></div>
        </div>

        <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="mb-8 text-center gap-4">
            <div className="relative z-30">
              <Skeleton height={40} width={400} className="mx-auto" />
              <Skeleton height={20} width={200} className="mx-auto mt-2" />
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-64 h-80">
                <Skeleton height={320} width={256} />
                <Skeleton height={20} width={150} className="mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !images.length) return null;

  const selectedImage =
    selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <div className="relative w-full  py-8">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <SectionHeading title={title} description={description} align="center" />
        <CardCarousel
          studentData={images}
          autoplayDelay={3000}
          showPagination={true}
          showNavigation={true}
          className="showcase-student-carousel relative z-0"
          onSlideClick={(index) => setSelectedIndex(index)}
        />
      </div>

      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setSelectedIndex(null)}
          />
          <button
            aria-label="Close image"
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-[#0F3652] shadow-lg transition-colors hover:bg-[#F3831C] hover:text-white"
          >
            <X size={20} />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            title={selectedImage.alt}
            className="relative max-h-[85vh] max-w-full rounded-xl object-contain"
          />
        </div>
      )}

      <style>{`
        .showcase-student-carousel .swiper {
          width: 100%;
          padding-bottom: 50px;
        }

        .showcase-student-carousel .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 300px;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .showcase-student-carousel .swiper-slide img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 8px;
          transform: translateZ(0);
          will-change: transform;
        }

        .showcase-student-carousel .swiper-3d .swiper-slide-shadow-left,
        .showcase-student-carousel .swiper-3d .swiper-slide-shadow-right {
          background-image: none;
        }

        .showcase-student-carousel .swiper-pagination {
          display: none !important;
        }

        /* Animation for the background */
        @keyframes moveBackground {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .showcase-student-carousel .swiper {
            transition: none;
          }
          .showcase-student-carousel .swiper-slide {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default WeeklyAchievers;
