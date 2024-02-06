import Homepage from "../../components/User/Home/userHome";
import "./chatCSS.css";
import PaymentDetails from "../../Interfaces/paymentDetails";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import userEndpoints from "../../Constraints/endpoints/userEndpoints";
import { userAxios } from "../../Constraints/axiosInterceptors/userAxiosInterceptors";
import { UserSignupAction } from "../../services/redux/action/userSignup";
import ChatBody from "../../components/Common/Chat/ChatBodyUser";

function UserChatPage() {
  const [history, setHistory] = useState<PaymentDetails>();
  let chatId ;
  let mentorEmail = "";
  if (history) {
  
    chatId = history[0]._id;
    mentorEmail = history[0].createdBy;
  }

  const dispatch = useDispatch();
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    userAxios
      .get(`${userEndpoints.paymentHistory}?email=${email}`)
      .then((response) => {
        console.log("res-data-", response.data);
        setHistory(response.data);
      });
    userAxios
      .get(userEndpoints.profile, {
        params: { email: email },
      })
      .then((response) => {
        dispatch(UserSignupAction(response.data));
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [email]);
  

  return (
    <div className="flex flex-col md:flex-row">
      <Homepage />
      <ChatBody role={"user"} chatId={chatId} email={mentorEmail} />
    </div>
  );
}

export default UserChatPage;
