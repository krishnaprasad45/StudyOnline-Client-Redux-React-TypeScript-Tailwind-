 
import { Routes, Route } from "react-router-dom";
import mentorLoginPage from "../../pages/mentor/login";
import mentorSignupPage from "../../pages/mentor/signup";
import mentorProfilePage from "../../pages/mentor/profile";
import mentorProfileUpdate from "../../pages/mentor/profileUpdate";
import mentorHome from "../../pages/mentor/home";

const MentorRouters: React.FC = () => {
  return (
    <Routes>
      <Route Component={mentorLoginPage} path="/login" />
      <Route Component={mentorSignupPage} path="/signup" />
      <Route Component={mentorProfilePage} path="/profile" />
      <Route Component={mentorProfileUpdate} path="/profile-update" />
      <Route Component={mentorHome} path="/home" />
    </Routes>
  );
};

export default MentorRouters;
