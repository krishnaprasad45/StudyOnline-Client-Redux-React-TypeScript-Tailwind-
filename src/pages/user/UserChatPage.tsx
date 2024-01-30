import ChatBody from '../../components/Common/Chat/ChatBody';
import Homepage from '../../components/User/Home/userHome';
import { useLocation } from "react-router-dom";
import './chatCSS.css';


function MentorCoursePage() {

  // const location = useLocation();
  // const role = location.pathname
  console.log(location)

  return (

    <div className='flex'>
      <Homepage  />
      {/* {
        role == "/chat/user" ?  : <ChatBody role={"mentor"}/>
      } */}
      
      <ChatBody role={"user"}/>
    </div>
  );
}

export default MentorCoursePage;
