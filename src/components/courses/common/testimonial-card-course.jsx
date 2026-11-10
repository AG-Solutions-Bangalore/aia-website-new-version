import OptimizedImage from "@/components/common/optmized-image";
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
          <OptimizedImage
            src={author.avatar}
            alt={alt || "Certificate Image"}
            title={alt || "Certificate Image"}
            className="w-full h-full object-contain rounded-md"
            imageKind="story"
            sizes="(min-width: 768px) 290px, 100vw"
            width={290}
            height={165}
            loading="lazy"
          />
        ) : null}
      </div>
    </Card>
  );
}
