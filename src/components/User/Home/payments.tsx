import PaymentDetails from "../../../Interfaces/paymentDetails";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import { useEffect, useState } from "react";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interfaces/common";

function Payments() {
  

  const [history, setHistory] = useState<PaymentDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userStore = useSelector((state:RootState)=> state.UserSignup)
  const id =userStore.user._id
  
  useEffect(() => {
    userAxios
      .get(`${userEndpoints.paymentHistory}?id=${id}`)
      .then((response) => {
        setHistory(response.data);
      });
  }, [id, history]);

  const filteredHistory = history.filter(
    (data) =>
      data.courseTitle &&
      data.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-60">
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
                  <th className="py-3 px-6 text-left">Course Name</th>
                  <th className="py-3 px-6 text-left">Transaction ID</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-center">Type</th>
                  <th className="py-3 px-6 text-center">Card Type</th>
                  <th className="py-3 px-6 text-center">Course Amount</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredHistory.map((data) => (
                  <tr
                    key={data.transactionId}
                    className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{data.courseTitle}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">
                          {data.transactionId}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span>{data.usedEmail}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">
                          {data.type.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">{data.cardType}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">
                          {data.courseAmount}/-
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

export default Payments;
