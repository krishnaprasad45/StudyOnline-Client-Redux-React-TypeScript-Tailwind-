import React, { useState, FormEvent } from 'react';
import { Socket } from 'socket.io-client';

interface ChatFooterProps {
  socket: Socket;
}

const ChatFooter: React.FC<ChatFooterProps> = ({ socket }) => {
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    console.log({ userName: localStorage.getItem('userName'), message });
    setMessage('');
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="sendBtn">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
