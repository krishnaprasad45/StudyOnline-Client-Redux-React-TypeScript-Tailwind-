import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import { socket } from "../../../services/socket.io/socketConfig";
import { RootState } from "../../../Interfaces/common";
import { useSelector } from "react-redux";

interface JoinButtonProps {
  videoId: string;
  role: string;
  email: string;
}

const JoinButton: React.FC<JoinButtonProps> = ({ videoId }) => {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const userStore = useSelector((state: RootState) => state.user);
  let mentorEmail: string | undefined;

  if (userStore) {
    mentorEmail = userStore?.user?.mentorIncharge;
  }
  const handleJoin = useCallback(() => {
    const room = videoId;
    if (localStorage.getItem("userEmail")) {
      socket.emit("room:join", { email, room });
    }
  }, [email, videoId]);

  const handleJoinRoom = useCallback(
    (data: { room: string }) => {
      const { room } = data;
      navigate(`${userEndpoints.videomeet}/${room}`);
    },
    [navigate]
  );
  const handleOnclick = () => {
    navigate(userEndpoints.courses);
  };

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket?.off("room:join", handleJoinRoom);
    };
  }, [handleJoinRoom]);

  return (
    <div
      className="bg-white"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
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
        <button
          onClick={handleJoin}
          style={{
            backgroundColor: "green",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            color: "white",
          }}
        >
          Ready to receive call
        </button>
      )}
    </div>
  );
};

export default JoinButton;
