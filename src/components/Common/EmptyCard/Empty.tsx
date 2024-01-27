import React from "react";

const EmptyCard: React.FC = () => {
 
 

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
          For now, no one purchased your course
        </span>
      
      </div>
    </div>
  );
};

export default EmptyCard;
