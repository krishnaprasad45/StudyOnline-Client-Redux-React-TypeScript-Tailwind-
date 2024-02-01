import  { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import { ChapterInterface } from "../../../Interfaces/chapterInterface";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";

function ListChapters() {
  const [chapter, setChapter] = useState<ChapterInterface | null>(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const chapterId = state.chapterId;
  const handleGoback = () => {
    navigate(mentorEndpoints.courses);
  };

  useEffect(() => {
    mentorAxios
      .get(`${mentorEndpoints.chapterDetails}?chapterId=${chapterId}`)
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
           
            >
              <source src={chapter.chaptervideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="flex justify-between p-5">
              <p className="mb-3 font-normal text-gray-700">
                {chapter.description}
              </p>
              <button
               onClick={() => handleGoback()}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Go Back
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
