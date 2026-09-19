import { BASE_URL } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const getModuleOrder = (name) => {
  const match = String(name || "").match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
};

const getDefaultModule = (course) =>
  course === "CFE" ? "Module 1" : "Section 1";

// API text contains embedded newlines mid-sentence — collapse them so each
// question/answer renders as one clean continuous paragraph.
const cleanText = (value) => String(value || "").replace(/\s+/g, " ").trim();

const FreeResourceDistractor = ({ course, heading, subHeading }) => {
  const {
    data: distractorData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`distractors-${course}`],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/api/getDistractorsByCourse/${course}`
      );
      return response.data;
    },
    retry: 3,
  });

  const grouped = useMemo(() => {
    const rows = distractorData?.data || [];
    const map = {};
    rows.forEach((row) => {
      const mod = row.web_distractors_module?.trim() || "Module 1";
      if (!map[mod]) map[mod] = [];
      map[mod].push(row);
    });
    Object.keys(map).forEach((mod) => {
      map[mod].sort(
        (a, b) =>
          (a.web_distractors_sort ?? a.id) - (b.web_distractors_sort ?? b.id)
      );
    });
    return map;
  }, [distractorData]);

  const moduleNames = useMemo(
    () => Object.keys(grouped).sort((a, b) => getModuleOrder(a) - getModuleOrder(b)),
    [grouped]
  );

  const [activeModule, setActiveModule] = useState(() =>
    getDefaultModule(course)
  );

  // First section always open by default.
  // Once API data arrives, keep user's selection if valid,
  // otherwise fall back to the first section.
  useEffect(() => {
    if (moduleNames.length > 0 && !moduleNames.includes(activeModule)) {
      setActiveModule(moduleNames[0]);
    }
  }, [moduleNames, activeModule]);

  // Reset to first section if course prop changes
  useEffect(() => {
    setActiveModule(getDefaultModule(course));
  }, [course]);

  const renderHeader = () => (
    <div className="text-center max-w-4xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-[#0F3652]">
        {heading}
      </h2>
      <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
        {subHeading}
      </p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full bg-white border-t border-[#0F3652]/15 py-12 px-4 sm:px-6 lg:px-8">
        {renderHeader()}
        <div className="flex justify-center items-center h-40">
          <div className="text-[#0F3652]">Loading distractors...</div>
        </div>
      </div>
    );
  }

  if (isError || moduleNames.length === 0) {
    return (
      <div className="w-full bg-white border-t border-[#0F3652]/15 py-12 px-4 sm:px-6 lg:px-8">
        {renderHeader()}
        <div className="flex justify-center items-center h-40">
          <div className="text-red-500">Failed to load distractors</div>
        </div>
      </div>
    );
  }

  const activeItems =
    grouped[activeModule] || grouped[moduleNames[0]] || [];
  const effectiveActive = grouped[activeModule]
    ? activeModule
    : moduleNames[0];

  return (
    <div className="w-full bg-white border-t border-[#0F3652]/15 py-12 px-4 sm:px-6 lg:px-8">
      {renderHeader()}

      {/* Module / Section selector */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 mb-10 max-w-5xl mx-auto">
        {moduleNames.map((mod) => {
          const isOpen = mod === effectiveActive;
          return (
            <button
              key={mod}
              onClick={() => setActiveModule(mod)}
              aria-pressed={isOpen}
              className={`px-8 py-3 rounded-full text-base font-semibold cursor-pointer transition-all duration-300 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F3831C] focus-visible:ring-offset-2 ${
                isOpen
                  ? "bg-gradient-to-r from-[#F3831C] to-[#d96e00] text-white shadow-[0_8px_20px_rgba(243,131,28,0.4)] hover:shadow-[0_12px_28px_rgba(243,131,28,0.5)]"
                  : "bg-white text-[#0F3652] border-2 border-[#0F3652]/15 shadow-sm hover:border-[#F3831C] hover:text-[#F3831C] hover:shadow-[0_8px_20px_rgba(243,131,28,0.2)]"
              }`}
            >
              {mod}
            </button>
          );
        })}
      </div>

      {/* Distractor cards grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
        {activeItems.map((item, idx) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl border border-[#0F3652]/10 p-6 pt-5 w-full h-full flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(15,54,82,0.15)] hover:border-[#F3831C]/60"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-[#0F3652]/5 text-[#0F3652] text-sm font-bold flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#F3831C] group-hover:text-white">
                {idx + 1}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0F3652]/50 group-hover:text-[#F3831C] transition-colors duration-300">
                Common mistake
              </span>
            </div>
            <h3 className="text-[15px] font-bold text-[#F3831C] leading-snug mb-2 transition-colors duration-300 group-hover:text-[#d96e00]">
              {cleanText(item.web_distractors)}
            </h3>
            <span className="w-8 h-0.5 bg-[#F3831C]/25 rounded-full mb-3 group-hover:w-12 group-hover:bg-[#F3831C] transition-all duration-300" />
            <p className="text-[13px] text-[#0F3652]/80 leading-relaxed">
              {cleanText(item.web_distractors_explaination)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeResourceDistractor;
