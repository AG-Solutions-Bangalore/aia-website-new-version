import { IMAGE_PATH } from "@/api/base-url";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STATIC_REVIEWS = [
    { id: 1, image: "/pdf/1.webp", alt: "Brochure image" },
    { id: 2, image: "/pdf/2.webp", alt: "Brochure image" },
    { id: 3, image: "/pdf/3.webp", alt: "Brochure image" },
    { id: 4, image: "/pdf/4.webp", alt: "Brochure image" },
    { id: 5, image: "/pdf/5.webp", alt: "Brochure image" },
    { id: 6, image: "/pdf/6.webp", alt: "Brochure image" },
    { id: 7, image: "/pdf/7.webp", alt: "Brochure image" },
    { id: 8, image: "/pdf/8.webp", alt: "Brochure image" },
    { id: 9, image: "/pdf/9.webp", alt: "Brochure image" },
    { id: 10, image: "/pdf/10.webp", alt: "Brochure image" },
    { id: 11, image: "/pdf/11.webp", alt: "Brochure image" },
    { id: 12, image: "/pdf/12.webp", alt: "Brochure image" },
    { id: 13, image: "/pdf/13.webp", alt: "Brochure image" },
    { id: 14, image: "/pdf/14.webp", alt: "Brochure image" },
    { id: 15, image: "/pdf/15.webp", alt: "Brochure image" },
    { id: 16, image: "/pdf/16.webp", alt: "Brochure image" },
    { id: 17, image: "/pdf/17.webp", alt: "Brochure image" },
    { id: 18, image: "/pdf/18.webp", alt: "Brochure image" },
    { id: 19, image: "/pdf/19.webp", alt: "Brochure image" },
    { id: 20, image: "/pdf/20.webp", alt: "Brochure image" },
    { id: 21, image: "/pdf/21.webp", alt: "Brochure image" },
    { id: 22, image: "/pdf/22.webp", alt: "Brochure image" },
    { id: 23, image: "/pdf/23.webp", alt: "Brochure image" },
    { id: 24, image: "/pdf/24.webp", alt: "Brochure image" },
];

export const TestimonialSlider = ({
    reviews,
    className,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState("right");
    const timerRef = useRef(null);

    const activeReview = reviews[currentIndex];

    const goTo = useCallback((newIndex, dir) => {
        setDirection(dir);
        setCurrentIndex(newIndex);
    }, []);

    const startTimer = useCallback(() => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setDirection("right");
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000); // slightly longer timer
    }, [reviews.length]);

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [startTimer]);

    const handleThumbClick = useCallback(
        (idx) => {
            const dir = idx > currentIndex ? "right" : "left";
            goTo(idx, dir);
            startTimer();
        },
        [currentIndex, goTo, startTimer]
    );

    const imageVariants = {
        enter: (d) => ({ x: d === "right" ? "100%" : "-100%", opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d) => ({ x: d === "right" ? "-100%" : "100%", opacity: 0 }),
    };
    const ease = [0.4, 0, 0.2, 1];

    const thumbContainerRef = useRef(null);
    const thumbRefs = useRef([]);

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

    const goNext = useCallback(() => {
        setDirection("right");
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        startTimer();
    }, [reviews.length, startTimer]);

    const goPrev = useCallback(() => {
        setDirection("left");
        setCurrentIndex((prev) =>
            prev === 0 ? reviews.length - 1 : prev - 1
        );
        startTimer();
    }, [reviews.length, startTimer]);

    return (
        <div className={cn("relative w-full text-foreground", className)}>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                <div className="relative w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-[4/5] xl:h-full overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={currentIndex}
                            src={`${IMAGE_PATH}${activeReview.image}`}
                            alt={activeReview.alt}
                            custom={direction}
                            variants={imageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.6, ease }}
                            className="absolute w-full h-full object-contain shadow-[4px_0_15px_rgba(0,0,0,0.15)]"
                        />
                    </AnimatePresence>

                </div>

                <div className="flex flex-col justify-center">


                    <div className="text-white py-2">
                        <div className="text-center">
                            <h2 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-[#F3831C] to-[#F3831C] italic block mt-2">
                                Know Your Trainer
                            </h2>
                            <p className="text-[1rem] md:text-2xl mb-4 font-bold">
                                Not Just a Trainer, But Your Success Coach
                            </p>
                        </div>

                        <div className="space-y-2 text-base leading-relaxed text-justify text-sm">
                            <p>
                                <span className="font-bold">Puneet Garg</span> is a globally
                                certified audit leader with{" "}
                                <span className="font-bold"> over 22 years of experience </span>{" "}
                                across internal audit, risk management, compliance, forensics,
                                and finance . Holding prestigious credentials including{" "}
                                <span className="font-bold"> CA, CS, CIA, CAMS, and CFE</span>,
                                he brings deep technical expertise and practical insight to his
                                role as a mentor and industry expert.
                            </p>

                            <p>
                                Over the course of his career, he has worked with leading
                                multinational organizations such as{" "}
                                <span className="font-bold">
                                    {" "}
                                    Samsung, Hyundai, Panasonic, and Alchemist and has served as
                                    the Head of Internal Audit at DCM Shriram Industries Ltd.
                                </span>
                                , where he led enterprise-wide audit, risk, and control
                                initiatives. His strong foundation in corporate governance,
                                internal controls, and fraud investigation has established him
                                as a trusted authority within the audit and compliance
                                ecosystem.
                            </p>

                            <p className="mb-5">
                                Driven by a genuine passion for teaching, he has{" "}
                                <span className="font-bold">
                                    {" "}
                                    mentored and trained 2,000+ aspirants
                                </span>
                                , helping them build successful careers and confidently master
                                complex certifications themselves first.{" "}
                                <span className="font-bold">
                                    {" "}
                                    At the Academy of Internal Audit (AIA), he is known for
                                    simplifying challenging concepts{" "}
                                </span>{" "}
                                through real-world examples, practical case discussions, and
                                engaging teaching methods that learners consistently value. In
                                addition to individual mentoring,
                                <span className="font-bold">
                                    {" "}
                                    he has conducted specialized training programs for corporate
                                    teams, regulatory bodies, and investigative agencies.
                                </span>
                            </p>

                            <div className="border-2 shadow-lg   backdrop-blur-2xl shadow-[#F3831C]/80 border-white rounded-lg p-2  mb-5">
                                <p className="font-bold italic">
                                    He has also served as an authorized trainer with the NSE
                                    Academy, contributing to the professional development of
                                    finance and audit professionals across India.
                                </p>
                            </div>
                            <div className="border-2  shadow-lg shadow-[#F3831C]/80 border-white rounded-lg p-2 ">
                                <p className="  italic">
                                    In recognition of his impact on ethical leadership and
                                    capability building in the profession,{" "}
                                    <a
                                        href="https://www.ceoinsightsindia.com/leader/puneet-garg-equipping-audit-compliance-professionals-to-lead-with-integrity-impact-cid-9846.html"
                                        target="_blank"
                                        className="font-bold text-[#F3831C]" rel="noreferrer"
                                    >
                                        CEO Insights India
                                    </a>{" "}
                                    <span className="font-bold">featured him</span> among the{" "}
                                    <span className="font-bold">
                                        Top 10 Impactful Business Leaders in India.
                                    </span>
                                </p>
                            </div>
                            <div className="mt-5">
                                <img
                                    src={`${IMAGE_PATH}/message_about.webp`}
                                    alt="Student Testimonials"
                                    className="w-full rounded-lg"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="border-t border-muted pt-8 relative flex items-center">

                <button
                    onClick={goPrev}
                    className="hidden xl:block absolute text-md -left-[2%] z-10 bg-[#F3831C] hover:bg-[#F3831C]/90 text-white p-2 rounded-full cursor-pointer"
                >
                    <ChevronLeft />
                </button>

                <div ref={thumbContainerRef} className="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-4 md:gap-6 scroll-smooth no-scrollbar px-10 w-full p-2">
                    {reviews.map((review, idx) => (
                        <button
                            ref={(el) => (thumbRefs.current[idx] = el)}
                            key={review.id}
                            onClick={() => handleThumbClick(idx)}
                            className={cn(
                                "relative w-20 cursor-pointer h-24 md:w-28 md:h-36 rounded-lg overflow-hidden transition-all duration-300 ring-2 ring-offset-2 focus:outline-none shrink-0",
                                currentIndex === idx
                                    ? "ring-primary scale-105 opacity-100 shadow-lg"
                                    : "ring-transparent opacity-50 hover:opacity-80 scale-100"
                            )}
                        >
                            <img
                                src={`${IMAGE_PATH}/${review.image}`}
                                alt={review.alt}
                                className="w-full h-full"
                            />

                            {currentIndex === idx && (
                                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <button
                    onClick={goNext}
                    className="hidden xl:block absolute text-md -right-[2%] z-10 bg-[#F3831C] hover:bg-[#F3831C]/90 text-white p-2 rounded-full cursor-pointer"
                >
                    <ChevronRight />
                </button>
            </div>
            <div className="pt-6 px-6 flex items-center justify-center">
                <p className="text-white uppercase tracking-[0.2em] text-sm md:text-base font-medium mr-4">
                    Download Broucher
                </p>

                <a
                    href="/puneet_garg_profile.pdf"
                    download
                    className="
                          bg-[#F3831C] text-white
                          px-6 py-2.5 rounded-none
                          font-semibold
                          hover:bg-[#F3831C]/90
                          transition-all
                      cursor-pointer
                        "
                >
                    Download
                </a>
            </div>
        </div>
    );
};

const Pdf1 = () => {
    return (
        <div className="w-full bg-linear-to-r from-slate-700 via-slate-600 to-blue-950 px-4 sm:px-6 lg:px-8 bg-white py-16">
            <div className="max-w-7xl mx-auto">
                <TestimonialSlider
                    reviews={STATIC_REVIEWS}
                />
            </div>
        </div>
    );
};

export default Pdf1;