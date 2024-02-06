import CommunityChat from "../../components/Common/Chat/CommunityChatMentor";
import Homepage from "../../components/Mentor/Home/mentorHome";

function MentorCommunityPage() {

  
  const chatId = "100";
  const mentorEmail= localStorage.getItem('mentorEmail') ?? undefined

  return (
    <div className='flex'>
      <Homepage />
      <CommunityChat role={"mentor"} chatId= {chatId} email={mentorEmail} />
    </div>
  );
}

export default MentorCommunityPage;
