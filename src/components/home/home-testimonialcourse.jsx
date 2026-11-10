import OptimizedImage from "@/components/common/optmized-image";
import { cn } from "@/lib/utils";

export function TestimonialCardColor({
  author,
  href,
  alt,
  className,
  target,
  course,
  tabIndex,
}) {
  const Card = href ? "a" : "div";
  const getCourseName = (course) => {
    switch (course) {
      case "CFE":
        return "CFE";
      case "CIAC":
        return "CIA";
      case "CAMS":
        return "CAMS";
      default:
        return course;
    }
  };
  const getCourseStyles = (course) => {
    switch (course) {
      case "CFE":
        return "bg-[#F3831C]/15 text-[#F3831C]";
      case "CIAC":
        return "bg-[#0F3652]/15 text-[#0F3652]";
      case "CAMS":
        return "bg-[#16A34A]/15 text-[#16A34A]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

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
        "flex flex-col rounded-lg relative group",
        "border-2 border-[#F3831C] bg-white",
        "overflow-hidden",
        className
      )}
    >
      <div
        className={`absolute top-0 right-0 z-30 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-semibold ${getCourseStyles(
          course
        )}`}
      >
        {getCourseName(course)}
      </div>
      <div className="h-full w-full flex items-center justify-center overflow-hidden relative">
        {author?.avatar ? (
          <OptimizedImage
            src={author.avatar}
            alt={alt || "Certificate Image"}
            title={alt || "Certificate Image"}
            className="w-full h-full object-contain rounded-md"
            imageKind="story"
            sizes="(min-width: 768px) 340px, 280px"
            width={340}
            height={220}
            loading="lazy"
          />
        ) : null}
      </div>
    </Card>
  );
}
