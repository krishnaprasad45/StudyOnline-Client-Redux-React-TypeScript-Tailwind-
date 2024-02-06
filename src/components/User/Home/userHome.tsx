// User Dashboard.js
import { useEffect, useState } from "react";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import "./userHome.css";

import { Link, useNavigate } from "react-router-dom";
import { userProfile } from "../../../Interfaces/userInterfaces";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";
import { IoBookSharp, IoVideocam } from "react-icons/io5";
import { IoIosChatboxes } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { FaUser } from "react-icons/fa6";

const Homepage: React.FC = () => {
  const [data, setData] = useState<userProfile>();
  const isBlock = data?.isBlock;
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate(userEndpoints.login);
    } else {
      userAxios
        .get(userEndpoints.profile, {
          params: { email: userEmail },
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
      className="w-1/5 bg-gradient-to-r from-blue via-#002D74 to-blue h-screen p-4 flex flex-col fixed"
      style={{ backgroundColor: "#5885AF" }}
    >
      <h1 className="font-semibold flex justify-center mb-4 text-xl text-neutral-50">
        LEARNER
      </h1>
      {isBlock ? (
        <p className="text-red-500 font-semibold mb-4">
          You are blocked by the admin !!
        </p>
      ) : (
        <>
          <Link
            className="mb-12 p-2 rounded buttonStyle2"
            to={userEndpoints.myCourse}
          >
            <button className="flex items-center gap-2">
              <IoBookSharp className="ml-2" style={{ color: "black" }} />{" "}
              Courses
            </button>
          </Link>

          <Link
            className="mb-12 p-2 rounded buttonStyle2"
            to={userEndpoints.videomeetJoin}
          >
            <button className="flex items-center gap-2">
              <IoVideocam className="ml-2" style={{ color: "black" }} /> Video
              Meet
            </button>
          </Link>
          <Link
            className="mb-12 p-2 rounded buttonStyle2"
            to={userEndpoints.chat}
          >
            <button className="flex items-center gap-2">
              <IoIosChatboxes className="ml-2" style={{ color: "black" }} />{" "}
              Chat with Mentor
            </button>
          </Link>
          <Link
            className="mb-12 p-2 rounded buttonStyle2"
            to={userEndpoints.community}
          >
            <button className="flex items-center gap-2">
              <HiUserGroup className="ml-2" style={{ color: "black" }} />{" "}
              Community
            </button>
          </Link>
          <Link
            className="mb-12 p-2 rounded buttonStyle2"
            to={userEndpoints.payments}
          >
            <button className="flex items-center gap-2">
              <MdOutlinePayment className="ml-2" style={{ color: "black" }} />{" "}
              Payment Details
            </button>{" "}
          </Link>
          <Link
            className="mb-12 p-2 rounded buttonStyle2"
            to={userEndpoints.profile}
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
