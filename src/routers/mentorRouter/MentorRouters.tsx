 
import { Routes, Route } from "react-router-dom";
import mentorLoginPage from "../../pages/mentor/MentorLoginPage";
import mentorSignupPage from "../../pages/mentor/MentorSignupPage";
import mentorProfilePage from "../../pages/mentor/MentorProfilePage";
import mentorProfileUpdate from "../../pages/mentor/MentorProfileUpdatePage";
import mentorHome from "../../pages/mentor/MentorHomePage";
import MentorCoursePage  from "../../pages/mentor/CoursePages/MentorListCoursePage";
import MentorVideoMeetPage from "../../pages/mentor/MentorVideoMeetPage";
import MentorChatPage from "../../pages/mentor/MentorChatPage";
import MentorPaymentsPage from "../../pages/mentor/MentorPaymentsPage";
import MentorAddCoursePage from "../../pages/mentor/CoursePages/MentorAddCoursePage";
import MentorListCoursePage from "../../pages/mentor/CoursePages/MentorListCoursePage";
import MentorCourseDetailsPage from "../../pages/mentor/CoursePages/MentorCourseDetailsPage";
import MentorVideoMeetJoinPage from "../../pages/mentor/MentorVideoMeetJoinPage";
import MentorAddChapterPage from "../../pages/mentor/CoursePages/MentorAddChapterPage";
import MentorChapterDetailsPage from "../../pages/mentor/CoursePages/MentorChapterDetailsPage";
import MentorLearnersPage from "../../pages/mentor/MentorLearnersPage";
import MentorEditCoursePage from "../../pages/mentor/CoursePages/MentorEditCoursePage";
import MentorEditChapterPage from "../../pages/mentor/CoursePages/MentorEditChapterPage";

const MentorRouters: React.FC = () => {
  return (
    <Routes>

      <Route Component={mentorLoginPage} path="/login" />
      <Route Component={mentorSignupPage} path="/signup" />
      <Route Component={mentorProfilePage} path="/profile" />
      <Route Component={mentorProfileUpdate} path="/profile/update" />
      <Route Component={mentorHome} path="/home" />

      <Route Component={MentorAddCoursePage} path="/add/course"/>
      <Route Component={MentorEditCoursePage} path="/edit/course"/>
      <Route Component={MentorListCoursePage} path="/courses"/>
      <Route Component={MentorCoursePage} path="/mycourse" />
      <Route Component={MentorCourseDetailsPage} path="/course/details"/>

      <Route Component={MentorAddChapterPage} path="/add/chapter"/>
      <Route Component={MentorEditChapterPage} path="/edit/chapter"/>
      <Route Component={MentorChapterDetailsPage} path="/chapter/details"/>

      <Route Component={MentorChatPage} path="/chat"/>
      <Route Component={MentorVideoMeetJoinPage} path="/join/videomeet" />
      <Route Component={MentorVideoMeetPage} path="/videomeet/:room" />
      <Route Component={MentorPaymentsPage} path="/payments"/>
      <Route Component={MentorLearnersPage} path="/learners"/>

    </Routes>
  );
};

export default MentorRouters;
