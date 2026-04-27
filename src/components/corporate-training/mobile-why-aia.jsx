import { useState, useEffect, useRef } from "react";
import { IMAGE_PATH } from "@/api/base-url";

const reasons = [
  {
    num: "01",
    title: "Proven Impact Across Corporate Teams",
    desc: "Measurable improvements in team performance backed by real results from organizations like yours.",
    accent: "#f3831c",
  },
  {
    num: "02",
    title: "Trusted by Leading Institutions",
    desc: "Partnered with top-tier companies and institutions who rely on our expertise for mission-critical training.",
    accent: "#e06b10",
  },
  {
    num: "03",
    title: "Learning Built Around Real Outcomes",
    desc: "Every program is designed with your business goals in mind—not just certificates, but capability.",
    accent: "#f3831c",
  },
  {
    num: "04",
    title: "Training That Delivers Measurable ROI",
    desc: "Our clients see tangible returns—from reduced errors to accelerated project delivery and revenue growth.",
    accent: "#e06b10",
  },
  {
    num: "05",
    title: "Global Standards. Local Business Insight",
    desc: "Internationally recognized certifications combined with deep understanding of regional business contexts.",
    accent: "#f3831c",
  },
  {
    num: "06",
    title: "Training Tailored for Your Organization",
    desc: "Custom-built curricula that align with your industry, culture, and strategic direction.",
    accent: "#e06b10",
  },
];

/* ── Intersection-observer hook for stagger-in ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Individual Card ── */
const Card = ({ item, index }) => {
  const [ref, visible] = useReveal();
  const [active, setActive] = useState(false);

  return (
    <div
      ref={ref}
      className="cursor-default h-full"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 400)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${
          index * 0.08
        }s, transform 0.55s ease ${index * 0.08}s`,
      }}
    >
      {/* gradient border wrapper */}
      <div
        className="rounded-[20px] h-full"
        style={{
          padding: "1px",
          background: active
            ? "linear-gradient(135deg, #f3831c 0%, #e06b10 100%)"
            : "linear-gradient(135deg, rgba(243,131,28,0.18) 0%, rgba(15,54,82,0.08) 100%)",
          transition: "background 0.35s ease, box-shadow 0.35s ease",
          boxShadow: active
            ? "0 12px 40px rgba(243,131,28,0.22), 0 2px 8px rgba(0,0,0,0.08)"
            : "0 2px 12px rgba(15,54,82,0.06)",
        }}
      >
        {/* inner card */}
        <div
          className="relative overflow-hidden h-full flex flex-col"
          style={{
            borderRadius: "19px",
            background: active
              ? "linear-gradient(135deg, #fff 0%, #fff8f2 100%)"
              : "#ffffff",
            padding: "18px 16px",
            transition: "background 0.35s ease",
          }}
        >
          {/* watermark number */}
          <span
            className="absolute pointer-events-none select-none font-black"
            style={{
              top: "-10px",
              right: "8px",
              fontSize: "5.5rem",
              fontFamily: "'Georgia', serif",
              lineHeight: 1,
              color: active ? "rgba(243,131,28,0.07)" : "rgba(15,54,82,0.04)",
              transition: "color 0.35s ease",
            }}
          >
            {item.num}
          </span>

          <div className="flex gap-3 items-start relative z-10 flex-1">
            {/* Icon badge */}
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: active
                  ? "linear-gradient(135deg, #f3831c, #e06b10)"
                  : "linear-gradient(135deg, rgba(243,131,28,0.10), rgba(243,131,28,0.05))",
                transition: "background 0.35s ease, transform 0.3s ease",
                transform: active
                  ? "scale(1.08) rotate(-2deg)"
                  : "scale(1) rotate(0deg)",
                boxShadow: active ? "0 4px 16px rgba(243,131,28,0.30)" : "none",
              }}
            >
              <img
                src={`${IMAGE_PATH}/corporation_icon_${index + 1}.webp`}
                alt={item.title}
                className="object-contain"
                style={{
                  width: "26px",
                  height: "26px",
                  filter: active ? "brightness(0) invert(1)" : "none",
                  transition: "filter 0.3s ease",
                }}
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h3
                className="font-bold leading-snug"
                style={{
                  fontSize: "15px",
                  lineHeight: "1.35",
                  margin: "0 0 6px 0",
                  color: active ? "#f3831c" : "#0f3652",
                  transition: "color 0.3s ease",
                }}
              >
                {item.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "#6b7280", margin: 0 }}
              >
                {item.desc}
              </p>
            </div>
          </div>

          {/* Bottom accent bar */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "3px",
              borderRadius: "0 0 19px 19px",
              background: "linear-gradient(90deg, #f3831c, #e06b10)",
              transform: active ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.4s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
};

/* ── Header Logo ── */
const AiaLogo = () => (
  <div
    className="flex items-center justify-center mx-auto mb-5"
    style={{
      width: "72px",
      height: "72px",
      borderRadius: "50%",
      background: "#fff",
      boxShadow:
        "0 0 0 6px rgba(243,131,28,0.12), 0 8px 32px rgba(243,131,28,0.25)",
    }}
  >
    <img
      src={`${IMAGE_PATH}/middle_logo.webp`}
      alt="AIA Logo"
      className="object-contain"
      style={{ width: "48px", height: "48px" }}
      loading="lazy"
    />
  </div>
);

export default function MobileCorporateWhyAia() {
  const [headerRef, headerVisible] = useReveal();

  return (
    <section
      className="relative overflow-hidden  px-4 py-12"
      style={{
        background:
          "linear-gradient(160deg, #fafbfc 0%, #fff7f0 60%, #fef3e8 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: "-80px",
          right: "-80px",
          width: "260px",
          height: "260px",
          background:
            "radial-gradient(circle, rgba(243,131,28,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          bottom: "60px",
          left: "-60px",
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(15,54,82,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Header ── */}
      <div
        ref={headerRef}
        className="max-w-xl mx-auto text-center mb-8"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <AiaLogo />

        <div
          className="inline-flex items-center gap-1.5 rounded-full mb-3"
          style={{ background: "rgba(243,131,28,0.10)", padding: "5px 14px" }}
        >
          <div
            className="rounded-full"
            style={{ width: "6px", height: "6px", background: "#f3831c" }}
          />
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#f3831c" }}
          >
            Corporate Training
          </span>
        </div>

        <h2
          className="font-black leading-tight mb-3"
          style={{
            fontSize: "28px",
            lineHeight: "1.25",
            margin: "0 0 12px",
            color: "#0f3652",
            fontFamily: "'Georgia', serif",
          }}
        >
          Why Choose AIA For{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #f3831c, #e06b10)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Corporate Training
          </span>
        </h2>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "#6b7280", margin: 0 }}
        >
          We partner with organizations that want more than short-term outcomes.
          Our programs strengthen capability, improve standards, and deliver
          measurable business impact.
        </p>
      </div>

      {/* ── Cards: 1-col mobile → 2-col md+ ── */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
        {reasons.map((item, i) => (
          <Card key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
