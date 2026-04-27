import { BASE_URL, IMAGE_PATH } from "@/api/base-url";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import FooterReviews from "../Footer/footer-review";
import { toast } from "sonner";


let referralCache = null;
let referralFetchPromise = null;

const ContactHero = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userMobile: "",
    userLocation: "",
    userCourse: "",
    userMessage: "",
    userType: "contact",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",

  });

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [referral, setReferral] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setFormData({
      ...formData,
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
    });
  }, []);

  useEffect(() => {
    const loadReferral = async () => {
      if (referralCache) {
        setReferral(referralCache);
        return;
      }
      if (referralFetchPromise) {
        const data = await referralFetchPromise;
        setReferral(data);
        return;
      }

      referralFetchPromise = axios.get(`${BASE_URL}/api/fetch-webreffer`)
        .then(res => {
          const data = res.data.data || [];
          referralCache = data;
          setReferral(data);
          return data;
        })
        .catch(error => {
          referralFetchPromise = null;
          console.error("Error fetching referral:", error);
          return [];
        });
    };

    loadReferral();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "userMobile" && value && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = "Full name is required";
    if (!formData.userEmail.trim()) newErrors.userEmail = "Email is required";
    if (!formData.userMobile.trim())
      newErrors.userMobile = "Mobile number is required";
    if (!formData.userCourse)
      newErrors.userCourse = "Service selection is required";
    return newErrors;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoader(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/create-webenquiry`,
        {
          userName: formData.userName,
          userEmail: formData.userEmail,
          userMobile: formData.userMobile,
          userCourse: formData.userCourse,
          userLocation: formData.userLocation,
          referred_from: formData.referred_from,
          userMessage: formData.userMessage,
          userType: formData.userType,
          utm_source: formData.utm_source,
          utm_medium: formData.utm_medium,
          utm_campaign: formData.utm_campaign,
        },
        { headers: { "Content-Type": "application/json" } },
      );

      if (res.data.code == 200) {
        setFormData({
          userName: "",
          userEmail: "",
          userMobile: "",
          userLocation: "",
          userCourse: "",
          referred_from: "",
          userMessage: "",
          userType: "contact",
        });
        toast.success(res?.data?.msg || "Enquiry Successfully Created");
        setErrors({});
      } else {
        toast.error(
          res?.data?.msg || "Something went wrong. Please try again.",
        );
      }
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <section className="relative bg-white py-16">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-0">
          <div className="relative order-1 lg:col-span-3 lg:flex lg:flex-col lg:justify-center">
            <div className="space-y-6">
              <h1 className="text-2xl md:text-4xl font-bold text-[#0c2340] leading-tight">
                Turn Experience into
                <br />
                <span className="text-[#fa8017]">
                  Global Career Opportunities
                </span>
                <br />
                with AIA
              </h1>

              <div className="h-px w-full" />

              <p className="text-[#373839] leading-relaxed text-justify">
                Confused about which certification is the best fit for you?
                <br /> Get clear guidance on eligibility, preparation, and
                long-term career impact.
                <br /> We're here to guide you - just one message away{" "}
                <span className="text-[#fa8017] font-semibold">Let's talk</span>
              </p>

              <div className="absolute top-[20%] left-[68%] hidden lg:block">
                <img
                  src={`${IMAGE_PATH}/arrow.webp`}
                  alt="arrow"
                  className="w-[200px] h-auto"
                  loading="lazy"
                />
              </div>

              <div className="h-px w-full" />
            </div>

            <div className="hidden lg:block">
              <FooterReviews />
            </div>
          </div>

          <div className="order-2 lg:col-span-2 bg-white border-2 border-[#0F3652] shadow-lg rounded-md">
            <div className="p-8">
              <div className="text-center mb-2">
                <h3 className="text-3xl font-bold text-black mb-2">
                  Book your free consultation today
                </h3>
                <h6
                  className="text-black italic font-semibold"
                  style={{ fontFamily: "cursive" }}
                >
                  Take the first step toward professional excellence with AIA.
                </h6>
              </div>

              <div className="space-y-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded border ${errors.userName ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Full Name"
                    />
                    {errors.userName && (
                      <p className="text-red-500 text-xs">{errors.userName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="userEmail"
                      value={formData.userEmail}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded border ${errors.userEmail ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Email"
                    />
                    {errors.userEmail && (
                      <p className="text-red-500 text-xs">{errors.userEmail}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="userMobile"
                      value={formData.userMobile}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded border ${errors.userMobile ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Phone Number"
                    />
                    {errors.userMobile && (
                      <p className="text-red-500 text-xs">
                        {errors.userMobile}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      name="userLocation"
                      value={formData.userLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Location"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Service Interested In{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="userCourse"
                      value={formData.userCourse}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded border ${errors.userCourse ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                    >
                      <option value="">Service Interested In</option>
                      <option value="Certified Fraud Examiner">
                        Certified Fraud Examiner
                      </option>
                      <option value="Certified Internal Auditor">
                        Certified Internal Auditor
                      </option>
                      <option value="Certified Anti Money Laundering Specialist">
                        Certified Anti Money Laundering Specialist
                      </option>
                      <option value="CIA Challenge Exam">
                        CIA Challenge Exam
                      </option>
                    </select>
                    {errors.userCourse && (
                      <p className="text-red-500 text-xs">{errors.userCourse}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      How You Know About AIA?{" "}
                    </label>
                    <div>
                      <select
                        name="referred_from"
                        value={formData.referred_from}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded border ${errors.referred_from ? "border-red-500" : "border-gray-300"
                          } focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                      >
                        <option value="">Select an option</option>

                        {referral.map((item, index) => (
                          <option key={index} value={item.referred_from}>
                            {item.referred_from}
                          </option>
                        ))}
                      </select>

                      {errors.referred_from && (
                        <p className="text-red-500 text-xs">{errors.referred_from}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="userMessage"
                    value={formData.userMessage}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Tell us about your career goals."
                  />
                </div>

                <div className="flex flex-col items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-[#F3831C] text-white text-center px-6 py-3 cursor-pointer font-semibold hover:opacity-90 transition-all"
                    disabled={loader}
                  >
                    {loader ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Book Free Demo Call"
                    )}
                  </button>

                  <small className="text-xs text-gray-600 text-center">
                    By submitting the form you agree to our Terms of Service &
                    Privacy Policy.
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="order-3 lg:hidden">
            <FooterReviews footer={false} title="black" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
