import { BASE_URL } from "@/api/base-url";
import OptimizedImage from "@/components/common/optmized-image";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Star } from "lucide-react";
import * as React from "react";

function formatBlogDate(dateString) {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AiaTimesBlogSection() {
  const carouselRef = React.useRef(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["aia-times-front-blogs"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getFrontBlogs`);
      return res.data;
    },
  });

  const blogs = data?.data || [];
  const blogImageBaseUrl =
    data?.image_url?.find((item) => item.image_for === "Blog")?.image_url || "";
  const noImageUrl =
    data?.image_url?.find((item) => item.image_for === "No Image")?.image_url ||
    "/no-image.svg";

  const openBlog = (slug) => {
    if (!slug) return;
    window.open(`/blogs/${slug}/`, "_blank");
  };

  return (
    <section className="bg-[#0F3652] py-5 md:py-6">
      <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-center">
          <div className="flex h-full flex-col justify-center text-center text-white lg:text-left">
            <h2 className="text-2xl font-extrabold leading-tight md:text-[26px]">
              Expert articles, exam tips, and real-world insights for CFE, CIA,
              and CAMS aspirants.
            </h2>
            <Button
              className="mt-6 min-h-10 w-full rounded-xl bg-[#F3831C] px-5 text-sm font-bold text-white hover:bg-[#de7414]"
              onClick={() => window.open("/blogs/", "_blank")}
              type="button"
            >
              Read All Blogs
            </Button>
          </div>

          <div className="min-w-0">
            <div
              ref={carouselRef}
              className="overflow-x-auto pb-1 [scrollbar-color:#F3831C_#efe3d6] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#F3831C] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#efe3d6]"
            >
              <div className="flex w-max min-w-full gap-4 py-1">
                {isLoading
                  ? [1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="h-[300px] w-60 shrink-0 animate-pulse rounded-lg bg-white/80"
                      />
                    ))
                  : null}

                {!isLoading && (isError || blogs.length === 0) ? (
                  <div className="flex min-h-64 w-full items-center justify-center rounded-md bg-white/10 p-8 text-center text-white">
                    No blogs available at the moment. Please try again later.
                  </div>
                ) : null}

                {!isLoading && !isError
                  ? blogs.slice(0, 4).map((blog) => {
                      const imageUrl = blog.blog_images
                        ? `${blogImageBaseUrl}${blog.blog_images}`
                        : noImageUrl;

                      return (
                        <article
                          key={blog.id}
                          className="w-60 shrink-0 overflow-hidden rounded-lg border border-[#F3831C]/20 bg-white shadow-sm"
                        >
                          <div className="relative h-32 bg-slate-100">
                            <OptimizedImage
                              src={imageUrl}
                              alt={blog.blog_images_alt || blog.blog_heading}
                              className="h-full w-full object-cover"
                              onError={(event) => {
                                event.currentTarget.src = noImageUrl;
                              }}
                            />
                            <div className="absolute bottom-2 right-2 rounded-md bg-[#F3831C] px-2 py-1 text-xs font-bold text-white">
                              {blog.blog_course}
                            </div>
                          </div>

                          <div className="flex min-h-[175px] flex-col p-4">
                            <h3 className="line-clamp-2 text-base font-extrabold leading-snug text-[#0F3652]">
                              {blog.blog_heading}
                            </h3>
                            <p className="mt-2 line-clamp-2 text-sm font-medium leading-5 text-[#0F3652]">
                              {blog.blog_short_description}
                            </p>

                            <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                              <div>
                                <p className="text-xs font-medium text-[#0F3652]">
                                  Published on
                                </p>
                                <p className="text-sm font-extrabold text-[#0F3652]">
                                  {formatBlogDate(blog.blog_created)}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 rounded-full bg-[#F3831C]/10 px-2 py-1 text-xs font-bold text-[#F3831C]">
                                <Star className="h-3 w-3" />
                                {blog.blog_course}
                              </div>
                            </div>

                            <Button
                              className="mt-3 min-h-9 w-full rounded-md bg-[#F3831C] text-xs font-bold text-white hover:bg-[#de7414]"
                              onClick={() => openBlog(blog.blog_slug)}
                              type="button"
                            >
                              Read More
                            </Button>
                          </div>
                        </article>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
