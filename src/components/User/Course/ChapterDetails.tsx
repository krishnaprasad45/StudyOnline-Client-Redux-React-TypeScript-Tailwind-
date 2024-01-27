import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChapterInterface } from "../../../Interfaces/chapterInterface";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";

function ListChapters() {
  const [chapter, setChapter] = useState<ChapterInterface | null>(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const chapterId = state.chapterId;

  const handleFinish = () => {
    navigate(userEndpoints.course);
  };

  useEffect(() => {
    userAxios
      .get(`${userEndpoints.chapterDetails}?chapterId=${chapterId}`)
      .then((response) => {
        setChapter(response.data);
      })
      .catch((error) => {
        console.error("Error fetching chapter:", error);
      });
  }, [chapterId]);

  return (
    <div className="container mx-auto p-4 ml-40">
      <div className="bg-white shadow-md rounded my-6 p-4 lg:w-3/4 lg:mx-auto">
        {chapter ? (
          <>
            <h1 className="text-2xl font-bold mb-4">{chapter.title}</h1>
            <video
              className="w-full h-auto rounded-lg"
              controls
              preload="metadata"
            >
              
              <source src={chapter.chaptervideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="mb-3 mt-4 font-normal text-gray-700">{chapter.description}</div>

            <div className="flex justify-end items-center p-5">
              <button
                onClick={() => handleFinish()}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Finish
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default ListChapters;
