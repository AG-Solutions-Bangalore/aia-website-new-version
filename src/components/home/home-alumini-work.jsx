import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/api/base-url";
import CompanyMarquee from "../common/company-marquee";

const HomeAlumniWork = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["aia-alumni"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getAlumni`);
      return res.data;
    },
  });

  if (isLoading || isError) return null;

  const alumniList = data?.data || [];

  const companyImageBaseUrl =
    data?.image_url?.find((img) => img.image_for === "Student Company")
      ?.image_url || "";

  const companies = alumniList.map((item) => ({
    src: `${companyImageBaseUrl}${item.student_company_image}`,
    alt: item.student_company_image_alt || item.student_company_name,
  }));

  return <CompanyMarquee companies={companies} />;
};

export default HomeAlumniWork;
