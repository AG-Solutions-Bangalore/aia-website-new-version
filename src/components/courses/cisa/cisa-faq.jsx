import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/api/base-url";
import FaqSection from "@/components/common/faq-section";

const CisaFaq = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["aia-faq-cisa"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getFAQbySlug/CISA`);
      return res.data;
    },
    retry: 1,
  });

  const apiFaqItems =
    data?.data?.map((item, index) => ({
      id: `item-${index + 1}`,
      question: item.faq_que,
      answer: item.faq_ans,
      heading: item.faq_heading,
      sort: item.faq_sort,
    })) || [];

  const faqItems = apiFaqItems;
  const faqHeading = data?.data?.[0]?.faq_heading || "CISA Certification FAQs";



  if (isLoading || isError || faqItems.length === 0) return null;

  return <FaqSection title={faqHeading} faqs={faqItems} />;
};

export default CisaFaq;
