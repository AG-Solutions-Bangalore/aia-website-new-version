import { useMemo, useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const FaqSection = ({ faqs = [] }) => {
  if (!faqs.length) return null;

  const { groupedFaqs, headings } = useMemo(() => {
    const grouped = {};
    let currentHeading = "";

    const sortedFaqs = [...faqs].sort((a, b) =>
      String(a?.sort ?? "").localeCompare(String(b?.sort ?? "")),
    );
    sortedFaqs.forEach((faq) => {
      if (faq.heading && faq.heading.trim() !== "") {
        currentHeading = faq.heading;
      }

      if (!grouped[currentHeading]) {
        grouped[currentHeading] = [];
      }

      grouped[currentHeading].push(faq);
    });

    const visibleHeadings = Object.keys(grouped).filter((h) => h !== "");

    return {
      groupedFaqs: grouped,
      headings: visibleHeadings,
    };
  }, [faqs]);

  const defaultHeading = headings[0] || "";
  const [activeHeading, setActiveHeading] = useState(defaultHeading);
  const [hoveredHeading, setHoveredHeading] = useState(null);

  const displayHeading = hoveredHeading || activeHeading || "";

  const faqList = groupedFaqs[displayHeading] || groupedFaqs[""] || [];

  return (
    <section className="my-18">
      <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <div className="md:hidden">
              <SectionHeading
                title="FAQ's"
                align="center"
                description="Quick answers to know more about AIA programs, learning format, certification support and exam preparation."
              />
            </div>
            <div className="hidden md:block">
              <SectionHeading
                title="FAQ's"
                description="Quick answers to know more about AIA programs, learning format, certification support and exam preparation."
              />
            </div>
            {headings.length > 0 && (
              <div className="mt-8 space-y-4">
                {headings.map((heading) => (
                  <div
                    key={heading}
                    onMouseEnter={() => setHoveredHeading(heading)}
                    onMouseLeave={() => setHoveredHeading(null)}
                    onClick={() => setActiveHeading(heading)}
                  >
                    <h3
                      className={`text-md font-medium cursor-pointer transition-all duration-200 ${
                        activeHeading === heading
                          ? "text-[#F3831C] border-l-4 border-[#F3831C] pl-4"
                          : hoveredHeading === heading
                            ? "text-[#F3831C] border-l-4 border-[#F3831C]/50 pl-4"
                            : "text-[#0F3652] hover:text-[#F3831C] pl-5"
                      }`}
                    >
                      {heading}
                    </h3>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-3">
            {displayHeading && (
              <h3 className="text-[#0F3652] text-2xl font-semibold mb-6">
                {displayHeading}
              </h3>
            )}

            <Accordion type="single" collapsible>
              {faqList.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-[#F3831C]/20"
                >
                  <AccordionTrigger className="cursor-pointer text-[#0F3652] font-medium hover:no-underline hover:text-[#F3831C] text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[#0F3652] text-base whitespace-pre-line">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
