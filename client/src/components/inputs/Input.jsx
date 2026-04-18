import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

export default function Input({
  name,
  label,
  placeholder,
  type,
  onChange,
  value,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-1 md:gap-3 w-full">
      <label htmlFor={name} className="">
        {label}
      </label>
      <div className="bg-gray-100 p-2 rounded-md border border-slate-100 focus-within:border-orange-300 flex justify-between">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          id={name}
          value={value}
          onChange={(e) => onChange(e)}
          className="outline-none  text-black flex-1"
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <FaEyeSlash
                size={20}
                className="text-slate-500 cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEye
                size={20}
                className="text-amber-700 cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
