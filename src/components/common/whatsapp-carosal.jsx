// import { BASE_URL } from "@/api/base-url";
// import { cn } from "@/lib/utils";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
// import {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import SectionHeading from "../SectionHeading/SectionHeading";
// export const TestimonialSlider = ({
//   reviews,
//   className,
//   title,
//   description,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState("right");
//   const [loadedImages, setLoadedImages] = useState(new Set());
//   const timerRef = useRef(null);
//   const [isMdScreen, setIsMdScreen] = useState(false);

//   const activeReview = reviews[currentIndex];
//   const [thumbCount, setThumbCount] = useState(4);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setThumbCount(2);
//       } else {
//         setThumbCount(4);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const checkScreen = () => {
//       setIsMdScreen(window.innerWidth >= 768);
//     };

//     checkScreen();
//     window.addEventListener("resize", checkScreen);
//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);
//   const goTo = useCallback((newIndex, dir) => {
//     setDirection(dir);
//     setCurrentIndex(newIndex);
//   }, []);

//   const startTimer = useCallback(() => {
//     clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setDirection("right");
//       setCurrentIndex((prev) => (prev + 1) % reviews.length);
//     }, 4000);
//   }, [reviews.length]);
//   const total = reviews.length;

//   useEffect(() => {
//     startTimer();
//     return () => clearInterval(timerRef.current);
//   }, [startTimer]);

//   const handleNext = useCallback(() => {
//     goTo((currentIndex + 1) % reviews.length, "right");
//     startTimer();
//   }, [currentIndex, reviews.length, goTo, startTimer]);

//   const handlePrev = useCallback(() => {
//     goTo((currentIndex - 1 + reviews.length) % reviews.length, "left");
//     startTimer();
//   }, [currentIndex, reviews.length, goTo, startTimer]);

//   const handleLeftThumb = useCallback(
//     (idx) => {
//       goTo(idx, "left");
//       startTimer();
//     },
//     [goTo, startTimer],
//   );

//   const handleRightThumb = useCallback(
//     (idx) => {
//       goTo(idx, "right");
//       startTimer();
//     },
//     [goTo, startTimer],
//   );

//   const handleImageLoad = useCallback((src) => {
//     setLoadedImages((prev) => new Set([...prev, src]));
//   }, []);
//   const leftThumbs = useMemo(() => {
//     const arr = [];
//     for (let i = 2; i >= 1; i--) {
//       const idx = (currentIndex - i + total) % total;
//       arr.push({ review: reviews[idx], originalIndex: idx, dist: i });
//     }
//     return arr;
//   }, [currentIndex, total, reviews]);

//   const rightThumbs = useMemo(() => {
//     const arr = [];
//     for (let i = 1; i <= thumbCount; i++) {
//       const idx = (currentIndex + i) % total;
//       arr.push({
//         review: reviews[idx],
//         originalIndex: idx,
//         dist: i,
//       });
//     }
//     return arr;
//   }, [currentIndex, total, reviews, thumbCount]);
//   const preloadImages = useMemo(() => {
//     const set = new Set();
//     const prevIdx = (currentIndex - 1 + reviews.length) % reviews.length;
//     const nextIdx = (currentIndex + 1) % reviews.length;
//     if (reviews[prevIdx]?.image) set.add(reviews[prevIdx].image);
//     if (reviews[nextIdx]?.image) set.add(reviews[nextIdx].image);
//     return Array.from(set);
//   }, [currentIndex, reviews]);

//   const thumbnailReviews = useMemo(() => {
//     if (reviews.length <= 1) return [];
//     const thumbs = [];
//     for (let i = 1; i <= 3 && i < reviews.length; i++) {
//       const idx = (currentIndex + i) % reviews.length;
//       thumbs.push({ review: reviews[idx], originalIndex: idx });
//     }
//     return thumbs;
//   }, [reviews, currentIndex]);

//   const imageVariants = {
//     enter: (d) => ({ y: d === "right" ? "100%" : "-100%", opacity: 0 }),
//     center: { y: 0, opacity: 1 },
//     exit: (d) => ({ y: d === "right" ? "-100%" : "100%", opacity: 0 }),
//   };
//   const ease = [0.4, 0, 0.2, 1];

//   return (
//     <div
//       className={cn(
//         "relative w-full min-h-[650px] md:min-h-[600px] overflow-hidden bg-background text-foreground p-8 md:p-12",
//         className,
//       )}
//     >
//       {preloadImages.map((src) => (
//         <link
//           key={`preload-${src}`}
//           rel="preload"
//           as="image"
//           href={src}
//           fetchPriority="low"
//         />
//       ))}
//       <div className="pt-4 min-h-[200px]  md:hidden">
//         <SectionHeading title={title} description={description} />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
//         <div className="md:col-span-2 flex flex-col justify-between  md:order-1">
//           <div className="hidden md:flex flex-row md:flex-col justify-between md:justify-start space-x-4 md:space-x-0 md:space-y-4">
//             <span className="text-sm text-muted-foreground font-mono">
//               {String(currentIndex + 1).padStart(2, "0")} /{" "}
//               {String(reviews.length).padStart(2, "0")}
//             </span>
//           </div>

//           <div className="hidden md:flex space-x-2 mt-8 md:mt-0">
//             {" "}
//             {leftThumbs.map(({ review, originalIndex }) => (
//               <button
//                 key={originalIndex}
//                 onClick={() => handleLeftThumb(originalIndex)}
//                 className="overflow-hidden rounded-md w-16 h-20 md:w-20 md:h-36 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background p-1"
//                 aria-label={`Go to slide ${originalIndex + 1}`}
//               >
//                 <img
//                   src={review.image}
//                   alt={review.alt || `Slide ${originalIndex + 1}`}
//                   loading="lazy"
//                   width="80"
//                   height="96"
//                   className="w-full h-full object-cover"
//                   onLoad={() => handleImageLoad(review.image)}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="md:col-span-4 relative h-80 min-h-[400px] md:min-h-[500px] order-2 md:order-2">

//           {isMdScreen ? (
//             <AnimatePresence initial={false} custom={direction}>
//               <motion.img
//                 key={currentIndex}
//                 src={activeReview.image}
//                 alt={activeReview.alt || `Slide ${currentIndex + 1}`}
//                 custom={direction}
//                 variants={imageVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{ duration: 0.6, ease }}
//                 className="absolute inset-0 w-full h-full object-cover rounded-lg"
//                 onLoad={() => handleImageLoad(activeReview.image)}
//               />
//             </AnimatePresence>
//           ) : (
//             <img
//               src={activeReview.image}
//               alt={activeReview.alt || `Slide ${currentIndex + 1}`}
//               className="absolute inset-0 w-full h-full object-cover rounded-lg"
//               onLoad={() => handleImageLoad(activeReview.image)}
//               loading="lazy"
//             />
//           )}
//           {!loadedImages.has(activeReview.image) && (
//             <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
//           )}

//           {activeReview.youtubeLink && (
//             <a
//               href={activeReview.youtubeLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="absolute inset-0 z-10 flex items-center justify-center group"
//               aria-label="Watch video"
//             >
//               <span className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-black/60 transition-all duration-300">
//                 <svg className="w-6 h-6 fill-white ml-0.5" viewBox="0 0 24 24">
//                   <path d="M8 5v14l11-7z" />
//                 </svg>
//               </span>
//             </a>
//           )}
//         </div>

//         <div className="md:col-span-6 flex flex-col justify-between md:pl-8 order-3 md:order-3">
//           <div className="pt-4 min-h-[200px] hidden md:block">
//             <SectionHeading title={title} description={description} />
//           </div>

//           <div className="flex space-x-2 mt-8 md:mt-0">
//             {rightThumbs.map(({ review, originalIndex }) => (
//               <button
//                 key={originalIndex}
//                 onClick={() => handleRightThumb(originalIndex)}
//                 className="overflow-hidden rounded-md w-16 h-20 md:w-20 md:h-36 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background p-1"
//                 aria-label={`Go to slide ${originalIndex + 1}`}
//               >
//                 <img
//                   src={review.image}
//                   alt={review.alt || `Slide ${originalIndex + 1}`}
//                   loading="lazy"
//                   width="80"
//                   height="96"
//                   className="w-full h-full object-cover"
//                   onLoad={() => handleImageLoad(review.image)}
//                 />
//               </button>
//             ))}
//             <div className="flex items-end ml-6 space-x-2 mt-8 md:mt-0">
//               <button
//                 onClick={handlePrev}
//                 aria-label="Previous"
//                 className="inline-flex cursor-pointer items-center justify-center rounded-full w-12 h-12 border border-muted-foreground/50 bg-background hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
//               >
//                 <ArrowLeftIcon className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={handleNext}
//                 aria-label="Next"
//                 className="inline-flex   cursor-pointer items-center justify-center rounded-full w-12 h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
//               >
//                 <ArrowRightIcon className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const WhatsappCarosal = ({ title, description, course }) => {
//   const {
//     data: certificatesData,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["screenshot-slider", course],
//     queryFn: async () => {
//       const res = await axios.get(
//         `${BASE_URL}/api/getScreenshotSlider/${course}`,
//       );
//       return res.data;
//     },
//     enabled: !!course,
//   });

//   const reviews = useMemo(() => {
//     if (!certificatesData?.data) return [];

//     const studentImageBaseUrl =
//       certificatesData.image_url?.find((item) => item.image_for === "Student")
//         ?.image_url || "";

//     return certificatesData.data.map((item, index) => ({
//       id: item.id ?? index,
//       image: `${studentImageBaseUrl}${item.student_screenshot_image}`,
//       imageSrc: `${studentImageBaseUrl}${item.student_screenshot_image}`,
//       thumbnailSrc: `${studentImageBaseUrl}${item.student_screenshot_image}`,
//       name: item.student_name || `Student ${index + 1}`,
//       affiliation: item.student_affiliation || "",
//       alt: item.student_screenshot_image_alt || "",
//       quote: item.student_screenshot_image_alt || "",
//       youtubeLink: item.student_youtube_link || null,
//     })).slice(0, 25); // Limit to 25 items for DOM performance
//   }, [certificatesData]);

//   if (isLoading) {
//     return (
//       <div className="relative w-full min-h-[650px] md:min-h-[600px] overflow-hidden bg-background p-8 md:p-12">
//         {/* Mobile heading */}
//         <div className="pt-4 min-h-[200px] md:hidden">
//           <div className="flex flex-col items-center gap-3">
//             <Skeleton height={32} width={256} />
//             <Skeleton height={16} width={192} />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
//           {/* Left column — counter + left thumbs */}
//           <div className="md:col-span-2 hidden md:flex flex-col justify-between">
//             {/* Counter */}
//             <Skeleton height={16} width={48} />

//             {/* Left thumbnails */}
//             <div className="flex space-x-2 mt-8 md:mt-0">
//               {[...Array(2)].map((_, i) => (
//                 <Skeleton
//                   key={i}
//                   height={144}
//                   width={80}
//                   className="rounded-md"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Center — main image */}
//           <div className="md:col-span-4 relative h-80 min-h-[400px] md:min-h-[500px] order-2">
//             <Skeleton height="100%" className="rounded-lg" />
//           </div>

//           {/* Right column — heading + right thumbs + nav */}
//           <div className="md:col-span-6 flex flex-col justify-between md:pl-8 order-3">
//             {/* Desktop heading */}
//             <div className="pt-4 min-h-[200px] hidden md:flex flex-col gap-3">
//               <Skeleton height={32} width={256} />
//               <Skeleton height={16} width={192} />
//             </div>

//             {/* Right thumbnails + nav buttons */}
//             <div className="flex space-x-2 mt-8 md:mt-0 items-end">
//               {[...Array(4)].map((_, i) => (
//                 <Skeleton
//                   key={i}
//                   height={144}
//                   width={80}
//                   className="rounded-md"
//                 />
//               ))}

//               {/* Nav buttons */}
//               <div className="flex items-end ml-6 space-x-2">
//                 <Skeleton circle height={48} width={48} />
//                 <Skeleton circle height={48} width={48} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="relative w-full py-12 sm:py-24 md:py-32">
//         <div className="mx-auto max-w-container text-center text-red-500">
//           Error loading certificates. Please try again later.
//         </div>
//       </div>
//     );
//   }

//   if (!reviews.length) return null;

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8">
//       <TestimonialSlider
//         reviews={reviews}
//         title={title}
//         description={description}
//       />
//     </div>
//   );
// };

// export default WhatsappCarosal;

import { BASE_URL } from "@/api/base-url";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SectionHeading from "../SectionHeading/SectionHeading";

export const TestimonialSlider = ({
  reviews,
  className,
  title,
  description,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [loadedImages, setLoadedImages] = useState(new Set());
  const timerRef = useRef(null);

  // Unified breakpoint state: "sm" | "md" | "lg"
  const [screenSize, setScreenSize] = useState("sm");

  const activeReview = reviews[currentIndex];

  // Determine how many right thumbs to show per breakpoint
  const thumbCount = useMemo(() => {
    if (screenSize === "lg") return 4;
    if (screenSize === "md") return 2; // ← was 4 at md, causing overflow
    return 2; // mobile
  }, [screenSize]);

  // Determine how many left thumbs to show per breakpoint
  const leftThumbCount = useMemo(() => {
    if (screenSize === "lg") return 2;
    if (screenSize === "md") return 1; // ← was always 2, caused squeeze at md
    return 0;
  }, [screenSize]);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setScreenSize("lg");
      else if (w >= 768) setScreenSize("md");
      else setScreenSize("sm");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = screenSize !== "sm"; // md + lg

  const goTo = useCallback((newIndex, dir) => {
    setDirection(dir);
    setCurrentIndex(newIndex);
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
  }, [reviews.length]);

  const total = reviews.length;

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleNext = useCallback(() => {
    goTo((currentIndex + 1) % reviews.length, "right");
    startTimer();
  }, [currentIndex, reviews.length, goTo, startTimer]);

  const handlePrev = useCallback(() => {
    goTo((currentIndex - 1 + reviews.length) % reviews.length, "left");
    startTimer();
  }, [currentIndex, reviews.length, goTo, startTimer]);

  const handleLeftThumb = useCallback(
    (idx) => {
      goTo(idx, "left");
      startTimer();
    },
    [goTo, startTimer]
  );

  const handleRightThumb = useCallback(
    (idx) => {
      goTo(idx, "right");
      startTimer();
    },
    [goTo, startTimer]
  );

  const handleImageLoad = useCallback((src) => {
    setLoadedImages((prev) => new Set([...prev, src]));
  }, []);

  const leftThumbs = useMemo(() => {
    const arr = [];
    for (let i = leftThumbCount; i >= 1; i--) {
      const idx = (currentIndex - i + total) % total;
      arr.push({ review: reviews[idx], originalIndex: idx, dist: i });
    }
    return arr;
  }, [currentIndex, total, reviews, leftThumbCount]);

  const rightThumbs = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= thumbCount; i++) {
      const idx = (currentIndex + i) % total;
      arr.push({ review: reviews[idx], originalIndex: idx, dist: i });
    }
    return arr;
  }, [currentIndex, total, reviews, thumbCount]);

  const preloadImages = useMemo(() => {
    const set = new Set();
    const prevIdx = (currentIndex - 1 + reviews.length) % reviews.length;
    const nextIdx = (currentIndex + 1) % reviews.length;
    if (reviews[prevIdx]?.image) set.add(reviews[prevIdx].image);
    if (reviews[nextIdx]?.image) set.add(reviews[nextIdx].image);
    return Array.from(set);
  }, [currentIndex, reviews]);

  const imageVariants = {
    enter: (d) => ({ y: d === "right" ? "100%" : "-100%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (d) => ({ y: d === "right" ? "-100%" : "100%", opacity: 0 }),
  };
  const ease = [0.4, 0, 0.2, 1];

  // Thumbnail size: fixed per breakpoint via JS (Tailwind can't do runtime conditionals cleanly)
  const thumbClass =
    "overflow-hidden rounded-md opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background p-1 " +
    (screenSize === "md"
      ? "w-[60px] h-[90px]" // slim at tablet — fits in 72px column or right panel
      : screenSize === "lg"
        ? "w-20 h-36" // lg: original size
        : "w-16 h-20"); // sm: mobile size

  return (
    <div
      className={cn(
        // FIX: removed fixed min-h — let content dictate height at md
        "relative w-full overflow-hidden bg-background text-foreground p-6 md:p-8 lg:p-12",
        className
      )}
    >
      {preloadImages.map((src) => (
        <link
          key={`preload-${src}`}
          rel="preload"
          as="image"
          href={src}
          fetchPriority="low"
        />
      ))}

      {/* Mobile-only heading */}
      <div className="pt-4 min-h-[160px] md:hidden">
        <SectionHeading title={title} description={description} />
      </div>

      {/*
        Grid layout fixes:
        - sm:  single column, stacked
        - md:  3 cols  [left-thumbs | image | right-content]  — was 2/4/6, now 2/5/5 to give image more room
        - lg:  12 cols [2 | 4 | 6]  as original
      */}
      <div className="grid grid-cols-1 md:grid-cols-[72px_1fr_1fr] lg:grid-cols-12 gap-4 md:gap-5 lg:gap-8 h-full">
        {/* ── Left column: counter + left thumbnails ── */}
        <div className="hidden md:flex  flex-col justify-between min-w-0 w-[72px]">
          {/* Counter */}
          <span className="text-sm text-muted-foreground font-mono whitespace-nowrap">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(reviews.length).padStart(2, "0")}
          </span>

          {/* Left thumbs — stacked vertically, fixed width at md */}
          <div className="flex flex-col gap-2">
            {leftThumbs.map(({ review, originalIndex }) => (
              <button
                key={originalIndex}
                onClick={() => handleLeftThumb(originalIndex)}
                className={thumbClass}
                aria-label={`Go to slide ${originalIndex + 1}`}
              >
                <img
                  src={review.image}
                  alt={review.alt || `Slide ${originalIndex + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onLoad={() => handleImageLoad(review.image)}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Center: main image ── */}
        <div
          className={cn(
            "relative order-2 md:order-2 lg:col-span-4 min-w-0",
            // sm: natural aspect ratio | md: fixed height fits viewport | lg: taller
            "aspect-[3/4] md:aspect-auto md:h-[440px] lg:h-auto lg:min-h-[500px]"
          )}
        >
          {isDesktop ? (
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={activeReview.image}
                alt={activeReview.alt || `Slide ${currentIndex + 1}`}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease }}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                onLoad={() => handleImageLoad(activeReview.image)}
              />
            </AnimatePresence>
          ) : (
            <img
              src={activeReview.image}
              alt={activeReview.alt || `Slide ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              onLoad={() => handleImageLoad(activeReview.image)}
              loading="lazy"
            />
          )}

          {!loadedImages.has(activeReview.image) && (
            <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
          )}

          {activeReview.youtubeLink && (
            <a
              href={activeReview.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 flex items-center justify-center group"
              aria-label="Watch video"
            >
              <span className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-black/60 transition-all duration-300">
                <svg className="w-6 h-6 fill-white ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </a>
          )}
        </div>

        {/* ── Right column: desktop heading + right thumbs + nav ── */}
        <div className="lg:col-span-6 flex flex-col justify-between md:pl-2 lg:pl-8 order-3 min-w-0">
          {/* Desktop heading — tighter min-h at md so it doesn't push thumbs off screen */}
          <div className="pt-2 md:min-h-[200px] lg:min-h-[200px] hidden md:block">
            <SectionHeading title={title} description={description} />
          </div>

          {/* Right thumbs + nav buttons */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0 items-end">
            {rightThumbs.map(({ review, originalIndex }) => (
              <button
                key={originalIndex}
                onClick={() => handleRightThumb(originalIndex)}
                className={thumbClass}
                aria-label={`Go to slide ${originalIndex + 1}`}
              >
                <img
                  src={review.image}
                  alt={review.alt || `Slide ${originalIndex + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onLoad={() => handleImageLoad(review.image)}
                />
              </button>
            ))}

            {/* Nav buttons */}
            <div className="flex items-end ml-auto gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous"
                className="inline-flex cursor-pointer items-center justify-center rounded-full w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 border border-muted-foreground/50 bg-background hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shrink-0"
              >
                <ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next"
                className="inline-flex cursor-pointer items-center justify-center rounded-full w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shrink-0"
              >
                <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────── */

const WhatsappCarosal = ({ title, description, course }) => {
  const {
    data: certificatesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["screenshot-slider", course],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/api/getScreenshotSlider/${course}`
      );
      return res.data;
    },
    enabled: !!course,
  });

  const reviews = useMemo(() => {
    if (!certificatesData?.data) return [];

    const studentImageBaseUrl =
      certificatesData.image_url?.find((item) => item.image_for === "Student")
        ?.image_url || "";

    return certificatesData.data
      .map((item, index) => ({
        id: item.id ?? index,
        image: `${studentImageBaseUrl}${item.student_screenshot_image}`,
        imageSrc: `${studentImageBaseUrl}${item.student_screenshot_image}`,
        thumbnailSrc: `${studentImageBaseUrl}${item.student_screenshot_image}`,
        name: item.student_name || `Student ${index + 1}`,
        affiliation: item.student_affiliation || "",
        alt: item.student_screenshot_image_alt || "",
        quote: item.student_screenshot_image_alt || "",
        youtubeLink: item.student_youtube_link || null,
      }))
      .slice(0, 25);
  }, [certificatesData]);

  if (isLoading) {
    return (
      <div className="relative w-full overflow-hidden bg-background p-6 md:p-8 lg:p-12">
        {/* Mobile heading */}
        <div className="pt-4 min-h-[160px] md:hidden">
          <div className="flex flex-col items-center gap-3">
            <Skeleton height={32} width={256} />
            <Skeleton height={16} width={192} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[72px_1fr_1fr] lg:grid-cols-12 gap-4 md:gap-5 lg:gap-8 h-full">
          {/* Left column */}
          <div className="hidden md:flex lg:col-span-2 flex-col justify-between">
            <Skeleton height={16} width={48} />
            <div className="flex gap-2 mt-4">
              <Skeleton height={96} width={56} className="rounded-md" />
            </div>
          </div>

          {/* Center — main image */}
          <div className="lg:col-span-4 aspect-[3/4] md:aspect-auto md:h-[440px] lg:h-auto lg:min-h-[500px] order-2">
            <Skeleton height="100%" className="rounded-lg" />
          </div>

          {/* Right column */}
          <div className="lg:col-span-6 flex flex-col justify-between md:pl-4 lg:pl-8 order-3">
            <div className="pt-2 min-h-[160px] hidden md:flex flex-col gap-3">
              <Skeleton height={32} width={256} />
              <Skeleton height={16} width={192} />
            </div>
            <div className="flex flex-wrap gap-2 items-end mt-4">
              {[...Array(2)].map((_, i) => (
                <Skeleton
                  key={i}
                  height={96}
                  width={56}
                  className="rounded-md"
                />
              ))}
              <div className="flex items-end ml-auto gap-2">
                <Skeleton circle height={48} width={48} />
                <Skeleton circle height={48} width={48} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative w-full py-12 sm:py-24 md:py-32">
        <div className="mx-auto max-w-container text-center text-red-500">
          Error loading certificates. Please try again later.
        </div>
      </div>
    );
  }

  if (!reviews.length) return null;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <TestimonialSlider
        reviews={reviews}
        title={title}
        description={description}
      />
    </div>
  );
};

export default WhatsappCarosal;
