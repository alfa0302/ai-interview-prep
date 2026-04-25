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
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../components/Drawer";

export default function InterviewPrep() {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);

  console.log(sessionData);
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
  const generateExplanation = async (question) => {
    try {
      setError("");
      setExplanation(null);
      setIsLoading(true);
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question },
      );
      if (response.data) {
        setIsLoading(false);
        setOpenLearnMoreDrawer(true);
        setExplanation(response.data);
        return;
      }
    } catch (error) {
      setExplanation(null);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        },
      );
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(
        API_PATHS.QUESTIONS.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        },
      );
      if (response.data) {
        toast.success("Added more Q&A!!");
        fetchSessionData();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError("Something went wrong. Please try again");
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  const toggleQuestionPin = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTIONS.PIN(questionId),
      );
      if (response.data && response.data.question) {
        fetchSessionData();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

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
      <div className="md:px-10 px-2 grid grid-cols-12 md:gap-3 relative">
        <div
          className={`col-span-12 ${openLearMoreDrawer ? "lg:col-span-7" : "lg:col-span-8"}`}
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
                    delay: index * 0.1,
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
                    openLearMoreDrawer={openLearMoreDrawer}
                  />
                  {!isLoading &&
                    sessionData?.questions?.length == index + 1 && (
                      <div className="flex justify-center">
                        <button
                          className="bg-black text-white flex gap-2 items-center justify-center px-2 py-1 cursor-pointer"
                          disabled={isLoading || isUpdateLoader}
                          onClick={uploadMoreQuestions}
                        >
                          {isUpdateLoader ? (
                            <SpinnerLoader />
                          ) : (
                            <LuListCollapse />
                          )}
                          <span>Load More</span>
                        </button>
                      </div>
                    )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div
          className={`lg:col-span-5 col-span-12 flex justify-center items-center shadow-2xl bg-white ${openLearMoreDrawer ? "absolute md:relative top-0 left-0 right-0" : ""}`}
        >
          {openLearMoreDrawer && (
            <Drawer
              isOpen={openLearMoreDrawer}
              onClose={() => setOpenLearnMoreDrawer(false)}
              title={!isLoading && explanation?.title}
            >
              {error && (
                <p className="flex gap-2 text-sm text-amber-600 font-medium">
                  <LuCircleAlert className="mt-1" /> {error}
                </p>
              )}
              {!isLoading && explanation && (
                <AIResponsePreview answer={explanation} />
              )}
            </Drawer>
          )}
        </div>
        {isLoading && (
          <div className="bg-gray-300 opacity-50 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            <SpinnerLoader />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
