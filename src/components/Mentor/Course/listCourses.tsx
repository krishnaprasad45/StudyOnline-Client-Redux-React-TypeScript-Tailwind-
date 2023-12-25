import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { CourseInterface } from "../../../Interfaces/courseInterface";
import MentorApis from "../../../Constraints/apis/MentorApis";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import { useNavigate } from "react-router-dom";

function ListCourses() {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [unlistedStatus, setUnlistedStatus] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    mentorAxios.get(MentorApis.list_allcourses).then((response) => {
      console.log("response.data..", response);
      setCourses(response.data);
    });
  }, [unlistedStatus]);

  const handleCourseDetails = (CourseId: string | undefined) => {
    const selectedCourse = courses.filter(
      (course) => course._id === CourseId
    )[0];

    navigate("/mentor/course-details", { state: { selectedCourse } });
    console.log(selectedCourse);
  };

  const handleUnlist = async (id: string | undefined) => {
    try {
      console.log("handleUnlist fun..");
      console.log("course_id", id);
      const response = await mentorAxios.post(
        `${MentorApis.unlist_course}?id=${id}`
      );
      const courseData: CourseInterface = response.data;
      console.log("mentorblock**", courseData);

      setUnlistedStatus(!unlistedStatus);
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
            onClick={() => navigate(MentorApis.add_course_page)}
          >
            Add Course
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Course</th>
                  <th className="py-3 px-6 text-left">Fee</th>
                  <th className="py-3 px-6 text-center">Duration</th>
                  <th className="py-3 px-6 text-center">Action</th>
                  <th className="py-3 px-6 text-center">View</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredCourses.map((course) => (
                  <tr
                    key={course._id}
                    className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{course.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span>{course.fee}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">{course.duration}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">
                          <button
                            onClick={() => handleUnlist(course._id)}
                            className="rounded-full px-4 py-2 bg-blue-500 text-white focus:outline-none"
                          >
                            {course.isUnlisted ? (
                              <p className="unblocked">List</p>
                            ) : (
                              <p className="blocked">Unlist</p>
                            )}
                          </button>
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">
                          {
                                <button
                                key={course._id}
                                onClick={() => handleCourseDetails(course._id)}
                              >
                                <FaEye
                                  style={{ color: "grey", fontSize: "1.5em" }}
                                />
                              </button>
                          }
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
    </div>
  );
}

export default ListCourses;
