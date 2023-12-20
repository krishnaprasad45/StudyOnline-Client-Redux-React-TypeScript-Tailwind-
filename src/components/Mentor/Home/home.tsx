// Mentor Dashboard.js
import "./mentorHome.css";

import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="">
      <div
        className="w-1/5 bg-gradient-to-r from-white via-#002D74 to-white p-4 flex flex-col fixed"
        style={{ backgroundColor: "rgb(0, 45, 116)" }}
      >
        <Link className="mb-12 p-2 rounded buttonStyle" to="/mentor/mycourse">
          <button>Courses</button>
        </Link>

        <Link
          className="mb-12 p-2 rounded adminbuttonStyle"
          to="/mentor/assignments"
        >
          <button>Assignments</button>
        </Link>

        <Link className="mb-12 p-2 rounded buttonStyle" to="/mentor/marks">
          <button>Marks</button>
        </Link>

        <Link className="mb-12 p-2 rounded buttonStyle" to="/mentor/videomeet">
          <button>VideoMeet</button>
        </Link>
        <Link className="mb-12 p-2 rounded buttonStyle" to="/mentor/chat">
          <button>Chat</button>
        </Link>
        <Link className="mb-12 p-2 rounded buttonStyle" to="/mentor/payments">
          <button>Payments</button>
        </Link>
        <Link className="mb-12 p-2 rounded buttonStyle" to="/mentor/profile">
          <button>Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
