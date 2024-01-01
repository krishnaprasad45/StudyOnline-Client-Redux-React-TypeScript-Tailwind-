import React, { useEffect, useState } from 'react';
import ChatBar from '../../Common/Chat/ChatBar';
import ChatBody from '../../Common/Chat/ChatBody';
import ChatFooter from '../../Common/Chat/ChatFooter';
import { socket } from '../../../services/socket.io/socketConfig';

interface Message {
  text: string;
  name: string;
  id: string;
  socketID: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('messageResponse', (data: Message) => setMessages([...messages, data]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, messages]);

  return (
    <div className="chat">
      
      <ChatBar />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter />
       
      </div>
    </div>
  );
};

export default Chat;
