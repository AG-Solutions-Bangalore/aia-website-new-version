import { BASE_URL, IMAGE_PATH } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
const useItemsPerLoad = () => {
  const getCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3; // lg: 3-col grid
    if (window.innerWidth >= 768) return 4; // md: 2-col grid (2+2)
    return 1; // sm: 1-col grid
  };

  const [itemsPerLoad, setItemsPerLoad] = useState(getCount);

  useEffect(() => {
    const handleResize = () => setItemsPerLoad(getCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return itemsPerLoad;
};
const PassoutSuccess = () => {
  const ITEMS_PER_LOAD = useItemsPerLoad();
  const courseColors = {
    CFE: "#93c0e2",
    CIA: "#f2a966",
    CAMS: "#25777a",
  };
  const [visibleCountByCourse, setVisibleCountByCourse] = useState({});
  const {
    data: studentStoriesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["student-stories"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getStudentsStory`);
      return res.data;
    },
  });

  const getImageUrl = (type) => {
    if (!studentStoriesData?.image_url) return "";
    const imageConfig = studentStoriesData.image_url.find(
      (item) => item.image_for === type
    );
    return imageConfig ? imageConfig.image_url : "";
  };

  const transformStories = () => {
    if (!studentStoriesData?.data) return [];
    const studentImageUrl = getImageUrl("Student");
    const companyImageUrl = getImageUrl("Student Company");

    return studentStoriesData.data.map((story) => ({
      id: story.id,
      name: story.student_name,
      designation: story.student_course,
      role: story.student_designation,
      date: story.student_story_date,
      slug: story.student_slug,
      image: story.student_story_banner_image
        ? `${studentImageUrl}${story.student_story_banner_image}`
        : `${IMAGE_PATH}/no_image.jpg`,
      companyImage: story.company?.student_company_image
        ? `${companyImageUrl}${story.company.student_company_image}`
        : null,
      companyName: story.company?.student_company_name || "",
      fullStory: story.student_story_details,
      linkedIn: story.student_linkedin_link,
      imageAlt: story.student_story_banner_image_alt,
      course: story.student_course || "Other",
    }));
  };
  const normalizeCourseName = (course = "") => {
    const normalized = course.trim().toUpperCase();

    if (
      normalized === "CIA" ||
      normalized === "CIAC" ||
      normalized.startsWith("CIA PART")
    ) {
      return "CIA";
    }

    return course || "Other";
  };
  const courseFullForms = {
    CAMS: "Certified Anti-Money Laundering Specialist",
    CFE: "Certified Fraud Examiner",
    CIA: "Certified Internal Auditor",
    CIAC: "Certified Internal Audit Challenge",
  };

  const groupStoriesByCourse = () => {
    const stories = transformStories();

    return stories.reduce((acc, story) => {
      const course = normalizeCourseName(story.course);

      if (!acc[course]) {
        acc[course] = [];
      }

      acc[course].push(story);
      return acc;
    }, {});
  };

  const getVisibleCount = (course, total) => {
    return visibleCountByCourse[course] || Math.min(ITEMS_PER_LOAD, total);
  };

  const handleViewMore = (course, total) => {
    setVisibleCountByCourse((prev) => ({
      ...prev,
      [course]: Math.min(
        (prev[course] || ITEMS_PER_LOAD) + ITEMS_PER_LOAD,
        total
      ),
    }));
  };

  const handleShowLess = (course) => {
    setVisibleCountByCourse((prev) => ({
      ...prev,
      [course]: ITEMS_PER_LOAD,
    }));
  };

  const groupedStories = groupStoriesByCourse();

  if (isLoading) {
    return (
      <section className="bg-white py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-[#0F3652]/10 rounded w-3/4 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#0F3652]/10 rounded-2xl h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-white py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#F3831C]">
            Failed to load student stories. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pt-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Know How Our Learners Turned Certification into Career Progress"
          description="Discover real career journeys of professionals who used global certifications to unlock role transitions, professional growth, and long-term career advancement."
          align="center"
        />
        {Object.entries(groupedStories).map(([course, stories]) => {
          const courseColor = courseColors[course] || "#F3831C";

          return (
            <div key={course} className="mb-12 p-4 border-2 rounded-lg mt-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 text-[#F3831C]">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <h2 className="text-xl  md:text-3xl font-medium text-[#0F3652]">
                    {courseFullForms[course]
                      ? `${courseFullForms[course]}`
                      : course}{" "}
                  </h2>
                </div>
                <span className="text-sm text-[#0F3652]">
                  {stories.length} {stories.length === 1 ? "story" : "stories"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stories
                  .slice(0, getVisibleCount(course, stories.length))
                  .map((story) => (
                    <article
                      key={story.id}
                      className="bg-white rounded-md overflow-hidden shadow-lg transition-shadow duration-300 flex flex-col"
                    >
                      <div className="relative md:h-54">
                        <img
                          src={story.image}
                          alt={story.imageAlt}
                          className="w-full h-auto object-contain rounded-md border-2"
                          style={{ borderColor: courseColor }}
                        />
                      </div>

                      <div className="p-2 flex-1 flex flex-col">
                        <h5 className="font-bold text-gray-900 text-sm">
                          {story.name}, {story.designation}
                        </h5>

                        <div className="flex flex-row items-center justify-between">
                          <p className="text-xs text-gray-600 mt-1">
                            {story.role} Works at {story.companyName}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(story.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center">
                            {story.companyImage && (
                              <div className="flex items-center gap-2">
                                <img
                                  src={story.companyImage}
                                  alt={story.companyName}
                                  className="w-8 h-8 object-contain"
                                />
                              </div>
                            )}
                          </div>

                          <a
                            href={`/passout-stories/${story.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" text-white ]/90  font-semibold py-2 px-4 rounded-full inline-flex items-center gap-2 transition-colors text-sm ml-auto"
                            style={{ backgroundColor: courseColor }}
                          >
                            Read More
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M6 12L10 8L6 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>

              <div className="flex justify-center gap-3">
                {getVisibleCount(course, stories.length) < stories.length && (
                  <div className="text-center">
                    <button
                      onClick={() => handleViewMore(course, stories.length)}
                      className="relative overflow-hidden cursor-pointer flex items-center justify-center px-4 py-2 border border-[#0F3652] mx-auto gap-2 rounded-md font-medium text-sm text-[#0F3652] group"
                    >
                      <span className="absolute inset-0 bg-[#0F3652] scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></span>
                      <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
                        View More
                        <ArrowDown className="w-4 h-4" />
                      </span>
                    </button>
                  </div>
                )}

                {getVisibleCount(course, stories.length) > ITEMS_PER_LOAD && (
                  <div className="text-center">
                    <button
                      onClick={() => handleShowLess(course)}
                      className="relative overflow-hidden cursor-pointer flex items-center justify-center px-4 py-2 border border-[#0F3652] mx-auto gap-2 rounded-md font-medium text-sm text-[#0F3652] group"
                    >
                      <span className="absolute inset-0 bg-[#0F3652] scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></span>
                      <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
                        View Less
                        <ArrowUp className="w-4 h-4" />
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PassoutSuccess;
