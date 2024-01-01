import React from "react";
import { useNavigate } from "react-router-dom";

interface Message {
  text: string;
  name: string;
  id: string;
  socketID: string;
}

interface ChatBodyProps {
  messages: Message[];
}

const ChatBody: React.FC<ChatBodyProps> = ({ messages }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Let's Chat</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/* This shows messages sent from you */}
      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        {/* This is triggered when a user is typing */}
        {/* <div className="message__status">
          <p>Someone is typing...</p>
        </div> */}
      </div>
    </>
  );
};

export default ChatBody;
