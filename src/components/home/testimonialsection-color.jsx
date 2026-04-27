import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TestimonialCardColor } from "./home-testimonialcourse";
export function TestimonialsSectionColor({
  title,
  description,
  testimonials,
  className,
  sucessstory,
  imageclassName,
}) {
  const marqueeRef = useRef(null);
  const [duration, setDuration] = useState(40);


  useEffect(() => {
    if (!marqueeRef.current) return;

    const width = marqueeRef.current.scrollWidth;

    const SPEED = 140;

    const calculatedDuration = width / SPEED;


    setDuration(calculatedDuration);
  }, [testimonials]);
  const finalDuration = duration;
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      className={cn(
        "py-12 sm:py-16 md:py-18 px-0 bg-[#0F3652] mt-10",
        className,
      )}
    >
      <div className="mx-auto flex max-w-340 flex-col items-center gap-4 text-center sm:gap-16">
        <div className="px-4">
          <SectionHeading
            title={title}
            description={description}
            align="center"
            titleClass="text-white text-[1rem] md:text-3xl"
            descriptionClass="text-white"
            underlineColor="#fff"
          />
        </div>
        <div className="relative flex w-full overflow-hidden">
          <div
            className="group flex gap-4"
            style={{ ["--duration"]: `${finalDuration}s` }}
          >
            {/* FIRST SET */}
            <div
              ref={marqueeRef}
              className="flex shrink-0 gap-4 animate-marquee group-hover:paused"
            >
              {testimonials.map((testimonial, i) => (
                <TestimonialCardColor
                  key={`first-${i}`}
                  {...testimonial}
                  href={testimonial.youtubeLink}
                  target="_blank"
                  course={testimonial.course}
                  // cardWidth={image?.width}
                  // cardHeight={image?.height}
                  className={imageclassName}
                />
              ))}
            </div>

            {/* DUPLICATE SET */}
            <div
              className="flex shrink-0 gap-4 animate-marquee group-hover:paused"
              aria-hidden="true"
            >
              {testimonials.map((testimonial, i) => (
                <TestimonialCardColor
                  key={`second-${i}`}
                  {...testimonial}
                  href={testimonial.youtubeLink}
                  target="_blank"
                  course={testimonial.course}
                  // cardWidth={image?.width}
                  // cardHeight={image?.height}
                  className={imageclassName}
                />
              ))}
            </div>
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background hidden md:block" />

          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background hidden md:block" />
        </div>
      </div>
      {sucessstory && (
        <div className="flex justify-center mt-4">
          <Button
            className=" mb-4  relative cursor-pointer overflow-hidden group  px-4 py-2  text-xs bg-[#F3831C] text-white rounded-none hover:bg-[#F3831C] transition-colors duration-300 "
            variant="ghost"
            aria-label="View All Success Stories"
          >
            <Link
              to={
                "https://www.youtube.com/playlist?list=PLHH4EQbbvYIZSnYeZNB3-zoHdVGS6BvWV"
              }
              target="_blank"
            >
              <span className="relative z-10 text-white">
                <span>View All Success Stories</span>
              </span>
            </Link>
          </Button>{" "}
        </div>
      )}
    </section>
  );
}
