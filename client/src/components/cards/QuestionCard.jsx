import React, { useRef, useState, useEffect } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/interview-prep/components/AIResponsePreview";

export default function QuestionCard({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
  openLearMoreDrawer,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);
  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
      className={`w-full border border-gray-200 shadow-2xl rounded-lg mb-10 md:p-5 p-2 flex flex-col group ${isExpanded ? "gap-4" : ""}`}
    >
      <div className=" flex items-center justify-between">
        <div className="flex md:gap-3 gap-1 flex-1">
          <span className="text-desc">Q</span>
          <h3>{question}</h3>
        </div>
        <div className="flex items-center justify-end md:gap-5 gap-1 md:w-[25%]">
          <div className="flex flex-col md:flex-row gap-1">
            <button
              className="text-indigo-800 bg-indigo-100 px-2 py-1 rounded-lg cursor-pointer md:hidden md:group-hover:flex"
              onClick={() => onTogglePin()}
            >
              {isPinned ? <LuPinOff /> : <LuPin />}
            </button>
            <button
              className="items-center text-cyan-800 bg-cyan-100 px-2 py-1 rounded-lg cursor-pointer gap-2 md:hidden md:group-hover:flex"
              onClick={() => onLearnMore()}
            >
              <LuSparkles />
              <span
                className={`hidden text-sm font-medium ${openLearMoreDrawer ? "md:hidden" : "md:inline"}`}
              >
                Learn More
              </span>
            </button>
          </div>
          <button
            className={`text-2xl text-desc cursor-pointer ${isExpanded ? "rotate-180 transition-transform duration-75 ease-in-out" : ""}`}
            onClick={() => toggleExpand()}
          >
            <LuChevronDown />
          </button>
        </div>
      </div>
      <div
        style={{ maxHeight: `${height}px` }}
        className="overflow-hidden transition-all duration-100 ease-in-out"
      >
        <div ref={contentRef} className="bg-gray-200 py-5 rounded">
          <AIResponsePreview answer={answer} />
        </div>
      </div>
    </div>
  );
}
