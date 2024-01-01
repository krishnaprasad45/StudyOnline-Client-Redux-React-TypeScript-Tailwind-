import './chatCSS.css';
import Homepage from '../../components/User/Home/userHome';
import Chat from '../../components/User/Home/chat';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:5000');

function MentorCoursePage() {
  return (
    <>
      <Homepage  />
      <Chat socket={socket} />
    </>
  );
}

export default MentorCoursePage;
