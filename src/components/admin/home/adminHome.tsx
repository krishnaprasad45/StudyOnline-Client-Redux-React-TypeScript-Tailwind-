// Mentor Dashboard.js
import "./adminHome.css";
import { useState } from "react";

import Chat from "./chat";
import MentorManagement from "./mentorMangement";
import SalesReport from "./salesReport";
import StatisticsPage from "./statisticsPage";
import UserManagement from "./userManagement";
import VideoMeet from "./videomeet";

const AdminHome = () => {
  const [selectedButton, setSelectedButton] = useState("MyCourse");

  const renderComponent = () => {
    switch (selectedButton) {
      case "UserManagement":
        return <UserManagement />;
      case "MentorManagement":
        return <MentorManagement />;
      case "StatisticsPage":
        return <StatisticsPage />;
      case "VideoMeet":
        return <VideoMeet />;
      case "Chat":
        return <Chat />;
      case "SalesReport":
        return <SalesReport />;
      case "Logout":
        return <UserManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen mx-auto">
      {/* Left Side - Buttons */}
      <div
        className="w-1/5 bg-gradient-to-r from-white via-#002D74 to-white p-4 flex flex-col fixed"
        style={{ backgroundColor: "rgb(0, 45, 116)" }}
      >
        <button
          className="mb-12 p-2 rounded buttonStyleAdmin"
          onClick={() => setSelectedButton("StatisticsPage")}
        > 
          Statistics
        </button>
        <button
          className="mb-12 p-2 rounded buttonStyleAdmin"
          onClick={() => setSelectedButton("UserManagement")}
        >
          UserManagement
        </button>
        <button
          className="mb-12 p-2 rounded buttonStyleAdmin"
          onClick={() => setSelectedButton("MentorManagement")}
        >
          MentorManagement
        </button>
        <button
          className="mb-12 p-2 rounded buttonStyleAdmin"
          onClick={() => setSelectedButton("VideoMeet")}
        >
          VideoMeet
        </button>
        <button
          className="mb-12 p-2 rounded buttonStyleAdmin"
          onClick={() => setSelectedButton("Chat")}
        >
          Chat
        </button>
        <button
          className="mb-12 p-2 rounded buttonStyleAdmin"
          onClick={() => setSelectedButton("SalesReport")}
        >
          SalesReport
        </button>

        <button
          className="mb-12 p-2 rounded buttonStyleAdmin"
          onClick={() => setSelectedButton("Logout")}
        >
          Logout
        </button>
      </div>

      {/* Right Side - Rendered Component */}
      <div className="flex-grow p-4 bg-[#bb96ce]  h-sm-[40vh] h-[200vh] mx-auto">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminHome;
