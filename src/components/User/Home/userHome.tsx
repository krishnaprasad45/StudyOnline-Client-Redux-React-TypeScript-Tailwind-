// User Dashboard.js
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import "./userHome.css";

import { Link } from "react-router-dom";

const Homepage: React.FC = () => {
 
  return (
    <div
      className="w-1/5 bg-gradient-to-r from-blue via-#002D74 to-blue h-screen p-4 flex flex-col fixed"
      style={{ backgroundColor: "#5885AF" }}
    ><h1 className="font-semibold flex justify-center mb-4 text-xl text-neutral-50">LEARNER</h1>
      <Link
        className="mb-12 p-2 rounded buttonStyle2"
        to={userEndpoints.myCourse}
      >
        <button>Courses</button>
      </Link>

      <Link
        className="mb-12 p-2 rounded buttonStyle2"
        to={userEndpoints.videomeetJoin}
      >
        <button>VideoMeet</button>
      </Link>
      <Link className="mb-12 p-2 rounded buttonStyle2" to={userEndpoints.chat}>
        <button>Chat With Mentor</button>
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
