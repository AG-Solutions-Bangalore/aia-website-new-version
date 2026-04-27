// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
// import { useCallback, useMemo, useState } from "react";
// import OptimizedImage from "../common/optmized-image";
// export const TestimonialSlider = ({ reviews, className }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState("right");
//   const [loadedImages, setLoadedImages] = useState(new Set());

//   const activeReview = reviews[currentIndex];

//   const handleNext = useCallback(() => {
//     setDirection("right");
//     setCurrentIndex((prev) => (prev + 1) % reviews.length);
//   }, [reviews.length]);

//   const handlePrev = useCallback(() => {
//     setDirection("left");
//     setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
//   }, [reviews.length]);

//   const handleThumbnailClick = useCallback(
//     (index) => {
//       setDirection(index > currentIndex ? "right" : "left");
//       setCurrentIndex(index);
//     },
//     [currentIndex]
//   );

//   const handleImageLoad = useCallback((imageSrc) => {
//     setLoadedImages((prev) => new Set([...prev, imageSrc]));
//   }, []);

//   const preloadImages = useMemo(() => {
//     const imagesToPreload = new Set();
//     const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
//     const nextIndex = (currentIndex + 1) % reviews.length;

//     if (reviews[prevIndex]?.imageSrc)
//       imagesToPreload.add(reviews[prevIndex].imageSrc);
//     if (reviews[nextIndex]?.imageSrc)
//       imagesToPreload.add(reviews[nextIndex].imageSrc);

//     return Array.from(imagesToPreload);
//   }, [currentIndex, reviews]);

//   const thumbnailReviews = useMemo(() => {
//     if (reviews.length <= 1) return [];

//     const thumbnails = [];
//     const total = reviews.length;

//     for (let i = 1; i <= 3 && i < total; i++) {
//       const nextIndex = (currentIndex + i) % total;
//       thumbnails.push(reviews[nextIndex]);
//     }

//     return thumbnails;
//   }, [reviews, currentIndex]);

//   const imageVariants = {
//     enter: (direction) => ({
//       y: direction === "right" ? "100%" : "-100%",
//       opacity: 0,
//     }),
//     center: { y: 0, opacity: 1 },
//     exit: (direction) => ({
//       y: direction === "right" ? "-100%" : "100%",
//       opacity: 0,
//     }),
//   };

//   const textVariants = {
//     enter: (direction) => ({
//       x: direction === "right" ? 50 : -50,
//       opacity: 0,
//     }),
//     center: { x: 0, opacity: 1 },
//     exit: (direction) => ({
//       x: direction === "right" ? -50 : 50,
//       opacity: 0,
//     }),
//   };

//   return (
//     <div
//       className={cn(
//         "relative w-full min-h-[650px] md:min-h-[600px] overflow-hidden bg-background text-foreground p-8 md:p-12",
//         className
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
//       {/* Mobile Layout */}
//       <div className="md:hidden flex flex-col space-y-6">
//         <div className="grid grid-cols-3 gap-4 items-center">
//           <div className="relative h-[280px] col-span-2">
//             <AnimatePresence initial={false}>
//               <motion.img
//                 key={currentIndex}
//                 src={activeReview.imageSrc}
//                 alt={activeReview.name}
//                 className="absolute inset-0 w-full h-full object-cover rounded-lg"
//                 onLoad={() => handleImageLoad(activeReview.imageSrc)}
//               />
//             </AnimatePresence>
//           </div>

//           {/* Thumbnails */}
//           <div className="flex flex-col space-y-3">
//             {thumbnailReviews.map((review) => {
//               const originalIndex = reviews.findIndex(
//                 (r) => r.id === review.id
//               );

//               return (
//                 <button
//                   key={review.id}
//                   onClick={() => handleThumbnailClick(originalIndex)}
//                   className="overflow-hidden rounded-md w-full h-20 opacity-70 hover:opacity-100"
//                 >
//                   <OptimizedImage
//                     src={review.thumbnailSrc}
//                     alt={review.name}
//                     className="w-full h-full object-cover"
//                     sizes="100px"
//                   />
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-center space-x-4">
//           <Button
//             variant="outline"
//             size="icon"
//             className="rounded-full w-12 h-12"
//             onClick={handlePrev}
//           >
//             <ArrowLeftIcon className="w-5 h-5" />
//           </Button>

//           <Button
//             variant="default"
//             size="icon"
//             className="rounded-full w-12 h-12"
//             onClick={handleNext}
//           >
//             <ArrowRightIcon className="w-5 h-5" />
//           </Button>
//         </div>

//         <div>
//           <p className="text-sm font-medium text-muted-foreground">
//             {activeReview.affiliation}
//           </p>
//           <h3 className="text-2xl font-semibold mt-1">{activeReview.name}</h3>
//           <blockquote className="text-lg leading-snug text-justify">
//             &quot;{activeReview.quote}&quot;
//           </blockquote>
//         </div>
//       </div>
//       <div className="hidden md:grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
//         <div className="md:col-span-3 flex flex-col justify-between order-2 md:order-1">
//           <div className="flex flex-row md:flex-col justify-between md:justify-start space-x-4 md:space-x-0 md:space-y-4">
//             <span className="text-sm text-muted-foreground font-mono">
//               {String(currentIndex + 1).padStart(2, "0")} /{" "}
//               {String(reviews.length).padStart(2, "0")}
//             </span>

//             <h2 className="text-sm font-medium tracking-widest uppercase [writing-mode:vertical-rl] md:rotate-180 hidden md:block">
//               OUR STRENGTH
//             </h2>
//           </div>

//           <div className="hidden md:flex space-x-2 mt-8 md:mt-0">
//             {thumbnailReviews.map((review) => {
//               const originalIndex = reviews.findIndex(
//                 (r) => r.id === review.id
//               );
//               return (
//                 <button
//                   key={review.id}
//                   onClick={() => handleThumbnailClick(originalIndex)}
//                   className="overflow-hidden rounded-md w-16 h-20 md:w-20 md:h-24 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
//                   aria-label={`View review from ${review.name}`}
//                 >
//                   <OptimizedImage
//                     src={review.thumbnailSrc}
//                     alt={review.name}
//                     width="80"
//                     height="96"
//                     className="w-full h-full object-cover"
//                     onLoad={() => handleImageLoad(review.thumbnailSrc)}
//                     sizes="80px"
//                   />
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         <div className="md:col-span-4 relative h-80 min-h-[400px] md:min-h-[500px] order-2">
//           <AnimatePresence initial={false} custom={direction}>
//             <motion.img
//               key={currentIndex}
//               src={activeReview.imageSrc}
//               alt={activeReview.name}
//               custom={direction}
//               variants={imageVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               loading={currentIndex === 0 ? "eager" : "lazy"}
//               fetchPriority={currentIndex === 0 ? "high" : "auto"}
//               width="400"
//               height="500"
//               transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
//               className="absolute inset-0 w-full h-full object-cover rounded-lg"
//               onLoad={() => handleImageLoad(activeReview.imageSrc)}
//             />
//           </AnimatePresence>

//           {!loadedImages.has(activeReview.imageSrc) && (
//             <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
//           )}
//         </div>

//         <div className="flex md:hidden justify-between items-center mt-8 order-3">
//           <div className="flex space-x-2">
//             {thumbnailReviews.map((review) => {
//               const originalIndex = reviews.findIndex(
//                 (r) => r.id === review.id
//               );
//               return (
//                 <button
//                   key={review.id}
//                   onClick={() => handleThumbnailClick(originalIndex)}
//                   className="overflow-hidden rounded-md w-16 h-20 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
//                   aria-label={`View review from ${review.name}`}
//                 >
//                   <OptimizedImage
//                     src={review.thumbnailSrc}
//                     alt={review.name}
//                     className="w-full h-full object-cover"
//                     onLoad={() => handleImageLoad(review.thumbnailSrc)}
//                     sizes="64px"
//                   />
//                 </button>
//               );
//             })}
//           </div>

//           <div className="flex items-center space-x-2">
//             <Button
//               variant="outline"
//               size="icon"
//               className="rounded-full w-12 h-12 border-muted-foreground/50"
//               onClick={handlePrev}
//               aria-label="Previous review"
//             >
//               <ArrowLeftIcon className="w-5 h-5" />
//             </Button>

//             <Button
//               variant="default"
//               size="icon"
//               className="rounded-full w-12 h-12 border-muted-foreground/50"
//               onClick={handleNext}
//               aria-label="Next review"
//             >
//               <ArrowRightIcon className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>
//         <div className="md:col-span-5 flex flex-col justify-between md:pl-8 order-1 md:order-3 ">
//           <div className="relative overflow-hidden pt-4  min-h-[200px]">
//             <AnimatePresence initial={false} custom={direction} mode="wait">
//               <motion.div
//                 key={currentIndex}
//                 custom={direction}
//                 variants={textVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
//               >
//                 <p className="text-sm font-medium text-muted-foreground">
//                   {activeReview.affiliation}
//                 </p>
//                 <h3 className="text-3xl font-semibold mt-1">
//                   {activeReview.name}
//                 </h3>
//                 <blockquote className="mt-6 text-xl md:text-2xl  leading-snug text-justify">
//                   &quot;{activeReview.quote}&quot;
//                 </blockquote>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           <div className="hidden md:flex items-center space-x-2 mt-8 md:mt-0">
//             {" "}
//             <Button
//               variant="outline"
//               size="icon"
//               className="rounded-full w-12 h-12 border-muted-foreground/50"
//               onClick={handlePrev}
//               aria-label="Previous review"
//             >
//               <ArrowLeftIcon className="w-5 h-5" />
//             </Button>
//             <Button
//               variant="default"
//               size="icon"
//               className="rounded-full w-12 h-12 border-muted-foreground/50"
//               onClick={handleNext}
//               aria-label="Next review"
//             >
//               <ArrowRightIcon className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import OptimizedImage from "../common/optmized-image";
export const TestimonialSlider = ({ reviews, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [loadedImages, setLoadedImages] = useState(new Set());

  const activeReview = reviews[currentIndex];

  const handleNext = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const handlePrev = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  const handleThumbnailClick = useCallback(
    (index) => {
      setDirection(index > currentIndex ? "right" : "left");
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const handleImageLoad = useCallback((imageSrc) => {
    setLoadedImages((prev) => new Set([...prev, imageSrc]));
  }, []);

  const preloadImages = useMemo(() => {
    const imagesToPreload = new Set();
    const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    const nextIndex = (currentIndex + 1) % reviews.length;

    if (reviews[prevIndex]?.imageSrc)
      imagesToPreload.add(reviews[prevIndex].imageSrc);
    if (reviews[nextIndex]?.imageSrc)
      imagesToPreload.add(reviews[nextIndex].imageSrc);

    return Array.from(imagesToPreload);
  }, [currentIndex, reviews]);

  const thumbnailReviews = useMemo(() => {
    if (reviews.length <= 1) return [];

    const thumbnails = [];
    const total = reviews.length;

    for (let i = 1; i <= 3 && i < total; i++) {
      const nextIndex = (currentIndex + i) % total;
      thumbnails.push(reviews[nextIndex]);
    }

    return thumbnails;
  }, [reviews, currentIndex]);

  const imageVariants = {
    enter: (direction) => ({
      y: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (direction) => ({
      y: direction === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const textVariants = {
    enter: (direction) => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div
      className={cn(
        "relative w-full min-h-[650px] md:min-h-[600px] overflow-hidden bg-background text-foreground p-8 md:p-12",
        className
      )}
    >
      {/* {preloadImages.map((src) => (
        <link
          key={`preload-${src}`}
          rel="preload"
          as="image"
          href={src}
          fetchPriority="low"
        />
      ))} */}
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col space-y-6">
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="relative h-[280px] md:h-[530px] col-span-2">
            <AnimatePresence initial={false}>
              <motion.img
                key={currentIndex}
                src={activeReview.imageSrc}
                alt={activeReview.name}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                onLoad={() => handleImageLoad(activeReview.imageSrc)}
              />
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          <div className="flex flex-col space-y-3">
            {thumbnailReviews.map((review) => {
              const originalIndex = reviews.findIndex(
                (r) => r.id === review.id
              );

              return (
                <button
                  key={review.id}
                  onClick={() => handleThumbnailClick(originalIndex)}
                  className="overflow-hidden rounded-md w-full h-20 md:h-40 md:w-40 opacity-70 hover:opacity-100"
                >
                  <OptimizedImage
                    src={review.thumbnailSrc}
                    alt={review.name}
                    className="w-full h-full object-cover"
                    sizes="100px"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={handlePrev}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Button>

          <Button
            variant="default"
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={handleNext}
          >
            <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {activeReview.affiliation}
          </p>
          <h3 className="text-2xl font-semibold mt-1">{activeReview.name}</h3>
          <blockquote className="text-lg leading-snug text-justify">
            &quot;{activeReview.quote}&quot;
          </blockquote>
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        <div className="lg:col-span-3 flex flex-col justify-between order-2 lg:order-1">
          <div className="flex flex-row lg:flex-col justify-between lg:justify-start space-x-4 md:space-x-0 md:space-y-4">
            <span className="text-sm text-muted-foreground font-mono">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(reviews.length).padStart(2, "0")}
            </span>

            <h2 className="text-sm font-medium tracking-widest uppercase [writing-mode:vertical-rl] md:rotate-180 hidden md:block">
              OUR STRENGTH
            </h2>
          </div>

          <div className="hidden lg:flex space-x-2 mt-8 lg:mt-0">
            {thumbnailReviews.map((review) => {
              const originalIndex = reviews.findIndex(
                (r) => r.id === review.id
              );
              return (
                <button
                  key={review.id}
                  onClick={() => handleThumbnailClick(originalIndex)}
                  className="overflow-hidden rounded-md w-16 h-20 lg:w-20 lg:h-24 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  aria-label={`View review from ${review.name}`}
                >
                  <OptimizedImage
                    src={review.thumbnailSrc}
                    alt={review.name}
                    width="80"
                    height="96"
                    className="w-full h-full object-cover"
                    onLoad={() => handleImageLoad(review.thumbnailSrc)}
                    sizes="80px"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-4 relative h-80 min-h-[400px] lg:min-h-[500px] order-2">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={activeReview.imageSrc}
              alt={activeReview.name}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              loading={currentIndex === 0 ? "eager" : "lazy"}
              fetchPriority={currentIndex === 0 ? "high" : "auto"}
              width="400"
              height="500"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              onLoad={() => handleImageLoad(activeReview.imageSrc)}
            />
          </AnimatePresence>

          {!loadedImages.has(activeReview.imageSrc) && (
            <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
          )}
        </div>

        <div className="flex lg:hidden justify-between items-center mt-8 order-3">
          <div className="flex space-x-2">
            {thumbnailReviews.map((review) => {
              const originalIndex = reviews.findIndex(
                (r) => r.id === review.id
              );
              return (
                <button
                  key={review.id}
                  onClick={() => handleThumbnailClick(originalIndex)}
                  className="overflow-hidden rounded-md w-16 h-20 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  aria-label={`View review from ${review.name}`}
                >
                  <OptimizedImage
                    src={review.thumbnailSrc}
                    alt={review.name}
                    className="w-full h-full object-cover"
                    onLoad={() => handleImageLoad(review.thumbnailSrc)}
                    sizes="64px"
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-muted-foreground/50"
              onClick={handlePrev}
              aria-label="Previous review"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>

            <Button
              variant="default"
              size="icon"
              className="rounded-full w-12 h-12 border-muted-foreground/50"
              onClick={handleNext}
              aria-label="Next review"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="lg:col-span-5 flex flex-col justify-between lg:pl-8 order-1 lg:order-3 ">
          <div className="relative overflow-hidden pt-4  min-h-[200px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="text-sm font-medium text-muted-foreground">
                  {activeReview.affiliation}
                </p>
                <h3 className="text-3xl font-semibold mt-1">
                  {activeReview.name}
                </h3>
                <blockquote className="mt-6 text-xl lg:text-2xl  leading-snug text-justify">
                  &quot;{activeReview.quote}&quot;
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden lg:flex items-center space-x-2 mt-8 lg:mt-0">
            {" "}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-muted-foreground/50"
              onClick={handlePrev}
              aria-label="Previous review"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="rounded-full w-12 h-12 border-muted-foreground/50"
              onClick={handleNext}
              aria-label="Next review"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
