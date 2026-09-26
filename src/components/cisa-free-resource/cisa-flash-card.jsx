"use client";
import { BASE_URL, IMAGE_PATH } from "@/api/base-url";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CISA_FLASHCARDS } from "@/data/cisaFreeResources";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { Button } from "../ui/button";

const MODULE_META = {
  1: {
    id: 1,
    number: "01",
    title: "Information System Auditing Process",
    icon: `${IMAGE_PATH}/flash_card_1.webp`,
  },
  2: {
    id: 2,
    number: "02",
    title: "Governance & Management of IT",
    icon: `${IMAGE_PATH}/flash_card_3.webp`,
  },
  3: {
    id: 3,
    number: "03",
    title: "IS Acquisition, Development & Implementation",
    icon: `${IMAGE_PATH}/flash_card_4.webp`,
  },
  4: {
    id: 4,
    number: "04",
    title: "IS Operations & Business Resilience",
    icon: `${IMAGE_PATH}/Engagement_Planning.webp`,
  },
  5: {
    id: 5,
    number: "05",
    title: "Protection of Information Assets",
    icon: `${IMAGE_PATH}/Engagement_Results_and_Monitoring.webp`,
  },
};

const buildStaticModules = () =>
  CISA_FLASHCARDS.map((domain) => ({
    ...(MODULE_META[domain.id] || {
      id: domain.id,
      number: domain.number,
      title: domain.title,
      icon: `${IMAGE_PATH}/flash_card_1.webp`,
    }),
    title: MODULE_META[domain.id]?.title || domain.title,
    cards: domain.cards,
  }));

const CISAFlashCard = () => {
  const [openDrawer, setOpenDrawer] = useState(null);
  const [flippedCardKey, setFlippedCardKey] = useState(null);

  const {
    data: flashCardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["flash-card-cisa"],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/api/getFlashCardByCourse/CISA`
      );
      return response.data;
    },
    retry: 1,
    staleTime: 1000 * 60 * 10,
  });

  const modules = useMemo(() => {
    const rows = flashCardData?.data;
    if (Array.isArray(rows) && rows.length > 0) {
      const grouped = rows.reduce((acc, card) => {
        const group = Number(card.flash_cards_group) || 1;
        if (!acc[group]) acc[group] = [];
        acc[group].push({
          id: card.id,
          question: card.flash_cards_question,
          answer: card.flash_cards_answer,
          sort: card.flash_cards_no ?? card.id,
        });
        return acc;
      }, {});
      return Object.keys(MODULE_META).map((key) => {
        const id = Number(key);
        const cards = (grouped[id] || [])
          .sort((a, b) => a.sort - b.sort)
          .map(({ id: cid, question, answer }) => ({
            id: cid,
            question,
            answer,
          }));
        return { ...MODULE_META[id], cards };
      });
    }
    return buildStaticModules();
  }, [flashCardData]);

  const toggleFlip = (moduleId, cardId) => {
    const key = `${moduleId}-${cardId}`;
    setFlippedCardKey((prev) => (prev === key ? null : key));
  };

  const closeDrawer = () => {
    setOpenDrawer(null);
    setFlippedCardKey(null);
  };

  const handleDrawerChange = (open) => {
    if (!open) {
      closeDrawer();
    }
  };

  const currentModule = modules.find((m) => m.id === openDrawer);

  if (isLoading) {
    return (
      <div className="w-full bg-white py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="mb-2 text-xl font-bold text-gray-800 sm:mb-4 sm:text-2xl md:text-3xl">
            <span className="mr-2" style={{ color: "#F3831C" }}>
              »
            </span>
            Free Flash Cards
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">
            Loading flash cards...
          </p>
        </div>
        <div className="flex justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-4 border-[#F3831C] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  // Only hard-fail when both API and static fallback are empty.
  if ((isError && modules.length === 0) || modules.every((m) => m.cards.length === 0)) {
    if (isError && buildStaticModules().every((m) => m.cards.length === 0)) {
      return (
        <div className="w-full bg-white py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-2 text-xl font-bold text-gray-800 sm:mb-4 sm:text-2xl md:text-3xl">
              <span className="mr-2" style={{ color: "#F3831C" }}>
                »
              </span>
              Free Flash Cards
            </h2>
            <p className="text-sm text-red-600 sm:text-base">
              Failed to load flash cards. Please try again later.
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="w-full bg-white pb-12 px-4 sm:px-6 md:px-8">
      <SectionHeading
        title="CISA Free Flashcards - Domain-wise"
        description="Select any domain to access free flashcards that help you revise key concepts, strengthen your recall, and build confidence in your CISA preparation."
        align="center"
      />

      <div className="mx-auto max-w-5xl cursor-pointer">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-5 md:gap-10 items-stretch">
          {modules.map((module) => (
            <div
              key={module.id}
              className="flex flex-col items-center h-full text-center"
            >
              <div className="relative group">
                <button className="cursor-pointer relative mb-3 flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 shadow-xl sm:h-32 sm:w-32 md:h-36 md:w-36">
                  <img
                    src={module.icon}
                    alt={module.title || "CISA Flashcard Module"}
                    title={module.title || "CISA Flashcard Module"}
                    className="h-26 w-26 object-contain"
                    loading="lazy"
                  />
                </button>
              </div>
              <div className="flex flex-col flex-1 items-center w-full">
                <p className="text-xs font-semibold sm:text-sm text-[#0F3652] min-h-[63px] sm:min-h-[66px] leading-5">
                  <span className="mt-1 text-xs font-bold sm:text-sm text-[#F3831C]">
                    {module.number}
                  </span>{" "}
                  {module.title.split("\n").map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}{" "}
                </p>

                <div className="mt-auto pt-4 pb-2">
                  <Button
                    className="px-4 py-2 text-xs bg-[#F3831C] cursor-pointer text-white rounded-lg hover:bg-[#0F3652] hover:text-white transition-colors duration-300"
                    variant="ghost"
                    aria-label="Click Here"
                    onClick={() => setOpenDrawer(module.id)}
                  >
                    Click Here
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Drawer open={openDrawer !== null} onOpenChange={handleDrawerChange}>
        <DrawerContent className="flex max-h-[75vh] flex-col">
          <DrawerHeader
            className="text-white flex flex-row justify-between items-center"
            style={{ backgroundColor: "#0F3652" }}
          >
            <div>
              <DrawerTitle className="text-xl font-bold text-white sm:text-2xl">
                <span className="mr-2" style={{ color: "#F3831C" }}>
                  »
                </span>
                {currentModule?.title}
              </DrawerTitle>
              <DrawerDescription style={{ color: "#F3831C" }}>
                Domain {currentModule?.number}
              </DrawerDescription>
            </div>
            <button
              onClick={closeDrawer}
              className="w-24 rounded-none py-1 font-semibold text-white transition-colors sm:py-1 bg-[#F3831C] hover:bg-[#834409] cursor-pointer"
            >
              Close
            </button>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 pb-48 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentModule?.cards.map((card, index) => {
                const isFlipped = flippedCardKey === `${openDrawer}-${card.id}`;

                return (
                  <div
                    key={card.id}
                    className="group relative h-60 cursor-pointer perspective sm:h-64"
                    onClick={() => toggleFlip(openDrawer, card.id)}
                  >
                    <div
                      className={`relative h-full w-full transition-transform duration-500 preserve-3d ${
                        isFlipped ? "rotate-y-180" : ""
                      }`}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border-2 bg-white p-4 shadow-sm backface-hidden sm:p-4">
                        <div
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm"
                          style={{ backgroundColor: "#0F3652" }}
                        >
                          {index + 1}
                        </div>

                        <h4
                          className="mb-4 w-full h-full flex items-center justify-center text-center text-sm font-semibold sm:text-sm"
                          style={{ color: "#0F3652" }}
                        >
                          {card.question}
                        </h4>

                        <button
                          className="mt-auto w-full text-end x-4 py-1.5 text-xs font-medium text-black transition-colors sm:px-4 sm:py-1.5 sm:text-sm"
                          style={{ backgroundColor: "#F3831C" }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#e27519")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#F3831C")
                          }
                        >
                          Click to Flip
                        </button>
                      </div>

                      <div
                        className="absolute inset-0 flex items-center justify-center rounded-lg border-2 p-4 shadow-sm backface-hidden rotate-y-180 sm:p-4"
                        style={{
                          borderColor: "#0F3652",
                          background:
                            "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                        }}
                      >
                        <div className="prose prose-gray max-w-none w-full h-full flex items-center justify-center overflow-y-auto">
                          <div
                            className="ck-content text-center text-xs sm:text-sm"
                            style={{ color: "#0F3652" }}
                            dangerouslySetInnerHTML={{ __html: card.answer }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default CISAFlashCard;
