import { useEffect, useState } from "react";
import { adminAxios } from "../../../Constraints/axiosInterceptors/adminAxiosInterceptors";
import AdminApis from "../../../Constraints/apis/AdminApis";
import  mentorProfile  from "../../../Interfaces/mentorInterfaces";
import { FaEye } from "react-icons/fa";



function VerifyMentor() {
  const [mentors, setMentors] = useState<mentorProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [blockedStatus, setBlockedStatus] = useState(false);
  useEffect(() => {
    adminAxios.get(AdminApis.getMentorsList).then((response) => {
      console.log("response.data..", response.data);
      setMentors(response.data);
    });
  }, [blockedStatus]);

  const handleBlock = async (id: string | undefined) => {
    try {
      console.log("handleBlock fun..")
      console.log("mentor_id",id)
      const response = await adminAxios.post(`${AdminApis.blockMentor}?id=${id}`
      );
      const mentorData: mentorProfile = response.data; 
      console.log("mentorblock**", mentorData);

      setBlockedStatus(!blockedStatus); 
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = mentors.filter((mentor) =>
    mentor.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-60 ">
      {/* Navbar */}
      <div className="bg-gray-200 p-4">
        <div className="flex justify-between">
          <div className="flex">
            <input
              type="search"
              placeholder="Search Mentors"
              className="border rounded-l py-2 px-4"
              name=""
              id=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-center">Mobile</th>
                  <th className="py-3 px-6 text-center">Action</th>
                  <th className="py-3 px-6 text-center">View</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredUsers.map((mentor) => (
                  <tr
                    key={mentor._id}
                    className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">
                          {mentor.firstname} {mentor.lastname}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span>{mentor.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">{mentor.mobile}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">
                          <button
                           onClick={()=>handleBlock(mentor._id)}
                          
                          >
                          {mentor.isBlock? <p className="unblocked">Unblock</p> : <p className="blocked">Block</p>}
                          </button>
                      </span>
                      </div>
                    </td>
                  
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">
                          {
                           <button >
                           <FaEye />
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

export default VerifyMentor;
