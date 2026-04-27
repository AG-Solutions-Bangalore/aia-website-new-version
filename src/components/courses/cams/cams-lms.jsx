import { IMAGE_PATH } from "@/api/base-url";
import React, { useEffect, useRef, useState } from "react";

const CamsLms = () => {
  const labels = [
    "Dedicated Support Person",
    "CAMS Version 7 Study Material",
    "Practice Questions",
    "Live Sessions with Faculty",
    "100% Exam Registration Support",
    "10+ Hours of Video Lectures",
    "Mock Tests Preparations",
  ];

  const radius = 180;
  const center = 300;

  const [angleOffset, setAngleOffset] = useState(0);
  const frameRef = useRef(null);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    const animate = (time) => {
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      setAngleOffset((prev) => (prev + delta * 0.02) % 360);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const getPosition = (angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  return (
    <section
      className="relative flex items-center justify-center py-24"
      style={{
        backgroundImage: `url(${IMAGE_PATH}/LMS.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/55 " />

      <div className="relative z-10 w-full max-w-3xl aspect-square">
        <svg viewBox="0 0 600 600" className="w-full h-full">
          <defs>
            <linearGradient
              id="orbitGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#5956d6" />
              <stop offset="100%" stopColor="#8c7fff" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="url(#orbitGradient)"
            strokeWidth="8"
            filter="url(#glow)"
          />

          <circle cx={center} cy={center} r="52" fill="#6366f1" opacity="0.1" />
          <circle
            cx={center}
            cy={center}
            r="44"
            fill="white"
            stroke="#6366f1"
            strokeWidth="2.5"
          />

          <foreignObject x={center - 28} y={center - 28} width={56} height={56}>
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={`${IMAGE_PATH}/LMS.webp`}
                alt="LMS"
                className="w-10 h-10 object-contain"
                draggable={false}
                loading="lazy"
              />
            </div>
          </foreignObject>

          {labels.map((label, i) => {
            const angle = i * (360 / labels.length) + angleOffset;
            const { x, y } = getPosition(angle);

            return (
              <foreignObject
                key={i}
                x={x - 100}
                y={y - 24}
                width={200}
                height={48}
              >
                <div
                  className="h-12 px-5 rounded-full bg-white border-2 border-indigo-100
                             flex items-center justify-center
                             text-sm font-semibold text-indigo-600
                             shadow-md transition-all duration-200
                             hover:scale-105 hover:border-indigo-500 hover:shadow-lg
                             cursor-pointer"
                >
                  {label}
                </div>
              </foreignObject>
            );
          })}
        </svg>
      </div>
    </section>
  );
};

export default CamsLms;
