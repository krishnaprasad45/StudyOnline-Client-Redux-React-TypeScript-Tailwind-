// Mentor Dashboard.js
import { useEffect, useState } from "react";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import "./mentorHome.css";
import { Link, useNavigate } from "react-router-dom";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import  ProfileInterface  from "../../../Interfaces/mentorInterfaces";


const Homepage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ProfileInterface>();
  const isBlock = data?.isBlock;
  
  useEffect(() => {
    const mentorEmail: string | null = localStorage.getItem("mentorEmail");
    if (!mentorEmail) {
      navigate(mentorEndpoints.login);
    } else {
      const token = localStorage.getItem("mentorToken");

      mentorAxios
        .get(mentorEndpoints.profile, {
          params: { email: mentorEmail },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [isBlock]);
  
  return (
    <div
      className="w-1/5 bg-gradient-to-r from-yellow via-#002974 to-yellow h-screen p-4 flex flex-col fixed"
      style={{ backgroundColor: "#C55FFC" }}
    >
      <h1 className="font-semibold flex justify-center mb-4 text-xl text-neutral-50">
        MENTOR
      </h1>
      {isBlock ? (
         <p className="text-red-500 font-semibold mb-4 bg-black p-4">
         You are blocked by the admin !!
       </p>
      ) : (
        <>
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
      </>
      )}
    </div>
  );
};

export default Homepage;
