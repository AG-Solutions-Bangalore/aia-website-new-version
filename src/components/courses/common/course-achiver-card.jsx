import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);
const CourseAchiverCard = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;
  const zIndex = isCenter ? 10 : 10 - Math.abs(position);
  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-[45%] md:top-[50%] cursor-pointer border-2  border-amber-950 p-6 transition-all duration-500 ease-in-out mt-40 md:mt-30",
        isCenter
          ? "z-10 bg-[#0F3652] text-primary-foreholder border-[#0F3652]"
          : "z-0 bg-card text-card-foreholder border-border hover:border-primary/50",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        zIndex: zIndex,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
    translate(-50%, -50%) 
    translateX(${(cardSize / 1.5) * position}px)
    translateY(${isCenter ? -65 : Math.abs(position) % 2 ? 15 : -15}px)
rotate(${isCenter ? 0 : position > 0 ? -2.5 : 2.5}deg)
  `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px hsl(var(--border))"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 4,
          width: SQRT_5000,
          height: 2,
        }}
      />

      <div className="absolute inset-0 p-6">
        <img
          src={testimonial.student_image_url || testimonial.imgSrc}
          alt={testimonial.student_image_alt || testimonial.student_name}
          className="h-full w-full bg-muted object-cover object-top rounded-2xl"
          style={{
            boxShadow: "3px 3px 0px hsl(var(--background))",
          }}
           loading="lazy"
        />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div
          className={cn(
            "bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 rounded-b-2xl",
            isCenter
              ? "bg-gradient-to-t from-[#0F3652]/90 via-[#0F3652]/70 to-transparent"
              : "",
          )}
        >
          <div className="space-y-1">
            <div className="flex flex-row items-center justify-between">
              <div>
                <h3
                  className={cn(
                    "font-bold text-lg truncate",
                    isCenter ? "text-white" : "text-white",
                  )}
                >
                  {testimonial.student_name}
                </h3>
                <p
                  className={cn(
                    "font-semibold text-sm",
                    isCenter ? "text-blue-200" : "text-blue-100",
                  )}
                >
                  {testimonial.student_course}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span
                  className={cn(
                    "text-xs font-medium",
                    isCenter ? "text-blue-100" : "text-blue-50",
                  )}
                >
                  {testimonial.country_name}
                </span>

                {testimonial.country_city &&
                  testimonial.country_city !== testimonial.country_name && (
                    <>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          isCenter ? "text-blue-100" : "text-blue-50",
                        )}
                      >
                        {testimonial.country_city}
                      </span>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAchiverCard;
