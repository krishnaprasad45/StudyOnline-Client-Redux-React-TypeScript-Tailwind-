 
import { Routes, Route } from "react-router-dom";
import mentorLoginPage from "../../pages/mentor/MentorLoginPage";
import mentorSignupPage from "../../pages/mentor/MentorSignupPage";
import mentorProfilePage from "../../pages/mentor/MentorProfilePage";
import mentorProfileUpdate from "../../pages/mentor/MentorProfileUpdatePage";
import mentorHome from "../../pages/mentor/MentorHomePage";
import MentorCoursePage  from "../../pages/mentor/MentorCoursePage";
import MentorAssignmentPage from "../../pages/mentor/MentorAssignmentPage";
import MentorMarksPage from "../../pages/mentor/MentorMarksPage";
import MentorVideoMeetPage from "../../pages/mentor/MentorVideoMeetPage";
import MentorChatPage from "../../pages/mentor/MentorChatPage";
import MentorPaymentsPage from "../../pages/mentor/MentorPaymentsPage";

const MentorRouters: React.FC = () => {
  return (
    <Routes>
      <Route Component={mentorLoginPage} path="/login" />
      <Route Component={mentorSignupPage} path="/signup" />
      <Route Component={mentorProfilePage} path="/profile" />
      <Route Component={mentorProfileUpdate} path="/profile-update" />
      <Route Component={mentorHome} path="/home" />
      <Route Component={MentorCoursePage} path="/mycourse" />
      <Route Component={MentorAssignmentPage} path="/assignments" />
      <Route Component={MentorMarksPage} path="/marks" />
      <Route Component={MentorVideoMeetPage} path="/videomeet" />
      <Route Component={MentorChatPage} path="/chat"/>
      <Route Component={MentorPaymentsPage} path="/payments"/>
    </Routes>
  );
};

export default MentorRouters;
