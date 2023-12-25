// // User Dashboard.js
// import "./userHome.css";
// import { useState } from "react";
// import MyCourse from "./mycourse";
// import Assignment from "./assignments";
// import Marks from "./marks";
// import VideoMeet from "./videomeet";
// import Chat from "./chat";
// import Payments from "./payments";
// import EditProfile from "./editprofile";
// import ProfileUpdate from "./profileUpdate";

// const Homepage = () => {
//   const [selectedButton, setSelectedButton] = useState("MyCourse");
//   const [isProfileUpdate, setIsProfileUpdate] = useState(false);
//   const renderComponent = () => {
//     if (isProfileUpdate) {
//       return <ProfileUpdate />;
//     }
//     switch (selectedButton) {
//       case "MyCourse":
//         return <MyCourse />;
//       case "Assignment":
//         return <Assignment />;
//       case "Marks":
//         return <Marks />;
//       case "VideoMeet":
//         return <VideoMeet />;
//       case "Chat":
//         return <Chat />;
//       case "Payments":
//         return <Payments />;
//       case "EditProfile":
//         return <EditProfile onEdit={() => setIsProfileUpdate(true)} />;
//       case "Logout":
//         return <MyCourse />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Left Side - Buttons */}
//       <div
//         className="w-1/5 bg-gradient-to-r from-white via-#002D74 to-white p-4 flex flex-col"
//         style={{ backgroundColor: "rgb(0, 45, 116)" }}
//       >
//         <button
//           className="mb-9 p-2 rounded buttonStyle2"
//           onClick={() => setSelectedButton("MyCourse")}
//         >
//           MyCourse
//         </button>
//         <button
//           className="mb-9 p-2 rounded buttonStyle2"
//           onClick={() => setSelectedButton("Assignment")}
//         >
//           Assignments+
//         </button>
//         <button
//           className="mb-9 p-2 rounded buttonStyle2"
//           onClick={() => setSelectedButton("Marks")}
//         >
//           Marks
//         </button>
//         <button
//           className="mb-9 p-2 rounded buttonStyle2"
//           onClick={() => setSelectedButton("VideoMeet")}
//         >
//           VideoMeet
//         </button>
//         <button
//           className="mb-9 p-2 rounded buttonStyle2"
//           onClick={() => setSelectedButton("Chat")}
//         >
//           Chat
//         </button>
//         <button
//           className="mb-9 p-2 rounded buttonStyle2"
//           onClick={() => setSelectedButton("Payments")}
//         >
//           Payments
//         </button>
//         <button
//           className="mb-9 p-2 rounded buttonStyle2"
//           onClick={() => {
//             setSelectedButton("EditProfile");
//             setIsProfileUpdate(false); // Reset the state when EditProfile button is clicked
//           }}
//         >
//           EditProfile
//         </button>

//         <button
//           className="mb-9 p-2 rounded buttonStyle2"
//           onClick={() => setSelectedButton("Logout")}
//         >
//           Logout
//         </button>
//       </div>

//       {/* Right Side - Rendered Component */}
//       <div className="flex-grow p-4 " style={{ backgroundColor: "#8684BB" }}>
//         {renderComponent()}
//       </div>
//     </div>
//   );
// };

// export default Homepage;

// Mentor Dashboard.js
import "./userHome.css";

import { Link } from "react-router-dom";

const Homepage = () => {
  return (
   
      <div
        className="w-1/5 bg-gradient-to-r from-white via-#002D74 to-white h-screen p-4 flex flex-col fixed"
        style={{ backgroundColor: "rgb(0, 45, 116)" }}
      >
        <Link className="mb-12 p-2 rounded buttonStyle2" to="/list-allcourses">
          <button>Courses</button>
        </Link>

        {/* <Link
          className="mb-12 p-2 rounded buttonStyle2"
          to="/mentor/assignments"
        >
          <button>Assignments</button>
        </Link> */}

        {/* <Link className="mb-12 p-2 rounded buttonStyle2" to="/mentor/marks">
          <button>Marks</button>
        </Link> */}

        <Link className="mb-12 p-2 rounded buttonStyle2" to="/videomeet">
          <button>VideoMeet</button>
        </Link>
        <Link className="mb-12 p-2 rounded buttonStyle2" to="/chat">
          <button>Chat</button>
        </Link>
        <Link className="mb-12 p-2 rounded buttonStyle2" to="/payments">
          <button>Payment Details</button>
        </Link>
        <Link className="mb-12 p-2 rounded buttonStyle2" to="/profile">
          <button>Profile</button>
        </Link>
      </div>
   
  );
};

export default Homepage;
