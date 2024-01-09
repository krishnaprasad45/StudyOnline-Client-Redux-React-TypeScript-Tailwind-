import ChatBody from '../../components/Common/Chat/ChatBody';
import Homepage from '../../components/User/Home/userHome';
import './chatCSS.css';
import ChatBar from '../../components/Common/Chat/ChatBar';


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
