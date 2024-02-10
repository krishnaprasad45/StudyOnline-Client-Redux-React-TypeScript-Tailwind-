import CommunityChatUser from "../../components/Common/Chat/CommunityChatUser";
import Homepage from "../../components/User/Home/userHome";
import "./chatCSS.css";


function UserChatPage() {

  const chatId ='100';
  const mentorEmail = localStorage.getItem("userEmail") ?? undefined

  return (
    <div className="flex flex-col md:flex-row">
      <Homepage />
      <CommunityChatUser role={"user"} chatId={chatId} email={mentorEmail} />
    </div>
  );
}

export default UserChatPage;
