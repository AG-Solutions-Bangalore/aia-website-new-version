import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from '@/api/base-url';



const CfePracticeQuestion = () => {
  const { questions_module } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswerFor, setShowAnswerFor] = useState(null);

  const { data: practiceData = {}, isLoading, isError } = useQuery({
    queryKey: ["flash-card"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/api/getQuestionAnswer`);
      return response.data;
    },
  });

  const questionsData = practiceData.data || [];


  const getModuleTitle = (moduleCode) => {
    switch (moduleCode) {
      case "CFE-1":
        return "MODULE-I: FINANCIAL TRANSACTIONS AND FRAUD SCHEMES";
      case "CFE-2":
        return "MODULE-II: LAW";
      case "CFE-3":
        return "MODULE-III: INVESTIGATION";
      case "CFE-4":
        return "MODULE-IV: FRAUD PREVENTION & DETERRENCE";
      default:
        return "MODULE-I: FINANCIAL TRANSACTIONS AND FRAUD SCHEMES";
    }
  };

  const moduleQuestions = questionsData.filter(q => 
    q.questions_module === questions_module
  );

  const formatOptions = (question) => {
    const options = [];
    if (question.optionA) {
      options.push({ id: "A", text: question.optionA });
    }
    if (question.optionB) {
      options.push({ id: "B", text: question.optionB });
    }
    if (question.optionC) {
      options.push({ id: "C", text: question.optionC });
    }
    if (question.optionD) {
      options.push({ id: "D", text: question.optionD });
    }
    return options;
  };

  const getCorrectAnswerLetter = (question) => {
    if (!question || !question.answer) return "A";
    const options = formatOptions(question);
    const correctOption = options.find(opt => opt.text === question.answer);
    return correctOption ? correctOption.id : "A";
  };

  const handleShowAnswer = (questionId) => {
    setShowAnswerFor(showAnswerFor === questionId ? null : questionId);
  };

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  if (isLoading) {
    return (
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-340 mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-[#0F3652]">Loading questions...</div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || moduleQuestions.length === 0) {
    return (
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-340 mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500">Failed to load questions</div>
          </div>
        </div>
      </div>
    );
  }

  const moduleTitle = getModuleTitle(questions_module);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-340 mx-auto">
        <div className="mb-8">
          <div className="bg-[#0F3652] text-white text-center py-3 px-4 rounded-lg">
            <h1 className="text-lg sm:text-xl font-bold">
              {moduleTitle} - Practice Questions
            </h1>
          </div>
        </div>

        <div className="space-y- grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 gap-4">
          {moduleQuestions.map((question) => {
            const options = formatOptions(question);
            const correctAnswerLetter = getCorrectAnswerLetter(question);
            
            return (
           
 <div key={question.id} className="bg-white rounded-none px-6 py-3 border border-[#F3831C]/20">
                <div >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-[#F3831C] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {question.questions_no}
                    </div>
                    <h3 className="text-lg font-bold text-[#0F3652]">
                      Question {question.questions_no}
                    </h3>
                  </div>
                  <div className="w-12 h-0.5 bg-[#0F3652] rounded-full mb-4" />
                </div>

                <div className="pr-2">
                  <p className="text-[#0F3652] text-sm mb-2 font-medium">
                    {question.questions}
                  </p>

                  <div className="space-y-2 mb-2">
                    {options.map((option) => {
                      const isSelected = selectedAnswers[question.id] === option.id;
                      const isCorrect = option.id === correctAnswerLetter;
                      const showCorrect = showAnswerFor === question.id;
                      
                      return (
                        <div key={option.id} className="relative pl-8">
                          <label className="flex items-start cursor-pointer">
                            <div className="absolute left-0 top-0.5">
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                checked={isSelected}
                                onChange={() => handleOptionSelect(question.id, option.id)}
                                className="sr-only"
                              />
                              <div className={`
                                w-5 h-5 rounded-full border-2 flex items-center justify-center
                                ${showCorrect && isCorrect 
                                  ? "border-[#21bf73] bg-[#21bf73]" 
                                  : showCorrect && isSelected && !isCorrect
                                  ? "border-red-500 bg-red-500"
                                  : isSelected
                                  ? "border-[#0F3652]"
                                  : "border-gray-300"
                                }
                              `}>
                                {showCorrect && isCorrect && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                            </div>
                            <span className={`
                              text-[#0F3652] text-sm
                              ${showCorrect && isCorrect ? "text-[#21bf73] font-medium" : ""}
                            `}>
                              {option.text}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  <div className={`transition-all duration-300 ${showAnswerFor === question.id ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                    {showAnswerFor === question.id && (
                      <div className="bg-[#0F3652]/5 p-4 rounded-lg mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 bg-[#21bf73] rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <h5 className="text-sm font-bold text-[#0F3652]">Explanation:</h5>
                        </div>
                        <p className="text-[#0F3652] text-xs leading-relaxed">
                          <span className="font-semibold">{question.optionCorrect}</span>
                          <br />
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center ">
                    <button
                      onClick={() => handleShowAnswer(question.id)}
                      className="px-4 py-2 bg-[#F3831C] text-white text-xs font-semibold rounded-lg hover:bg-[#e57610] transition-colors duration-200 flex items-center justify-center gap-1"
                    >
                      <span>{showAnswerFor === question.id ? "Hide Answer" : "Show Answer"}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d={showAnswerFor === question.id ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

             
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default CfePracticeQuestion