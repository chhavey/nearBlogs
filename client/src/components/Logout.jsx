import React from "react";
import { logoutUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.success) {
        // onLogout();
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center fixed bottom-0 left-0 p-4"
      onClick={handleLogout}
    >
      <FontAwesomeIcon icon={faSignOutAlt} />
      <div>Logout</div>
    </div>
  );
};

export default Logout;
