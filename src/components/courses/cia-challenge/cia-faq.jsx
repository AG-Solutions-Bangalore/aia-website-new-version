import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/api/base-url";
import FaqSection from "@/components/common/faq-section";


const CiaFaq = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["aia-faq-ciac"],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/api/getFAQbySlug/CIA-Challenge-Curriculum`
      );
      return res.data;
    },
  });

  const faqHeading = data?.data?.[0]?.faq_heading || "FAQs";

  const faqItems =
    data?.data?.map((item, index) => ({
      id: `item-${index + 1}`,
      question: item.faq_que,
      answer: item.faq_ans,
        heading: item.faq_heading,
      sort: item.faq_sort,
    })) || [];




  if (isLoading || isError) return null;

  return (
    <FaqSection
     title={faqHeading}        
  faqs={faqItems} 
    />
  );
};

export default CiaFaq;
