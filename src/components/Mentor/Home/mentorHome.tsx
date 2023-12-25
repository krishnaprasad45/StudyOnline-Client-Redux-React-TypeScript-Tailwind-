// Mentor Dashboard.js
import "./mentorHome.css";

import { Link } from "react-router-dom";

const Homepage = () => {
  return (
   
      <div
        className="w-1/5 bg-gradient-to-r from-white via-#002D74 to-white h-screen p-4 flex flex-col fixed"
        style={{ backgroundColor: "rgb(0, 45, 116)" }}
      >
        <Link className="mb-12 p-2 rounded buttonStyle" to="/mentor/list-allcourses">
          <button>Courses</button>
        </Link>

        {/* <Link
          className="mb-12 p-2 rounded buttonStyle"
          to="/mentor/assignments"
        >
          <button>Assignments</button>
        </Link> */}

        {/* <Link className="mb-12 p-2 rounded buttonStyle" to="/mentor/marks">
          <button>Marks</button>
        </Link> */}

        <Link className="mb-12 p-2 rounded buttonStyle" to="/mentor/videomeet">
          <button>VideoMeet</button>
        </Link>
        <Link className="mb-12 p-2 rounded buttonStyle" to="/mentor/chat">
          <button>Chat</button>
        </Link>
        <Link className="mb-12 p-2 rounded buttonStyle" to="/mentor/payments">
          <button>Payment Details</button>
        </Link>
        <Link className="mb-12 p-2 rounded buttonStyle" to="/mentor/profile">
          <button>Profile</button>
        </Link>
      </div>
   
  );
};

export default Homepage;