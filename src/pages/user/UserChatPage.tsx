import ChatBody from '../../components/Common/Chat/ChatBody';
import Homepage from '../../components/User/Home/userHome';
import './chatCSS.css';


function MentorCoursePage() {
  return (
    <div className='flex'>
      <Homepage  />
      {/* <ChatBar/> */}
      <ChatBody/>
    </div>
  );
}

export default MentorCoursePage;
