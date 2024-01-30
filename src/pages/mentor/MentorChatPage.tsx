import Homepage from "../../components/Mentor/Home/mentorHome";
import ChatBody from "../../components/Common/Chat/ChatBody";

function MentorCoursePage() {

  // const location = useLocation();
  // const role = location.pathname

  return (
    <div className='flex'>
      <Homepage />
      
      <ChatBody role={"mentor"}/>
    </div>
  );
}

export default MentorCoursePage;
