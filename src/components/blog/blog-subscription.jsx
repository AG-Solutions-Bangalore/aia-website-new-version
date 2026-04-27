import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionHeading from "../SectionHeading/SectionHeading";
import { BASE_URL } from "@/api/base-url";

export default function BlogSubscribeSection() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubscriptionStatus("Please enter a valid email address");
      setTimeout(() => setSubscriptionStatus(""), 3000);
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus("");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/create-newslettersubscription`,
        {
          newsletter_email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.data.code == 200) {
        setSubscriptionStatus(
          response.data.msg || "Successfully subscribed! Thank you."
        );
        setStatusType("success");

        setEmail("");
      } else {
        setSubscriptionStatus(response.data.msg || "Subscription failed.");
        setStatusType("error");
      }
    } catch (error) {
      setStatusType("error");

      if (error.response) {
        setSubscriptionStatus(
          error.response.data.message ||
            error.response.data.error ||
            "Subscription failed. Please try again."
        );
      } else if (error.request) {
        setSubscriptionStatus("Network error. Please check your connection.");
      } else {
        setSubscriptionStatus("An error occurred. Please try again.");
      }
    } finally {
      setIsSubscribing(false);
      setTimeout(() => setSubscriptionStatus(""), 5000);
    }
  };

  return (
    <section className="w-full py-16">
      <div className="mx-4 bg-[#F8FAFC] border border-gray-200 rounded-xl flex justify-center">
        <div className="px-6 sm:px-12 py-12 text-center w-full max-w-3xl">
          <SectionHeading
            title="Subscribe to the AIA Blog"
            description="Join the AIA community and get timely updates and expert insights directly in your inbox."
            align="center"
          />

          <form
            onSubmit={handleSubscribe}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <Input
              type="email"
              placeholder="Email address*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-xl h-12 text-base bg-white border-gray-300 rounded-lg"
              disabled={isSubscribing}
            />

            <Button
              type="submit"
              disabled={isSubscribing}
              className="h-12 px-10 text-base font-semibold bg-[#F3831C] hover:bg-[#0F3652] text-white rounded-none transition-all"
            >
              {isSubscribing ? "Subscribing..." : "Subscribe for Free"}
            </Button>
            {subscriptionStatus && (
              <div
                className={`mt-3 px-4 py-2 rounded-md text-sm font-medium max-w-xl w-full ${
                  statusType === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {subscriptionStatus}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
