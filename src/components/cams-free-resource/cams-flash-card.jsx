"use client";
import { BASE_URL, IMAGE_PATH } from "@/api/base-url";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { Button } from "../ui/button";

const CAMSFlashCard = () => {
  const [openDrawer, setOpenDrawer] = useState(null);
  const [flippedCardKey, setFlippedCardKey] = useState(null);

  const {
    data: flashCardData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["flash-card-cams"],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/api/getFlashCardByCourse/CAMS`
      );
      return response.data;
    },
  });

  const transformApiDataToModules = (apiData) => {
    if (!apiData || !apiData.data || !Array.isArray(apiData.data)) {
      return [];
    }

    const groupedCards = apiData.data.reduce((acc, card) => {
      const group = card.flash_cards_group;
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push({
        id: card.id,
        question: card.flash_cards_question,
        answer: card.flash_cards_answer,
      });
      return acc;
    }, {});

    const moduleMetadata = {
      1: {
        id: 1,
        number: "01",
        title: "Understanding the Risks and Methods of Financial Crime",
        icon: `${IMAGE_PATH}/CAMs_Understanding_the_Risks_and_Methods_of_Financial_Crime.webp`,
      },
      2: {
        id: 2,
        number: "02",
        title: "Global AFC Frameworks, Governance, and Regulations",
        icon: `${IMAGE_PATH}/Building_an_AFC_Compliance_Program.webp`,
      },
      3: {
        id: 3,
        number: "03",
        title: "Building an AFC \n Compliance Program",
        icon: `${IMAGE_PATH}/Internal_Audit_Operations_and_Audit_Plan.webp`,
      },
      4: {
        id: 4,
        number: "04",
        title: "Tools and Technologies to Fight Financial Crimes",
        icon: `${IMAGE_PATH}/Internal_Audit_Professionalism_and_Quality.webp`,
      },
    };

    const modules = Object.keys(moduleMetadata).map((groupKey) => {
      const metadata = moduleMetadata[groupKey];
      const cards = groupedCards[groupKey] || [];

      const sortedCards = cards.sort((a, b) => {
        const cardA = apiData.data.find((item) => item.id === a.id);
        const cardB = apiData.data.find((item) => item.id === b.id);

        const orderA = cardA ? cardA.flash_cards_no : a.id;
        const orderB = cardB ? cardB.flash_cards_no : b.id;

        return orderA - orderB;
      });

      return {
        ...metadata,
        cards: sortedCards,
      };
    });

    return modules;
  };

  const modules = transformApiDataToModules(flashCardData);

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

  if (isError) {
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
  return (
    <div className="w-full bg-white pb-12 px-4  sm:px-6  md:px-8">
      <SectionHeading
        title="CAMS Free Flashcards - Section Wise"
        description="Explore free flashcards to revise key AML topics, improve your understanding, and make your CAMS exam preparation more effective."
        align="center"
      />

      <div className="mx-auto max-w-5xl cursor-pointer">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 md:gap-10">
          {modules.map((module) => (
            <div
              key={module.id}
              className="flex flex-col items-center h-full text-center"
            >
              <div className="relative group">
                <button className="cursor-pointer relative mb-3 flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 shadow-xl sm:h-32 sm:w-32 md:h-36 md:w-36">
                  {/* <span className="relative z-10 text-8xl">{module.icon}</span> */}
                  <img
                    src={module.icon}
                    className="h-26 w-26 object-contain"
                    loading="lazy"
                  />
                </button>
              </div>
              <div className="flex flex-col flex-1 items-center w-full">
                <p className="text-xs font-semibold sm:text-sm text-[#0F3652] min-h-[40px]">
                  <span className="mt-1 text-xs font-bold sm:text-sm text-[#F3831C]">
                    {module.number}
                  </span>{" "}
                  {module.title.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}{" "}
                </p>

                <Button
                  className="mt-auto mb-2 px-4 py-2 text-xs mt-4 bg-[#F3831C] cursor-pointer text-white rounded-lg hover:bg-[#0F3652] hover:text-white transition-colors duration-300"
                  variant="ghost"
                  aria-label="Click Here"
                  onClick={() => setOpenDrawer(module.id)}
                >
                  Click Here
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Drawer
        open={openDrawer !== null}
        onOpenChange={handleDrawerChange}
        snapPoints={[0.7]}
      >
        <DrawerContent className="flex max-h-[95vh] flex-col">
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
                Module {currentModule?.number}
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
                          className="mt-auto  w-full text-end x-4 py-1.5 text-xs font-medium text-black transition-colors sm:px-4 sm:py-1.5 sm:text-sm"
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

export default CAMSFlashCard;
