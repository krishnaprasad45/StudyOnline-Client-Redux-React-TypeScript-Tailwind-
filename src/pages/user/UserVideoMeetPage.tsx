import VideoCall from "../../components/Common/VideoMeet/VideoCall";
import Homepage from "../../components/User/Home/userHome";

function UserVideoMeetPage() {
  return (
    <div>
      <Homepage />
      <div className="ml-80"><VideoCall value="user" /></div>
      
    </div>
  );
}

export default UserVideoMeetPage;
