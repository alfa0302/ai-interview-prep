import React, { useRef, useState, useEffect } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/interview-prep/components/AIResponsePreview";

export default function QuestionCard({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
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
      className={`w-[70%] border border-gray-200 shadow-2xl rounded-lg mb-10 p-5 flex flex-col ${isExpanded ? "gap-4" : ""}`}
    >
      <div className=" flex items-center justify-between">
        <div className="flex gap-3 flex-1">
          <span className="text-desc">Q</span>
          <h3>{question}</h3>
        </div>
        <div className="flex items-center justify-end gap-5 w-[25%]">
          <span className="text-indigo-800 bg-indigo-100 px-2 py-1 rounded-lg cursor-pointer">
            {isPinned ? <LuPinOff /> : <LuPin />}
          </span>
          <span className="flex items-center text-cyan-800 bg-cyan-100 px-2 py-1 rounded-lg cursor-pointer gap-2">
            <LuSparkles />
            <span className="hidden md:inline text-sm font-medium">
              Learn More
            </span>
          </span>
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
