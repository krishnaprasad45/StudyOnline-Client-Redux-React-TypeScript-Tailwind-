// Mentor Dashboard.js
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import "./mentorHome.css";
import { Link } from "react-router-dom";
import { socket } from '../../../services/socket.io/socketConfig'
import { useEffect, useState } from "react";

const Homepage = () => {

  socket.connect();
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    })
  }, [])
  console.log("Socket.io connection",connected)
  return (
   
      <div
        className="w-1/5 bg-gradient-to-r from-white via-#002D74 to-white h-screen p-4 flex flex-col fixed"
        style={{ backgroundColor: "rgb(0, 45, 116)" }}
      >
        <Link className="mb-12 p-2 rounded buttonStyle" to={mentorEndpoints.courses}>
          <button>Courses</button>
        </Link>

        <Link className="mb-12 p-2 rounded buttonStyle" to={mentorEndpoints.videomeet}>
          <button>VideoMeet</button>
        </Link>
        <Link className="mb-12 p-2 rounded buttonStyle" to={mentorEndpoints.chat}>
          <button>Chat</button>
        </Link>
        <Link className="mb-12 p-2 rounded buttonStyle" to={mentorEndpoints.payments}>
          <button>Payment Details</button>
        </Link>
        <Link className="mb-12 p-2 rounded buttonStyle" to={mentorEndpoints.profile}>
          <button>Profile</button>
        </Link>
      </div>
   
  );
};

export default Homepage;
