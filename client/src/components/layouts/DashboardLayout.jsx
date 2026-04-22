import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar variant="dashboard" />
      {user && <div>{children}</div>}
    </div>
  );
}
