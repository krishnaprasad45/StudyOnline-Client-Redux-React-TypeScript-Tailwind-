import './chatCSS.css';
import Homepage from '../../components/User/Home/userHome';
import Chat from '../../components/User/Home/chat';

// const socket: Socket = io('http://localhost:5000');

function MentorCoursePage() {
  return (
    <>
      <Homepage />
      <Chat />
    </>
  );
}

export default MentorCoursePage;
