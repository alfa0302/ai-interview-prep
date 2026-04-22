import React, { useState } from "react";
import Input from "../../components/inputs/Input";
import SpinnerLoader from "../../components/loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";

export default function CreateSessionForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus, description } = formData;
    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all required fields");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          description,
          numberOfQuestions: 10,
        },
      );
      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(API_PATHS.SESSIONS.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });
      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      <h3 className="text-xl font-semibold">Start a new interview journey</h3>
      <p className="text-desc">
        Fill out a few quick details and unlock your set of personalised
        interview questions!
      </p>
      <form className="flex flex-col my-5 gap-6" onSubmit={handleSubmit}>
        <Input
          name="role"
          type="text"
          label="Role"
          placeholder="Target role"
          onChange={({ target }) => handleChange("role", target.value)}
          value={formData.role}
        />
        <Input
          name="experience"
          type="number"
          label="Years of experience"
          placeholder="(e.g., 1 year, 3 years, 5+ years)"
          onChange={({ target }) => handleChange("experience", target.value)}
          value={formData.experience}
        />
        <Input
          name="focus"
          type="text"
          label="Topics to foucs on"
          placeholder="(Comma seperated, e.g., React, Nodejs, MongoDB)"
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          value={formData.topicsToFocus}
        />
        <Input
          name="description"
          type="text"
          label="Description"
          placeholder="(Any specific goals or notes for this session)"
          onChange={({ target }) => handleChange("description", target.value)}
          value={formData.description}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          className="text-white bg-black rounded-md p-2 cursor-pointer hover:bg-amber-100 border hover:border-amber-600 hover:text-black disabled:bg-gray-800 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex gap-2 justify-center items-center">
              <SpinnerLoader /> Loading
            </span>
          ) : (
            <span>CREATE SESSION</span>
          )}
        </button>
      </form>
    </div>
  );
}
