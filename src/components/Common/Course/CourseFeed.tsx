import { useLocation, useNavigate } from "react-router-dom";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import {  useEffect, useState } from "react";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";
import { ChapterInterface } from "../../../Interfaces/chapterInterface";


export default function CourseFeed() {
 
  const [searchTerm, setSearchTerm] = useState("");
  const [chapter, setChapters] = useState<ChapterInterface[]>([]);
  // const { state } = useLocation();
  // const courseId = state.courseId;
// console.log("course id -",courseId)
  const navigate = useNavigate();
  const handleEnroll = () => {
   

    navigate(userEndpoints.chapterDetails);

  };

  // useEffect(() => {
  //   userAxios
  //     .get(`${userEndpoints.chaptersList}?courseId=${courseId}`)
  //     .then((response) => {
  //       setChapters(response.data);
  //     });
  // }, [courseId]);

  return (
    <div className="ml-60">
      {/* Navbar */}
      <div className="bg-gray-200 ">
        <div className="flex justify-between pl-6 ">
          <div className="flex mt-2 ml-2 mb-2">
            <input
              type="search"
              placeholder="Search Lession"
              className="border rounded-l py-2 px-4"
              name=""
              id=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="bg-[#4C3869] text-white py-2 px-4 flex mt-2 mx-2 mb-2  rounded-r"
            onClick={() => navigate(userEndpoints.courses)}
          >
            Other Courses
          </button>
        </div>

        {/* Main Content */}
        <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
          <div className="w-full lg:w-5/6">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Course content</th>

                    <th className="py-3 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">
                        &#x27A4; Introduction : About Javascript
                        </span>
                      </div>
                    </td>
                    
                   
                    
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">
                          <button onClick= {()=> handleEnroll()} className="rounded-full px-4 py-2 bg-blue-500 text-white focus:outline-none">
                            <p >Enroll</p>
                          </button>
                        </span>
                      </div>
                    </td>

                    
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">
                        &#x27A4; Chapter 1 : Fundamentals of Javascript
                        </span>
                      </div>
                    </td>
                    
                   
                    
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">
                          <button onClick= {()=> handleEnroll()} className="rounded-full px-4 py-2 bg-blue-500 text-white focus:outline-none">
                            <p >Enroll</p>
                          </button>
                        </span>
                      </div>
                    </td>

                    
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">
                        &#x27A4;  Chapter 2 : Functions in Javascript
                        </span>
                      </div>
                    </td>
                    
                   
                    
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">
                          <button onClick= {()=> handleEnroll()} className="rounded-full px-4 py-2 bg-blue-500 text-white focus:outline-none">
                            <p >Enroll</p>
                          </button>
                        </span>
                      </div>
                    </td>

                    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
