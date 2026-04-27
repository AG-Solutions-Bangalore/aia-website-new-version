import React, { useState } from "react";

const CourseCurriculum = ({
  title,
  curriculumData,
  description,
  eligibilityContent,
}) => {
  const [activeTab, setActiveTab] = useState(curriculumData?.[0]?.id || null);

  const activeContent = curriculumData.find((item) => item.id === activeTab);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="bg-[#0F3652] text-white text-center py-3 px-4 rounded-lg">
          <h1 className="text-lg sm:text-xl font-bold">{title}</h1>
        </div>
      </div>
      {description && (
        <div
          className="text-[#0F3652] leading-relaxed mx-6 md:mx-20 mb-8 text-justify"
          dangerouslySetInnerHTML={{
            __html: description.replace(/\n/g, "<br />"),
          }}
        />
      )}

      {eligibilityContent && (
        <div
          className="text-[#0F3652] leading-relaxed mx-6 md:mx-20 mb-8 text-justify"
          dangerouslySetInnerHTML={{ __html: eligibilityContent }}
        />
      )}
      <div className="max-w-5xl mx-auto">
        <div className="md:hidden space-y-4">
          {curriculumData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-br-3xl rounded-tl-3xl shadow-lg shadow-black/20 border border-[#F3831C]/20"
            >
              <button
                onClick={() =>
                  setActiveTab(activeTab === item.id ? null : item.id)
                }
                className="w-full text-left p-4 flex items-center justify-between text-sm"
              >
                <span className="font-semibold text-[#0F3652]">
                  {item.title}
                </span>
              </button>

              {activeTab === item.id && (
                <div className="px-4 pb-4">
                  {item.content.map((text, index) =>
                    text
                      .split(/\n+/)
                      .filter(Boolean)
                      .map((paragraph, pIndex) => (
                        <div
                          key={`${index}-${pIndex}`}
                          className="text-[#0F3652] text-sm leading-relaxed mb-2 text-justify"
                          dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                      ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex flex-row justify-center gap-4 items-stretch">
          <div className="w-[30%] space-y-2">
            {curriculumData.map((item) => (
              <button
                key={item.id}
                onMouseEnter={() => setActiveTab(item.id)}
                className={`w-full text-left  p-6 shadow-lg shadow-black/20 rounded-br-3xl rounded-tl-3xl transition-all duration-200 cursor-pointer border ${
                  activeTab === item.id
                    ? "bg-[#F3831C] text-white"
                    : "bg-white text-[#0F3652] border-gray-200 hover:bg-[#0F3652]/5"
                }`}
              >
                <span className="font-medium text-md">{item.title}</span>
              </button>
            ))}
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="w-[70%]">
            <div className="bg-white rounded-br-3xl rounded-tl-3xl p-4 shadow-lg shadow-black/20 border border-[#F3831C]/20 h-full text-justify">
              {activeContent?.content?.length ? (
                activeContent.content.map((text, index) =>
                  text
                    .split(/\n+/)
                    .filter(Boolean)
                    .map((paragraph, pIndex) => (
                      <div
                        key={`${index}-${pIndex}`}
                        className="text-[#0F3652] leading-relaxed mb-2"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))
                )
              ) : (
                <p className="text-[#0F3652]/60 text-sm text-center py-8">
                  Hover over a module to view content
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCurriculum;
