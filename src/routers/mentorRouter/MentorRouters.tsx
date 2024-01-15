 
import { Routes, Route } from "react-router-dom";
import mentorLoginPage from "../../pages/mentor/MentorLoginPage";
import mentorSignupPage from "../../pages/mentor/MentorSignupPage";
import mentorProfilePage from "../../pages/mentor/MentorProfilePage";
import mentorProfileUpdate from "../../pages/mentor/MentorProfileUpdatePage";
import mentorHome from "../../pages/mentor/MentorHomePage";
import MentorCoursePage  from "../../pages/mentor/CoursePages/MentorListCoursePage";
import MentorAssignmentPage from "../../pages/mentor/MentorAssignmentPage";
import MentorMarksPage from "../../pages/mentor/MentorMarksPage";
import MentorVideoMeetPage from "../../pages/mentor/MentorVideoMeetPage";
import MentorChatPage from "../../pages/mentor/MentorChatPage";
import MentorPaymentsPage from "../../pages/mentor/MentorPaymentsPage";
import MentorAddCoursePage from "../../pages/mentor/CoursePages/MentorAddCoursePage";
import MentorListCoursePage from "../../pages/mentor/CoursePages/MentorListCoursePage";
import MentorCourseDetailsPage from "../../pages/mentor/CoursePages/MentorCourseDetailsPage";
import MentorVideoMeetJoinPage from "../../pages/mentor/MentorVideoMeetJoinPage";

const MentorRouters: React.FC = () => {
  return (
    <Routes>
      <Route Component={mentorLoginPage} path="/login" />
      <Route Component={mentorSignupPage} path="/signup" />
      <Route Component={mentorProfilePage} path="/profile" />
      <Route Component={mentorProfileUpdate} path="/profile/update" />
      <Route Component={mentorHome} path="/home" />
      <Route Component={MentorAssignmentPage} path="/assignments" />
      <Route Component={MentorAddCoursePage} path="/add/course"/>
      <Route Component={MentorMarksPage} path="/marks" />
      <Route Component={MentorCoursePage} path="/mycourse" />
      <Route Component={MentorChatPage} path="/chat"/>
      <Route Component={MentorPaymentsPage} path="/payments"/>
      <Route Component={MentorVideoMeetJoinPage} path="/join/videomeet" />
      <Route Component={MentorVideoMeetPage} path="/videomeet/:room" />
      <Route Component={MentorListCoursePage} path="/courses"/>
      <Route Component={MentorCourseDetailsPage} path="/course/details"/>
    </Routes>
  );
};

export default MentorRouters;
