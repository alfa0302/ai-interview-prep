import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input.jsx";
import { validateEmail } from "../../utils/helper.js";

export default function Login({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return setError("Please enter a valid email address");
    }
    if (!password) {
      return setError("Please enter the password");
    }
    setError("");
    try {
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };
  return (
    <div className="">
      <h3 className="text-xl font-semibold">Welcome Back</h3>
      <p className="text-desc">Please enter your details to login</p>
      <form className="flex flex-col my-5 gap-6" onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="john@email.com"
          onChange={({ target }) => setEmail(target.value)}
          value={email}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Min 8 Characters"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="text-white bg-black rounded-md p-2 cursor-pointer hover:bg-amber-100 border hover:border-amber-600 hover:text-black">
          LOGIN
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <span
          className="text-primary hover:underline cursor-pointer"
          onClick={() => setCurrentPage("signup")}
        >
          SignUp
        </span>
      </p>
    </div>
  );
}
