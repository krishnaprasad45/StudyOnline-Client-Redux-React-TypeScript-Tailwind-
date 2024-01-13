import VideoCall from "../../components/Common/VideoMeet/VideoCall";
import Homepage from "../../components/User/Home/userHome";

function MentorCoursePage() {
  return (
    <div>
      <Homepage />
      <VideoCall value="user" />
    </div>
  );
}

export default MentorCoursePage;
