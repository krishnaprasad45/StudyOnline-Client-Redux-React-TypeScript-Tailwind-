import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminRouters from "./routers/adminRouter/AdminRouters";
import UserRouters from "./routers/userRouter/UserRouters";
import MentorRouters from "./routers/mentorRouter/MentorRouters";
import HomePage from "./pages/Common/HomePage";
// import { io, Socket } from "socket.io-client";

// const socket: Socket = io("http://localhost:5000");

// socket.on("connect", () => {
//   console.log("connected");
// });

// // send an event to the server
// socket.emit("foo", "bar");

// socket.on("foobar", () => {
//   // an event was received from the server
// });

// // upon disconnection
// socket.on("disconnect", (reason) => {
//   console.log(`disconnected due to ${reason}`);
// });

function App() {
  // const token = localStorage.getItem('token')
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminRouters />} />
          <Route path="/mentor/*" element={<MentorRouters />} />
          <Route path="/*" element={<UserRouters />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
