import PaymentDetails from "../../../Interfaces/paymentDetails";
import { useEffect, useState } from "react";
import EmptyCard from "../../Common/EmptyCard/EmptyCard";
import { adminAxios } from "../../../Constraints/axiosInterceptors/adminAxiosInterceptors";
import adminEndpoints from "../../../Constraints/endpoints/adminEndpoints";



function Payments() {
  const [history, setHistory] = useState<PaymentDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    adminAxios.get(adminEndpoints.paymentHistory).then((response) => {
      setHistory(response.data);
    });
  }, []);

  const filteredHistory = history.filter(
    (data) =>
      data.courseTitle &&
      data.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-60">
      {/* Navbar */}
      {filteredHistory.length === 0 ? (
        ""
      ) : (
        <div className="bg-gray-200 p-4 ml-6">
          <div className="flex justify-between">
            <div className="flex">
              <input
                type="search"
                placeholder="Search Payment"
                className="border rounded-l py-2 px-4"
                name=""
                id=""
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
            {filteredHistory.length === 0 ? (
              <EmptyCard />
            ) : (
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-center">SI.No</th>
                    <th className="py-3 px-6 text-center">Course</th>
                    <th className="py-3 px-6 text-center">Transaction ID</th>
                    <th className="py-3 px-6 text-center">Date</th>
                    <th className="py-3 px-6 text-center">User</th>
                    <th className="py-3 px-6 text-center">Card Type</th>
                    <th className="py-3 px-6 text-center">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {filteredHistory.map((data, index) => (
                    <tr
                      key={data.transactionId}
                      className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{index + 1}</span>
                        </div>
                      </td>
                      <td
                        className="py-3 px-6 text-center"
                        style={{
                          maxWidth: "250px",
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                        }}
                      >
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">
                            {data.courseTitle}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">
                            {data.transactionId}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">
                            {new Date(data.date).toLocaleDateString(
                              undefined,
                             
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center  justify-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{data.usedEmail}</span>
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
            )}
          </div>
          
     
        </div>
      </div>
    </div>
  );
}

export default Payments;
