import { useEffect, useState } from "react";
import { adminAxios } from "../../../Constraints/axiosInterceptors/adminAxiosInterceptors";
import mentorProfile from "../../../Interfaces/mentorInterfaces";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import adminEndpoints from "../../../Constraints/endpoints/adminEndpoints";

function MentorManagement() {
  const [mentors, setMentors] = useState<mentorProfile[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [blockedStatus, setBlockedStatus] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    adminAxios.get(adminEndpoints.getMentorsList).then((response) => {
      setMentors(response.data);
    });
  }, [blockedStatus]);

  const handleMentorDetails = (mentorId: string | undefined) => {
    const selectedMentor = mentors.filter(
      (mentor) => mentor._id === mentorId
    )[0];

    navigate("/admin/mentor-details", { state: { selectedMentor } });
  };

  const handleBlock = async (id: string | undefined) => {
    try {
      await adminAxios.post(`${adminEndpoints.blockMentor}?id=${id}`);

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
                  <th className="py-3 px-6 text-center">Verification</th>
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
                        {mentor.verification === "Pending" ? (
                          <FaClockRotateLeft
                            style={{ color: "orange", fontSize: "1.5em" }}
                          />
                        ) : mentor.verification === "Verify" ? (
                          <MdVerified
                            style={{ color: "blue", fontSize: "2em" }}
                          />
                        ) : (
                          <IoCloseCircle
                            style={{ color: "red", fontSize: "2em" }}
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">
                          <button
                            onClick={() => handleBlock(mentor._id)}
                            style={{
                              padding: "8px 12px",
                              backgroundColor: mentor.isBlock
                                ? "#ff6347"
                                : "#4caf50",
                              color: "#fff",
                              border: "#fff",
                              borderRadius: "30px",
                              cursor: "pointer",
                            }}
                          >
                            {mentor.isBlock ? (
                              <p className="unblocked">Unblock</p>
                            ) : (
                              <p className="blocked">Block</p>
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
                              key={mentor._id}
                              onClick={() => handleMentorDetails(mentor._id)}
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

export default MentorManagement;
