import { BASE_URL, IMAGE_PATH } from "@/api/base-url";
import axios from "axios";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const BlogCard = React.memo(({ blog, imageBaseUrl, onClick }) => {
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);
  const handleImageError = useCallback((e) => {
    e.target.src = `${IMAGE_PATH}/no_image.jpg`;
  }, []);

  return (
    <div
      onClick={() => onClick(blog.blog_slug)}
      className=" rounded-none hover:scale-105 transition-transform duration-300 hover:border-[#0F3652] duration-200 cursor-pointer group"
    >
      <div className="relative overflow-hidden ">
        <div className="h-full bg-linear-to-r from-[#0F3652]/10 to-[#0F3652]/20 rounded-2xl border-r-6 border-b-6 border-[#F3831C]  ">
          <img
            src={`${imageBaseUrl}${blog.blog_images}`}
            alt={blog.blog_images_alt || blog.blog_heading}
            className="w-full h-full object-cover  rounded-md border-2 border-[#0F3652] "
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-[#0F3652] text-white text-xs font-medium px-3 py-1.5 rounded border border-[#0F3652]">
            {blog.blog_course}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between text-xs text-[#0F3652] mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(blog.blog_created)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />5 min
          </div>
        </div>

        <h3 className="text-lg font-semibold text-[#0F3652] hover:text-[#F3831C] mb-3 line-clamp-2 group-hover:text-[#0F3652]">
          {blog.blog_heading}
        </h3>

        <p className="text-[#0F3652] text-sm mb-5 line-clamp-3 leading-relaxed">
          {blog.blog_short_description}
        </p>

        <div className="flex items-center gap-2 text-[#F3831C] group/readmore">
          <span className="text-sm font-medium">Read Article</span>
          <ArrowRight className="w-4 h-4 group-hover/readmore:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
});

BlogCard.displayName = "BlogCard";

const LoadingSkeleton = ({ count = 3 }) => (
  <div className="text-center mb-12">
    <h2 className="text-2xl md:text-3xl font-bold text-[#0F3652] mb-3">
      Loading Blogs
    </h2>
    <div className="flex justify-center gap-1 mt-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-[#0F3652] rounded-full animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-[#0F3652]/5 rounded-md border border-[#0F3652]/20 p-5"
        >
          <div className="h-40 bg-linear-to-r from-[#0F3652]/10 to-[#0F3652]/20 rounded-md mb-4 animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-4 bg-[#0F3652]/10 rounded w-3/4"></div>
            <div className="h-3 bg-[#0F3652]/10 rounded w-full"></div>
            <div className="h-3 bg-[#0F3652]/10 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EmptyState = ({ searchQuery, categoryName, onClearSearch }) => (
  <div className="text-center py-16 border border-[#0F3652]/20 rounded-lg bg-[#0F3652]/5">
    <div className="text-[#0F3652] mb-4">
      <p className="text-xl font-medium mb-2">
        {searchQuery ? "No articles found" : "No articles available"}
      </p>
      {searchQuery ? (
        <p>Try a different search term or browse all blogs</p>
      ) : (
        <p>Check back soon for new {categoryName} articles</p>
      )}
    </div>
    {searchQuery && (
      <button
        onClick={onClearSearch}
        className="px-4 py-2 bg-[#0F3652] text-white rounded-md hover:bg-[#0F3652]/90 transition-colors"
      >
        Clear Search
      </button>
    )}
  </div>
);

const COURSE_NAME_MAP = {
  CFE: "Certified Fraud Examiner",
  CIA: "Certified Internal Auditor",
  CAMS: "Certified Anti Money Laundering Specialist",
};

const BlogCourse = () => {
  const { courseName } = useParams();
  const course = courseName?.toUpperCase();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageBaseUrl, setImageBaseUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  console.log(courseName, "courseName");
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/getAllBlogs`);
        const allBlogs = response.data.data || [];
        setBlogs(allBlogs);

        const blogImageConfig = response.data.image_url?.find(
          (item) => item.image_for === "Blog",
        );
        if (blogImageConfig) {
          setImageBaseUrl(blogImageConfig.image_url);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!blogs.length) return;

    const filterBlogs = () => {
      const query = searchQuery.toLowerCase().trim();

      if (!query) {
        const courseBlogs = blogs.filter(
          (blog) =>
            blog.blog_course?.toLowerCase() === courseName?.toLowerCase(),
        );

        const formattedBlogs = courseBlogs.map((blog) => ({
          ...blog,
          blog_course: blog.blog_course?.toUpperCase(),
        }));

        setFilteredBlogs(formattedBlogs);
        return;
      }
      const filtered = blogs.filter(
        (blog) =>
          blog.blog_course == course &&
          (blog.blog_heading?.toLowerCase().includes(query) ||
            blog.blog_short_description?.toLowerCase().includes(query) ||
            blog.blog_content?.toLowerCase().includes(query)),
      );
      setFilteredBlogs(filtered);
    };

    filterBlogs();
  }, [searchQuery, blogs, course, courseName]);


  const displayCategoryName = useMemo(() => {
    if (!course) return "";
    return COURSE_NAME_MAP[course] || course;
  }, [course]);
  const handleBlogClick = useCallback((slug) => {
    window.open(`/blogs/${slug}`, "_blank", "noopener,noreferrer");
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-white ">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 ">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#F3831C]">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0F3652] mb-2">
                {displayCategoryName}
              </h1>
            </div>
          </div>
        </div>

        {filteredBlogs.length === 0 ? (
          <EmptyState
            searchQuery={searchQuery}
            categoryName={displayCategoryName}
            onClearSearch={handleClearSearch}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto gap-10 mb-12">
              {filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog.id || blog.blog_slug}
                  blog={blog}
                  imageBaseUrl={imageBaseUrl}
                  onClick={handleBlogClick}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogCourse;
