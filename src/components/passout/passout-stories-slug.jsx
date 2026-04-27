import { BASE_URL } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button } from "../ui/button";

const PassoutStoriesSlug = () => {
  const { slug } = useParams();

  const {
    data: storyData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["passout-stories-slug", slug],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/api/getStudentsStorybySlug/${slug}`,
      );
      return res.data;
    },
    enabled: !!slug,
  });

  const formatLinkedInUrl = (url) => {
    if (!url) return "#";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#0F3652] text-sm sm:text-base">Loading...</div>
      </div>
    );
  }

  if (isError || !storyData?.data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#F3831C] text-sm sm:text-base">
          Error loading story
        </div>
      </div>
    );
  }

  const courseRoutes = {
    CAMS: "/cams",
    CFE: "/cfe-curriculum",
    CIA: "/cia-curriculum",
    "CIA Part 1": "/cia-curriculum",
    "CIA Part 2": "/cia-curriculum",
    "CIA Part 3": "/cia-curriculum",
    CIAC: "/cia-challenge-curriculum",
  };

  const {
    student_story_banner_image,
    student_story_banner_image_alt,
    student_name,
    student_course,
    student_designation,
    student_linkedin_link,
    student_story_details,
    student_story_short_description,
    company,
    country,
    student_story_box_title1,
    student_story_box_title2,
    student_story_box_title3,
    student_story_box_title4,
    student_story_box_details1,
    student_story_box_details2,
    student_story_box_details3,
    student_story_box_details4,
  } = storyData.data;

  const companyImageUrl =
    storyData.image_url.find((img) => img.image_for === "Student Company")
      ?.image_url + company?.student_company_image;
  const BannerImageUrl = storyData.image_url.find(
    (img) => img.image_for === "Student",
  )?.image_url;

  const linkedinUrl = formatLinkedInUrl(student_linkedin_link);

  return (
    <div className="min-h-screen bg-white">
      <header className="relative overflow-visible">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative">
            <div className="pt-4 sm:pt-6 lg:pt-8">
              <div className="flex items-start">
                <a
                  href="/our-passouts"
                  className="inline-flex items-center gap-2 group transition-colors text-[#0F3652] hover:text-[#0F3652]"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-0.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 13L6 8L11 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">
                    All stories
                  </span>
                </a>
              </div>

              <div className="flex justify-center">
                <div className="mt-2 relative overflow-hidden max-w-5xl rounded-xl sm:rounded-2xl lg:rounded-3xl">
                  <img
                    src={`${BannerImageUrl}/${student_story_banner_image}`}
                    alt={student_story_banner_image_alt}
                    className="w-full h-auto max-h-[250px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[500px] object-contain mt-2 sm:mt-3 lg:mt-4"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="pb-12 sm:pb-16 lg:pb-24">
            {/* Mobile/Tablet: Stacked, Desktop: Side by side */}
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
              {/* Left Sidebar - Sticky on desktop only */}
              <div className="lg:w-1/4">
                <div className="rounded-xl sm:rounded-2xl bg-[#0F3652]/5 p-3 sm:p-4 lg:sticky lg:top-24">
                  <div>
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-[#0F3652]">
                        About the Professional
                      </h3>
                      <div className="mt-2"></div>
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        {companyImageUrl && (
                          <img
                            src={companyImageUrl}
                            alt={
                              company?.student_company_image_alt ||
                              company?.student_company_name
                            }
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-[#0F3652]">
                            {student_name}
                          </p>
                          <p className="text-xs text-[#0F3652] break-words">
                            {student_designation}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-[#0F3652] break-words">
                        {student_story_short_description}
                      </p>
                    </div>

                    <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4">
                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-[#0F3652]">
                          Company
                        </h3>
                        <div className="mt-1 sm:mt-2"></div>
                        <p className="text-xs sm:text-sm text-[#0F3652] break-words">
                          {company?.student_company_name || "Not specified"}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-[#0F3652]">
                          Course
                        </h3>
                        <div className="mt-1 sm:mt-2"></div>
                        <p className="text-xs sm:text-sm text-[#0F3652] break-words">
                          {student_course || "Not specified"}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-[#0F3652]">
                          Designation
                        </h3>
                        <div className="mt-1 sm:mt-2"></div>
                        <p className="text-xs sm:text-sm text-[#0F3652] break-words">
                          {student_designation || "Not specified"}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-[#0F3652]">
                          Location
                        </h3>
                        <div className="mt-1 sm:mt-2"></div>
                        <p className="text-xs sm:text-sm text-[#0F3652] break-words">
                          {country?.country_name || "Not specified"}
                          {country?.country_city &&
                          country.country_city !== country.country_name
                            ? `, ${country.country_city}`
                            : ""}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-[#0F3652]">
                          LinkedIn
                        </h3>
                        <div className="mt-1 sm:mt-2"></div>
                        <a
                          href={linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <p className="text-xs sm:text-sm text-[#0F3652] underline break-words">
                            View Profile
                          </p>
                        </a>
                      </div>

                      <div className="flex mt-3 sm:mt-4">
                        <Button
                          className="relative cursor-pointer overflow-hidden group px-3 sm:px-4 py-1.5 sm:py-2 text-xs bg-[#F3831C] text-white rounded-none hover:bg-[#0F3652] transition-colors duration-300 w-full sm:w-auto"
                          variant="ghost"
                          aria-label="View All Success Stories"
                        >
                          <Link
                            to={courseRoutes[student_course] || "/courses"}
                            className="block w-full"
                          >
                            <span className="relative z-10 text-white text-xs sm:text-sm">
                              <span>Explore {student_course}</span>
                            </span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:w-3/4">
                <div className="mb-8 sm:mb-10 lg:mb-12">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0F3652] mb-4 sm:mb-5 lg:mb-6">
                    Our Impact
                  </h3>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {[
                      {
                        title: student_story_box_title1,
                        details: student_story_box_details1,
                      },
                      {
                        title: student_story_box_title2,
                        details: student_story_box_details2,
                      },
                      {
                        title: student_story_box_title3,
                        details: student_story_box_details3,
                      },
                      {
                        title: student_story_box_title4,
                        details: student_story_box_details4,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="relative bg-[#ededed] p-3 sm:p-4 rounded-xl sm:rounded-2xl 
                 shadow-[6px_6px_0px_#113653]"
                      >
                        <div
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                      font-bold text-[#113653] text-left break-words"
                        >
                          {item.title}
                        </div>

                        <div
                          className="text-sm sm:text-base lg:text-lg 
                      font-medium text-black text-left break-words"
                        >
                          {item.details}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Story Content */}
                <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                  <div
                    className="ck-content text-sm sm:text-base text-[#0F3652] break-words"
                    dangerouslySetInnerHTML={{ __html: student_story_details }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PassoutStoriesSlug;
