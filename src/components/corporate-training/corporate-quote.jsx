import { BASE_URL } from "@/api/base-url";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";

export const CorporateQuoteForm = ({
  onSuccess,
  userType = "Corporate-Quote",
}) => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userMobile: "",
    userLocation: "",
    userCourse: "",
    userMessage: "",
    userCourseMode: "",
    userType,
  });
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userMobile" && value && !/^\d*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.userName.trim())
      newErrors.userName = "Company Name is required";
    if (!formData.userEmail.trim()) {
      newErrors.userEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
      newErrors.userEmail = "Please enter a valid email";
    }
    if (!formData.userMobile.trim()) {
      newErrors.userMobile = "Mobile number is required";
    } else if (formData.userMobile.length < 10) {
      newErrors.userMobile = "Please enter a valid mobile number";
    }
    if (!formData.userCourse)
      newErrors.userCourse = "Service selection is required";
    if (!formData.userCourseMode) newErrors.userCourseMode = "Mode is required";
    if (!formData.userLocation) newErrors.userLocation = "Location is required";
    return newErrors;
  };

  const resetForm = () => {
    setFormData({
      userName: "",
      userEmail: "",
      userMobile: "",
      userLocation: "",
      userCourse: "",
      userMessage: "",
      userCourseMode: "",
      userType,
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoader(true);
    try {
      await axios.post(
        `${BASE_URL}/api/create-webenquiry`,
        {
          userName: formData.userName,
          userEmail: formData.userEmail,
          userMobile: formData.userMobile,
          userCourse: formData.userCourse,
          userLocation: formData.userLocation,
          userMessage: formData.userMessage,
          userType: formData.userType,
          userCourseMode: formData.userCourseMode,
        },
        { headers: { "Content-Type": "application/json" } },
      );
      alert("Demo booked successfully!");
      resetForm();
      onSuccess?.();
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company Name */}
        <div>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Company Name *"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#F3831C] ${
              errors.userName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userName && (
            <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            placeholder="Email *"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#F3831C] ${
              errors.userEmail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userEmail && (
            <p className="text-red-500 text-xs mt-1">{errors.userEmail}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            name="userMobile"
            value={formData.userMobile}
            onChange={handleChange}
            placeholder="Phone Number *"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#F3831C] ${
              errors.userMobile ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userMobile && (
            <p className="text-red-500 text-xs mt-1">{errors.userMobile}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <input
            type="text"
            name="userLocation"
            value={formData.userLocation}
            onChange={handleChange}
            placeholder="Location *"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#F3831C] ${
              errors.userLocation ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userLocation && (
            <p className="text-red-500 text-xs mt-1">{errors.userLocation}</p>
          )}
        </div>

        {/* Service */}
        <div>
          <Select
            value={formData.userCourse}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, userCourse: value }));
              setErrors((prev) => ({ ...prev, userCourse: "" }));
            }}
          >
            <SelectTrigger
              className={`w-full h-[38px] px-3 text-sm shadow-none focus:ring-1 focus:ring-[#F3831C] ${
                errors.userCourse ? "border-red-500" : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="Service Interested In *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Certified Fraud Examiner">
                Certified Fraud Examiner
              </SelectItem>
              <SelectItem value="Certified Internal Auditor">
                Certified Internal Auditor
              </SelectItem>
              <SelectItem value="Certified Anti Money Laundering Specialist">
                Certified Anti Money Laundering Specialist
              </SelectItem>
              <SelectItem value="CIA Challenge Exam">
                CIA Challenge Exam
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.userCourse && (
            <p className="text-red-500 text-xs mt-1">{errors.userCourse}</p>
          )}
        </div>

        {/* Training Mode */}
        <div>
          <Select
            value={formData.userCourseMode}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, userCourseMode: value }));
              setErrors((prev) => ({ ...prev, userCourseMode: "" }));
            }}
          >
            <SelectTrigger
              className={`w-full h-[38px] px-3 text-sm shadow-none focus:ring-1 focus:ring-[#F3831C] ${
                errors.userCourseMode ? "border-red-500" : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="Type of Training *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Onsite">Onsite</SelectItem>
              <SelectItem value="Virtual">Virtual</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Not Yet Decided">Not Yet Decided</SelectItem>
            </SelectContent>
          </Select>
          {errors.userCourseMode && (
            <p className="text-red-500 text-xs mt-1">{errors.userCourseMode}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <textarea
          name="userMessage"
          value={formData.userMessage}
          onChange={handleChange}
          placeholder="Tell us about your team's training needs..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#F3831C]"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loader}
        className="cursor-pointer w-full bg-[#F3831C] hover:bg-[#E07410] text-white font-medium py-2.5 px-4 rounded-md transition-colors disabled:opacity-50 text-sm"
      >
        {loader ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
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
          </span>
        ) : (
          "Submit"
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting, you agree to our Terms of Service &amp; Privacy Policy
      </p>
    </form>
  );
};
const CorporateQuoteDialog = ({
  triggerText = "",
  title = "",
  description = "",
  userType = "Corporate-Quote",
  quote = "",
  bottomcontent = "",
  topcontent = "",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative px-6 py-10 md:py-12 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(230, 246, 251, 1) 0%, rgba(253, 242, 255, 1) 50%, rgba(254, 249, 233, 1) 100%)",
          }}
        />

        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,100 Q150,50 300,100 T600,100 T900,100 T1200,100"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <path
              d="M0,120 Q200,80 400,120 T800,120 T1200,120"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
            <circle cx="200" cy="100" r="4" fill="white" fillOpacity="0.5">
              <animate
                attributeName="cx"
                values="200;1000;200"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="800" cy="120" r="3" fill="white" fillOpacity="0.4">
              <animate
                attributeName="cx"
                values="800;200;800"
                dur="15s"
                repeatCount="indefinite"
                begin="2s"
              />
            </circle>
          </svg>
        </div>

        <div
          className={`relative z-10 ${
            topcontent ? "max-w-6xl mx-auto" : "w-full"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative flex-1">
              <div className="pl-8">
                <h2 className="text-2xl md:text-[28px] font-bold leading-relaxed mb-4">
                  {!topcontent && (
                    <span className="text-4xl font-serif select-none leading-none align-top mr-1">
                      "
                    </span>
                  )}
                  <span>{quote}</span>
                  {!topcontent && (
                    <span className="text-4xl font-serif select-none leading-none align-bottom ml-1">
                      "
                    </span>
                  )}
                </h2>
                {bottomcontent && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm italic">— {bottomcontent}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative bg-[#0F3652] hover:bg-[#0F3652]/90 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 whitespace-nowrap group-hover:scale-105 group-hover:shadow-xl border-2 border-transparent group-hover:border-white/20 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {triggerText}
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/40 group-hover:bg-white/60 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-2xl rounded-md p-6 z-[10000]">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4  text-gray-500 hover:text-black transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-bold text-gray-900">
              {title}
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm mt-1">
              {description}
            </DialogDescription>
          </DialogHeader>

          <CorporateQuoteForm
            userType={userType}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CorporateQuoteDialog;
