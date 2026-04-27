import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Play } from "lucide-react"

export function TestimonialCard({
  author,
  href,
  alt,
  className,
  target
}) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { 
        href, 
        target: target || "_blank",
        rel: "noopener noreferrer" 
      } : {})}
      className={cn(
        "flex flex-col  rounded-lg border-2 border-black relative group",
        "bg-linear-to-b from-muted/50 to-muted/10",
        "text-start",
        "hover:from-muted/60 hover:to-muted/20",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-all duration-300",
        "h-50 w-[320px]",
        href ? "cursor-pointer" : "cursor-default",
        className
      )}>
      
      
      {href && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-md z-10 flex items-center justify-center">
          <div className="bg-red-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="h-6 w-6 fill-white" />
          </div>
        </div>
      )}
      
      <div className="h-full w-full flex items-center justify-center">
        <Avatar className="h-full w-full rounded-md">
          <AvatarImage 
            src={author.avatar} 
            alt={alt || "Certificate Image"}
            className="w-full h-full object-contain rounded-md"
          />
        </Avatar>
      </div>
      
     
      {href && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          YouTube
        </div>
      )}
    </Card>
  );
}