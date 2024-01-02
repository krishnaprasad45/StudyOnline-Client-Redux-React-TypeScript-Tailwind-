// import React, { useEffect, useState } from "react";
// import { socket } from "../../../services/socket.io/socketConfig";
// import ChatBody from "../../Common/Chat/ChatBody";

// interface Message {
//   text: string;
//   name: string;
//   id: string;
//   socketID: string;
// }

// const Chat: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     socket.on("messageResponse", (data: Message) =>
//       setMessages([...messages, data])
//     );
//   }, [ messages]);

//   return (
//     <div className="chat ml-80 ">
//       <div className="chat__main">
//         <ChatBody />
//       </div>
//     </div>
//   );
// };

// export default Chat;
