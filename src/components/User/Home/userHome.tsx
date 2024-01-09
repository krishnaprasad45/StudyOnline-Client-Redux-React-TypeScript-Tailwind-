// User Dashboard.js
import { useState, useEffect } from "react";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import { socket } from "../../../services/socket.io/socketConfig";
import "./userHome.css";

import { Link } from "react-router-dom";

const Homepage: React.FC = () => {
  socket.connect();
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });
  }, []);
  console.log("Socket.io connection", connected);
  return (
    <div
      className="w-1/5 bg-gradient-to-r from-white via-#002D74 to-white h-screen p-4 flex flex-col fixed"
      style={{ backgroundColor: "rgb(0, 45, 116)" }}
    >
      <Link
        className="mb-12 p-2 rounded buttonStyle2"
        to={userEndpoints.courses}
      >
        <button>Courses</button>
      </Link>


      <Link
        className="mb-12 p-2 rounded buttonStyle2"
        to={userEndpoints.videomeet}
      >
        <button>VideoMeet</button>
      </Link>
      <Link className="mb-12 p-2 rounded buttonStyle2" to={userEndpoints.chat}>
        <button>Chat</button>
      </Link>
      <Link
        className="mb-12 p-2 rounded buttonStyle2"
        to={userEndpoints.payments}
      >
        <button>Payment Details</button>
      </Link>
      <Link
        className="mb-12 p-2 rounded buttonStyle2"
        to={userEndpoints.profile}
      >
        <button>Profile</button>
      </Link>
    </div>
  );
};

export default Homepage;
