import React, { useEffect, useState } from 'react';
import ChatBar from '../../Common/Chat/ChatBar';
import ChatBody from '../../Common/Chat/ChatBody';
import ChatFooter from '../../Common/Chat/ChatFooter';
import { Socket } from 'socket.io-client';

interface Message {
  text: string;
  name: string;
  id: string;
  socketID: string;
}

interface ChatProps {
  socket: Socket;
}

const Chat: React.FC<ChatProps> = ({ socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('messageResponse', (data: Message) => setMessages([...messages, data]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, messages]);

  return (
    <div className="chat">
      {/* <ChatBar socket={socket} /> */}
      <ChatBar />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default Chat;
