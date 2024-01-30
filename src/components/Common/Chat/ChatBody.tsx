import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../services/socket.io/socketConfig";
import { RootState } from "../../../Interfaces/common";
import { useSelector } from "react-redux";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import ChatBar from "./ChatBar";

interface Message {
  message: string;
  to: string;
  from: string;
  id: number;
}
interface ChatBodyProps {
  role: string;
}

const ChatBody: React.FC<ChatBodyProps> = (props) => {

  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const userStore = useSelector((state: RootState) => state.user);
  let mentorEmail: string | undefined;
  let courseId: string | undefined;
  if (userStore) {
    mentorEmail = userStore?.user?.mentorIncharge;
    courseId = userStore?.user?.courseId
    console.log(mentorEmail);
    console.log("c-id",courseId);
  }

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message = "Are you sure you want to leave?";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    socket.on("SentMessage", (msg) => {
      setMessages((prevMessages) => {
        if (!prevMessages.find((m) => m.id === msg.id)) {
          return [...prevMessages, msg];
        }
        return prevMessages;
      });
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
  };
  const handleOnclick = () => {
    navigate(userEndpoints.courses);
  };

  const handleSendMessage = (e: FormEvent) => {
    console.log("handle sed message 6")
    e.preventDefault();
    if (
      (messages && localStorage.getItem("userEmail")) ||
      localStorage.getItem("mentorEmail")
    ) {
      const messageData = {
        from: props.role,
        message: newMessage,
        to: props.role == 'user' ? "mentor" : "user",
        id: courseId,
      }
      console.log("message data to serever ",messageData)
      socket.emit("SentMessage", messageData);
    }
    setNewMessage("");
  };

  return (
    <div className=" ml-80 w-full  ">
      {/* ChatBar */}
      
      { mentorEmail === "not assigned" ? (
        <p className="  text-center text-orange-600 py-4 ">You need to purchase the course to unlock the chat feature.
        <button
            onClick={handleOnclick}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-blue-600 rounded-lg focus:ring-4 focus:outline-none"
          >
            Buy Course
          </button></p>
      ) :(
       <div >
      <header className="chat__mainHeader">
        <p>CHAT WINDOW</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div>
        <div className="message__container bg-violet-50">
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
