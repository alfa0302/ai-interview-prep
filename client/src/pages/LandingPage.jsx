import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

import HERO_IMAGE from "../assets/hero-image.png";
import { APP_FEATURES } from "../utils/data";
import Modal from "../components/Modal";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import { UserContext } from "../context/UserContext";
import ProfileInfoCard from "../components/cards/ProfileInfoCard";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModel(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className={openAuthModel ? "blur-xs" : "opacity-100"}>
        <div className="w-full min-h-[80vh] bg-linear-to-r from-[#fffade] to-[#FFFCEF] px-5 md:px-15 lg:px-25">
          <div className="pt-5 md:pt-0">
            {/* header */}
            <header className="flex justify-between items-center py-5 font-semibold">
              <div className="text-[18px] sm:text-[22px]">
                Interview Prep AI
              </div>
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
            {/* hero content */}
            <div className="flex md:flex-row flex-col gap-3">
              <div className="md:w-1/2 md:py-15 pt-10 pb-5">
                <div className="text-[13px] bg-amber-100 text-amber-600 border border-amber-600 px-2 py-1 rounded-full leading-tight font-semibold inline-flex gap-1">
                  <LuSparkles />
                  AI Powered
                </div>
                <h1 className="text-5xl font-medium mt-5">
                  Ace Interviews with
                  <br />
                  <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#ff9324_0%,#fcd760_100%)] bg-size-[200%_200%] animate-text-shine">
                    AI-Powered
                  </span>{" "}
                  Learning
                </h1>
              </div>
              <div className=" md:w-1/2 md:py-15 py-5">
                <p className="mb-10">
                  Transform your career journey with the power of intelligent
                  preparation. We provide the actionable insights you need to
                  build genuine confidence. Whether you are mastering complex
                  frontend concepts or refining your behavioral storytelling,
                  our AI coach adapts to your unique pace, helping you bridge
                  the gap between your current expertise and your next big
                  breakthrough.
                </p>
                <button
                  className="bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-amber-100 border hover:border-amber-600 hover:text-black cursor-pointer font-semibold"
                  onClick={() => handleCTA()}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full min-h-full flex justify-center">
          <img
            src={HERO_IMAGE}
            alt="hero image"
            className="rounded-2xl mt-10 md:-mt-18 lg:-mt-20 xl:-mt-38 w-9/10 md:w-7/10 border-b border-amber-200"
          />
        </div>
        <div className="mt-10 md:mt-15 pb-10 pt-18 md:pb-12 bg-[#fffade]">
          <h2 className="text-center text-4xl font-medium mb-10">
            Features That Make You Shine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-5 md:gap-y-10 align-center px-5 md:px-10 py-5 md:py-10">
            {APP_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col gap-5 border border-amber-200 p-5 rounded-lg bg-white"
              >
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-slate-800">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        <footer className="my-2 text-center">
          AI Interview Prep App ❤️ Inspired By timetoprogram.com
        </footer>
      </div>

      <Modal
        isOpen={openAuthModel}
        onClose={() => {
          setOpenAuthModel(false);
          setCurrentPage("login");
        }}
        hideHeader
        title
        currentPage={currentPage}
      >
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      </Modal>
    </>
  );
}
