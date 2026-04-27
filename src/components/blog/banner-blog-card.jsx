import { IMAGE_PATH } from "@/api/base-url";
import { getCourseColor } from "@/utils/courseColor";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const BannerBlogCard = ({ blog, handleBlogClick, imageBaseUrl }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <div
      onClick={() => handleBlogClick(blog.blog_slug)}
      className="rounded-lg hover:border-[#0F3652] transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/5 relative overflow-hidden rounded-lg">
          <div className="h-auto lg:h-full">
            <img
              src={`${imageBaseUrl}${blog.blog_images}`}
              alt={blog.blog_images_alt || blog.blog_heading}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = `${IMAGE_PATH}/no_image.jpg`;
              }}
              loading="lazy"
            />
          </div>
          <div className="absolute top-1 left-1 lg:top-2 lg:left-2">
            {/* <span
              className="text-xs md:text-sm font-medium px-4 py-1 lg:px-4 lg:py-1 rounded "
              style={{ backgroundColor: getCourseColor(blog.blog_course) }}
            > */}
            <span className="bg-[#0F3652] text-white text-xs md:text-sm font-medium px-4 py-1 lg:px-4 lg:py-1 rounded border border-[#0F3652]">
              {blog.blog_course}
            </span>
          </div>
        </div>

        <div className="md:w-3/5 flex flex-col justify-center">
          <div className="flex items-center gap-4 text-sm text-[#0F3652] mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(blog.blog_created)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />5 min read
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-[#0F3652] mb-4 group-hover:text-[#0F3652] line-clamp-2">
            {blog.blog_heading}
          </h3>

          <p className="text-[#0F3652] text-base mb-6 line-clamp-3 leading-relaxed">
            {blog.blog_short_description}
          </p>

          <div className="flex items-center gap-3 text-[#F3831C] group/readmore">
            <span className="text-base font-semibold">Read Full Article</span>
            <ArrowRight className="w-5 h-5 group-hover/readmore:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerBlogCard;
