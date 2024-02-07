import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminRouters from "./routers/adminRouter/AdminRouters";
import UserRouters from "./routers/userRouter/UserRouters";
import MentorRouters from "./routers/mentorRouter/MentorRouters";
import HomePage from "./pages/Common/HomePage";

function App() {
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
