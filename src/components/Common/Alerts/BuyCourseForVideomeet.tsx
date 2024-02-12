import React from "react";
import { useNavigate } from "react-router-dom";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";

const BuyCourseForVideomeet: React.FC = () => {
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate(userEndpoints.courses);
  };
  return (
    <div className="flex ml-40 items-center justify-center bg-indigo-100 w-full h-screen">
      <div className=" bg-indigo-900 text-center py-4 lg:px-4">
        <div
          className="p-2  bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
          role="alert"
        >
          <span className="flex rounded-full bg-indigo-800 uppercase px-2 py-1 text-s font-bold mr-3">
            VideoMeet{" "}
          </span>
          <span className="font-semibold mr-2 text-left flex-auto">
            You need to Buy Course to unlock the VideoMeet feature
          </span>
          <svg
            className="fill-current opacity-75 h-4 w-4"
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
          </svg>
          <button
            onClick={handleOnclick}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buy Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyCourseForVideomeet;
