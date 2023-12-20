import { useEffect, useState } from "react";
import { adminAxios } from "../../../Constraints/axiosInterceptors/adminAxiosInterceptors";
import AdminApis from "../../../Constraints/apis/AdminApis";
import { ProfileInterface } from "../../../Interfaces/mentorInterfaces";

function MentorManagement() {
  const [mentors, setMentors] = useState<ProfileInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    adminAxios.get(AdminApis.getUsersList).then((response) => {
      console.log("response.data..", response.data);
      setMentors(response.data);
    });
  }, []);

  const filteredUsers = mentors.filter(
    (mentor) =>
      mentor.firstname &&
      mentor.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      {/* Navbar */}
      <div className="bg-gray-200 p-4">
        <div className="flex justify-between">
          <div className="flex">
            <input
              type="search"
              placeholder="Search Users"
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
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredUsers.map((mentors) => (
                  <tr
                    key={mentors.id}
                    className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">
                          {mentors.firstname} {mentors.lastname}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span>{mentors.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">{mentors.mobile}</span>
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

export default MentorManagement;
