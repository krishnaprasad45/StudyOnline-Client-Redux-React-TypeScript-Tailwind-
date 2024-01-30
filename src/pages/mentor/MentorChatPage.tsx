import Homepage from "../../components/Mentor/Home/mentorHome";
import ChatBody from "../../components/Common/Chat/ChatBody";
import { useLocation } from "react-router-dom";

function MentorCoursePage() {

  // const location = useLocation();
  // const role = location.pathname
  const { state } = useLocation();
  const chatId = state.paymentId;
  const learnerEmail = state.learnerEmail;

  return (
    <div className='flex'>
      <Homepage />
      
      <ChatBody role={"mentor"} chatId= {`${chatId}`} email={`${learnerEmail}`} />
    </div>
  );
}

export default MentorCoursePage;
