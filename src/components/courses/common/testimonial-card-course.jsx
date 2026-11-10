import { cn } from "@/lib/utils";

export function TestimonialCardCourse({
  author,
  href,
  alt,
  className,
  target,
  size,
  border,
  tabIndex,
}) {
  const Card = href ? "a" : "div";

  return (
    <Card
      {...(href
        ? {
            href,
            target: target || "_blank",
            rel: "noopener noreferrer",
            tabIndex,
          }
        : {})}
      className={cn(
        "flex flex-col rounded-lg relative group overflow-hidden",
        border ? "border-2 border-[#F3831C]" : "border-none",
        className
      )}
      style={{
        height: size?.height || "165px",
        width: size?.width || "290px",
      }}
    >
      <div className="h-full w-full flex items-center justify-center overflow-hidden relative">
        {author?.avatar ? (
          <img
            src={author.avatar}
            alt={alt || "Student Testimonial"}
            title={alt || "Student Testimonial"}
            className="w-full h-full object-contain rounded-md"
            width={290}
            height={165}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://aia.in.net/webapi/public/assets/images/no_image.jpg";
            }}
          />
        ) : null}
      </div>
    </Card>
  );
}
