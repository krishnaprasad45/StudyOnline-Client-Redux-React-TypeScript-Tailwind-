import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../services/socket.io/socketConfig";
import { generateUniqueID } from "../../../utils/generateUniqueID";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interfaces/common";
import BuyCourse from "../Alerts/BuyCourse";

interface Message {
  message: string;
  to: string;
  from: string;
  id: number;
}

const ChatBody: React.FC = () => {
  const userStore = useSelector((state: RootState) => state.UserSignup);

  const userMentor = userStore.user.mentorIncharge;
  console.log("userMentor", userMentor);

  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>(""); // New state for input value

  useEffect(() => {
    socket.on("SentMessage", (msg) => {
      setMessages((prevMessages) => {
        if (!prevMessages.find((m) => m.id === msg.id)) {
          return [...prevMessages, msg];
        }
        return prevMessages;
      });
    });
  }, []);

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (
      (messages && localStorage.getItem("userEmail")) ||
      localStorage.getItem("mentorEmail")
    ) {
      const uniqueID = generateUniqueID();
      socket.emit("SentMessage", {
        from: localStorage.getItem("userEmail"),
        message: newMessage, // Use newMessage state here
        to: localStorage.getItem("mentorEmail"),
        id: `${socket.id}${Math.random()}`,
        chatId: uniqueID,
      });
    }
    console.log({ userName: localStorage.getItem("userEmail"), messages });
    setNewMessage(""); // Clear input after sending the message
  };

  return (
    <div>
    {userMentor === 'not assigned' ? (<BuyCourse/>):(
    <div className="w-full ">
      {/* ChatBar */}
      <div className="chat__sidebar ml-96"> 
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE</h4>
        <div className="chat__users">
          <p>User 1</p>
          <p>User 2</p>
      
        </div>
      </div>
    </div>

      <header className="chat__mainHeader">
        <p>CHAT WINDOW</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>
      
      <div>
        <div className="message__container">
          {messages.map((data) =>
            data.from === localStorage.getItem("userEmail") ? (
              <div className="message__chats" key={data.id}>
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{data.message}</p>
                </div>
              </div>
            ) : (
              <div className="message__chats" key={data.id}>
                <p>{data.from}</p>
                <div className="message__recipient">
                  <p>{data.message}</p>
                </div>
              </div>
            )
          )}
        </div>

        <div className="chat__footer">
          <form className="form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Write message"
              className="message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="sendBtn bg-lime-500">
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>)}
    </div>
  );
};

export default ChatBody;
