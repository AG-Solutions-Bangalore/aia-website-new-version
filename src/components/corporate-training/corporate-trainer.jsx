import { IMAGE_PATH } from "@/api/base-url";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import PdfJoinDialog from "../common/PdfForm";

const PROFILE_MAGAZINE_SLIDES = [
  { id: 1, image: "/pdf/1.webp", alt: "Profile magazine page 1" },
  { id: 2, image: "/pdf/2.webp", alt: "Profile magazine page 2" },
  { id: 3, image: "/pdf/3.webp", alt: "Profile magazine page 3" },
  { id: 4, image: "/pdf/4.webp", alt: "Profile magazine page 4" },
  { id: 5, image: "/pdf/5.webp", alt: "Profile magazine page 5" },
  { id: 6, image: "/pdf/6.webp", alt: "Profile magazine page 6" },
  { id: 7, image: "/pdf/7.webp", alt: "Profile magazine page 7" },
  { id: 8, image: "/pdf/8.webp", alt: "Profile magazine page 8" },
  { id: 9, image: "/pdf/9.webp", alt: "Profile magazine page 9" },
  { id: 10, image: "/pdf/10.webp", alt: "Profile magazine page 10" },
  { id: 11, image: "/pdf/11.webp", alt: "Profile magazine page 11" },
  { id: 12, image: "/pdf/12.webp", alt: "Profile magazine page 12" },
  { id: 13, image: "/pdf/13.webp", alt: "Profile magazine page 13" },
  { id: 14, image: "/pdf/14.webp", alt: "Profile magazine page 14" },
  { id: 15, image: "/pdf/15.webp", alt: "Profile magazine page 15" },
  { id: 16, image: "/pdf/16.webp", alt: "Profile magazine page 16" },
  { id: 17, image: "/pdf/17.webp", alt: "Profile magazine page 17" },
  { id: 18, image: "/pdf/18.webp", alt: "Profile magazine page 18" },
  { id: 19, image: "/pdf/19.webp", alt: "Profile magazine page 19" },
  { id: 20, image: "/pdf/20.webp", alt: "Profile magazine page 20" },
  { id: 21, image: "/pdf/21.webp", alt: "Profile magazine page 21" },
  { id: 22, image: "/pdf/22.webp", alt: "Profile magazine page 22" },
  { id: 23, image: "/pdf/23.webp", alt: "Profile magazine page 23" },
  { id: 24, image: "/pdf/24.webp", alt: "Profile magazine page 24" },
];

const ProfileMagazineSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const thumbContainerRef = useRef(null);
  const thumbRefs = useRef([]);

  const activeSlide = PROFILE_MAGAZINE_SLIDES[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === PROFILE_MAGAZINE_SLIDES.length - 1;

  const goTo = useCallback(
    (newIndex) => {
      if (newIndex === currentIndex) return;

      setDirection(newIndex > currentIndex ? "right" : "left");
      setCurrentIndex(newIndex);
    },
    [currentIndex],
  );

  const goNext = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prev) =>
      prev < PROFILE_MAGAZINE_SLIDES.length - 1 ? prev + 1 : prev,
    );
  }, []);

  const goPrev = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const container = thumbContainerRef.current;
    const activeEl = thumbRefs.current[currentIndex];

    if (!container || !activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    const offset =
      activeRect.left -
      containerRect.left -
      containerRect.width / 2 +
      activeRect.width / 2;

    container.scrollTo({
      left: container.scrollLeft + offset,
      behavior: "smooth",
    });
  }, [currentIndex]);

  const imageVariants = {
    enter: (d) => ({ x: d === "right" ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d === "right" ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="w-full max-w-[420px] sm:max-w-[480px] lg:max-w-full mx-auto flex flex-col items-center gap-4 sm:gap-5 overflow-hidden">
      <div className="relative w-full aspect-3/4 overflow-hidden rounded-lg shadow-none">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={`${IMAGE_PATH}${activeSlide.image}`}
            alt={activeSlide.alt}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </AnimatePresence>
      </div>

      <div className="relative w-full max-w-full flex justify-center items-center overflow-hidden">
        <button
          onClick={goPrev}
          disabled={isFirst}
          className="absolute left-0 z-20 text-white p-1.5 sm:p-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
        >
          <ChevronLeft
            className={`size-5 sm:size-6 md:size-8 ${isFirst ? "text-gray-500 cursor-not-allowed" : "text-white cursor-pointer"}`}
          />
        </button>

        <div
          ref={thumbContainerRef}
          className="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-2.5 sm:gap-3 md:gap-5 scroll-smooth no-scrollbar px-2 w-[calc(100%-64px)] sm:w-[calc(100%-80px)] max-w-full py-2"
        >
          {PROFILE_MAGAZINE_SLIDES.map((slide, idx) => (
            <button
              ref={(el) => (thumbRefs.current[idx] = el)}
              key={slide.id}
              onClick={() => goTo(idx)}
              className={cn(
                "relative w-10 h-14 sm:w-14 sm:h-20 md:w-20 md:h-28 lg:w-24 lg:h-32 cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ring-2 ring-offset-2 focus:outline-none shrink-0",
                currentIndex === idx
                  ? "ring-primary scale-105 opacity-100 shadow-lg"
                  : "ring-transparent opacity-50 hover:opacity-80 scale-100",
              )}
            >
              <img
                src={`${IMAGE_PATH}${slide.image}`}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={isLast}
          className="absolute right-0 z-20 text-white p-1.5 sm:p-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
        >
          <ChevronRight
            className={`size-5 sm:size-6 md:size-8 ${isLast ? "text-gray-500 cursor-not-allowed" : "text-white cursor-pointer"}`}
          />
        </button>
      </div>
    </div>
  );
};

const CorporateTrainer = () => {
  return (
    <div className="bg-linear-to-r my-4 from-slate-700 via-slate-600 to-blue-950 mb-14 overflow-hidden">
      <div className="max-w-340 w-full mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-0 gap-x-12 items-start lg:items-center min-w-0">
          <div className="relative w-full min-w-0 px-0 sm:px-4 flex flex-col items-center overflow-hidden">
            <ProfileMagazineSlider />
            <div className="mt-6 sm:mt-8 mb-2 sm:mb-4 w-full flex justify-center">
              <PdfJoinDialog
                course="Download Broucher"
                buttonlabel="Download Complete Profile"
              />
            </div>
          </div>

          <div className="text-white w-full min-w-0">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-[#F3831C] to-[#F3831C] italic block mt-2">
                Know Your Trainer
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl mb-4 font-medium">
                Not Just a Trainer, But Your Success Coach
              </p>
            </div>

            <div className="space-y-2 text-sm sm:text-base leading-relaxed">
              <p>
                <span className="font-bold text-2xl sm:text-3xl italic text-justify">
                  Puneet Garg
                </span>{" "}
                is a distinguished professional with
                <strong> over 22 years of leadership experience</strong> in
                internal audit, risk management, compliance, forensics, and
                financial advisory.
                <strong>
                  A Chartered Accountant (CA), Company Secretary (CS), and
                  globally certified expert holding the CIA, CFE, and CAMS
                  credentials.
                </strong>
              </p>

              <p className="text-justify">
                Puneet represents a rare blend of technical depth and strategic
                insight in the governance and assurance domain.
                <strong>
                  {" "}
                  He has worked with leading multinational organizations,
                </strong>{" "}
                including Samsung, Hyundai, Panasonic, and Alchemist, while
                serving as Head of Internal Audit at DCM Shriram Industries Ltd.
              </p>
              <p className="text-justify">
                His strong foundation in corporate governance, risk controls,
                and fraud investigation has established him as a trusted
                authority in the audit and compliance landscape.
              </p>
              <p className="text-justify">
                As the
                <strong>
                  {" "}
                  CEO and Lead Faculty at the Academy of Internal Audit (AIA),
                </strong>
                he has designed and delivered specialized training programs for
                both public and private sector organizations—including
                regulatory and investigative bodies
              </p>
              <p className="text-justify">
                <strong>
                  His programs go beyond certification, equipping professionals
                  with practical forensic insights,
                </strong>
                robust control frameworks, and global compliance standards that
                directly strengthen an organization’s internal audit
                effectiveness, risk management maturity, and fraud resilience.
              </p>
              <p className="text-justify">
                Puneet’s initiatives to train corporate teams are not limited to
                helping them earn global credentials but also to ensure they
                acquire real-world analytical and auditing skills that enable
                them to demonstrate excellence while performing their
                professional responsibilities.
              </p>
              <strong className="text-justify">
                He has trained professionals from prestigious institutions such
                as CBI, NIA, CAG, NFSU, SPG, and Indian security forces, among
                others.
              </strong>
              <p className="text-justify">
                He has also served as an
                <strong>authorized trainer with the NSE Academy,</strong>
                contributing to the professional development of finance and
                audit professionals across India.
              </p>
              <p className="text-justify mb-6">
                In recognition of his impact on ethical leadership and
                capability building in the profession,
                {/* <strong>CEO Insights India featured him </strong> */}
                <a
                  href="https://www.ceoinsightsindia.com/leader/puneet-garg-equipping-audit-compliance-professionals-to-lead-with-integrity-impact-cid-9846.html"
                  target="_blank"
                  className="font-bold text-[#F3831C]"
                  rel="noreferrer"
                >
                  {" "}
                  CEO Insights India
                </a>{" "}
                featured him among the
                <strong>Top 10 Impactful Business Leaders in India.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateTrainer;
