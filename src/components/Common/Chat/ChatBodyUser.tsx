import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../services/socket.io/socketConfig";
import { RootState } from "../../../Interfaces/common";
import { useSelector } from "react-redux";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import { FaImage } from "react-icons/fa";
import uploadImage from "../../../services/cloudinary/customeImageUpload";

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
  const [newMessage, setNewMessage] = useState<string>();
  const userStore = useSelector((state: RootState) => state.user);
  const [viewImage, setViewImage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  let mentorEmail: string | undefined;
  const chatId = props.chatId;
  const role = props.role;
  const email = props.email;
  const chattingWith = (email?.split("@")[0] || "").toUpperCase();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  if (userStore) {
    mentorEmail = userStore?.user?.mentorIncharge;
  }

  useEffect(() => {
    mentorAxios
      .get(`${mentorEndpoints.getChatHistory}?chatId=${chatId}`)
      .then((response) => {
 
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
    navigate(userEndpoints.dashboard);
  };
  const handleOnclick = () => {
    navigate(userEndpoints.courses);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    
    if (
      (messages && localStorage.getItem("userEmail")) 
    ) {
      const messageData = {
        from: props.role,
        message: newMessage,
        to: role == "user" ? "mentor" : "user",
        id: chatId,
      };

      socket.emit("SentMessage", messageData);

      socket.on("SentUpdatedMessage", (updatedMessage) => {
        setMessages(updatedMessage.messages);

        // Closing the image preview after sending the image
        setViewImage(undefined);
        setImage(undefined);
      });
    }
    setNewMessage("");
  };
  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full md:ml-80">
      {" "}
      {/* ChatBar */}
      {mentorEmail === "not assigned" ? (
        <p className="  text-center text-orange-600 py-4 ">
          You need to purchase the course to unlock the chat feature.
          <button
            onClick={handleOnclick}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-blue-600 rounded-lg focus:ring-4 focus:outline-none"
          >
            Buy Course
          </button>
        </p>
      ) : (
        <div>
          <header className="chat__mainHeader">
            <p>{chattingWith}</p> {/* Chatting with */}
            <button className="leaveChat__btn" onClick={handleLeaveChat}>
              LEAVE CHAT
            </button>
          </header>

          <div>
            <div
              id="chat-container"
              className="message__container bg-violet-50"
            >
              {messages.map((data) => (
                <div className="message__chats" key={data.id}>
                  {role === "mentor" ? (
                    data.from === "mentor" ? (
                      <>
                        <p className="sender__name">You</p>
                        {data.message &&
                        typeof data.message === "string" &&
                        data.message.startsWith("https") ? (
                          <img
                            style={{
                              width: "auto",
                              height: "100px",
                              margin: "5px 0 15px 0",
                            }}
                            src={data.message} 
                            alt="Image Preview"
                            className="image-preview"
                          />
                        ) : (
                          <div className="message__sender">
                            <p>{data.message}</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <p>{data.from}</p>
                        <div className="message__recipient">
                          <p>{data.message}</p>
                        </div>
                      </>
                    )
                  ) : data.from === "mentor" ? (
                    <>
                      <p>{data.from}</p>
                      <div className="message__recipient">
                        {data.message &&
                        typeof data.message === "string" &&
                        data.message.startsWith("https") ? (
                          <img
                            style={{
                              width: "auto",
                              height: "100px",
                              margin: "5px 0 15px 0",
                            }}
                            src={data.message}
                            alt="Image Preview"
                            className="image-preview"
                          />
                        ) : (
                          <p>{data.message}</p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="sender__name">You</p>
                      <div className="message__sender">
                        {data.message &&
                        typeof data.message === "string" &&
                        data.message.startsWith("https") ? (
                          <img
                            style={{
                              width: "auto",
                              height: "100px",
                              margin: "5px 0 15px 0",
                            }}
                            src={data.message} 
                            alt="Image Preview"
                            className="image-preview"
                          />
                        ) : (
                          <p>{data.message}</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="chat__footer">
              <form className="form" onSubmit={handleSendMessage}>
                <button
                  type="button"
                  className="file-btn"
                  onClick={handleFileButtonClick}
                >
                  <FaImage style={{ fontSize: "28px" }} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    const imageFileList = e.target.files;
                    if (imageFileList && imageFileList.length > 0) {
                      const image = imageFileList[0];
                      const foldername = "Chat Image";
                      setImage(image);
                      setLoading(true);
                      const imageUrl = await uploadImage(image, foldername);
                      setViewImage(imageUrl);
                      setLoading(false);

                      // Storing the image URL in setNewMessage
                      setNewMessage(imageUrl);
                    }
                  }}
                  style={{ display: "none" }}
                />
                {loading && <div>Uploading...</div>}
                <div>
                  {image && (
                    <img
                      style={{
                        width: "auto",
                        height: "100px",
                        margin: "5px 0 15px 0",
                      }}
                      src={viewImage}
                 
                      className="profile-image"
                    />
                  )}
                </div>
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
