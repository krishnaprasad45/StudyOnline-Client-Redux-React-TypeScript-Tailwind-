import { useLocation, useNavigate } from "react-router-dom";

import { CourseInterface } from "../../../Interfaces/courseInterface";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import { useEffect, useState } from "react";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import { ChapterInterface } from "../../../Interfaces/chapterInterface";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { IoEyeOffSharp } from "react-icons/io5";
import { showErrorToast, showSuccessToast } from "../../../services/popups/popups";

function CourseDetails() {
  const { state } = useLocation();
  const selectedCourse: CourseInterface = state.selectedCourse;
  const [chapters, setChapters] = useState<ChapterInterface[]>([]);
  const [unlistedStatus, setUnlistedStatus] = useState(false);

  const navigate = useNavigate();
  const courseId = selectedCourse._id;
  const handleEnroll = (chapterId: string | undefined) => {
    navigate(mentorEndpoints.chapterDetails, { state: { chapterId } });
  };
  const handleAddChapter = (CourseId: string | undefined) => {
    const courseId = CourseId;

    navigate(mentorEndpoints.addChapter, { state: { courseId } });
  };
  const handleEdit = (ChapterId: string | undefined) => {
    const chapterId = ChapterId;

    navigate(mentorEndpoints.editChapter, { state: { chapterId } });
  };
  const handleUnlist = async (id: string | undefined) => {
    try {
      
      await mentorAxios.post(`${mentorEndpoints.unlistChapter}?chapterId=${id}`);

      setUnlistedStatus(!unlistedStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this course?");
  
      if (confirmDelete) {
        await mentorAxios.delete(`${mentorEndpoints.deleteChapter}?chapterId=${id}`)
          .then((response) => {
            if (response.status === 201) {
              showSuccessToast("Delete Successful");
              setTimeout(() => {
                navigate(mentorEndpoints.courses);
              }, 2300);
            } else {
              showErrorToast("Delete failed");
              alert(response.data.message);
            }
          });
  
        setUnlistedStatus(!unlistedStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    mentorAxios
      .get(`${mentorEndpoints.chaptersList}?courseId=${courseId}`)
      .then((response) => {
        setChapters(response.data);
      })
      .catch((error) => console.log(error));
  }, [unlistedStatus]);
 chapters.filter((chapter) => !chapter.isUnlisted);
  return (
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4 ml-20">
      <div className="ml-60">
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
            {selectedCourse.title}
          </h1>
        </div>
        <div>
          <div className="flex justify-items-stretch">
            {selectedCourse.introvideo ? (
              <video
                autoPlay
                muted
                loop
                controls={false}
                width="400"
                height="200"
              >
                <source src={selectedCourse.introvideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              "Not updated"
            )}

            {selectedCourse.banner ? (
              <img
              
                width="400"
                height="200"
                alt="Banner image"
                src={selectedCourse.banner}
              />
            ) : (
              "Not updated"
            )}
          </div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl leading-20 text-gray-800">
            {selectedCourse.subtitle}
          </h1>

          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-lg leading-6 text-gray-800 font-semibold">
            Price:{" "}
            <span className="text-2xl text-black-600">
              {selectedCourse.fee}/-
            </span>
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-4 leading-6 border-b text-lg border-gray-200 flex items-center  justify-between">
          <p className="text-base leading-4 text-gray-800">
            Course Duration : {selectedCourse.duration}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-8 border-b border-gray-200 flex items-center justify-between w-full">
          <p className="text-base leading-6 text-gray-800">
            {selectedCourse.description}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-lg leading-6 text-gray-800 font-semibold">
            CHAPTERS
          </p>
          <div className="flex items-center justify-center"></div>
          <div>
            <span className="font-medium">
              <button
                onClick={() => handleAddChapter(selectedCourse._id)}
                className="rounded-full px-4 py-2 bg-green-500 text-white focus:outline-none"
              >
                Add Chapter
              </button>
            </span>
          </div>
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

                    <th className="py-3 px-6 text-center"></th>
                    <th className="py-3 px-6 text-center"></th>
                    <th className="py-3 px-6 text-center"></th>
                    <th className="py-3 px-6 text-center"></th>
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
                            <button onClick={() => handleEnroll(chapter._id)}>
                              &#x27A4; {chapter.title}
                            </button>
                          </span>
                        </div>
                      </td>
                     
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">
                            <button
                              onClick={() => handleUnlist(chapter._id)}
                              className="rounded-full px-2 py-2 bg-blue-500 text-white focus:outline-none"
                            >
                              {chapter.isUnlisted ? (
                                <p style={{ fontSize: "1.1rem" }}>
                                  <IoEyeOffSharp />
                                </p>
                              ) : (
                                <p style={{ fontSize: "1.1rem" }}>
                                  <MdRemoveRedEye />
                                </p>
                              )}
                            </button>
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">
                            <button
                              onClick={() => handleEdit(chapter._id)}
                              className="rounded-full px-2 py-2 bg-blue-500 text-white focus:outline-none"
                            >
                              <p style={{ fontSize: "1.1rem" }}>
                                <GrEdit />
                              </p>
                            </button>
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">
                            <button
                              onClick={() => handleDelete(chapter._id)}
                              className="rounded-full px-2 py-2 bg-blue-500 text-white focus:outline-none"
                            >
                              <p style={{ fontSize: "1.1rem" }}>
                                <MdDelete />
                              </p>
                            </button>
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
            Created At : {selectedCourse.createdat}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">
            Created By : {selectedCourse.createdby}
          </p>
          <div className="flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
