import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function ProfileInfoCard() {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return (
    user && (
      <div className="flex gap-3 items-center">
        <img
          src={user.profileImageUrl}
          alt="profile picture"
          className="h-12 w-12 rounded-full"
        />
        <div className="flex flex-col">
          <h4 className="text-sm">{user.name || ""}</h4>
          <button
            className="text-sm text-primary cursor-pointer"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
}
