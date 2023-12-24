import { Avatar } from "@material-tailwind/react";
import ProfileInterface from "../../../Interfaces/mentorInterfaces";
import { useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { TbLockSquareRoundedFilled } from "react-icons/tb";

function MentorDetails() {
  const { state } = useLocation();
  const selectedMentor: ProfileInterface = state.selectedMentor;
  console.log("****", selectedMentor.aadhar_image);
  console.log("state", selectedMentor);
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
            {(selectedMentor.isBlock) ? (
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
              <span style={{ display: "flex", alignItems: "center", marginTop:'2' }}>
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

        <div>
          <p className="text-base leading-4 mt-7 text-gray-600">
            {selectedMentor.date}
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600">
            Length: 13.2 inches
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600">
            Height: 10 inches
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600">
            Depth: 5.1 inches
          </p>
          <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
            Composition: 100% calf leather, inside: 100% lamb leather
          </p>
        </div>

        <div>
          <div className="border-b py-4 border-gray-200">
            <button
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
        <img
          className="w-full"
          alt="Aadhar image"
          src={selectedMentor.aadhar_image}
        />
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
        <img
          className="mt-6 w-full"
          alt="img of a girl posing"
          src={selectedMentor.experience_image}
        />
      
      </div>
      
    </div>
  );
}

export default MentorDetails;
