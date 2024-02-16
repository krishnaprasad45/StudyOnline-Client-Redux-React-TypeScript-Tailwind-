import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../services/socket.io/socketConfig";
import { RootState } from "../../../Interfaces/common";
import { useSelector } from "react-redux";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";

interface Message {
  message: string;
  to: string;
  from: string;
  id: number;
}
interface ChatBodyProps {
  role: string;
  chatId: string | undefined;
  email: string | undefined;
}

const ChatBody: React.FC<ChatBodyProps> = (props) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const mentorStore = useSelector((state: RootState) => state.mentor);
  const verificationStatus = mentorStore.mentor.verification

  const chatId = props.chatId;
  const role = props.role;
  const email = props.email


  
  console.log("props", props);

  useEffect(() => {
    mentorAxios
      .get(`${mentorEndpoints.getChatHistory}?chatId=${chatId}`)
      .then((response) => {
        console.log("res-data", response.data);
        setMessages(response.data.messages);
      });
  
   
  
    // Scroll to the bottom when messages are updated
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, []);

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
  };


  const handleSendMessage = (e: FormEvent) => {
    console.log("handle sed message 6");
    e.preventDefault();
    if (
      (messages && localStorage.getItem("mentorEmail")) 
    ) {
      const messageData = {
        from: email,
        message: newMessage,
        to: role == "user" ? "mentor" : "user",
        id: chatId,
      };
      console.log("message data to serever ", messageData);
      socket.emit("SentMessage", messageData);

      socket.on("SentUpdatedMessage",(updatedMessage)=>{
        console.log("SentUpdatedMessage",updatedMessage)
        setMessages(updatedMessage.messages)
      })
    }
    setNewMessage("");
    
  };

  return (
    <div className=" ml-80 w-full  ">
      {/* ChatBar */}

      {verificationStatus === "Pending" || verificationStatus === "Reject" ? (
        <p className="  text-center text-orange-600 py-4 ">
         Account is not verified by the admin
        </p>
      ) : (
        <div>
          <header className="chat__mainHeader">
          <p className="font-semibold uppercase flex">Community Group</p>
            <button className="leaveChat__btn" onClick={handleLeaveChat}>
              LEAVE CHAT
            </button>
          </header>

          <div>
            <div  id="chat-container" className="message__container bg-violet-50">
              {messages.map((data) =>
                role == "mentor" ? (
                  data.from === email  ? (
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
                ) : data.from === "mentor" ? (
                  <div className="message__chats" key={data.id}>
                    <p>{email}</p>

                    <div className="message__recipient">
                      <p>{data.message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="message__chats" key={data.id}>
                    <p className="sender__name">You</p>
                    <div className="message__sender">
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
        </div>
      )}
    </div>
  );
};

export default ChatBody;
