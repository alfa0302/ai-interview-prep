import React from "react";
import { getInitials } from "../../utils/helper";
import { LuTrash } from "react-icons/lu";

export default function SummaryCard({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) {
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      className="flex flex-col gap-5 border border-gray-200 p-3 rounded cursor-pointer relative group"
      onClick={() => onSelect()}
    >
      <div
        className="flex gap-5 p-3 rounded-lg"
        style={{ background: colors?.bgcolor }}
      >
        <div className="bg-white text-2xl font-semibold w-12 h-12 flex items-center justify-center rounded-lg">
          <span>{getInitials(role)}</span>
        </div>
        <div className="">
          <h3 className="text-lg font-semibold">{role}</h3>
          <p className="text-md text-slate-700">{topicsToFocus}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 text-sm font-semibold">
        <div className="border border-gray-500 rounded-full px-2">
          Experience {experience}
        </div>
        <div className="border border-gray-500 rounded-full px-2">
          {questions} Q&A
        </div>
        <div className="border border-gray-500 rounded-full px-2">
          Last Updated: {lastUpdated}
        </div>
      </div>
      <p className=" text-slate-700 mb-3">{description}</p>
      <button
        onClick={handleDeleteClick}
        className="absolute top-5 right-5 bg-red-100 p-1 rounded-full cursor-pointer group-hover:block hidden transition-all ease-in duration-100"
      >
        <LuTrash className="text-red-500 text-sm" />
      </button>
    </div>
  );
}
