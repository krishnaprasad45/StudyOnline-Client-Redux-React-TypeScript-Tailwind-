import React from "react";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import { useNavigate } from "react-router-dom";

const EmptyCard: React.FC = () => {
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate(userEndpoints.courses);
  };

  return (
    <div className=" ml-60  flex justify-center justify-items-center align-middle max-w-sm   dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://cdn-icons-png.flaticon.com/128/1437/1437185.png"
          alt="empty"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          No Records
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          You didn't purchase any course
        </span>
        <div className="flex mt-4 md:mt-6">
          <button
            onClick={handleOnclick}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buy Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCard;
