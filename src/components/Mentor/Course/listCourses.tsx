import { useEffect, useState } from "react";
import { CourseInterface } from "../../../Interfaces/courseInterface";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import { useNavigate } from "react-router-dom";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import { RootState } from "../../../Interfaces/common";
import { useSelector } from "react-redux";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import { showErrorToast, showSuccessToast } from "../../../services/popups/popups";
import { ToastContainer } from "react-toastify";

// .
function ListCourses() {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const mentorStore = useSelector((state: RootState) => state.mentor);
  const [searchTerm, setSearchTerm] = useState("");
  const [unlistedStatus, setUnlistedStatus] = useState(false);
  const navigate = useNavigate();
  const email = mentorStore.mentor.email;
  useEffect(() => {
    mentorAxios
      .get(`${mentorEndpoints.myCourses}?email=${email}`)
      .then((response) => {
        setCourses(response.data);
      });
  }, [unlistedStatus]);

  const handleCourseDetails = (CourseId: string | undefined) => {
    const selectedCourse = courses.filter(
      (course) => course._id === CourseId
    )[0];
    navigate(mentorEndpoints.courseDetails, { state: { selectedCourse } });
  };
  const handleAddChapter = (CourseId: string | undefined) => {
    const courseId = CourseId;

    navigate(mentorEndpoints.addChapter, { state: { courseId } });
  };
  const handleEdit = (CourseId: string | undefined) => {
    const courseId = CourseId;

    navigate(mentorEndpoints.editCourse, { state: { courseId } });
  };

  const handleUnlist = async (id: string | undefined) => {
    try {
      console.log("unlist id ",id)
      await mentorAxios.post(`${mentorEndpoints.unlistCourse}?courseId=${id}`);

      setUnlistedStatus(!unlistedStatus);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id: string | undefined) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this course?");
  
      if (confirmDelete) {
        await mentorAxios.delete(`${mentorEndpoints.deleteCourse}?courseId=${id}`)
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

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-60   ">
      {/* Navbar */}
      <div className="bg-gray-200 ">
        <div className="flex justify-between pl-6 ">
          <div className="flex mt-2 ml-2 mb-2">
            <input
              type="search"
              placeholder="Search Course"
              className="border rounded-l py-2 px-4"
              name=""
              id=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="bg-[#4C3869] text-white py-2 px-4 flex mt-2 mx-2 mb-2  rounded-r"
            onClick={() => navigate(mentorEndpoints.addCourse)}
          >
            Add Course
            <ToastContainer/>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="bg-red-200 shadow-md rounded my-6  overflow-x-auto">
            {filteredCourses.length === 0 ? (
              <p className="text-center py-4 text-gray-500">
                <button
                  className=" text-grey "
                  onClick={() => navigate(mentorEndpoints.addCourse)}
                >
                  Courses not added , click here to Add Courses
                </button>
              </p>
            ) : (
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Course</th>
                    <th className="py-3 px-6 text-left">Fee</th>
                    <th className="py-3 px-6 text-center">Duration</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                    <th className="py-3 px-6 text-center">Chapter</th>
                    {/* <th className="py-3 px-6 text-center">View</th> */}
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {filteredCourses.map((course) => (
                    <tr
                      key={course._id}
                      className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                    >
                      
                      <td className="py-3 px-6 text-left">
                        <span
                        style={{cursor: 'pointer'}}
                        key={course._id}
                        onClick={() => handleCourseDetails(course._id)}
                        >
                          <div className="flex items-center">
                            <div className="mr-2"></div>
                            <span className="font-medium">{course.title}</span>
                          </div>
                        </span>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{course.fee}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">{course.duration}</span>
                        </div>
                      </td>
                      <div className="flex justify-center">
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <span className="font-medium">
                              <button
                                onClick={() => handleUnlist(course._id)}
                                className="rounded-full px-2 py-2 bg-blue-500 text-white focus:outline-none"
                              >
                                {course.isUnlisted ? (
                                  <p style={{ fontSize: "1.1rem" }}>
                                    <MdRemoveRedEye />
                                  </p>
                                ) : (
                                  <p style={{ fontSize: "1.1rem" ,  }}>
                                    <IoEyeOffSharp />
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
                                onClick={() => handleEdit(course._id)}
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
                                onClick={() => handleDelete(course._id)}
                                className="rounded-full px-2 py-2 bg-blue-500 text-white focus:outline-none"
                              >
                                <p style={{ fontSize: "1.1rem" }}>
                                  <MdDelete />
                                </p>
                              </button>
                            </span>
                          </div>
                        </td>
                      </div>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">
                            <button
                              onClick={() => handleAddChapter(course._id)}
                              className="rounded-full px-3 py-2 bg-blue-500 text-white focus:outline-none"
                            >
                              +
                            </button>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCourses;
