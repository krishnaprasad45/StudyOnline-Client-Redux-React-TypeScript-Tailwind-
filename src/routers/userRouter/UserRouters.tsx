import { Routes, Route } from "react-router-dom";
import signupPage from "../../pages/user/UserSignupPage";
import Home from "../../pages/user/UserHomePage";
import profilePage from "../../pages/user/UserProfilePage";
import LoginPage from "../../pages/user/UserLoginPage";
import profileUpdate from "../../pages/user/UserProfileUpdatePage";
import UserCourseDetailsPage from "../../pages/user/CoursePages/UserCourseDetailsPage";
import UserListCoursePage from "../../pages/user/CoursePages/UserListCoursePage";
import UserChatPage from "../../pages/user/UserChatPage";
import UserMarksPage from "../../pages/user/UserMarksPage";
import UserPaymentsPage from "../../pages/user/UserPaymentsPage";
import UserVideoMeetPage from "../../pages/user/UserVideoMeetPage";
import LandingPage from "../../pages/Common/HomePage";
import userEndpoints from "../../Constraints/endpoints/userEndpoints";
import UserCourseFeedPage from "../../pages/user/CoursePages/UserCourseFeedPage";
import UserVideoMeetJoinPage from "../../pages/user/UserVideoMeetJoinPage";

const UserRouters: React.FC = () => {
  return (
    <Routes>
      <Route Component={LoginPage} path={userEndpoints.login} />
      <Route Component={signupPage} path={userEndpoints.signup} />
      <Route Component={profilePage} path={userEndpoints.profile} />
      <Route Component={profileUpdate} path={userEndpoints.profileUpdate} />
      <Route Component={Home} path={userEndpoints.dashboard} />
      <Route Component={LandingPage} path={userEndpoints.home} />
      <Route Component={UserMarksPage} path={userEndpoints.marks} />
      <Route Component={UserChatPage} path={userEndpoints.chat} />
      <Route Component={UserPaymentsPage} path={userEndpoints.payments} />
      <Route Component={UserVideoMeetJoinPage} path={userEndpoints.videomeetJoin} />
      <Route Component={UserVideoMeetPage} path={`${userEndpoints.videomeet}/:room`}/>
      <Route Component={UserListCoursePage} path={userEndpoints.courses} />
      <Route Component={UserCourseFeedPage} path={userEndpoints.myCourse} />
      <Route
        Component={UserCourseDetailsPage}
        path={userEndpoints.courseDetails}
      />
    </Routes>
  );
};

export default UserRouters;
