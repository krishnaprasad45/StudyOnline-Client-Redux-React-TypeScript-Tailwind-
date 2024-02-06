import { useEffect, useState } from "react";
import { CourseInterface } from "../../../Interfaces/courseInterface";
import { useNavigate } from "react-router-dom";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";

function ListCourses() {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    userAxios.get(userEndpoints.courses).then((response) => {
   
      setCourses(response.data);
    });
  }, []);

  const handleCourseDetails = (CourseId: string | undefined) => {
    const selectedCourse = courses.filter(
      (course) => course._id === CourseId
    )[0];

    navigate(userEndpoints.courseDetails, { state: { selectedCourse } });

  };

  const filteredCourses = courses.filter((course) =>
    course.isUnlisted === false && course.title.toLowerCase().includes(searchTerm.toLowerCase())
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
          >
            {/* Other Courses */}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
            {filteredCourses.map((course) => (
              <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-8">
                {" "}
                <a href="#">
                  <img
                    className="rounded-t-lg"
                    src={course.banner}
                    alt={course.title}
                    style={{ width: "400px", height: "250px" }}
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {course.title}
                    </h5>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {course.fee}/-
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {course.subtitle}
                  </p>
                  <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400">
                    Created By : {course.createdby}
                  </p>

                  <button
                    key={course._id}
                    onClick={() => handleCourseDetails(course._id)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCourses;
