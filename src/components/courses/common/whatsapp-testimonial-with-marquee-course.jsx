import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function WhatsappTestimonialsSectionCourse({
  title,
  description,
  testimonials,
  className,
}) {
  const marqueeRef = useRef(null);
  const [duration, setDuration] = useState(40);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const totalWidth = marqueeRef.current.scrollWidth / 2;
    const SPEED = 120;
    setDuration(totalWidth / SPEED);
  }, [testimonials]);

  if (!testimonials?.length) return null;

  const CardItem = ({ testimonial, index }) => (
    <a
      key={index}
      href={testimonial.youtubeLink}
      target="_blank"
      rel="noopener noreferrer"
      className="
        relative group shrink-0 overflow-hidden rounded-lg
        aspect-[9/16]
        w-[180px]
        sm:w-[200px]
        md:w-[220px]
        lg:w-[225px]
        max-h-[400px]
      "
    >
      <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden">
        <img
          src={testimonial.image}
          alt={testimonial.alt || "Testimonial"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    </a>
  );

  return (
    <section className={cn("py-12 sm:py-16 md:py-18 px-0 mt-10", className)}>
      {/* ✅ Keyframes defined inside component */}
      <style>
        {`
          @keyframes marqueeInline {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

      <div className="mx-auto flex max-w-340 flex-col items-center gap-4 text-center sm:gap-16">
        <SectionHeading
          title={title}
          description={description}
          align="center"
        />

        <div className="relative w-full overflow-hidden group">
          <div
            ref={marqueeRef}
            className="flex gap-4 min-w-max group-hover:[animation-play-state:paused]"
            style={{
              animation: `marqueeInline ${duration + 4}s linear infinite`,
              willChange: "transform",
            }}
          >
            {[
              ...testimonials,
              ...testimonials,
              ...testimonials,
              ...testimonials,
            ].map((testimonial, i) => (
              <CardItem key={`item-${i}`} testimonial={testimonial} />
            ))}
          </div>
          ...
        </div>
      </div>
    </section>
  );
}
