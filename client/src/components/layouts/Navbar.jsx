import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ProfileInfoCard from "../cards/ProfileInfoCard";
import { Link } from "react-router-dom";

export default function Navbar({
  setOpenAuthModel = () => {},
  variant = "home",
}) {
  const { user } = useContext(UserContext);
  return (
    <header
      className={`flex justify-between items-center py-5 font-semibold ${variant == "dashboard" ? "px-2 md:px-10 border-b border-gray-200" : ""}`}
    >
      <Link className="text-[18px] sm:text-[22px]" to={"/"}>
        Interview Prep AI
      </Link>
      {user ? (
        <ProfileInfoCard />
      ) : (
        <button
          className="bg-linear-to-r from-primary to-[#e99a4b] text-white text-sm px-5 py-1.5 rounded-full cursor-pointer"
          onClick={() => setOpenAuthModel(true)}
        >
          Login / Sign Up
        </button>
      )}
    </header>
  );
}
