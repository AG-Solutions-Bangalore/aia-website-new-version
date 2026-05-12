import { isReactSnapPrerender } from "@/lib/prerender";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const FALLBACK_IMAGE_PATH = "/no-image.svg";

const BlogCard = ({ imageBaseUrl = "", blog, handleBlogClick }) => {
  const isPrerendering = isReactSnapPrerender();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const imageSrc =
    blog?.blog_images && imageBaseUrl
      ? `${imageBaseUrl}${blog.blog_images}`
      : FALLBACK_IMAGE_PATH;
  const handleImageFallback = (event) => {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied === "true") return;
    image.dataset.fallbackApplied = "true";
    image.src = FALLBACK_IMAGE_PATH;
  };
  return (
    <a
      href={`/blogs/${blog.blog_slug}`}
      onClick={(event) => {
        event.preventDefault();
        handleBlogClick(blog.blog_slug);
      }}
      className="h-full flex flex-col cursor-pointer group border transition-colors duration-200 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3652] focus-visible:ring-offset-2"
      aria-label={`Read full blog post: ${blog.blog_heading}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-md">
        <div className="h-[156px] bg-gradient-to-r from-[#0F3652]/10 to-[#0F3652]/20 flex items-center justify-center">
          {isPrerendering ? (
            <span className="sr-only">
              {blog?.blog_images_alt || blog?.blog_heading}
            </span>
          ) : (
            <img
              src={imageSrc}
              alt={blog?.blog_images_alt || blog?.blog_heading}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageFallback}
              loading="lazy"
              width={400}
              height={260}
            />
          )}
        </div>

        <div className="absolute top-1.5 left-2">
          {/* <span
            className="text-xs font-medium px-3 py-1.5 rounded"
            style={{ backgroundColor: getCourseColor(blog.blog_course) }}
          > */}
          <span className="bg-[#0F3652] text-white text-xs font-medium px-3 py-1.5 rounded border border-[#0F3652]">
            {blog.blog_course}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between text-xs text-[#0F3652] mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(blog.blog_created)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />5 min
          </div>
        </div>

        <h3 className="text-lg font-semibold text-[#0F3652] mb-3 line-clamp-2">
          {blog.blog_heading}
        </h3>

        <p className="text-[#0F3652] text-sm line-clamp-3 leading-relaxed">
          {blog.blog_short_description}
        </p>

        {/* Push to bottom */}
        <div className="mt-auto pt-4 flex items-center gap-2 text-[#B45309]">
          <span className="text-sm font-medium">Read Article</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
};
export default BlogCard;
