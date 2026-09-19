import { BASE_URL } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  MessagesSquare,
  BadgeCheck,
  Lightbulb,
} from "lucide-react";

const CARD_ICONS = [
  Award,
  MessagesSquare,
  BadgeCheck,
  Award,
  BookOpen,
  BookOpen,
  Award,
  MessagesSquare,
  BadgeCheck,
  MessagesSquare,
];

const getModuleOrder = (name) => {
  const match = String(name || "").match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
};

const getDefaultModule = (course) =>
  course === "CFE" ? "Module 1" : "Section 1";

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
      <h2 className="text-3xl md:text-4xl font-medium text-black">{heading}</h2>
      <p className="mt-4 text-base md:text-lg text-gray-800 leading-relaxed">
        {subHeading}
      </p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
        {renderHeader()}
        <div className="flex justify-center items-center h-40">
          <div className="text-gray-800">Loading distractors...</div>
        </div>
      </div>
    );
  }

  if (isError || moduleNames.length === 0) {
    return (
      <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
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
    <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      {renderHeader()}

      {/* Module / Section selector — exact image design */}
      <div
        className={`grid gap-6 mt-8 mb-10 grid-cols-1 sm:grid-cols-2 max-w-6xl mx-auto ${
          moduleNames.length > 3 ? "md:grid-cols-5" : "md:grid-cols-3"
        }`}
      >
        {moduleNames.map((mod) => {
          const isOpen = mod === effectiveActive;
          return (
          <div key={mod} className="flex flex-col items-center text-center">
            <button
              onClick={() => setActiveModule(mod)}
              aria-pressed={isOpen}
              data-open={isOpen ? "true" : "false"}
              className={`w-full max-w-[220px] px-6 py-3 text-white text-base font-normal rounded-2xl transition-colors duration-200 cursor-pointer ${
                isOpen
                  ? "bg-[#EF6C00] ring-2 ring-black/10"
                  : "bg-[#EF6C00] hover:bg-[#e06500]"
              }`}
            >
              {mod}
            </button>
            <button
              onClick={() => setActiveModule(mod)}
              className="mt-2 text-[15px] text-black hover:text-[#EF6C00] transition-colors cursor-pointer"
              aria-label={`Open ${mod} distractors`}
            >
              Click Here
            </button>
          </div>
          );
        })}
      </div>

      {/* Distractor cards grid — exact image design: 5 per row */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {activeItems.map((item, idx) => {
          const Icon = CARD_ICONS[idx % CARD_ICONS.length] || Lightbulb;
          return (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex flex-col"
            >
              <div className="w-10 h-10 rounded-lg bg-[#FAF1F1] flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#8B1E2F]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-bold text-[#8B1E2F] leading-snug mb-2">
                {item.web_distractors}
              </h3>
              <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-line">
                {item.web_distractors_explaination}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FreeResourceDistractor;
