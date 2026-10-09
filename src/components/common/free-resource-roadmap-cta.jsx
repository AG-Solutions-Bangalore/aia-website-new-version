import { Suspense } from "react";
import { BadgeCheck, Map } from "lucide-react";

/**
 * FreeResourceRoadmapCTA
 *
 * A contained "floating card" CTA that sits on a neutral (white) section
 * instead of a harsh full-bleed navy band. This keeps breathing room above
 * (practice questions, white) and below (CourseAchivers, light grey
 * `bg-muted/30`) so the two backgrounds never touch / clash.
 */
const FreeResourceRoadmapCTA = ({
  eyebrow = "Free Roadmap",
  title = "Follow the Free Step-by-Step Roadmap",
  highlight = "45 days!",
  titleSuffix = "",
  description = "A practical day-wise study plan with key topics, revision checkpoints and exam tips — built by AIA experts to keep you on track.",
  watermark = "45",
  trustItems = ["Instant delivery on email", "Trusted by aspirants"],
  dialog = null,
  dialogFallback = null,
}) => {
  return (
    <section className="bg-white px-4 py-10 sm:px-6" aria-label={eyebrow}>
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-[#0F3652] shadow-[0_24px_60px_-20px_rgba(15,54,82,0.5)] ring-1 ring-[#0F3652]/20 md:rounded-[28px]">
          {/* Base gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-[#0F3652] via-[#17465f] to-[#0a2438]"
          />
          {/* Soft glows */}
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#F3831C]/25 blur-[90px]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-sky-400/15 blur-[90px]"
          />
          {/* Subtle dot texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "linear-gradient(to bottom, black, transparent 85%)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
            }}
          />
          {/* Watermark — "45" only, bottom-right. Oversized to fill the
              empty lower area of the card. Faint + behind content (z-10)
              so text stays readable. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 right-0 select-none whitespace-nowrap text-right leading-none text-white/[0.06] sm:-bottom-10 sm:right-2 lg:-bottom-12"
          >
            <span className="text-[200px] font-black tracking-[-1rem] sm:text-[260px] lg:text-[320px]">
              {watermark}
            </span>
          </div>

          {/* Content — sits above watermarks (z-10) with extra bottom
              padding so it clears the watermark zone */}
          <div className="relative z-10 px-6 pb-28 pt-10 text-center sm:px-10 sm:pb-32 md:px-14 md:pb-36 md:pt-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFC58A]">
              <Map className="h-3.5 w-3.5" strokeWidth={2.5} />
              {eyebrow}
            </span>

            <h2 className="mx-auto mt-5 max-w-3xl text-xl font-bold leading-snug text-white sm:text-2xl md:text-[32px] md:leading-[1.3]">
              {title}{" "}
              <span className="relative whitespace-nowrap text-[#F5A54B]">
                {highlight}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 8"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1.5 left-0 h-[6px] w-full text-[#F3831C]"
                >
                  <path
                    d="M2 6 C 30 1, 90 1, 118 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                </svg>
              </span>
              {titleSuffix && <span className="text-white"> {titleSuffix}</span>}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-200/90 sm:text-[15px]">
              {description}
            </p>

            <div className="mt-7 flex justify-center">
              <Suspense fallback={dialogFallback}>
                {dialog}
              </Suspense>
            </div>

            {trustItems?.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {trustItems.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300"
                  >
                    <BadgeCheck className="h-4 w-4 text-[#F5A54B]" strokeWidth={2.2} />
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom accent line */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#F3831C]/0 via-[#F3831C] to-[#F3831C]/0"
          />
        </div>
      </div>
    </section>
  );
};

export default FreeResourceRoadmapCTA;
