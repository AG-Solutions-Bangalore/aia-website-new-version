import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function TestimonialCardCourse({
  author,
  href,
  alt,
  className,
  target,
  size,
  border,
}) {
  const Card = href ? "a" : "div";

  return (
    <Card
      {...(href
        ? {
            href,
            target: target || "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      className={cn(
        "flex flex-col rounded-lg relative group overflow-hidden",
        border ? "border-2 border-[#F3831C]" : "border-none",
      )}
      style={{
        height: size?.height || "165px",
        width: size?.width || "290px",
      }}
    >
      <div className="h-full w-full flex items-center justify-center overflow-hidden relative">
        <Avatar className="h-full w-full rounded-md">
          <AvatarImage
            src={author?.avatar}
            alt={alt || "Certificate Image"}
            className="w-full h-full object-contain rounded-md"
          />
        </Avatar>
      </div>
    </Card>
  );
}
