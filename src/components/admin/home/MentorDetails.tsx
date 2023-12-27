import { Avatar } from "@material-tailwind/react";
import ProfileInterface from "../../../Interfaces/mentorInterfaces";
import { useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { TbLockSquareRoundedFilled } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import {  useEffect, useState } from "react";
import { adminAxios } from "../../../Constraints/axiosInterceptors/adminAxiosInterceptors";
import adminEndpoints from "../../../Constraints/endpoints/adminEndpoints";

function MentorDetails() {
  const { state } = useLocation();
  const selectedMentor: ProfileInterface = state.selectedMentor;
  const [verifyStatus, setVerifyStatus] = useState<string | undefined>(selectedMentor.verification);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message = 'Are you sure you want to leave?';
      event.returnValue = message; 
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  const handleVerify = async (status: string) => {
    try {
      const id = selectedMentor._id;
      const response = await adminAxios.post(
        `${adminEndpoints.verifyMentor}?id=${id}&status=${status}`
      );
      const mentorData: ProfileInterface = response.data;
      console.log("mentorblock**", mentorData);
      const updatedStatus: string | undefined = mentorData.verification;
      setVerifyStatus(updatedStatus);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4 ml-20">
      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <h1
            className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
              uppercase
        block-letters
						"
          >
            {selectedMentor.firstname} {selectedMentor.lastname}
          </h1>
        </div>
        <Avatar src={selectedMentor.image} alt="avatar" size="sm" />
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">
            Join Date : {selectedMentor.date}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">
            Size : {selectedMentor.email}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">
            Mobile : {selectedMentor.mobile}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800 ">
            Account status:{" "}
            {selectedMentor.isBlock ? (
              <span style={{ display: "flex", alignItems: "center" }}>
                <span className="text-lg">Blocked by Admin</span>
                <TbLockSquareRoundedFilled
                  style={{
                    color: "red",
                    fontSize: "2.5em",
                    marginRight: "2em",
                  }}
                />
              </span>
            ) : (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "2",
                }}
              >
                <span className="text-lg">Active</span>
                <FaCheckCircle
                  style={{
                    color: "green",
                    fontSize: "2em",
                    marginLeft: "0.2em",
                  }}
                />
              </span>
            )}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>

        
        <h1
          className="
							lg:text-xl
							text-x
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
              
						"
        >
          Account Verification
          <td className="py-3 px-6 text-center">
            <div className="flex items-center justify-center">
              {verifyStatus === "Pending" ? (
                <FaClockRotateLeft
                  style={{ color: "orange", fontSize: "1.5em" }}
                />
              ) : verifyStatus == "Verify" ? (
                <MdVerified style={{ color: "blue", fontSize: "2em" }} />
              ) : (
                <IoCloseCircle style={{ color: "red", fontSize: "2em" }} />
              )}
            </div>
          </td>
        </h1>
        {verifyStatus == "Pending" && (
          <div>
            <div>
              <div className="border-b py-4 border-gray-200">
                <button
                  onClick={() => {
                    handleVerify("Verify");
                  }}
                  className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-green-500
						w-full
						py-4
						hover:bg-green-700
					"
                >
                  Verify
                </button>
              </div>
            </div>
            <div>
              <div className="border-b py-4 border-gray-200">
                <button
                  onClick={() => {
                    handleVerify("Reject");
                  }}
                  className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-red-500
						w-full
						py-4
						hover:bg-red-700
					"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden mt-14">
        <h1
          className="
							lg:text-xl
							text-x
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
        >
          Aadhar Card
        </h1>
        {selectedMentor.aadhar_image ? (
          <img
            className="w-full"
            alt="Aadhar image"
            src={selectedMentor.aadhar_image}
          />
        ) : (
          "Not updated"
        )}
        <h1
          className="
							lg:text-xl
							text-x
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-10
						"
        >
          Experience Certificate
        </h1>
        {selectedMentor.experience_image ? (
          <img
            className="mt-6 w-full"
            alt="img of a girl posing"
            src={selectedMentor.experience_image}
          />
        ) : (
          "Not updated"
        )}
      </div>
    </div>
  );
}

export default MentorDetails;
