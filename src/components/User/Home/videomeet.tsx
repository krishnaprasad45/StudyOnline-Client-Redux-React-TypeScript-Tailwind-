import { useSelector } from "react-redux";
import BuyCourseForVideomeet from "../../Common/Alerts/BuyCourseForVideomeet";
import { RootState } from "../../../Interfaces/common";

function VideoMeet() {
  const userStore = useSelector((state: RootState) => state.user);

  const userMentor = userStore.user.mentorIncharge;

  return (
    <div>
      {userMentor === "not assigned" ? (
        <BuyCourseForVideomeet />
      ) : (
        <div className="bg-[#7F96B9] h-screen">
          <h2 className="flex justify-center"> Video Meet Page</h2>
        </div>
      )}
    </div>
  );
}

export default VideoMeet;
