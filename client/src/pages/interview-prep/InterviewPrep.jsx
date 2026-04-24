import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import moment from "moment";
import QuestionCard from "../../components/cards/QuestionCard";

export default function InterviewPrep() {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState("");
  const [openLearMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);
  const fetchSessionData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSIONS.GET_ONE(sessionId),
      );
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Could not fetch session data", error);
    }
  };
  const generateExplanation = async (question) => {};
  const uploadMoreQuestions = async () => {};

  const toggleQuestionPin = async () => {};

  useEffect(() => {
    if (sessionId) {
      fetchSessionData();
    }
  }, []);
  return (
    <DashboardLayout>
      {sessionData && (
        <RoleInfoHeader
          role={sessionData?.role}
          experience={sessionData?.experience}
          topics={sessionData?.topicsToFocus}
          description={sessionData?.description}
          count={sessionData?.questions?.length}
          lastUpdatedAt={
            sessionData?.updatedAt
              ? moment(sessionData.updatedAt).format("Do MMM YYYY")
              : ""
          }
        />
      )}
      <div className="px-10">
        <div
          className={`col-span-12 ${openLearMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}
        >
          <h3 className="text-xl font-semibold mb-5 mt-5">Interview Q&A</h3>
          <AnimatePresence>
            {sessionData?.questions?.map((data, index) => {
              return (
                <motion.div
                  key={data._id || index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100,
                    dealy: index * 0.1,
                    damping: 15,
                  }}
                  layout
                  layoutId={`question-${data._id || index}`}
                >
                  <QuestionCard
                    question={data?.question}
                    answer={data?.answer}
                    onLearnMore={() => generateExplanation(data.question)}
                    isPinned={data?.isPinned}
                    onTogglePin={() => toggleQuestionPin(data._id)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
