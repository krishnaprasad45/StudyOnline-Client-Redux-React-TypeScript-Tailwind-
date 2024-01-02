import React, { useEffect, useState } from 'react';

import { socket } from '../../../services/socket.io/socketConfig';
import ChatBody from '../Chat/ChatBody';
import ChatBar from '../../Common/Chat/ChatBar';

interface Message {
  text: string;
  name: string;
  id: string;
  socketID: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const handleSocketMessage = (data: Message) => setMessages((prevMessages) => [...prevMessages, data]);

    socket.on('messageResponse', handleSocketMessage);

    return () => {
      // Clean up the socket listener when the component unmounts
      socket.off('messageResponse', handleSocketMessage);
    };
  }, [socket]);

  return (
    <div className="chat">
      {/* <ChatBar socket={socket} /> */}
      <ChatBar />
      <div className="chat__main">
        <ChatBody messages={messages} />
      </div>
    </div>
  );
};

export default Chat;
