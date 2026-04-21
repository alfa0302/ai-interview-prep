import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/home/Dashboard";
import InterviewPrep from "./pages/interview-prep/InterviewPrep";
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/interview-prep/:sessionId"
              element={<InterviewPrep />}
            />
          </Routes>
        </BrowserRouter>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontsize: "13px",
            },
          }}
        />
      </div>
    </UserProvider>
  );
}
