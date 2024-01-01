import  { useState, FormEvent } from 'react';
import { socket } from '../../../services/socket.io/socketConfig'



export default function ChatFooter() {
  const [message, setMessage] = useState<string>('');


  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userEmail') || localStorage.getItem('mentorEmail')) {
      socket.emit('SentMessage', {
        text: message,
        name: localStorage.getItem('userEmail') || localStorage.getItem('mentorEmail'),
        // id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        // from:localStorage.getItem('userEmail') || localStorage.getItem('mentorEmail'),
        // message:message,
        // to:
      }
      );
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
        <button type="submit" className="sendBtn bg-lime-500">
          SEND
        </button>
      </form>
    </div>
  );
}


