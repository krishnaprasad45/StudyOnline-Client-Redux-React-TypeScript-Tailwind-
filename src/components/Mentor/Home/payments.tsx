import PaymentDetails from "../../../Interfaces/paymentDetails";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserSignupAction } from "../../../services/redux/action/userSignup";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import Empty from "../../Common/EmptyCard/Empty";

function Payments() {
  const [history, setHistory] = useState<PaymentDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const email = localStorage.getItem("mentorEmail");

  useEffect(() => {
    mentorAxios
      .get(`${mentorEndpoints.paymentHistory}?email=${email}`)
      .then((response) => {
        setHistory(response.data);
      });
    mentorAxios
      .get(mentorEndpoints.profile, {
        params: { email: email },
      })
      .then((response) => {
        dispatch(UserSignupAction(response.data));
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [email]);
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
              <Empty/>
            ) : (
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Course Name</th>
                    <th className="py-3 px-6 text-left">Date </th>
                    <th className="py-3 px-6 text-left">Learner</th>
                    <th className="py-3 px-6 text-left">Amount</th>
                   
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
                          <span className="font-medium">
                            {data.courseTitle}
                          </span>
                        </div>
                      </td>
                    

                     
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <div className="mr-2"></div>

                          <span className="font-medium">
                            {new Date(data.date).toLocaleDateString(
                              undefined,
                           
                            )}
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
