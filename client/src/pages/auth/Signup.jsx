import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input.jsx";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector.jsx";
import { validateEmail } from "../../utils/helper.js";

export default function Signup({ setCurrentPage }) {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="">
      <h3 className="text-xl font-semibold">Create an account</h3>
      <p className="text-desc">Join us today by entering your details</p>
      <form className="flex flex-col my-5 gap-6" onSubmit={handleSubmit}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <Input
          name="fullname"
          type="text"
          label="Full Name"
          placeholder="John Doe"
          onChange={({ target }) => setFullName(target.value)}
          value={fullName}
        />
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
          SIGN UP
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <span
          className="text-primary hover:underline cursor-pointer"
          onClick={() => setCurrentPage("login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
