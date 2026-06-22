import { BASE_URL } from "@/api/base-url";
import TextCaptcha from "@/components/custom-captcha/text-captcha";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

import { MAGAZINE_COURSE } from "./aia-times.constants";

export default function AiaTimesContactSection() {
  const [formData, setFormData] = useState({
    userName: "",
    userMobile: "",
    userEmail: "",
    userMessage: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "userMobile" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setFormData((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.userName.trim())
      nextErrors.userName = "Full name is required";
    if (!formData.userMobile.trim())
      nextErrors.userMobile = "Phone number is required";
    if (!formData.userEmail.trim())
      nextErrors.userEmail = "Email address is required";
    if (!captchaVerified)
      nextErrors.captcha = "Captcha verification is required";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/create-webenquiry`,
        {
          ...formData,
          userType: MAGAZINE_COURSE,
          userCourse: MAGAZINE_COURSE,
          userLocation: "",
        },
        { headers: { "Content-Type": "application/json" } },
      );

      if (response.data?.code == "200") {
        toast.success(response.data.msg || "Message sent successfully.");
        setFormData({
          userName: "",
          userMobile: "",
          userEmail: "",
          userMessage: "",
        });
        setCaptchaVerified(false);
      } else {
        toast.error(response.data?.msg || "Something went wrong.");
      }
    } catch (error) {
      toast.error(
        error.response?.data || error.message || "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "mt-1.5 min-h-10 w-full border-2 border-black bg-white px-3 text-sm text-black outline-none transition-colors focus:border-[#F3831C]";
  const labelClassName = "text-xs font-medium text-black";

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto grid max-w-340 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:px-8">
        <div className="pt-3 lg:pr-12">
          <p className="max-w-2xl text-sm font-normal leading-5 text-[#F3831C] lg:whitespace-nowrap">AIA TIMES empowers professionals to learn, exchange ideas, and keep pace with industry trends.</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-logo-color md:text-5xl">
            Connect with AIA TIMES
          </h2>
          <p className="mt-7 max-w-2xl text-base font-medium leading-7 text-[#4f7196]">
            If you have any questions, feedback, ideas, or collaboration
            proposals, we&apos;d love to hear from you. Whether you&apos;re
            looking to contribute your expertise, get featured, promote a
            professional initiative, or simply want to connect with our team,
            AIA TIMES welcomes voices that inspire learning and industry
            awareness.
          </p>
          <div className="mt-5 h-1 w-full max-w-2xl bg-[#F3831C]" />
        </div>

        <form onSubmit={handleSubmit} className="bg-white text-black">
          <div className="grid gap-3">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClassName}>Full Name:</label>
                <input
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className={inputClassName}
                />
                {errors.userName && (
                  <p className="mt-1 text-xs text-red-600">{errors.userName}</p>
                )}
              </div>
              <div>
                <label className={labelClassName}>Phone Number:</label>
                <input
                  name="userMobile"
                  type="tel"
                  value={formData.userMobile}
                  onChange={handleChange}
                  className={inputClassName}
                  maxLength={10}
                />
                {errors.userMobile && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.userMobile}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className={labelClassName}>Email Address:</label>
              <input
                name="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={handleChange}
                className={inputClassName}
              />
              {errors.userEmail && (
                <p className="mt-1 text-xs text-red-600">{errors.userEmail}</p>
              )}
            </div>
            <div>
              <label className={labelClassName}>Type Your Message:</label>
              <textarea
                name="userMessage"
                value={formData.userMessage}
                onChange={handleChange}
                className={`${inputClassName} min-h-24 resize-y py-3`}
              />
            </div>
            <div className="grid items-start gap-4 sm:grid-cols-[1fr_auto]">
              <div>
                <TextCaptcha
                  onVerify={(verified) => {
                    setCaptchaVerified(verified);
                    if (verified) {
                      setErrors((current) => {
                        const next = { ...current };
                        delete next.captcha;
                        return next;
                      });
                    }
                  }}
                  onRefresh={() => setCaptchaVerified(false)}
                  showVerifyButton={false}
                  autoVerify
                />
                {errors.captcha && (
                  <p className="mt-1 text-xs text-red-600">{errors.captcha}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-h-10 rounded-none bg-[#f3b279] px-6 text-xs font-bold text-white hover:bg-[#F3831C] cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
