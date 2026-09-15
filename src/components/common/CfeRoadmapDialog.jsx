"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/api/base-url";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

export default function CfeRoadmapDialog({
  buttonlabel = "Download CFE Roadmap",
  buttonClassName,
  triggerClassName,
  modalTitle = "Get Your Free CFE 60-Day Roadmap",
  modalSubtitle = "Enter your details to receive the roadmap directly in your inbox",
  submitLabel = "Get the CFE Roadmap",
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("utm_source")) {
        localStorage.setItem("utm_source", params.get("utm_source"));
      }
      if (params.get("utm_medium")) {
        localStorage.setItem("utm_medium", params.get("utm_medium"));
      }
      if (params.get("utm_campaign")) {
        localStorage.setItem("utm_campaign", params.get("utm_campaign"));
      }
    } catch {
      // Ignore local storage error in sandboxed environments
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === "contactNumber") {
      val = value.replace(/[^\d+]/g, "");
    }
    setFormData((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
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

    if (!formData.contactNumber.trim()) {
      errs.contactNumber = "Contact number is required";
    } else if (formData.contactNumber.trim().replace(/\D/g, "").length < 7) {
      errs.contactNumber = "Please enter a valid contact number";
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
        userMobile: formData.contactNumber.trim(),
        userMessage: formData.message.trim(),
        userType: "CFE in 60 Days",
        userCourse: "CFE in 60 Days",
        utm_source,
        utm_medium,
        utm_campaign,
      };

      const res = await axios.post(
        `${BASE_URL}/api/create-webenquiry`,
        payload,
        { headers: { "Content-Type": "application/json" } },
      );

      if (res.data?.code == "200" || res.status === 200 || res.status === 201) {
        toast.success(
          "Thank you! The CFE in 60 Days roadmap has been sent to your email.",
        );
        setFormData({
          name: "",
          email: "",
          contactNumber: "",
          message: "",
        });
        setErrors({});
        setTimeout(() => {
          setOpen(false);
        }, 1200);
      } else {
        toast.error(res.data?.msg || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.msg ||
          error.message ||
          "Failed to submit. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultButtonClass =
    "bg-[#F3831C] text-white px-6 py-2.5 rounded-none font-semibold hover:bg-[#D16E27] active:bg-[#AE5B1D] transition-all cursor-pointer inline-flex items-center justify-center";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className={`${triggerClassName || ""} ${buttonClassName || defaultButtonClass}`.trim()}
        >
          {buttonlabel}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[calc(100%-2rem)] sm:w-full sm:max-w-md
          max-h-[95dvh]
          flex flex-col
          rounded-xl
          p-0
          z-9999
          overflow-hidden
          bg-white
          shadow-2xl
          no-scrollbar
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Header */}
        <div className="relative shrink-0 px-5 pt-5 pb-3 sm:px-6 sm:pt-5 sm:pb-3 border-b border-slate-100">
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
            <DialogTitle className="text-lg sm:text-xl font-bold text-[#0F3652] text-center pr-4 leading-tight">
              {modalTitle}
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-slate-600 mt-1">
              {modalSubtitle}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Body - Scrollbar hidden */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6 sm:py-5 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5" noValidate>
            {/* Name Field */}
            <div>
              <Label htmlFor="cfe-roadmap-name" className="text-[#0F3652] font-semibold text-xs sm:text-sm">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cfe-roadmap-name"
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
              <Label htmlFor="cfe-roadmap-email" className="text-[#0F3652] font-semibold text-xs sm:text-sm">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cfe-roadmap-email"
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

            {/* Contact Number Field */}
            <div>
              <Label htmlFor="cfe-roadmap-contact" className="text-[#0F3652] font-semibold text-xs sm:text-sm">
                Contact Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cfe-roadmap-contact"
                name="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter your contact number"
                className={`mt-1 h-9 sm:h-10 text-sm focus:border-[#F3831C] focus-visible:ring-1 focus-visible:ring-[#F3831C] ${
                  errors.contactNumber ? "border-red-500 focus:border-red-500" : "border-slate-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
              )}
            </div>

            {/* Message Field (Optional) */}
            <div>
              <Label htmlFor="cfe-roadmap-message" className="text-[#0F3652] font-semibold text-xs sm:text-sm">
                Message <span className="text-slate-400 font-normal">(Optional)</span>
              </Label>
              <Textarea
                id="cfe-roadmap-message"
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
            <div className="pt-1.5">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0F3652] hover:bg-[#0c2c42] text-white py-2.5 sm:py-3 rounded-none font-semibold cursor-pointer transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Roadmap...</span>
                  </>
                ) : (
                  <span>{submitLabel}</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
