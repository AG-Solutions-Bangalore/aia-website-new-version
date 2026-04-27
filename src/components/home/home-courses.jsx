import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../SectionHeading/SectionHeading";

const ServiceCard = ({ service, i, progress, total }) => {
  const start = i / total;
  const end = (i + 1) / total;

  const scale = useTransform(progress, [start, end], [1, 0.95]);
  const container = useRef(null);
  const opacity = useTransform(progress, [i * 0.25, (i + 1) * 0.25], [1, 1]);

  return (
    <div
      ref={container}
      className="min-h-screen flex items-center justify-center sticky lg:top-36"
    >
      <motion.div
        style={{
          backgroundColor: service.bgColor,
          scale,
          opacity,
          top: 0,
        }}
        className="relative w-full rounded-none p-8 border-2 border-[#F3831C]/20 min-h-125 flex flex-col justify-between origin-top"
      >
        <div>
          <div className="flex items-start justify-between mb-2">
            <p
              className="text-xl  font-bold"
              style={{
                color: service.textColor === "#ffffff" ? "#ffffff" : "#000000",
              }}
            >
              {service.description2}
            </p>
            <div className="text-5xl font-bold text-[#F3831C] opacity-20">
              {String(service.id).padStart(2, "0")}
            </div>
          </div>

          <div className="mt-2">
            {service.features && (
              <div className="space-y-5">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#F3831C] shrink-0"></div>
                    <span
                      className="text-lg"
                      style={{
                        color:
                          service.textColor === "#ffffff"
                            ? "#d1d5db"
                            : "#475569",
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const HomeCourses = ({ certificationCourses }) => {
  const ALL_SERVICES = [...certificationCourses];

  const container = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end center"],
  });
  const [scrollFinished, setScrollFinished] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const cardIndex = Math.floor(latest * ALL_SERVICES.length);
      if (cardIndex >= 0 && cardIndex < ALL_SERVICES.length) {
        setActiveCard(cardIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, ALL_SERVICES.length]);
  useEffect(() => {
    const handleScroll = () => {
      if (!container.current) return;

      const rect = container.current.getBoundingClientRect();

      if (rect.bottom <= window.innerHeight) {
        setScrollFinished(true);
      } else {
        setScrollFinished(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 mt-4 lg:-mb-46">
      {" "}
      <div className="lg:hidden">
        <SectionHeading
          title="Global Certification Programs Offered by AIA"
          align="center"
        />

        {ALL_SERVICES.map((service) => (
          <div
            key={service.id}
            className="relative w-full rounded-md p-6 border-2 border-[#F3831C]/20 mb-6"
            style={{
              backgroundColor: service.bgColor,
            }}
          >
            <div className="mb-4">
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: service.smalllefttextColor }}
              >
                {service.title}
              </h3>
              <p
                className="text-sm mb-4 text-justify"
                style={{
                  color:
                    service.textColor === "#ffffff" ? "#d1d5db" : "#64748b",
                }}
              >
                {service.description}
              </p>
            </div>

            <div className="mb-4">
              <p
                className="text-sm font-bold mb-3 text-justify"
                style={{
                  color:
                    service.textColor === "#ffffff" ? "#ffffff" : "#000000",
                }}
              >
                {service.description2}
              </p>

              {service.features && (
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#F3831C] shrink-0 mt-2"></div>
                      <span
                        className="text-sm flex-1"
                        style={{
                          color:
                            service.textColor === "#ffffff"
                              ? "#d1d5db"
                              : "#475569",
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6">
              <a
                href={service.link}
                className="
                  group inline-flex items-center gap-2
                  h-10 px-4
                  rounded-md
                  border border-[#F3831C]/30
                  text-sm font-medium text-white
                  transition-colors duration-200
                  w-full justify-center
                "
                style={{
                  backgroundColor: service.buttonColor,
                }}
              >
                <span>{service.cta}</span>
                <svg
                  className="
                    w-4 h-4
                    transition-transform duration-200
                    group-hover:translate-x-0.5
                  "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block">
        <div
          className={`${
            scrollFinished ? "relative" : "sticky top-20"
          } bg-white z-40 pb-2 pt-6`}
        >
          {" "}
          <SectionHeading
            title="Global Certification Programs Offered by AIA"
            align="center"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="lg:sticky lg:top-55 lg:h-screen lg:flex lg:flex-col lg:justify-center">
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="transition-opacity duration-300 mb-20">
                  <h1
                    className="text-xl lg:text-3xl font-bold mb-3 leading-tight "
                    style={{
                      color: ALL_SERVICES[activeCard]?.lefttextColor || "",
                    }}
                  >
                    {ALL_SERVICES[activeCard]?.title || ALL_SERVICES[0].title}
                  </h1>

                  <p className="text-[#0F3652] text-lg mb-2 max-w-lg leading-relaxed text-justify">
                    {ALL_SERVICES[activeCard]?.description ||
                      ALL_SERVICES[0].description}
                  </p>
                </div>
                <div className="mt-10">
                  <a
                    href={
                      ALL_SERVICES[activeCard]?.link || ALL_SERVICES[0].link
                    }
                    className="group inline-flex items-center gap-2 h-10 px-4  text-sm font-medium text-white "
                    style={{
                      background: ALL_SERVICES[activeCard]?.buttonColor || "",
                    }}
                  >
                    <span>
                      {ALL_SERVICES[activeCard]?.cta || ALL_SERVICES[0].cta}
                    </span>
                  </a>

                  <div className="hidden lg:flex items-center gap-4">
                    <div className="h-px w-16 bg-[#F3831C]"></div>
                    <p className="text-sm text-[#0F3652]/70">
                      Scroll to explore all courses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref={container} className="relative pb-40">
            {ALL_SERVICES.map((service, i) => {
              const targetScale = 1 - (ALL_SERVICES.length - i) * 0.05;
              const start = i / ALL_SERVICES.length;
              const end = start + 1 / ALL_SERVICES.length;

              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  i={i}
                  progress={scrollYProgress}
                  targetScale={targetScale}
                  total={ALL_SERVICES.length}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCourses;
