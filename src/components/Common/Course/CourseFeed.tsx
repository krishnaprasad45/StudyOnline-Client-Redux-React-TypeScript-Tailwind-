import { useLocation, useNavigate } from "react-router-dom";
import { CourseInterface } from "../../../Interfaces/courseInterface";
import { useEffect, useState } from "react";
import { ChapterInterface } from "../../../Interfaces/chapterInterface";
import { RootState } from "../../../Interfaces/common";
import { useSelector } from "react-redux";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import { GrStatusGood } from "react-icons/gr";
import EmptyCard from "../EmptyCard/EmptyCard";

function CourseFeed() {
  const [chapters, setChapters] = useState<ChapterInterface[]>([]);
  const userStore = useSelector((state: RootState) => state.user);
  const [course, setCourse] = useState<CourseInterface>();
  const courseId = userStore.user.courseId;
  console.log("userStore", userStore);
  console.log("courseid", courseId);
  const navigate = useNavigate();
  const handleEnroll = (chapterId: string) => {
    console.log("CHAPTER ID",chapterId)
    navigate(userEndpoints.chapterDetails, { state: { chapterId } });
  };

  useEffect(() => {
    userAxios
      .get(`${userEndpoints.chaptersList}?courseId=${courseId}`)
      .then((response) => {
        setChapters(response.data);
      });
    userAxios
      .get(`${userEndpoints.course}?courseId=${courseId}`)
      .then((response) => {
        setCourse(response.data);
      });
  }, [courseId]);
  console.log("course", course);
  console.log("chapterslist", chapters);
  return (
    <>
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4 ml-20">
      <div className="ml-60">
        {/* Navbar */}
        
        {course && (
          <div>
            <div className="bg-white ">
          <div className="flex justify-between pl-6 ">
            <div className="flex mt-2  mb-2">
              <p className="font-semibold">-LEARNING JOURNEY</p>
            </div>
            <button
              className="bg-[#4C3869] text-white py-2 px-4 flex mt-2 mx-2 mb-2  rounded-r"
              onClick={() => navigate(userEndpoints.courses)}
            >
              Other Courses
            </button>
          </div>
        </div>
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
                {course.title}
              </h1>
            </div>
            <div>
              <div className="flex justify-items-stretch">
                {course.banner ? (
                  <img
                    // className="w-full"
                    width="600"
                    height="400"
                    alt="Banner image"
                    src={course.banner}
                  />
                ) : (
                  "Not updated"
                )}
              </div>
            </div>
            <div className="py-4 border-b border-gray-200 flex items-center justify-between">
              <h1 className="text-2xl leading-20 text-gray-800">
                {course.subtitle}
              </h1>
            </div>

            <div className="py-4 leading-6 border-b text-lg border-gray-200 flex items-center  justify-between">
              <p className="text-base leading-4 text-gray-800">
                Course Duration : {course.duration}
              </p>
              <div className="flex items-center justify-center"></div>
            </div>
          

        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-lg leading-6 text-gray-800 font-semibold">
            CHAPTERS
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
        {/* Chapters Table - Start */}

        <div className="min-w-screen min-h-screen    font-sans overflow-hidden">
          <div className=" lg:w-5/6">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left font-semibold">
                      Course content
                    </th>
                    <th className="py-3 px-6 text-left font-semibold">
                      Duration
                    </th>

                    <th className="py-3 px-6 text-center">Action</th>
                    <th className="py-3 px-6 text-center"> </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {chapters.map((chapter) => (
                    <tr
                      key={chapter._id}
                      className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">
                            &#x27A4; {chapter.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">
                            {chapter.duration}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">
                            <button
                              onClick={() => handleEnroll(chapter._id)}
                              className="rounded-full px-4 py-2 bg-blue-500 text-white focus:outline-none"
                            >
                              <p>Enroll</p>
                            </button>
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">
                            <GrStatusGood
                              style={{ color: "green", fontSize: "2em" }}
                            />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        

        {/* Chapters Table - End */}

        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">
            {/* Created At : {course.createdat} */}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">
            {/* Created By : {course.createdby} */}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
      </div>
      )}
    
      
      </div>
    </div>
      <div className="flex justify-center mt-35">
      <EmptyCard/>
      </div>
      </>
  );
}

export default CourseFeed;
