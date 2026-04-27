import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../api/base-url";
import { TestimonialSlider } from "../ui/testimonial-slider-1";
import SectionHeading from "../SectionHeading/SectionHeading";

const AboutTestimonial = () => {
  const {
    data: apiData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["team-data"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getTeam`);
      return res.data;
    },
  });

  const transformApiData = () => {
    if (!apiData?.data) return [];

    const teamImageBaseUrl = apiData.image_url?.find(
      (item) => item.image_for === "Team",
    )?.image_url;

    const noImageUrl = apiData.image_url?.find(
      (item) => item.image_for === "No Image",
    )?.image_url;

    return apiData.data.map((member, index) => {
      const fullImageSrc = member.team_image
        ? `${teamImageBaseUrl}${member.team_image}`
        : noImageUrl;

      const thumbnailSrc = member.team_image
        ? `${teamImageBaseUrl}${member.team_image}?w=100&h=120&fit=crop&q=80`
        : `${noImageUrl}?w=100&h=120&fit=crop&q=80`;

      return {
        id: member.id || index + 1,
        name: member.team_name || "Anonymous",
        affiliation: member.team_designation
          ? `${member.team_designation}${member.team_type ? ` - ${member.team_type}` : ""}`
          : "Team Member",
        quote: member.team_description || "No description available.",
        imageSrc: fullImageSrc,
        thumbnailSrc: thumbnailSrc,
      };
    });
  };

  const reviews = transformApiData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-red-600">
          <p>Failed to load testimonials. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-gray-600">
          <p>No testimonials available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-12">
        <SectionHeading title="Our Strength" align="center" />
        <TestimonialSlider reviews={reviews} />
      </div>
    </>
  );
};

export default AboutTestimonial;
