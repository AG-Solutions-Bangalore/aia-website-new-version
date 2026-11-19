import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { BASE_URL } from "@/api/base-url";
import { isConfirmedFormSuccess, redirectToThankYou } from "@/lib/thankYou";

const COURSE_CONFIGS = {
  CIA: {
    courseCode: "CIA",
    title: "Your CIA Journey Starts Here!",
    description:
      "Get expert guidance to become a Certified Internal Auditor. Connect with AIA to explore CIA course details, exam preparation, study materials and certification guidance.",
    subheading: "Have Questions About CIA Certification?",
    subtext:
      "Fill out the enquiry form and our course advisor will help you understand the program and guide you through your CIA certification journey.",
  },
  CFE: {
    courseCode: "CFE",
    title: "Your CFE Journey Starts Here!",
    description:
      "Get expert guidance to become a Certified Fraud Examiner. Connect with AIA to explore CFE course details, exam preparation, study materials and certification guidance.",
    subheading: "Have Questions About CFE Certification?",
    subtext:
      "Fill out the enquiry form and our course advisor will help you understand the program and guide you through your CFE certification journey.",
  },
  "CIA Challenge": {
    courseCode: "CIA Challenge",
    title: "Your CIA Challenge Journey Starts Here!",
    description:
      "Get expert guidance to become a Certified Internal Auditor. Connect with AIA to explore CIA Challenge course details, exam preparation, study materials and certification guidance.",
    subheading: "Have Questions About CIA Certification?",
    subtext:
      "Fill out the enquiry form and our course advisor will help you understand the program and guide you through your CIA certification journey.",
  },
  CISA: {
    courseCode: "CISA",
    title: "Your CISA Journey Starts Here!",
    description:
      "Get expert guidance to become a Certified Information Systems Auditor. Connect with AIA to explore CISA course details, exam preparation, study materials and certification guidance.",
    subheading: "Have Questions About CISA Certification?",
    subtext:
      "Fill out the enquiry form and our course advisor will help you understand the program and guide you through your CISA certification journey.",
  },
  CAMS: {
    courseCode: "CAMS",
    title: "Your CAMS Journey Starts Here!",
    description:
      "Get expert guidance to become a Certified Anti Money Laundering Specialist. Connect with AIA to explore CAMS course details, exam preparation, study materials and certification guidance.",
    subheading: "Have Questions About CAMS Certification?",
    subtext:
      "Fill out the enquiry form and our course advisor will help you understand the program and guide you through your CAMS certification journey.",
  },
};

const DEFAULT_REFERRALS = [
  "Google Search",
  "Social Media (LinkedIn, Instagram)",
  "YouTube",
  "Friend or Colleague",
  "AIA Website",
  "Other",
];

function getCourseConfig(course) {
  if (!course) return COURSE_CONFIGS.CIA;
  if (COURSE_CONFIGS[course]) return COURSE_CONFIGS[course];
  const normalized = String(course).toLowerCase().replace(/[-_]/g, " ").trim();
  if (normalized.includes("challenge") || normalized.includes("ciac")) return COURSE_CONFIGS["CIA Challenge"];
  if (normalized.includes("cfe")) return COURSE_CONFIGS.CFE;
  if (normalized.includes("cams")) return COURSE_CONFIGS.CAMS;
  if (normalized.includes("cisa")) return COURSE_CONFIGS.CISA;
  if (normalized.includes("cia")) return COURSE_CONFIGS.CIA;
  return COURSE_CONFIGS.CIA;
}

let referralCache = null;
let referralFetchPromise = null;

export default function CourseEnquiryForm({
  course = "CIA",
  title,
  description,
  subheading,
  subtext,
  className = "",
}) {
  const navigate = useNavigate();

  const activeConfig = getCourseConfig(course);
  const displayTitle = title || activeConfig.title;
  const displayDesc = description || activeConfig.description;
  const displaySubheading = subheading || activeConfig.subheading;
  const displaySubtext = subtext || activeConfig.subtext;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    referred_from: "",
    message: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referralOptions, setReferralOptions] = useState(DEFAULT_REFERRALS);

  // Capture UTM parameters
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);

    const utmSource = params.get("utm_source") || localStorage.getItem("utm_source") || "";
    const utmMedium = params.get("utm_medium") || localStorage.getItem("utm_medium") || "";
    const utmCampaign = params.get("utm_campaign") || localStorage.getItem("utm_campaign") || "";

    if (params.get("utm_source")) localStorage.setItem("utm_source", utmSource);
    if (params.get("utm_medium")) localStorage.setItem("utm_medium", utmMedium);
    if (params.get("utm_campaign")) localStorage.setItem("utm_campaign", utmCampaign);

    setFormData((prev) => ({
      ...prev,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
    }));
  }, []);

  // Load referral sources
  useEffect(() => {
    const loadReferrals = async () => {
      if (referralCache && referralCache.length > 0) {
        setReferralOptions(referralCache);
        return;
      }
      if (referralFetchPromise) {
        const data = await referralFetchPromise;
        if (data?.length) setReferralOptions(data);
        return;
      }

      referralFetchPromise = axios
        .get(`${BASE_URL}/api/fetch-webreffer`)
        .then((res) => {
          const list = res.data?.data || [];
          const stringList = list
            .map((item) => item?.referred_from?.trim())
            .filter(Boolean);
          if (stringList.length > 0) {
            referralCache = stringList;
            setReferralOptions(stringList);
            return stringList;
          }
          return DEFAULT_REFERRALS;
        })
        .catch(() => {
          referralFetchPromise = null;
          return DEFAULT_REFERRALS;
        });
    };

    loadReferrals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanVal = value;
    if (name === "phone") {
      cleanVal = value.replace(/\D/g, "").slice(0, 15);
    }
    setFormData((prev) => ({ ...prev, [name]: cleanVal }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        userName: formData.name.trim(),
        userEmail: formData.email.trim(),
        userMobile: formData.phone.trim(),
        userMessage: formData.message.trim(),
        userCourse: activeConfig.courseCode,
        referred_from: formData.referred_from.trim(),
        userType: `${activeConfig.courseCode} Enquiry`,
        utm_source: formData.utm_source,
        utm_medium: formData.utm_medium,
        utm_campaign: formData.utm_campaign,
      };

      const response = await axios.post(
        `${BASE_URL}/api/create-webenquiry`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (isConfirmedFormSuccess(response)) {
        toast.success(
          response.data?.msg || "Thank you! Your enquiry has been received."
        );
        setFormData((prev) => ({
          ...prev,
          name: "",
          phone: "",
          email: "",
          referred_from: "",
          message: "",
        }));
        redirectToThankYou(navigate);
      } else {
        toast.error(
          response.data?.msg || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to submit enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`w-full py-8 md:py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1D2025] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading and Context */}
            <div className="lg:col-span-5 text-left">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold italic text-white tracking-tight leading-snug">
                  {displayTitle}
                </h2>
                <div
                  className="w-[280px] sm:w-[340px] max-w-full h-[2px] bg-[#F07F17] mt-2 mb-5"
                  aria-hidden="true"
                />
              </div>

              <p className="text-gray-300 text-sm sm:text-[15px] leading-relaxed mb-6 font-normal">
                {displayDesc}
              </p>

              <h3 className="text-white font-semibold text-base sm:text-lg mb-2">
                {displaySubheading}
              </h3>

              <p className="text-gray-300 text-sm sm:text-[15px] leading-relaxed font-normal">
                {displaySubtext}
              </p>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name*"
                      className={`w-full bg-white text-gray-900 rounded-md px-4 py-3 text-sm md:text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? "ring-2 ring-red-500 border-red-500"
                          : "focus:ring-[#F07F17] border-transparent"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1 text-left">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone No Field */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone No*"
                      className={`w-full bg-white text-gray-900 rounded-md px-4 py-3 text-sm md:text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.phone
                          ? "ring-2 ring-red-500 border-red-500"
                          : "focus:ring-[#F07F17] border-transparent"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1 text-left">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email*"
                      className={`w-full bg-white text-gray-900 rounded-md px-4 py-3 text-sm md:text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? "ring-2 ring-red-500 border-red-500"
                          : "focus:ring-[#F07F17] border-transparent"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 text-left">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Referral Dropdown */}
                  <div className="relative">
                    <select
                      name="referred_from"
                      value={formData.referred_from}
                      onChange={handleChange}
                      className="w-full bg-white text-gray-700 rounded-md px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#F07F17] border-transparent appearance-none cursor-pointer"
                    >
                      <option value="">How You Know About AIA?</option>
                      {referralOptions.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="sm:col-span-2">
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type Your Message"
                      className="w-full bg-white text-gray-900 rounded-md px-4 py-3 text-sm md:text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F07F17] border-transparent resize-none min-h-[95px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="sm:col-span-2 flex justify-center mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#F07F17] hover:bg-[#d96e0e] text-white font-semibold px-12 sm:px-16 py-3 rounded-md text-base sm:text-lg transition-colors cursor-pointer flex items-center justify-center gap-2 min-w-[190px] shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
