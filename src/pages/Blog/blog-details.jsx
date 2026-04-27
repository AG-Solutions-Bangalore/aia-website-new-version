import { BASE_URL, IMAGE_PATH } from "@/api/base-url";
import BlogFaq from "@/components/blog/blog-faq";
import axios from "axios";
import { ArrowLeft, Calendar, Clock, Image as ImageIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShareButtons } from "./share-button";
import OptimizedImage from "@/components/common/optmized-image";

const BlogDetails = () => {
  const { id } = useParams();
  const isScrollingProgrammatically = useRef(false);
  const scrollTimeout = useRef(null);
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [imageBaseUrl, setImageBaseUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const [students, setStudents] = useState([]);
  const [faq, setFaq] = useState([]);
  const [studentImageBaseUrl, setStudentImageBaseUrl] = useState("");
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  useEffect(() => {
    if (!blog) return;

    document.title = blog.blog_meta_title || blog.blog_heading;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content =
      blog.blog_meta_description || blog.blog_short_description;

    if (blog.blog_meta_keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = blog.blog_meta_keywords;
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = `https://aia.in.net/blogs/${blog.blog_slug}`;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://aia.in.net/blogs/${blog.blog_slug}`,
      },
      headline: blog.blog_heading,
      description: blog.blog_short_description,
      image: blog.blog_images
        ? `${imageBaseUrl}${blog.blog_images}`
        : `${IMAGE_PATH}/no_image.jpg`,
      author: {
        "@type": "Organization",
        name: "AIA",
      },
      publisher: {
        "@type": "Organization",
        name: "Academy of Internal Audit",
        logo: {
          "@type": "ImageObject",
          url: `${IMAGE_PATH}/new_logo.webp`,
        },
      },
      datePublished: blog.created_at,
      dateModified: blog.updated_at,
    };

    const existingScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (metaDescription && document.head.contains(metaDescription)) {
        document.head.removeChild(metaDescription);
      }
      const keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta && document.head.contains(keywordsMeta)) {
        document.head.removeChild(keywordsMeta);
      }
      if (canonicalLink && document.head.contains(canonicalLink)) {
        document.head.removeChild(canonicalLink);
      }
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
      document.title = "AIA | Academy of Internal Audit";
    };
  }, [blog, imageBaseUrl, id]);
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingProgrammatically.current) return;

      const headerOffset = 120;
      let closestIndex = 0;
      let closestDistance = Infinity;

      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - headerOffset);

        if (distance < closestDistance && rect.bottom > headerOffset) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveSection(closestIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog]);
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);
  const fetchBlogDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/getBlogbySlug/${id}`);

      const blogData = response.data.data;
      setBlog(blogData);
      setRelatedBlogs(response.data.related_blogs || []);
      setStudents(response.data.student || []);
      setFaq(response.data.faq || []);
      const blogImageConfig = response.data.image_url?.find(
        (item) => item.image_for === "Blog"
      );
      if (blogImageConfig) {
        setImageBaseUrl(blogImageConfig.image_url);
      }
      const studentImageConfig = response.data.image_url?.find(
        (item) => item.image_for === "Student"
      );
      if (studentImageConfig) {
        setStudentImageBaseUrl(studentImageConfig.image_url);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog details:", error);
      setLoading(false);
    }
  }, [id]);

  const faqHeading = faq?.[0]?.faq_heading || "FAQs";
  const faqItems = useMemo(
    () =>
      faq?.map((item, index) => ({
        id: `item-${index + 1}`,
        question: item.faq_que,
        answer: item.faq_ans,
      })) || [],
    [faq]
  );

  useEffect(() => {
    if (faqItems.length > 0) {
      const existingScript = document.querySelector(
        'script[type="application/ld+json"][data-faq-schema]'
      );
      if (existingScript) {
        existingScript.remove();
      }

      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-faq-schema", "true");
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);

      return () => {
        if (script && document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [faqItems]);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubscriptionStatus("Please enter a valid email address");
      setTimeout(() => setSubscriptionStatus(""), 3000);
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus("");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/create-newslettersubscription`,
        {
          newsletter_email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        setSubscriptionStatus(
          response.data.msg || "Successfully subscribed! Thank you."
        );
        setEmail("");
      } else {
        setSubscriptionStatus(
          response.data.message || "Subscription failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Subscription error:", error);
      if (error.response) {
        setSubscriptionStatus(
          error.response.data.message ||
            error.response.data.error ||
            "Subscription failed. Please try again."
        );
      } else if (error.request) {
        setSubscriptionStatus("Network error. Please check your connection.");
      } else {
        setSubscriptionStatus("An error occurred. Please try again.");
      }
    } finally {
      setIsSubscribing(false);
      setTimeout(() => setSubscriptionStatus(""), 5000);
    }
  };

  const scrollToSection = (index, e) => {
    e.stopPropagation();

    if (isScrollingProgrammatically.current) return;

    setActiveSection(index);

    isScrollingProgrammatically.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    const element = sectionRefs.current[index];
    if (!element) return;

    const headerOffset = 120;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });

    scrollTimeout.current = setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 800);
  };
  useEffect(() => {
    if (students.length > 1) {
      const interval = setInterval(() => {
        setCurrentStudentIndex((prevIndex) =>
          prevIndex === students.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [students.length]);

  const nextStudent = () => {
    setCurrentStudentIndex((prevIndex) =>
      prevIndex === students.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevStudent = () => {
    setCurrentStudentIndex((prevIndex) =>
      prevIndex === 0 ? students.length - 1 : prevIndex - 1
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCourseColor = (course) => {
    const colors = {
      CIA: "bg-[#F3831C]/20 text-[#F3831C] border-[#F3831C]/30",
      CAMS: "bg-[#F3831C]/20 text-[#F3831C] border-[#F3831C]/30",
      CFE: "bg-[#F3831C]/20 text-[#F3831C] border-[#F3831C]/30",
      default: "bg-[#0F3652]/10 text-[#0F3652] border-[#0F3652]/20",
    };
    return colors[course] || colors.default;
  };

  const handleRelatedBlogClick = (slug) => {
    navigate(`/blogs/${slug}`);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    navigate("/blogs");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-[#0F3652]/10 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-[#0F3652]/10 rounded"></div>
            <div className="space-y-4">
              <div className="h-6 bg-[#0F3652]/10 rounded w-3/4"></div>
              <div className="h-4 bg-[#0F3652]/10 rounded w-full"></div>
              <div className="h-4 bg-[#0F3652]/10 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-[#0F3652] mb-4">
            Blog not found
          </h1>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 text-[#0F3652] hover:text-[#0F3652] font-medium "
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-[#0F3652] hover:text-[#0F3652] mb-8 font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </button>

        <header className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="flex flex-col h-full">
              {blog.blog_course && (
                <span
                  className={`inline-block ${getCourseColor(
                    blog.blog_course
                  )} text-sm font-medium px-3 py-1.5 rounded border mb-4 w-fit`}
                >
                  {blog.blog_course}
                </span>
              )}

              <p className="text-3xl md:text-4xl font-bold text-[#0F3652] mb-4">
                {blog.blog_heading}
              </p>

              {blog.blog_short_description && (
                <p className="text-lg text-[#0F3652] mb-6">
                  {blog.blog_short_description}
                </p>
              )}

              {/* DATE SECTION AT BOTTOM */}
              <div className="flex flex-wrap items-center gap-4 text-[#0F3652] text-sm mt-auto">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={blog.blog_created}>
                    {formatDate(blog.blog_created)}
                  </time>
                </div>

                <span className="hidden sm:inline">•</span>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
                </div>

                <span className="hidden sm:inline">•</span>

                <div className="flex items-center gap-2">
                  <span>Published by AIA</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="h-full">
              <div className="relative h-full rounded-md overflow-hidden">
                {blog.blog_images ? (
                  <img
                    src={`${imageBaseUrl}${blog.blog_images}`}
                    alt={blog.blog_images_alt || blog.blog_heading}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = `${IMAGE_PATH}/no_image.jpg`;
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-[#0F3652] mb-2" />
                    <p className="text-sm text-[#0F3652]">Blog Image</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {blog.web_blog_subs?.length > 0 && (
            <aside className="lg:w-1/4">
              <div className="sticky top-28">
                <nav
                  className="bg-[#0F3652]/5 rounded-md p-4 border border-[#0F3652]/20 overflow-y-auto"
                  style={{ maxHeight: "calc(100vh - 25rem)" }}
                >
                  <h3 className="font-semibold text-[#0F3652] mb-1 pb-1 border-b">
                    Table of Contents
                  </h3>
                  <ul className="space-y-1">
                    {blog.web_blog_subs.map((sub, index) => (
                      <li key={sub.id}>
                        <button
                          onClick={(e) => scrollToSection(index, e)}
                          className={`w-full text-left p-1 rounded text-sm transition-colors ${
                            activeSection === index
                              ? "bg-[#F3831C]/10 text-[#F3831C] border-l-4 border-[#F3831C]"
                              : "text-[#0F3652] hover:bg-[#0F3652]/5"
                          }`}
                        >
                          {sub.blog_sub_heading || `Section ${index + 1}`}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="max-w-md mx-auto p-1 space-y-4 hidden lg:block">
                  <div className="space-y-2">
                    <h2 className="text-xl font-medium text-[#0F3652]">
                      Subscribe to Newsletter
                    </h2>

                    <form onSubmit={handleSubscribe} className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-[#0F3652]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F3831C] focus:border-transparent text-[#0F3652] placeholder-[#0F3652]/50"
                        required
                      />

                      <button
                        type="submit"
                        disabled={isSubscribing}
                        className={`w-full py-3 ${
                          isSubscribing
                            ? "bg-[#F3831C]/70"
                            : "bg-[#F3831C] hover:bg-[#F3831C]/90"
                        } text-white font-semibold rounded-2xl transition-colors disabled:cursor-not-allowed`}
                      >
                        {isSubscribing ? "Subscribing..." : "Subscribe"}
                      </button>
                    </form>

                    {subscriptionStatus && (
                      <div
                        className={`text-sm ${
                          subscriptionStatus.includes("Success")
                            ? "text-[#F3831C]"
                            : "text-[#F3831C]"
                        } font-medium text-center`}
                      >
                        {subscriptionStatus}
                      </div>
                    )}
                  </div>

                  <ShareButtons />
                </div>
              </div>
            </aside>
          )}

          <main
            className={`
            ${blog.web_blog_subs?.length > 0 ? "lg:w-3/4" : "w-full"} 
            ${
              blog.web_blog_subs?.length > 0 && relatedBlogs.length > 0
                ? "lg:w-2/4"
                : ""
            }
          `}
          >
            {blog.web_blog_subs?.length > 0 ? (
              <div className="space-y-12">
                {blog.web_blog_subs.map((sub, index) => {
                  const allowedTags = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];

                  const tag = sub.blog_sub_heading_tag?.toLowerCase();
                  const HeadingTag = allowedTags.includes(tag) ? tag : "h2";

                  const sizeClasses = {
                    h1: "text-3xl font-bold",
                    h2: "text-2xl font-bold",
                    h3: "text-xl font-bold",
                    h4: "text-lg font-medium",
                    h5: "text-base font-medium",
                    h6: "text-sm font-medium",
                    p: "text-base font-normal",
                  };

                  return (
                    <article
                      key={sub.id}
                      id={`section-${index}`}
                      ref={(el) => (sectionRefs.current[index] = el)}
                      className="scroll-mt-[120px]"
                    >
                      <HeadingTag
                        className={`${
                          sizeClasses[HeadingTag]
                        } mb-6 text-[#0F3652] ${
                          HeadingTag !== "p" ? "pb-3 border-b" : ""
                        }`}
                      >
                        {sub.blog_sub_heading || `Section ${index + 1}`}
                      </HeadingTag>

                      <div className="prose prose-gray max-w-none">
                        <div
                          className="ck-content"
                          dangerouslySetInnerHTML={{
                            __html: sub.blog_sub_description,
                          }}
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-[#0F3652]">
                No content available for this blog.
              </div>
            )}
            <BlogFaq title={faqHeading} faqs={faqItems} />
          </main>

          {/* {blog.web_blog_subs?.length > 0 && (
            <aside className="lg:w-1/4">
              <div className="sticky top-26">
                
                {relatedBlogs.length > 0 && (
                  <section className="border-[#0F3652]/20 ">
                    <div className="mb-2">
                      <h3 className="text-2xl font-bold text-[#0F3652]">
                        Related Articles
                      </h3>
                      <p className="text-[#0F3652] ">
                        You might also be interested in these articles
                      </p>
                    </div>

                    <div className="grid gap-2">
                      {relatedBlogs.map((relatedBlog) => (
                        <div
                          key={relatedBlog.id}
                          onClick={() =>
                            handleRelatedBlogClick(relatedBlog.blog_slug)
                          }
                          className="flex gap-2 p-1 border border-[#0F3652]/20 rounded-md hover:border-[#F3831C] cursor-pointer transition-all group"
                        >
                          <div className="w-16 h-16 shrink-0 overflow-hidden rounded-md bg-[#0F3652]/10">
                            <img
                              src={`${imageBaseUrl}${relatedBlog.blog_images}`}
                              alt={
                                relatedBlog.blog_images_alt ||
                                relatedBlog.blog_heading
                              }
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = `${IMAGE_PATH}/no_image.jpg`;
                              }}
                              loading="lazy"
                            />
                          </div>

                          <div className="flex flex-col justify-between flex-1">
                            <div>
                              <h4 className="text-base font-semibold text-[#0F3652] line-clamp-2 group-hover:text-[#F3831C]">
                                {relatedBlog.blog_heading}
                              </h4>
                            </div>

                            <div className="flex items-center gap-4 text-[#0F3652] text-xs mt-1">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(relatedBlog.blog_created)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {students.length > 0 && (
                  <div className="mt-6 bg-[#0F3652]/5 rounded-lg p-2 border border-[#0F3652]/20">
                    <h3 className="font-semibold text-[#0F3652] mb-2">
                      {" "}
                      Recently Passed Out Students
                    </h3>

                    <div className="relative group">
                      <div className="overflow-hidden rounded-xl ">
                        <div
                          className="flex transition-transform duration-700 ease-out"
                          style={{
                            transform: `translateX(-${
                              currentStudentIndex * 100
                            }%)`,
                          }}
                        >
                          {students.map((student, index) => (
                            <div key={index} className="min-w-full">
                              <div className="relative h-auto overflow-hidden rounded-xl">
                                <img
                                  src={`${studentImageBaseUrl}${student.student_image}`}
                                  alt={
                                    student.student_image_alt ||
                                    student.student_name
                                  }
                                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                  onError={(e) => {
                                    e.target.src = `${IMAGE_PATH}/no_image.jpg`;
                                  }}
                                  loading="lazy"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-5 transition-opacity duration-300 group-hover:opacity-0">
                                  <div className="flex flex-col items-center text-center">
                                    <h4 className="font-semibold text-white text-xl mb-2">
                                      {student.student_name}
                                    </h4>
                                  </div>
                                </div>

                                {student.student_course && (
                                  <span
                                    className={` absolute top-0 right-0 ${getCourseColor(
                                      student.student_course
                                    )} text-sm font-medium px-4 py-1.5  rounded-bl-md   border-0`}
                                  >
                                    {student.student_course}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {students.length > 1 && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center justify-between">
                            <button
                              onClick={prevStudent}
                              className="bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center transition-all hover:scale-110"
                              aria-label="Previous student"
                            >
                              <ArrowLeft className="w-4 h-4 text-white" />
                            </button>

                            <button
                              onClick={nextStudent}
                              className="bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center transition-all hover:scale-110"
                              aria-label="Next student"
                            >
                              <ArrowLeft className="w-4 h-4 text-white rotate-180" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )} */}
          {blog.web_blog_subs?.length > 0 && (
            <aside className="w-full lg:w-1/4">
              <div className="lg:sticky lg:top-26">
                {/* Related Articles + Students: 2 col on md, 1 col on sm/lg */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                  {/* Related Articles */}
                  {relatedBlogs.length > 0 && (
                    <section className="border-[#0F3652]/20">
                      <div className="mb-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0F3652]">
                          Related Articles
                        </h3>
                        <p className="text-[#0F3652] text-sm sm:text-base">
                          You might also be interested in these articles
                        </p>
                      </div>

                      <div className="grid gap-2">
                        {relatedBlogs.map((relatedBlog) => (
                          <div
                            key={relatedBlog.id}
                            onClick={() =>
                              handleRelatedBlogClick(relatedBlog.blog_slug)
                            }
                            className="flex gap-2 p-1 border border-[#0F3652]/20 rounded-md hover:border-[#F3831C] cursor-pointer transition-all group"
                          >
                            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden rounded-md bg-[#0F3652]/10">
                              <img
                                src={`${imageBaseUrl}${relatedBlog.blog_images}`}
                                alt={
                                  relatedBlog.blog_images_alt ||
                                  relatedBlog.blog_heading
                                }
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.target.src = `${IMAGE_PATH}/no_image.jpg`;
                                }}
                                loading="lazy"
                              />
                            </div>

                            <div className="flex flex-col justify-between flex-1 min-w-0">
                              <h4 className="text-sm sm:text-base font-semibold text-[#0F3652] line-clamp-2 group-hover:text-[#F3831C]">
                                {relatedBlog.blog_heading}
                              </h4>
                              <div className="flex items-center gap-4 text-[#0F3652] text-xs mt-1">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(relatedBlog.blog_created)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Students Carousel */}
                  {students.length > 0 && (
                    <div className="bg-[#0F3652]/5 rounded-lg p-2 border border-[#0F3652]/20">
                      <h3 className="font-semibold text-[#0F3652] mb-2">
                        Recently Passed Out Students
                      </h3>

                      <div className="relative group w-full">
                        <div className="overflow-hidden rounded-xl">
                          <div
                            className="flex transition-transform duration-700 ease-out"
                            style={{
                              transform: `translateX(-${
                                currentStudentIndex * 100
                              }%)`,
                            }}
                          >
                            {students.map((student, index) => (
                              <div key={index} className="min-w-full">
                                <div className="relative w-full aspect-[3/4] sm:aspect-square overflow-hidden rounded-xl">
                                  <OptimizedImage
                                    src={`${studentImageBaseUrl}${student.student_image}`}
                                    alt={
                                      student.student_image_alt ||
                                      student.student_name
                                    }
                                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
                                    priority={index === 0}
                                    onError={(e) => {
                                      e.target.src = `${IMAGE_PATH}/no_image.jpg`;
                                    }}
                                  />

                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />

                                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transition-opacity duration-300 group-hover:opacity-0">
                                    <div className="flex flex-col items-center text-center">
                                      <h4 className="font-semibold text-white text-base sm:text-lg mb-1 line-clamp-2">
                                        {student.student_name}
                                      </h4>
                                    </div>
                                  </div>

                                  {student.student_course && (
                                    <span
                                      className={`absolute top-0 right-0 ${getCourseColor(
                                        student.student_course
                                      )} text-xs sm:text-sm font-medium px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-bl-md border-0 max-w-[65%] truncate`}
                                    >
                                      {student.student_course}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {students.length > 1 && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center justify-between">
                              <button
                                onClick={prevStudent}
                                className="bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all hover:scale-110"
                                aria-label="Previous student"
                              >
                                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                              </button>

                              <button
                                onClick={nextStudent}
                                className="bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all hover:scale-110"
                                aria-label="Next student"
                              >
                                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-white rotate-180" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* end inner grid */}
              </div>
            </aside>
          )}
          <div className="p-4 space-y-6 lg:hidden">
            <div className="bg-white rounded-2xl border border-[#0F3652]/10 p-6 shadow-sm">
              <h2 className="text-xl md:text-2xl font-semibold text-[#0F3652] mb-4">
                Subscribe to Newsletter
              </h2>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 md:py-3.5 border border-[#0F3652]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F3831C] focus:border-transparent text-[#0F3652] placeholder-[#0F3652]/50 transition-all"
                    required
                  />

                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className={`md:w-auto md:px-8 py-3 md:py-3.5 ${
                      isSubscribing
                        ? "bg-[#F3831C]/70"
                        : "bg-[#F3831C] hover:bg-[#F3831C]/90"
                    } text-white font-semibold rounded-xl transition-all disabled:cursor-not-allowed whitespace-nowrap shadow-md hover:shadow-lg`}
                  >
                    {isSubscribing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Subscribing...
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>

                {subscriptionStatus && (
                  <div
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
                      subscriptionStatus.includes("Success")
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    } text-sm font-medium transition-all`}
                  >
                    {subscriptionStatus.includes("Success") ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                    {subscriptionStatus}
                  </div>
                )}
              </form>
            </div>

            {/* Share Buttons Section */}
            <div className="bg-white rounded-2xl border border-[#0F3652]/10 p-6 shadow-sm">
              <ShareButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
