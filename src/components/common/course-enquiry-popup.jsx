import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { BASE_URL } from "@/api/base-url";
import { isConfirmedFormSuccess, redirectToThankYou } from "@/lib/thankYou";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CourseEnquiryPopup({
  course = "CIA",
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  autoTrigger = true,
  delayMs = 3000,
}) {
  const navigate = useNavigate();
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = typeof controlledOpen === "boolean";
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (nextOpen) => {
    if (isControlled && controlledOnOpenChange) {
      controlledOnOpenChange(nextOpen);
    } else {
      setInternalOpen(nextOpen);
    }
  };

  const handleOpenChange = (nextOpen) => {
    if (!nextOpen) {
      const storageKey = `enquiry_popup_dismissed_${course}`;
      try {
        sessionStorage.setItem(storageKey, "true");
      } catch {
        // ignore
      }
    }
    setOpen(nextOpen);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Automatically pops up after exactly 3 seconds
  useEffect(() => {
    if (!autoTrigger) return;

    const storageKey = `enquiry_popup_dismissed_${course}`;
    try {
      if (sessionStorage.getItem(storageKey) === "true") return;
    } catch {
      // ignore
    }

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [autoTrigger, course, delayMs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanVal = value;
    if (name === "phone") {
      cleanVal = value.replace(/[^\d+]/g, "").slice(0, 16);
    }
    setFormData((prev) => ({ ...prev, [name]: cleanVal }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!emailPattern.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (formData.phone.trim().replace(/\D/g, "").length < 7) {
      errs.phone = "Please enter a valid contact number";
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      let utm_source = "";
      let utm_medium = "";
      let utm_campaign = "";

      try {
        utm_source = localStorage.getItem("utm_source") || "";
        utm_medium = localStorage.getItem("utm_medium") || "";
        utm_campaign = localStorage.getItem("utm_campaign") || "";
      } catch {
        // fallback
      }

      const payload = {
        userName: formData.name.trim(),
        userEmail: formData.email.trim(),
        userMobile: formData.phone.trim(),
        userMessage: formData.message.trim(),
        userCourse: course,
        userType: `${course} Enquiry Popup`,
        utm_source,
        utm_medium,
        utm_campaign,
      };

      const res = await axios.post(
        `${BASE_URL}/api/create-webenquiry`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (isConfirmedFormSuccess(res)) {
        toast.success(res.data?.msg || "Thank you! Your enquiry has been received.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});
        handleOpenChange(false);
        redirectToThankYou(navigate);
      } else {
        toast.error(res.data?.msg || "Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.msg ||
          err.message ||
          "Failed to submit enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="
          fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[calc(100%-2rem)] sm:w-full sm:max-w-md
          max-h-[95dvh]
          flex flex-col
          rounded-xl
          p-0
          z-[9999]
          overflow-hidden
          bg-white
          shadow-2xl
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Header */}
        <div className="relative shrink-0 px-5 pt-5 pb-3 sm:px-6 sm:pt-6 sm:pb-3 border-b border-slate-100">
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Close dialog"
              className="absolute right-3.5 top-3.5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-[#F3831C] cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3652]"
            >
              <X size={18} />
            </button>
          </DialogClose>

          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-[#0F3652] text-center pr-4 leading-tight">
              Enquire Now
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-slate-500 mt-1">
              Enter your details to receive expert guidance and course details directly
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Body */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6 sm:py-5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5" noValidate>
            {/* Name Field */}
            <div>
              <Label htmlFor="popup-name" className="text-[#0F3652] font-semibold text-xs sm:text-sm">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="popup-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`mt-1 h-9 sm:h-10 text-sm focus:border-[#F3831C] focus-visible:ring-1 focus-visible:ring-[#F3831C] ${
                  errors.name ? "border-red-500 focus:border-red-500" : "border-slate-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="popup-email" className="text-[#0F3652] font-semibold text-xs sm:text-sm">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="popup-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={`mt-1 h-9 sm:h-10 text-sm focus:border-[#F3831C] focus-visible:ring-1 focus-visible:ring-[#F3831C] ${
                  errors.email ? "border-red-500 focus:border-red-500" : "border-slate-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <Label htmlFor="popup-phone" className="text-[#0F3652] font-semibold text-xs sm:text-sm">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="popup-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your contact number"
                className={`mt-1 h-9 sm:h-10 text-sm focus:border-[#F3831C] focus-visible:ring-1 focus-visible:ring-[#F3831C] ${
                  errors.phone ? "border-red-500 focus:border-red-500" : "border-slate-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Message Field (Optional) */}
            <div>
              <Label htmlFor="popup-message" className="text-[#0F3652] font-semibold text-xs sm:text-sm">
                Message <span className="text-slate-400 font-normal">(Optional)</span>
              </Label>
              <Textarea
                id="popup-message"
                name="message"
                rows={2}
                value={formData.message}
                onChange={handleChange}
                placeholder="Any specific questions or preparation timeline?"
                className="mt-1 text-sm focus:border-[#F3831C] focus-visible:ring-1 focus-visible:ring-[#F3831C] border-slate-300 resize-none"
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0F3652] hover:bg-[#0c2c42] text-white py-2.5 sm:py-3 rounded-md font-semibold cursor-pointer transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
