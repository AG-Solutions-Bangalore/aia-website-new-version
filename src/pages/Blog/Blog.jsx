import { BASE_URL, IMAGE_PATH } from "@/api/base-url";
import BannerBlogCard from "@/components/blog/banner-blog-card";
import BlogCard from "@/components/blog/blog-card";
import BlogSubscribeSection from "@/components/blog/blog-subscription";
import PopUp from "@/components/common/pop-up";
import CourseTopStudent from "@/components/home/home-pr-carousel";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { getCourseColor } from "@/utils/courseColor";
import axios from "axios";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Search,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageBaseUrl, setImageBaseUrl] = useState("");
  const [showAllTrending, setShowAllTrending] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/getAllBlogs`);
      setBlogs(response.data.data || []);

      const blogImageConfig = response.data.image_url?.find(
        (item) => item.image_for === "Blog",
      );
      if (blogImageConfig) {
        setImageBaseUrl(blogImageConfig?.image_url);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    if (!searchTerm.trim()) return true;

    const search = searchTerm.toLowerCase();

    return (
      blog.blog_heading?.toLowerCase().includes(search) ||
      blog.blog_short_description?.toLowerCase().includes(search) ||
      blog.blog_course?.toLowerCase().includes(search)
    );
  });

  const uniqueCategories = [
    ...new Set(blogs.map((blog) => blog.blog_course).filter(Boolean)),
  ].sort((a, b) => {
    if (a === "Other") return 1; // push "Other" down
    if (b === "Other") return -1; // keep others above
    return a.localeCompare(b); // normal alphabetical sort
  });

  const trendingBlogs = filteredBlogs.filter(
    (blog) => blog.blog_trending === "yes",
  );

  const searchSuggestions = searchTerm.trim()
    ? blogs
        .filter((blog) => {
          const search = searchTerm.toLowerCase();
          return (
            blog.blog_heading?.toLowerCase().includes(search) ||
            blog.blog_short_description?.toLowerCase().includes(search)
          );
        })
        .slice(0, 5)
    : [];
  const COURSE_NAME_MAP = {
    CFE: "Certified Fraud Examiner",
    CIA: "Certified Internal Auditor",
    CAMS: "Certified Anti Money Laundering Specialist",
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!showAllTrending && trendingBlogs.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(
          (prev) => (prev + 1) % Math.min(4, trendingBlogs.length),
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [showAllTrending, trendingBlogs.length]);

  const handleBlogClick = (slug) => {
    window.open(`/blogs/${slug}`, "_blank");
  };

  const handleCategoryClick = (category) => {
    window.open(
      `/blogs/course/${category.toLowerCase().replace(/\s+/g, "-")}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F3652] mb-3">
              Blogs
            </h2>
            <div className="flex justify-center gap-1 mt-4">
              <div className="w-2 h-2 bg-[#0F3652] rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#0F3652] rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-[#0F3652] rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
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
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F3652] mb-3">
              Blogs
            </h2>
            <div className="w-20 h-0.5 bg-[#0F3652] mx-auto"></div>
          </div>
          <div className="text-center py-12 border border-[#0F3652]/20 rounded-md bg-[#0F3652]/5">
            <BookOpen className="w-12 h-12 text-[#0F3652] mx-auto mb-4" />
            <p className="text-[#0F3652]">No blogs available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PopUp slug="Blogs" />

      <section className="py-16 bg-white">
        <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 rounded-2xl p-4">
            <SectionHeading
              // title="Subscribe to the AIA Blog"
              title="Actionable Insights to Advance Your Prep and Career"
              description="Join the AIA community and get timely updates and expert insights directly in your inbox"
              align="center"
            />

            <div className="max-w-2xl mx-auto mt-8 relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder=" Search smart. Learn Audit, Fraud & AML with AIA..."
                  className="w-full px-6 py-3 pr-14 text-base md:text-lg rounded-lg 
      bg-white border border-[#0F3652]/20 shadow-md 
      text-[#0F3652] placeholder:text-[#0F3652]/50
      focus:outline-none focus:ring-2 focus:ring-[#F3831C]"
                />

                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5 text-[#0F3652]" />
                </button>
              </div>

              {showDropdown && searchSuggestions.length > 0 && (
                <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  {searchSuggestions.map((blog) => (
                    <div
                      key={blog.id}
                      onClick={() => {
                        window.open(`/blogs/${blog.blog_slug}`, "_blank");
                        setSearchTerm("");
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-2 p-4 hover:bg-[#0F3652]/5 cursor-pointer transition-colors"
                    >
                      <img
                        src={
                          blog.blog_images
                            ? `${imageBaseUrl}${blog.blog_images}`
                            : `${IMAGE_PATH}/no_image.jpg`
                        }
                        alt={blog.blog_heading}
                        className="w-24 h-20 object-contain rounded-sm"
                        onError={(e) => {
                          e.currentTarget.src = `${IMAGE_PATH}/no_image.jpg`;
                        }}
                        loading="lazy"
                      />

                      <div className="flex flex-col">
                        <span className="font-semibold text-[#0F3652] line-clamp-1 text-start">
                          {blog.blog_heading}
                        </span>
                        <span className="text-sm text-gray-500 line-clamp-2 text-start">
                          {blog.blog_short_description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {trendingBlogs.length > 0 && (
            <div className="mb-12 p-2 border-2 rounded-lg bg-[#0F3652]/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-[#F3831C]" />
                  <h2 className="text-2xl md:text-3xl font-medium text-[#0F3652]">
                    Trending Blog
                  </h2>
                </div>
                <span className="text-sm text-[#0F3652]">
                  {trendingBlogs.length}{" "}
                  {trendingBlogs.length === 1 ? "article" : "articles"} trending
                </span>
              </div>

              {!showAllTrending ? (
                <>
                  <div className="relative mb-8 px-2 pb-2 pt-4 rounded-lg">
                    <div className="overflow-hidden">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                          transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                      >
                        {trendingBlogs.slice(0, 4).map((blog) => (
                          <div key={blog.id} className="w-full shrink-0 px-2">
                            <BannerBlogCard
                              blog={blog}
                              handleBlogClick={handleBlogClick}
                              imageBaseUrl={imageBaseUrl}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {trendingBlogs.slice(0, 4).length > 1 && (
                      <div className="flex justify-center gap-2 mt-2">
                        {trendingBlogs.slice(0, 4).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              currentSlide === index
                                ? "w-8 bg-[#0F3652]"
                                : "w-2 bg-[#0F3652]/30 hover:bg-[#0F3652]/50"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {trendingBlogs.map((blog) => (
                      <BlogCard
                        key={blog.id}
                        blog={blog}
                        handleBlogClick={handleBlogClick}
                        imageBaseUrl={imageBaseUrl}
                      />
                    ))}
                  </div>

                  {trendingBlogs.length > 4 && (
                    <div className="text-center">
                      <button
                        className="relative overflow-hidden cursor-pointer flex items-center justify-center px-4 py-2 border border-[#0F3652] mx-auto gap-2 rounded-md font-medium text-sm text-[#0F3652] group"
                        onClick={() => {
                          setShowAllTrending(false);
                          setCurrentSlide(0);
                        }}
                      >
                        <span className="absolute inset-0 bg-[#0F3652] scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></span>
                        <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                          Show Less
                          <ArrowRight className="w-4 h-4 rotate-180" />
                        </span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <div className="mb-12 ">
            <h2 className="text-2xl md:text-3xl font-medium text-[#0F3652] text-left mb-6">
              Categories
            </h2>

            <div className="flex flex-wrap justify-start gap-3 mb-8">
              {uniqueCategories.map((category) => {
                const displayName = COURSE_NAME_MAP[category] || category;

                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-6 py-2 cursor-pointer rounded-md text-sm transition-colors duration-200 bg-[#0F3652]/10 text-[#0F3652] hover:bg-[#0F3652]/20`}
                    title={category}
                  >
                    {displayName}
                  </button>
                );
              })}
            </div>
          </div>

          {uniqueCategories.map((category) => {
                const categoryBlogs = filteredBlogs
                  .filter((blog) => blog.blog_course === category)
                  .slice(0, 4);
                if (categoryBlogs.length === 0) return null;

                return (
                  <div
                    key={category}
                    className="mb-16 p-4 border-2 rounded-lg "
                    style={{
                      backgroundColor: getCourseColor(category),
                    }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl md:text-2xl font-medium text-[#0F3652]">
                          {COURSE_NAME_MAP[category] || category}
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      {categoryBlogs.map((blog) => (
                        <BlogCard
                          key={blog.id}
                          blog={blog}
                          handleBlogClick={handleBlogClick}
                          imageBaseUrl={imageBaseUrl}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
          {filteredBlogs.length === 0 && (
            <div className="text-center py-12 border border-[#0F3652]/20 rounded-md bg-[#0F3652]/5">
              <BookOpen className="w-12 h-12 text-[#0F3652] mx-auto mb-4" />
              <p className="text-[#0F3652] text-lg font-medium">
                No blogs found for &quot;{searchTerm}&quot;
              </p>
            </div>
          )}

          {/* <div className="flex flex-col items-center justify-center bg-white px-4">
            <SectionHeading
              title="Start Your Journey with AIA"
              align="center"
            />
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate("/contact")}
                className=" cursor-pointer px-6 py-3 bg-[#F3831C] text-white rounded-lg font-medium hover:bg-[#F3831C]/90 transition-colors"
              >
                Contact Now
              </button>
            </div>
          </div> */}
        </div>
        <CourseTopStudent />
        <BlogSubscribeSection />
      </section>
    </>
  );
};

export default Blog;
