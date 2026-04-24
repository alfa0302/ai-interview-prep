import React from "react";
import { LuX } from "react-icons/lu";

export default function Drawer({ isOpen, onClose, title, children }) {
  return (
    <div className="relative rounded-lg w-full h-full">
      <div
        onClick={onClose}
        className="absolute top-3 right-3 cursor-pointer text-slate-600 hover:text-amber-400 transition-color ease-in duration-75"
      >
        <svg height="10" width="10" viewBox="0 0 10 10">
          <path
            d="M 0 0 L 10 10 M 10 0 L 0 10"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <h3 className="mt-5 ms-5 font-semibold text-lg">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
