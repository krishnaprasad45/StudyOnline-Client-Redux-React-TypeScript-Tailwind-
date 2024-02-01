import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import userEndpoints from "../../Constraints/endpoints/userEndpoints";
import { userAxios } from "../../Constraints/axiosInterceptors/userAxiosInterceptors";
import { UserSignupAction } from "../../services/redux/action/userSignup";
import Homepage from "../../components/User/Home/userHome";
import JoinButton from "../../components/Common/VideoMeet/UserVideoJoinButton";


function UserVideoMeetJoinPage() {
  
  const [paymentId, setPayment] = useState<string>();
  const [mentorEmail, setMentorEmail] = useState<string>();
  const dispatch = useDispatch();
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    console.log("join hai..")
    userAxios
      .get(`${userEndpoints.paymentHistory}?email=${email}`)
      .then((response) => {
        setPayment(response.data[0]._id);
        setMentorEmail(response.data[0].createdBy);

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
  }, []);
  return (
    <div>
      <Homepage />
      <div className="ml-80">
        {paymentId && mentorEmail &&
        <JoinButton role="user" videoId={paymentId} email={mentorEmail} />
}
      </div>
    </div>
  );
}

export default UserVideoMeetJoinPage;
