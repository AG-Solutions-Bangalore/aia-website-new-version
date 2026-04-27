import React, { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BASE_URL, IMAGE_PATH } from "@/api/base-url";

const NotificationPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [popupData, setPopupData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/api/getSidePopup`);
        setPopupData(response.data?.data || []);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchPopupData();
  }, []);

  /* ---------------- SHOW AFTER 2 SEC ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  /* ---------------- FLATTEN MESSAGES ---------------- */
  const flattenedMessages = useMemo(() => {
    if (!popupData || popupData.length === 0) return [];

    return popupData.flatMap((popup) => [
      {
        type: "outgoing",
        text: popup.side_popup_heading,
      },
      {
        type: "incoming",
        text: popup.side_popup_description,
        link: popup.side_popup_link,
      },
    ]);
  }, [popupData]);

  /* ---------------- ROTATION FIXED ---------------- */
  useEffect(() => {
    if (!isVisible) return;
    if (flattenedMessages.length === 0) return;

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % flattenedMessages.length);
    }, 3500);

    return () => clearInterval(messageInterval);
  }, [isVisible, flattenedMessages.length]);

  /* ---------------- CLOSE ---------------- */
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 400);
  };

  if (!isVisible) return null;

  const currentMessage = flattenedMessages[currentMessageIndex];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.95 }}

      animate={
        isClosing
          ? { y: 100, opacity: 0, scale: 0.95 }
          : isVisible
            ? { y: 0, opacity: 1, scale: 1 }
            : { y: 100, opacity: 0, scale: 0.95 }
      }
      transition={{ duration: 0.4 }}
      className="fixed bottom-5 right-5 z-50"
    >
      {/* <div className="relative bg-transparent p-4 w-80"> */}
      <div className="relative bg-transparent p-4 w-80 min-h-[120px]">
        {" "}
        <button
          onClick={handleClose}
          className="absolute top-2.5 right-2.5 text-[#F3831C] cursor-pointer hover:text-gray-600 transition-all duration-200 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1 hover:scale-110 shadow-sm"
        >
          <X size={16} />
        </button>
        <div className="space-y-3">
          <AnimatePresence mode="wait" initial={false}>
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-600"
              >
                Loading...
              </motion.div>
            ) : isError ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-500"
              >
                Failed to load messages
              </motion.div>
            ) : (
              currentMessage && (
                <motion.div
                  key={currentMessageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${
                    currentMessage.type === "incoming"
                      ? "items-start gap-2"
                      : "justify-end"
                  }`}
                >
                  {currentMessage.type === "incoming" && (
                    <img
                      src={`${IMAGE_PATH}/aia_dp.webp`}
                      alt="avatar"
                      className="w-7 h-7 rounded-full flex-shrink-0"
                    />
                  )}

                  <div
                    className={`text-sm px-4 py-2.5 rounded-xl max-w-[75%] min-h-[40px] ${
                      currentMessage.type == "incoming"
                        ? "bg-blue-50 text-gray-800 rounded-tl-none"
                        : "bg-[#F3831C] text-white rounded-tr-none"
                    }`}
                  >
                    {currentMessage.link ? (
                      <a
                        href={currentMessage.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {currentMessage.text}
                      </a>
                    ) : (
                      currentMessage.text
                    )}
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationPopup;
