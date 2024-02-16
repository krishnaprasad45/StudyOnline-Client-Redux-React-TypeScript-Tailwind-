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
import UserChapterDetailsPage from "../../pages/user/CoursePages/UserChapterDetailsPage";
import UserCommunityPage from "../../pages/user/UserCommunityPage";
import OTPPage from "../../components/Common/Otp/OTPPage";
import EnterEmail from "../../components/Common/EnterEmail/EnterEmail";
import OTPforReset from "../../components/Common/Otp/OTPforReset";
import ResetPassword from "../../components/Common/NewPassword/NewPassword";
import NotFound from "../../components/Common/PageNotFound/PageNotFound";

const UserRouters: React.FC = () => {
  return (
    <Routes>
      <Route Component={LoginPage} path={userEndpoints.login} />
      <Route Component={signupPage} path={userEndpoints.signup} />
      <Route Component={profilePage} path={userEndpoints.profile} />
      <Route Component={OTPPage} path={userEndpoints.getOtp} />
      <Route Component={OTPforReset} path={userEndpoints.getOtpForReset} />
      <Route Component={EnterEmail} path={userEndpoints.enterEmail} />
      <Route Component={ResetPassword} path={userEndpoints.newPassword} />
      <Route Component={profileUpdate} path={userEndpoints.profileUpdate} />
      <Route Component={Home} path={userEndpoints.dashboard} />
      <Route Component={LandingPage} path={userEndpoints.home} />
      <Route Component={UserMarksPage} path={userEndpoints.marks} />
      <Route Component={UserChatPage} path={userEndpoints.chat} />
      <Route Component={UserCommunityPage} path={userEndpoints.community} />
      <Route Component={UserPaymentsPage} path={userEndpoints.payments} />
      <Route Component={UserVideoMeetJoinPage} path={userEndpoints.videomeetJoin} />
      <Route Component={UserVideoMeetPage} path={`${userEndpoints.videomeet}/:room`}/>
      <Route Component={UserListCoursePage} path={userEndpoints.courses} />
      <Route Component={UserCourseFeedPage} path={userEndpoints.myCourse} />
      <Route Component={UserCourseDetailsPage} path={userEndpoints.courseDetails} />
      <Route Component={UserChapterDetailsPage} path={userEndpoints.chapterDetails} />
      <Route Component={UserChapterDetailsPage} path={userEndpoints.chapterDetails} />
      <Route element={<NotFound role='user'  />} path={userEndpoints.notFound}/>
    </Routes>
  );
};

export default UserRouters;
