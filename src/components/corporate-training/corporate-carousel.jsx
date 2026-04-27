
import { BASE_URL } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../SectionHeading/SectionHeading";

const CorporateCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const GAP = 16;

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) setCardsToShow(1);
      else if (window.innerWidth < 768) setCardsToShow(2);
      else if (window.innerWidth < 1024) setCardsToShow(3);
      else if (window.innerWidth < 1280) setCardsToShow(4);
      else setCardsToShow(5);
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const {
    data: certificatesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["corporater-carousel-slider"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getCorporateSlider`);
      return res?.data ?? { data: [], image_url: [] };
    },
  });

  const images = useMemo(() => {
    if (!certificatesData?.data?.length) return [];

    const sliderBase =
      certificatesData.image_url?.find(
        (item) => item.image_for === "Corporate Slider",
      )?.image_url || "";

    const noImage =
      certificatesData.image_url?.find((item) => item.image_for === "No Image")
        ?.image_url || "";

    return certificatesData.data.map((item) => ({
      src: item.corporate_slider_image
        ? `${sliderBase}${item.corporate_slider_image}`
        : noImage,
      alt: item.corporate_slider_image_alt || "Corporate Image",
    }));
  }, [certificatesData]);

  const totalSlides = Math.max(0, images.length - cardsToShow + 1);

  useEffect(() => {
    setCurrentSlide((prev) => Math.min(prev, Math.max(0, totalSlides - 1)));
  }, [cardsToShow, totalSlides]);

  // autoplay
  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 < 0 ? totalSlides - 1 : prev - 1));
  };

  if (isLoading) return <Skeleton height={200} />;
  if (isError || !images.length) return null;

  const cardWidthPercent = 100 / cardsToShow;
  const translatePercent = currentSlide * cardWidthPercent;
  const translateGapOffset = currentSlide * GAP;

  return (
    <div className="w-full  mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <SectionHeading
        title="Glimpses of Impactful Corporate Training Sessions at"
        highlight1="SBI Card"
        description="These moments capture AIA's hands-on corporate training engagement at SBI Card."
        align="center"
      />

      <div className="relative mt-6">
        {totalSlides > 1 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
            bg-white shadow-lg rounded-full p-2 
            hover:bg-[#F3831C] hover:text-white transition cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {totalSlides > 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
            bg-white shadow-lg rounded-full p-2 
            hover:bg-[#F3831C] hover:text-white transition cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(calc(-${translatePercent}% - ${translateGapOffset}px))`,
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{
                  width: `calc(${cardWidthPercent}% - ${
                    ((cardsToShow - 1) * GAP) / cardsToShow
                  }px)`,
                }}
              >
                <div className="flex justify-center">
                  <div className="relative w-52 h-52 sm:w-56 sm:h-56 md:w-60 md:h-60 border border-[#0F3652] hover:border-[#F3831C] rounded-xl shadow-md overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalSlides > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-[#F3831C] w-8"
                    : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CorporateCarousel;
