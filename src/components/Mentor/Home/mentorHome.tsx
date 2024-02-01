// Mentor Dashboard.js
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import "./mentorHome.css";
import { Link } from "react-router-dom";


const Homepage = () => {
  
  return (
    <div
      className="w-1/5 bg-gradient-to-r from-yellow via-#002974 to-yellow h-screen p-4 flex flex-col fixed"
      style={{ backgroundColor: "#C55FFC" }}
    >
      <h1 className="font-semibold flex justify-center mb-4 text-xl text-neutral-50">
        MENTOR
      </h1>

      <Link
        className="mb-12 p-2 rounded buttonStyle"
        to={mentorEndpoints.courses}
      >
        <button>Courses</button>
      </Link>
      <Link
        className="mb-12 p-2 rounded buttonStyle"
        to={mentorEndpoints.learners}
      >
        <button>Learners</button>
      </Link>

      <Link
        className="mb-12 p-2 rounded buttonStyle"
        to={mentorEndpoints.payments}
      >
        <button>Payment Details</button>
      </Link>
      <Link
        className="mb-12 p-2 rounded buttonStyle"
        to={mentorEndpoints.profile}
      >
        <button>Profile</button>
      </Link>
    </div>
  );
};

export default Homepage;
