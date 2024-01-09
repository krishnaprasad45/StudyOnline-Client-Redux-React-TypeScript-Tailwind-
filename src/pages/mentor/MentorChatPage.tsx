import Homepage from "../../components/Mentor/Home/mentorHome";
import ChatBody from "../../components/Common/Chat/ChatBody";

function MentorCoursePage() {

  return (
    <div className='flex'>
      <Homepage />
      {/* <ChatBar /> */}
      <ChatBody />
    </div>
  );
}

export default MentorCoursePage;
