import ChatBar from '../../Common/Chat/ChatBar';
import ChatBody from '../../Common/Chat/ChatBody';
import ChatFooter from '../../Common/Chat/ChatFooter';
import ChatDemo from '../../Common/Chat/ChatDemo';


const Chat: React.FC = () => {



  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody  />
        <ChatFooter  />
        <ChatDemo/>
      </div>
    </div>
  );
};

export default Chat;
