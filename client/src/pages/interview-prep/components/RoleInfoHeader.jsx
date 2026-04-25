import React from "react";

export default function RoleInfoHeader({
  role,
  experience,
  topics,
  count,
  lastUpdatedAt,
}) {
  return (
    <div className="py-8 px-10">
      <h3 className="text-2xl font-semibold  mb-2">{role}</h3>
      <p className="mb-3">{topics}</p>
      <div className="flex gap-3 flex-wrap">
        <span className="text-white bg-black py-1 px-4 rounded-full text-sm">
          Experience: {experience}
        </span>
        <span className="text-white bg-black py-1 px-4 rounded-full text-sm">
          {count} Q&A
        </span>
        <span className="text-white bg-black py-1 px-4 rounded-full text-sm">
          Last Updated: {lastUpdatedAt}
        </span>
      </div>
    </div>
  );
}
