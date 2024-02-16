import { useEffect, useState } from "react";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import "./mentorHome.css";
import { Link, useNavigate } from "react-router-dom";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import  {ProfileInterface}  from "../../../Interfaces/mentorInterfaces";
import { IoBookSharp } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { MdOutlinePayment } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";



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
        <button className="flex items-center gap-2">
              <IoBookSharp className="ml-2" style={{ color: "black" }} />{" "}
              Courses
            </button>
      </Link>
      <Link
        className="mb-12 p-2 rounded buttonStyle"
        to={mentorEndpoints.learners}
      >
        <button className="flex items-center gap-2">
              <ImUsers className="ml-2" style={{ color: "black" }} />{" "}
              Learners
            </button>
      </Link>
      <Link
        className="mb-12 p-2 rounded buttonStyle"
        to={mentorEndpoints.community}
      >
        <button className="flex items-center gap-2">
              <HiUserGroup className="ml-2" style={{ color: "black" }} />{" "}
              Community
            </button>
      </Link>

      <Link
        className="mb-12 p-2 rounded buttonStyle"
        to={mentorEndpoints.payments}
      >
        <button className="flex items-center gap-2">
              <MdOutlinePayment className="ml-2" style={{ color: "black" }} />{" "}
              Payment Details
            </button>{" "}
      </Link>
      <Link
        className="mb-12 p-2 rounded buttonStyle"
        to={mentorEndpoints.profile}
      >
            <button className="flex items-center gap-2">
              <FaUser className="ml-2" style={{ color: "black" }} />{" "}
              Profile
            </button>
      </Link>
      </>
      )}
    </div>
  );
};

export default Homepage;
