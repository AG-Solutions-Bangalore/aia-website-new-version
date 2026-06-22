import { BASE_URL } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Briefcase,
  Building2,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  GraduationCap,
  Grid,
  List,
  MapPin,
  RefreshCw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// High-quality SVG logos for Big 4 + HSBC + Mapped Companies
const LOGOS = {
  PwC: "https://upload.wikimedia.org/wikipedia/commons/0/05/PricewaterhouseCoopers_Logo.svg",
  Deloitte: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Deloitte.svg",
  EY: "https://upload.wikimedia.org/wikipedia/commons/3/34/EY_logo_2015.svg",
  KPMG: "https://upload.wikimedia.org/wikipedia/commons/9/9d/KPMG_logo.svg",
  HSBC: "https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg",
  "Deutsche Bank":
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Deutsche_Bank_logo.svg",
  UBS: "https://upload.wikimedia.org/wikipedia/commons/b/b3/UBS_Logo.svg",
  "Induslnd bank":
    "https://upload.wikimedia.org/wikipedia/commons/7/74/IndusInd_Bank_Logo.svg",
  BDO: "https://upload.wikimedia.org/wikipedia/commons/a/a8/BDO_Logo.svg",
};

const REGION_GROUPS = [
  {
    value: "india",
    label: "India",
    searchPlaceholder: "Search Indian states...",
    emptyText: "No Indian states found",
  },
  {
    value: "global",
    label: "Global",
    searchPlaceholder: "Search countries...",
    emptyText: "No global locations found",
  },
];

const normalizeString = (value) => String(value ?? "").trim();

const normalizeCountryName = (countryName) => {
  const country = normalizeString(countryName);
  const lowerCountry = country.toLowerCase();

  if (!country || lowerCountry.startsWith("india")) return "India";
  if (lowerCountry === "uae" || lowerCountry === "united arab emirates") {
    return "UAE";
  }

  return country;
};

const getRegionKey = (group, name) =>
  `${group}:${normalizeString(name).toLowerCase()}`;

const AlumniDirectory = () => {
  // --- State for Filters ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedCountryReasons, setSelectedCountryReasons] = useState([]);
  const [selectedIndustryTypes, setSelectedIndustryTypes] = useState([]);
  const [industryTypeSearch, setIndustryTypeSearch] = useState("");
  const [countryReasonSearch, setCountryReasonSearch] = useState("");
  const [activeRegionGroup, setActiveRegionGroup] = useState("india");

  // --- State for UI Layout ---
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    course: true,
    year: true,
    countryReason: true,
    industryType: true,
  });

  const [showAllIndustryTypes, setShowAllIndustryTypes] = useState(false);

  const itemsPerPage = 12;

  // --- API Queries ---
  // 1. Fetch Year-based passout students
  const { data: yearData, isLoading: isLoadingYear } = useQuery({
    queryKey: ["passout-students-year"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getAllPassoutStudentsYear`);
      console.log("getAllPassoutStudentsYear API Response:", res.data);
      return res.data;
    },
  });

  // --- Image URL Resolution ---
  const studentImageBase = useMemo(() => {
    return (
      yearData?.image_url?.find((img) => img.image_for === "Student")
        ?.image_url ||
      "https://aia.in.net/webapi/public/assets/images/student_images/"
    );
  }, [yearData]);

  const companyImageBase = useMemo(() => {
    return (
      yearData?.image_url?.find((img) => img.image_for === "Student Company")
        ?.image_url ||
      "https://aia.in.net/webapi/public/assets/images/student_company_images/"
    );
  }, [yearData]);

  // --- Dynamic Year Options based on getAllPassoutStudentsYear API ---
  const yearOptions = useMemo(() => {
    if (!yearData?.data) return ["2025", "2024"]; // fallback
    const years = yearData.data
      .map((item) => item.student_passout_year)
      .filter(Boolean);
    const uniqueYears = [...new Set(years)].sort((a, b) => b - a);
    return uniqueYears.length > 0 ? uniqueYears : ["2025", "2024"];
  }, [yearData]);

  // --- Process and Enrich Alumni Data ---
  const alumniList = useMemo(() => {
    if (!yearData?.data) return [];

    return yearData.data.map((student) => {
      const year = student.student_passout_year || "2025";

      // Normalize course
      let course = student.student_course || "Other";
      const normalizedCourse = course.trim().toUpperCase();
      if (normalizedCourse === "CIAC" || normalizedCourse.startsWith("CIA")) {
        course = "CIA";
      } else {
        course = normalizedCourse;
      }

      // Normalize company name
      let companyName = student.student_company_name || "";
      if (companyName.toLowerCase().includes("deloitte")) {
        companyName = "Deloitte";
      } else if (companyName.toLowerCase().includes("pwc")) {
        companyName = "PwC";
      } else if (companyName.toLowerCase().includes("ey")) {
        companyName = "EY";
      } else if (companyName.toLowerCase().includes("kpmg")) {
        companyName = "KPMG";
      } else if (companyName.toLowerCase().includes("hsbc")) {
        companyName = "HSBC";
      } else if (
        companyName.toLowerCase().includes("indusind") ||
        companyName.toLowerCase().includes("induslnd")
      ) {
        companyName = "Induslnd bank";
      }

      // Map Industry
      let industry = "Others";
      const nameLower = companyName.toLowerCase();
      if (
        ["pwc", "ey", "deloitte", "kpmg"].some((c) => nameLower.includes(c))
      ) {
        industry = "Big 4";
      } else if (
        [
          "bank",
          "ubs",
          "coinbase",
          "tgb",
          "hsbc",
          "exchange",
          "induslnd",
          "indusind",
        ].some((c) => nameLower.includes(c))
      ) {
        industry = "Banking";
      } else if (
        ["rightsource", "wns", "tech"].some((c) => nameLower.includes(c))
      ) {
        industry = "IT / Tech";
      } else if (
        ["llp", "bdo", "surana", "baker", "mkps", "nissim"].some((c) =>
          nameLower.includes(c),
        )
      ) {
        industry = "Consulting";
      }

      // Region hierarchy mapping
      let country = normalizeCountryName(student.country_name || "India");
      let city = normalizeString(student.country_city);
      let state = "";

      if (country === "India") {
        country = "India";
        const cityLower = city.toLowerCase();
        if (cityLower.includes("hyderabad")) {
          state = "Telangana";
        } else if (cityLower.includes("mumbai") || cityLower.includes("pune")) {
          state = "Maharashtra";
        } else if (
          cityLower.includes("bangalore") ||
          cityLower.includes("banglore")
        ) {
          state = "Karnataka";
          city = "Bangalore";
        } else {
          state = "Punjab";
        }
      } else if (country === "UAE") {
        country = "UAE";
        state = "UAE";
      } else if (country.toLowerCase().trim() === "singapore") {
        country = "Singapore";
        state = "Singapore";
      } else {
        state = country;
      }

      // Resolve full URLs
      const studentImageUrl = student.student_image
        ? `${studentImageBase}${student.student_image}`
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200";

      const companyLogoUrl =
        (student.student_company_image
          ? `${companyImageBase}${student.student_company_image}`
          : "") ||
        LOGOS[companyName] ||
        "";
      const countryReason = normalizeString(student.country_reason);
      const regionGroup = country === "India" ? "india" : "global";
      const regionName =
        regionGroup === "india"
          ? countryReason && countryReason.toLowerCase() !== "global"
            ? countryReason
            : state || city || "India"
          : country;
      const regionKey = getRegionKey(regionGroup, regionName);

      return {
        ...student,
        name: student.student_name,
        designation: student.student_designation || "Certified Professional",
        course,
        year,
        companyName,
        companyLogoUrl,
        industry,
        industryType: student.student_company_industry_type || "",
        countryReason,
        country,
        state,
        city,
        regionGroup,
        regionName,
        regionKey,
        studentImageUrl,
      };
    });
  }, [yearData, studentImageBase, companyImageBase]);

  // --- Counts calculation ---
  const counts = useMemo(() => {
    const courseCounts = {};
    const yearCounts = {};
    const regionCounts = {};
    const regionGroupCounts = {};
    const industryTypeCounts = {};

    alumniList.forEach((item) => {
      if (item.course)
        courseCounts[item.course] = (courseCounts[item.course] || 0) + 1;
      if (item.year) yearCounts[item.year] = (yearCounts[item.year] || 0) + 1;
      if (item.regionKey)
        regionCounts[item.regionKey] = (regionCounts[item.regionKey] || 0) + 1;
      if (item.regionGroup)
        regionGroupCounts[item.regionGroup] =
          (regionGroupCounts[item.regionGroup] || 0) + 1;
      if (item.industryType)
        industryTypeCounts[item.industryType] =
          (industryTypeCounts[item.industryType] || 0) + 1;
    });

    return {
      courseCounts,
      yearCounts,
      regionCounts,
      regionGroupCounts,
      industryTypeCounts,
    };
  }, [alumniList]);

  // --- Dynamic Option lists for filters ---
  const courseOptions = useMemo(() => {
    const courses = alumniList.map((item) => item.course).filter(Boolean);
    return [...new Set(courses)].sort();
  }, [alumniList]);

  const regionOptions = useMemo(() => {
    const optionsByKey = new Map();

    alumniList.forEach((item) => {
      if (!item.regionKey || !item.regionName || !item.regionGroup) return;

      if (!optionsByKey.has(item.regionKey)) {
        optionsByKey.set(item.regionKey, {
          key: item.regionKey,
          label: item.regionName,
          group: item.regionGroup,
        });
      }
    });

    return [...optionsByKey.values()].sort((a, b) =>
      a.label.localeCompare(b.label),
    );
  }, [alumniList]);

  const selectedRegionLabels = useMemo(() => {
    const labelByKey = new Map(
      regionOptions.map((option) => [option.key, option.label]),
    );

    return selectedCountryReasons.map((key) => labelByKey.get(key) || key);
  }, [regionOptions, selectedCountryReasons]);

  const activeRegionConfig =
    REGION_GROUPS.find((group) => group.value === activeRegionGroup) ||
    REGION_GROUPS[0];

  const industryTypeOptions = useMemo(() => {
    const industryTypes = alumniList
      .map((item) => item.industryType)
      .filter(Boolean);
    return [...new Set(industryTypes)].sort();
  }, [alumniList]);

  // --- Search Filtering inside dynamic checkboxes ---
  const filteredCountryReasonOptions = useMemo(() => {
    const options = regionOptions.filter(
      (option) => option.group === activeRegionGroup,
    );

    if (countryReasonSearch.trim()) {
      return options.filter((option) =>
        option.label.toLowerCase().includes(countryReasonSearch.toLowerCase()),
      );
    }
    return options;
  }, [regionOptions, activeRegionGroup, countryReasonSearch]);

  const filteredIndustryTypeOptions = useMemo(() => {
    if (industryTypeSearch.trim()) {
      return industryTypeOptions.filter((type) =>
        type.toLowerCase().includes(industryTypeSearch.toLowerCase()),
      );
    }
    return industryTypeOptions;
  }, [industryTypeOptions, industryTypeSearch]);

  // --- Show More / Less Slicing ---
  const displayedIndustryTypes = useMemo(() => {
    return showAllIndustryTypes
      ? filteredIndustryTypeOptions
      : filteredIndustryTypeOptions.slice(0, 5);
  }, [filteredIndustryTypeOptions, showAllIndustryTypes]);

  // --- Dynamic Filtering Logic ---
  const filteredAlumni = useMemo(() => {
    return alumniList.filter((item) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = item.name?.toLowerCase().includes(query);
        const compMatch = item.companyName?.toLowerCase().includes(query);
        const courseMatch = item.course?.toLowerCase().includes(query);
        const cityMatch = item.city?.toLowerCase().includes(query);
        const desgMatch = item.designation?.toLowerCase().includes(query);
        if (
          !nameMatch &&
          !compMatch &&
          !courseMatch &&
          !cityMatch &&
          !desgMatch
        ) {
          return false;
        }
      }

      // 2. Course Filter
      if (selectedCourses.length > 0) {
        if (!selectedCourses.includes(item.course)) return false;
      }

      // 3. Year Filter
      if (selectedYears.length > 0) {
        if (!selectedYears.includes(item.year)) return false;
      }

      // 4. Region Filter
      if (selectedCountryReasons.length > 0) {
        if (!selectedCountryReasons.includes(item.regionKey)) return false;
      }

      // 5. Industry Type Filter
      if (selectedIndustryTypes.length > 0) {
        if (!selectedIndustryTypes.includes(item.industryType)) return false;
      }

      return true;
    });
  }, [
    alumniList,
    searchQuery,
    selectedCourses,
    selectedYears,
    selectedCountryReasons,
    selectedIndustryTypes,
  ]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage) || 1;
  const paginatedAlumni = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredAlumni.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredAlumni, currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCourses,
    selectedYears,
    selectedCountryReasons,
    selectedIndustryTypes,
  ]);

  // --- Toggle Handler Helpers ---
  const handleCourseToggle = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course],
    );
  };

  const handleYearToggle = (year) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    );
  };

  const handleCountryReasonToggle = (reason) => {
    setSelectedCountryReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((item) => item !== reason)
        : [...prev, reason],
    );
  };

  const handleIndustryTypeToggle = (industryType) => {
    setSelectedIndustryTypes((prev) =>
      prev.includes(industryType)
        ? prev.filter((item) => item !== industryType)
        : [...prev, industryType],
    );
  };

  const toggleSection = (sec) => {
    setExpandedSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCourses([]);
    setSelectedYears([]);
    setSelectedCountryReasons([]);
    setSelectedIndustryTypes([]);
    setIndustryTypeSearch("");
    setCountryReasonSearch("");
  };

  const renderRegionFilterContent = (idPrefix, isMobile = false) => (
    <div className={isMobile ? "space-y-3" : "space-y-3"}>
      <div className="grid grid-cols-2 gap-2">
        {REGION_GROUPS.map((group) => {
          const isActive = activeRegionGroup === group.value;

          return (
            <button
              key={group.value}
              type="button"
              onClick={() => {
                setActiveRegionGroup(group.value);
                setCountryReasonSearch("");
              }}
              aria-pressed={isActive}
              className={`rounded-md border px-2 py-2 text-xs font-bold transition-colors cursor-pointer ${
                isActive
                  ? "border-[#0F3652] bg-[#0F3652] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#0F3652]/40 hover:text-[#0F3652]"
              }`}
            >
              <span>{group.label}</span>
              <span
                className={`ml-1 font-semibold ${
                  isActive ? "text-white/80" : "text-gray-400"
                }`}
              >
                ({counts.regionGroupCounts[group.value] || 0})
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder={activeRegionConfig.searchPlaceholder}
          value={countryReasonSearch}
          onChange={(e) => setCountryReasonSearch(e.target.value)}
          className={`text-xs pr-8 h-8 rounded-md ${
            isMobile ? "" : "bg-gray-50/50"
          }`}
        />
        <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
      </div>

      <div
        className={`space-y-2.5 overflow-y-auto pr-1 ${
          isMobile ? "max-h-40" : "max-h-48"
        }`}
      >
        {filteredCountryReasonOptions.map((option) => {
          const inputId = `${idPrefix}-${option.key.replace(/[^a-z0-9]+/gi, "-")}`;

          return (
            <div key={option.key} className="flex items-center gap-3">
              <Checkbox
                id={inputId}
                checked={selectedCountryReasons.includes(option.key)}
                onCheckedChange={() => handleCountryReasonToggle(option.key)}
              />
              <label
                htmlFor={inputId}
                className={`text-sm font-medium text-gray-600 flex-1 flex justify-between select-none ${
                  isMobile ? "" : "hover:text-gray-900 cursor-pointer"
                }`}
              >
                <span>{option.label}</span>
                <span
                  className={`text-xs ${
                    isMobile
                      ? "text-gray-400"
                      : "text-gray-450 font-semibold"
                  }`}
                >
                  ({counts.regionCounts[option.key] || 0})
                </span>
              </label>
            </div>
          );
        })}
        {filteredCountryReasonOptions.length === 0 && (
          <p className="text-xs text-gray-400 italic">
            {activeRegionConfig.emptyText}
          </p>
        )}
      </div>
    </div>
  );

  const courseColors = {
    CFE: "text-blue-600 bg-blue-50 border-blue-200",
    CIA: "text-orange-600 bg-orange-50 border-orange-200",
    CAMS: "text-teal-600 bg-teal-50 border-teal-200",
    CIAC: "text-indigo-600 bg-indigo-50 border-indigo-200",
  };

  // Loader view (Pulse Skeleton UX)
  const isLoading = isLoadingYear;
  if (isLoading) {
    return (
      <section className="bg-slate-50/50 py-12 md:py-16">
        {/* Hero Banner Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b283d] via-[#0F3652] to-[#17486b] px-6 py-12 text-center shadow-xl md:px-12 md:py-16 h-[280px] sm:h-[320px] flex flex-col justify-between">
            <div className="space-y-4 animate-pulse">
              <Skeleton className="h-10 w-2/3 mx-auto bg-white/10" />
              <Skeleton className="h-4 w-1/2 mx-auto bg-white/10" />
              <Skeleton className="h-12 max-w-xl mx-auto rounded-xl bg-white/15 mt-6" />
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 sm:grid-cols-4 border-t border-white/10 pt-6 mt-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 justify-center sm:justify-start animate-pulse"
                >
                  <Skeleton className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
                  <div className="space-y-1.5 text-left">
                    <Skeleton className="h-4 w-12 bg-white/10" />
                    <Skeleton className="h-3 w-16 bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Nav Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex flex-wrap gap-2.5">
              {[...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-9 w-28 rounded-md bg-slate-100"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Directory Layout Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Skeleton */}
            <div className="hidden md:block md:col-span-1 space-y-5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-gray-200 p-4 space-y-3.5"
                >
                  <Skeleton className="h-4 w-1/2 bg-slate-150" />
                  <Skeleton className="h-9 w-full bg-slate-100" />
                </div>
              ))}
            </div>

            {/* Results Skeleton */}
            <div className="md:col-span-3 space-y-6">
              {/* Summary Bar Skeleton */}
              <div className="bg-white rounded-lg border border-gray-200 px-5 py-4 flex items-center justify-between">
                <Skeleton className="h-5 w-1/3 bg-slate-100" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-24 bg-slate-100" />
                  <Skeleton className="h-8 w-24 bg-slate-100" />
                </div>
              </div>

              {/* Cards Grid Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-gray-250 p-4 flex flex-col items-center space-y-4"
                  >
                    <div className="flex justify-between w-full">
                      <Skeleton className="h-5 w-12 bg-slate-100" />
                      <Skeleton className="h-5 w-10 rounded-full bg-slate-100" />
                    </div>
                    <Skeleton className="w-24 h-24 rounded-full bg-slate-150" />
                    <Skeleton className="h-4 w-2/3 bg-slate-150" />
                    <Skeleton className="h-3.5 w-1/3 bg-slate-100" />
                    <Skeleton className="h-3 w-1/2 bg-slate-100" />
                    <Skeleton className="h-3 w-1/3 bg-slate-100" />
                    <div className="w-full pt-3.5 border-t border-gray-100 flex justify-center">
                      <Skeleton className="h-3 w-1/2 bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Formatting Result Summary Text to match design
  const getResultSummaryText = () => {
    const totalCount = filteredAlumni.length;
    let text = `Showing ${totalCount} professional${totalCount !== 1 ? "s" : ""}`;

    if (selectedCourses.length > 0) {
      text += ` in ${selectedCourses.join(", ")}`;
    }
    if (selectedIndustryTypes.length > 0) {
      text += ` in ${selectedIndustryTypes.join(", ")} industry`;
    }
    if (selectedCountryReasons.length > 0) {
      text += `, ${selectedRegionLabels.join(", ")}`;
    }
    if (selectedYears.length > 0) {
      text += ` (${selectedYears.join(", ")})`;
    }
    return text;
  };

  return (
    <section className="bg-slate-50/50 py-12 md:py-16">
      {/* 1. HERO SECTION */}
      <div className="w-full mb-12">
        <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b283d] via-[#0F3652] to-[#17486b] px-4 py-12 text-center shadow-xl sm:px-6 lg:px-8 md:py-16">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center mix-blend-overlay"></div>

          <div className="relative z-10 w-full max-w-5xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              AIA Global Professional Network
            </h2>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-200">
              Explore and connect with our global community of certified
              professionals across multiple industries.
            </p>

            {/* Search Input */}
            <div className="mt-8 max-w-xl mx-auto relative rounded-md shadow-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, company, course or city..."
                className="w-full pl-4 pr-12 py-3.5 border-0 rounded-xl focus:ring-2 focus:ring-[#F3831C] text-gray-900 bg-white placeholder-gray-400 font-medium text-sm sm:text-base outline-none transition-all shadow-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-4 border-t border-white/10 pt-8 text-white">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-[#F3831C]" />
                </span>
                <div className="text-left">
                  <p className="text-xl sm:text-2xl font-bold leading-tight">
                    2000+
                  </p>
                  <p className="text-xs text-slate-300 font-medium">
                    Professionals Certified
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-[#F3831C]" />
                </span>
                <div className="text-left">
                  <p className="text-xl sm:text-2xl font-bold leading-tight">
                    40+
                  </p>
                  <p className="text-xs text-slate-300 font-medium">
                    Countries
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-[#F3831C]" />
                </span>
                <div className="text-left">
                  <p className="text-xl sm:text-2xl font-bold leading-tight">
                    99.6%
                  </p>
                  <p className="text-xs text-slate-300 font-medium">
                    Success Rate
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#F3831C]" />
                </span>
                <div className="text-left">
                  <p className="text-xl sm:text-2xl font-bold leading-tight">
                    100%
                  </p>
                  <p className="text-xs text-slate-300 font-medium">
                    Satisfied Learners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. QUICK FILTER TABS
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex flex-wrap gap-2.5">
              <Button
                variant="outline"
                onClick={() => scrollToFilter("filter-section-course")}
                className="flex items-center gap-2 text-gray-700 hover:border-[#0F3652] hover:text-[#0F3652] cursor-pointer font-medium"
              >
                <GraduationCap className="w-4 h-4 text-blue-500" />
                Course
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToFilter("filter-section-designation")}
                className="flex items-center gap-2 text-gray-700 hover:border-[#0F3652] hover:text-[#0F3652] cursor-pointer font-medium"
              >
                <Briefcase className="w-4 h-4 text-orange-500" />
                Designation
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToFilter("filter-section-company")}
                className="flex items-center gap-2 text-gray-700 hover:border-[#0F3652] hover:text-[#0F3652] cursor-pointer font-medium"
              >
                <Building2 className="w-4 h-4 text-teal-500" />
                Company
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToFilter("filter-section-region")}
                className="flex items-center gap-2 text-gray-700 hover:border-[#0F3652] hover:text-[#0F3652] cursor-pointer font-medium"
              >
                <Globe className="w-4 h-4 text-indigo-500" />
                Country
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToFilter("filter-section-year")}
                className="flex items-center gap-2 text-gray-700 hover:border-[#0F3652] hover:text-[#0F3652] cursor-pointer font-medium"
              >
                <Calendar className="w-4 h-4 text-purple-500" />
                Year
              </Button>
            </div>

            <Button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 text-white bg-[#0F3652] hover:bg-[#0b283d] cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>
      </div> */}

      {/* 3. MAIN DIRECTORY LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* LEFT FILTER PANEL (Desktop sticky) */}
          <aside className="hidden md:block md:col-span-1 space-y-5 max-h-[85vh] overflow-y-auto sticky top-24 pr-2">
            {/* Filter Group: Course */}
            <div
              id="filter-section-course"
              className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden"
            >
              <button
                onClick={() => toggleSection("course")}
                className="w-full flex items-center justify-between p-4 font-bold text-sm text-slate-800 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  Course
                </span>
                {expandedSections.course ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {expandedSections.course && (
                <div className="p-4 border-t border-gray-100 space-y-2.5 max-h-60 overflow-y-auto">
                  {courseOptions.map((c) => (
                    <div key={c} className="flex items-center gap-3">
                      <Checkbox
                        id={`course-${c}`}
                        checked={selectedCourses.includes(c)}
                        onCheckedChange={() => handleCourseToggle(c)}
                      />
                      <label
                        htmlFor={`course-${c}`}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer select-none flex-1 flex justify-between"
                      >
                        <span>{c}</span>
                        <span className="text-xs text-gray-450 font-semibold">
                          ({counts.courseCounts[c] || 0})
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Group: Year */}
            <div
              id="filter-section-year"
              className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden"
            >
              <button
                onClick={() => toggleSection("year")}
                className="w-full flex items-center justify-between p-4 font-bold text-sm text-slate-800 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  Passout Year
                </span>
                {expandedSections.year ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {expandedSections.year && (
                <div className="p-4 border-t border-gray-100 space-y-2.5 max-h-60 overflow-y-auto">
                  {yearOptions.map((yr) => (
                    <div key={yr} className="flex items-center gap-3">
                      <Checkbox
                        id={`year-${yr}`}
                        checked={selectedYears.includes(yr)}
                        onCheckedChange={() => handleYearToggle(yr)}
                      />
                      <label
                        htmlFor={`year-${yr}`}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer select-none flex-1 flex justify-between"
                      >
                        <span>{yr}</span>
                        <span className="text-xs text-gray-450 font-semibold">
                          ({counts.yearCounts[yr] || 0})
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Group: Region */}
            <div
              id="filter-section-country-reason"
              className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden"
            >
              <button
                onClick={() => toggleSection("countryReason")}
                className="w-full flex items-center justify-between p-4 font-bold text-sm text-slate-800 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-500" />
                  Region
                </span>
                {expandedSections.countryReason ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {expandedSections.countryReason && (
                <div className="p-4 border-t border-gray-100 space-y-3">
                  {renderRegionFilterContent("region")}
                </div>
              )}
            </div>

            {/* Filter Group: Industry Type */}
            <div
              id="filter-section-industry-type"
              className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden"
            >
              <button
                onClick={() => toggleSection("industryType")}
                className="w-full flex items-center justify-between p-4 font-bold text-sm text-slate-800 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-teal-500" />
                  Industry Type
                </span>
                {expandedSections.industryType ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {expandedSections.industryType && (
                <div className="p-4 border-t border-gray-100 space-y-3">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search Industry Type..."
                      value={industryTypeSearch}
                      onChange={(e) => setIndustryTypeSearch(e.target.value)}
                      className="text-xs bg-gray-50/50 pr-8 h-8 rounded-md"
                    />
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                  </div>

                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {displayedIndustryTypes.map((type) => (
                      <div key={type} className="flex items-center gap-3">
                        <Checkbox
                          id={`industry-type-${type}`}
                          checked={selectedIndustryTypes.includes(type)}
                          onCheckedChange={() => handleIndustryTypeToggle(type)}
                        />
                        <label
                          htmlFor={`industry-type-${type}`}
                          className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer select-none flex-1 flex justify-between"
                        >
                          <span>{type}</span>
                          <span className="text-xs text-gray-450 font-semibold">
                            ({counts.industryTypeCounts[type] || 0})
                          </span>
                        </label>
                      </div>
                    ))}
                    {displayedIndustryTypes.length === 0 && (
                      <p className="text-xs text-gray-400 italic">
                        No industry types found
                      </p>
                    )}
                  </div>

                  {filteredIndustryTypeOptions.length > 5 && (
                    <button
                      onClick={() =>
                        setShowAllIndustryTypes(!showAllIndustryTypes)
                      }
                      className="text-xs text-blue-600 hover:underline font-semibold block mt-1 cursor-pointer"
                    >
                      {showAllIndustryTypes
                        ? "Show Less"
                        : `Show More (${filteredIndustryTypeOptions.length - 5})`}
                    </button>
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* MAIN RESULTS DIRECTORY */}
          <main className="md:col-span-3 space-y-6">
            {/* Results Filter Bar */}
            <div className="bg-white rounded-lg border border-gray-200 px-5 py-4">
              {/* Summary Text & Clear All row */}
              <div className="flex flex-row items-center justify-between gap-4 mb-1">
                <p className="text-sm md:text-base font-bold text-gray-800">
                  {getResultSummaryText()}
                </p>

                {/* Clear All button */}
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Clear All
                  <RefreshCw className="w-3 h-3 text-blue-600" />
                </button>
              </div>

              {/* Dividers */}
              <div className="h-px bg-gray-200 my-4" />

              {/* View Toggle Controls */}
              <div className="flex items-center gap-3">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 cursor-pointer font-semibold ${viewMode === "grid" ? "bg-[#0F3652] hover:bg-[#0b283d] text-white" : "border-gray-200 text-gray-700 bg-white"}`}
                >
                  <Grid className="w-4 h-4" />
                  Grid View
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className={`flex items-center gap-2 cursor-pointer font-semibold ${viewMode === "table" ? "bg-[#0F3652] hover:bg-[#0b283d] text-white" : "border-gray-200 text-gray-700 bg-white"}`}
                >
                  <List className="w-4 h-4" />
                  Table View
                </Button>
              </div>
            </div>

            {/* Results Output */}
            {filteredAlumni.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-gray-700 mb-1">
                  No matches found
                </h4>
                <p className="text-sm text-gray-500 max-w-sm mx-auto mb-4">
                  We couldn&apos;t find any professionals matching your search query
                  or filters.
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="bg-[#0F3652] hover:bg-[#0b283d] text-white cursor-pointer"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              // GRID VIEW
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {paginatedAlumni.map((student) => (
                  <div
                    key={student.id}
                    className="bg-white rounded-lg border border-gray-200 shadow-xs flex flex-col p-4 relative group transition-all duration-300 hover:shadow-md"
                  >
                    {/* Header: Company & Year */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {student.companyLogoUrl ? (
                        <img
                          src={student.companyLogoUrl}
                          alt={student.companyName}
                          className="h-6 w-auto max-w-[80px] object-contain opacity-95 group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                      ) : null}
                      <span
                        className="hidden text-[10px] font-bold text-gray-500 uppercase tracking-wide px-1.5 py-0.5 bg-slate-100 rounded border border-gray-200 max-w-[80px] truncate"
                        style={{
                          display: student.companyLogoUrl ? "none" : "block",
                        }}
                      >
                        {student.companyName}
                      </span>

                      <span className="text-[11px] font-bold text-[#0067DA] bg-[#EAF2FA] px-2.5 py-0.5 rounded-full border border-[#C5DFF8]">
                        {student.year}
                      </span>
                    </div>

                    {/* Photo */}
                    <div className="my-3 flex justify-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200 ring-4 ring-slate-100/50 relative group-hover:scale-105 transition-transform duration-300">
                        {student.studentImageUrl ? (
                          <img
                            src={student.studentImageUrl}
                            alt={student.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-[#0F3652]/15 text-[#0F3652] font-bold flex items-center justify-center text-xl">
                            {student.name ? student.name[0] : "A"}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="text-center flex-1 flex flex-col justify-between mt-2">
                      <div className="flex flex-col items-center">
                        <h4 className="font-bold text-slate-800 text-[15px] tracking-tight leading-snug line-clamp-1">
                          {student.name}
                        </h4>

                        <p className="text-xs font-bold text-blue-600 mt-1 uppercase">
                          {student.course}
                        </p>

                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {student.designation}
                        </p>

                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {student.companyName}
                        </p>
                      </div>

                      {/* Location Pin */}
                      <div className="mt-4 pt-3 flex items-center justify-center gap-1 text-[11px] text-gray-500 font-medium border-t border-gray-100">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span className="line-clamp-1">
                          {student.city}, {student.country}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // TABLE VIEW
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#0F3652] hover:bg-[#0F3652] text-white">
                      <TableHead className="text-white px-6 py-3.5 font-bold">
                        Name
                      </TableHead>
                      <TableHead className="text-white px-6 py-3.5 font-bold">
                        Course
                      </TableHead>
                      <TableHead className="text-white px-6 py-3.5 font-bold">
                        Designation
                      </TableHead>
                      <TableHead className="text-white px-6 py-3.5 font-bold">
                        Company
                      </TableHead>
                      <TableHead className="text-white px-6 py-3.5 font-bold">
                        City
                      </TableHead>
                      <TableHead className="text-white px-6 py-3.5 font-bold">
                        Year
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedAlumni.map((student) => (
                      <TableRow
                        key={student.id}
                        className="hover:bg-slate-50/50"
                      >
                        <TableCell className="px-6 py-4 font-bold text-slate-800 flex items-center gap-3">
                          <img
                            src={student.studentImageUrl}
                            alt={student.name}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100";
                            }}
                          />
                          {student.name}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span
                            className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded border ${courseColors[student.course] || "text-gray-600 bg-gray-50 border-gray-200"}`}
                          >
                            {student.course}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4 font-semibold text-gray-500 text-xs">
                          {student.designation}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {student.companyLogoUrl ? (
                              <img
                                src={student.companyLogoUrl}
                                alt={student.companyName}
                                className="h-5 w-auto object-contain opacity-95"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "block";
                                }}
                              />
                            ) : null}
                            <span
                              className="text-xs font-bold text-slate-700"
                              style={{
                                display: student.companyLogoUrl
                                  ? "none"
                                  : "block",
                              }}
                            >
                              {student.companyName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4 font-semibold text-gray-600">
                          {student.city}
                        </TableCell>
                        <TableCell className="px-6 py-4 font-bold text-gray-700">
                          {student.year}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {getPageNumbers().map((pageNum, i) => {
                    if (pageNum === "...") {
                      return (
                        <span key={`ellipsis-${i}`} className="px-2 py-1 text-gray-500 font-bold">
                          ...
                        </span>
                      );
                    }
                    return (
                      <Button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        variant={currentPage === pageNum ? "default" : "ghost"}
                        className={`w-9 h-9 font-bold cursor-pointer ${currentPage === pageNum ? "bg-[#0F3652] hover:bg-[#0b283d] text-white" : "text-gray-600 hover:bg-slate-50"}`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </nav>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTERS SIDE PANEL OVERLAY */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[10000] flex md:hidden bg-black/55 backdrop-blur-xs">
          <div className="bg-white w-80 max-w-[90vw] h-full p-6 overflow-y-auto relative flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-250">
            <div>
              <div className="flex items-center justify-between border-b border-gray-150 pb-3 mb-6">
                <h3 className="font-extrabold text-slate-800 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#F3831C]" />
                  Filters
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Duplicate Filter list for mobile view */}
              <div className="space-y-6">
                {/* Course */}
                <div>
                  <h4 className="font-bold text-xs text-[#0F3652] uppercase tracking-wider mb-2.5">
                    Course
                  </h4>
                  <div className="space-y-2.5">
                    {courseOptions.map((c) => (
                      <div key={c} className="flex items-center gap-3">
                        <Checkbox
                          id={`mob-course-${c}`}
                          checked={selectedCourses.includes(c)}
                          onCheckedChange={() => handleCourseToggle(c)}
                        />
                        <label
                          htmlFor={`mob-course-${c}`}
                          className="text-sm font-medium text-gray-600 flex-1 flex justify-between select-none"
                        >
                          <span>{c}</span>
                          <span className="text-xs text-gray-400">
                            ({counts.courseCounts[c] || 0})
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Year */}
                <div>
                  <h4 className="font-bold text-xs text-[#0F3652] uppercase tracking-wider mb-2.5">
                    Passout Year
                  </h4>
                  <div className="space-y-2.5">
                    {yearOptions.map((yr) => (
                      <div key={yr} className="flex items-center gap-3">
                        <Checkbox
                          id={`mob-year-${yr}`}
                          checked={selectedYears.includes(yr)}
                          onCheckedChange={() => handleYearToggle(yr)}
                        />
                        <label
                          htmlFor={`mob-year-${yr}`}
                          className="text-sm font-medium text-gray-600 flex-1 flex justify-between select-none"
                        >
                          <span>{yr}</span>
                          <span className="text-xs text-gray-400">
                            ({counts.yearCounts[yr] || 0})
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Region */}
                <div>
                  <h4 className="font-bold text-xs text-[#0F3652] uppercase tracking-wider mb-2.5">
                    Region
                  </h4>
                  {renderRegionFilterContent("mob-region", true)}
                </div>

                {/* Industry Type */}
                <div>
                  <h4 className="font-bold text-xs text-[#0F3652] uppercase tracking-wider mb-2.5">
                    Industry Type
                  </h4>
                  <div className="relative mb-3">
                    <Input
                      type="text"
                      placeholder="Search Industry Type..."
                      value={industryTypeSearch}
                      onChange={(e) => setIndustryTypeSearch(e.target.value)}
                      className="text-xs pr-8 h-8 rounded-md"
                    />
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
                    {filteredIndustryTypeOptions.map((type) => (
                      <div key={type} className="flex items-center gap-3">
                        <Checkbox
                          id={`mob-industry-type-${type}`}
                          checked={selectedIndustryTypes.includes(type)}
                          onCheckedChange={() => handleIndustryTypeToggle(type)}
                        />
                        <label
                          htmlFor={`mob-industry-type-${type}`}
                          className="text-sm font-medium text-gray-600 flex-1 flex justify-between select-none"
                        >
                          <span>{type}</span>
                          <span className="text-xs text-gray-400">
                            ({counts.industryTypeCounts[type] || 0})
                          </span>
                        </label>
                      </div>
                    ))}
                    {filteredIndustryTypeOptions.length === 0 && (
                      <p className="text-xs text-gray-400 italic">
                        No industry types found
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-150 pt-4 mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="flex-1 py-2 text-center text-sm font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Reset
              </Button>
              <Button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-2 text-center text-sm font-semibold text-white bg-[#0F3652] hover:bg-[#0b283d] cursor-pointer"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AlumniDirectory;
