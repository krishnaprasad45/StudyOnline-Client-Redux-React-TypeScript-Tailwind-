import React, { useEffect, useState } from "react";
import adminEndpoints from "../../../Constraints/endpoints/adminEndpoints";
import { adminAxios } from "../../../Constraints/axiosInterceptors/adminAxiosInterceptors";
import { userProfile } from "../../../Interfaces/userInterfaces";
import mentorProfile from "../../../Interfaces/mentorInterfaces";
import PaymentDetails from "../../../Interfaces/paymentDetails";

const StatisticsCount: React.FC = () => {
    const [users, setUsers] = useState<userProfile[]>([]);
    const [mentors, setMentors] = useState<mentorProfile[]>([]);
    const [history, setHistory] = useState<PaymentDetails[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const usersResponse = await adminAxios.get(adminEndpoints.getUsersList);
          const mentorsResponse = await adminAxios.get(adminEndpoints.getMentorsList);
          const historyResponse = await adminAxios.get(adminEndpoints.paymentHistory);
  
          setUsers(usersResponse.data);
          setMentors(mentorsResponse.data);
          setHistory(historyResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const usersCount = users.length;
    const mentorsCount = mentors.length;
    const purchaseCount = history.length;
    const totalRevenue: number = history.reduce((acc, payment) => acc + payment.courseAmount, 0);
  
  return (
    <div className="grid ml-60 grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-green-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Users</h3>
          <p className="text-3xl">{usersCount}</p>
        </div>
      </div>

      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Mentors</h3>
          <p className="text-3xl">{mentorsCount}</p>
        </div>
      </div>

      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-red-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            viewBox="0 0 576 512"
          >
            <path
              className="text-white"
              d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32V288c0 17.7-14.3 32-32 32s-32-14.3-32-32V205.3L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160H384z"
            />
          </svg>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Purchase Count</h3>
          <p className="text-3xl">{purchaseCount}</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-red-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            viewBox="0 0 320 512"
          >
            <path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" />
          </svg>
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Purchase Amount</h3>
          <p className="text-3xl">{totalRevenue}</p>
        </div>
      </div>
     
    </div>
  );
};

export default StatisticsCount;
