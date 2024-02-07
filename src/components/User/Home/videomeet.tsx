import VideoCall from "../../Common/VideoMeet/VideoCall";

function VideoMeet() {
  return (
    <div>
      <div className="bg-[#7F96B9] h-screen">
        <h2 className="flex justify-center"> Video Meet Page</h2>
        <VideoCall value="user"/>
      </div>
    </div>
  );
}

export default VideoMeet;
