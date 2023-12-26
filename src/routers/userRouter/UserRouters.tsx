  
import {Routes,Route} from 'react-router-dom'
import signupPage from '../../pages/user/UserSignupPage';
import Home from '../../pages/user/UserHomePage';
import profilePage from '../../pages/user/UserProfilePage';
import LoginPage from '../../pages/user/UserLoginPage';
import profileUpdate from '../../pages/user/UserProfileUpdatePage';
import UserCourseDetailsPage from '../../pages/user/CoursePages/UserCourseDetailsPage';
import UserListCoursePage from '../../pages/user/CoursePages/UserListCoursePage';
import UserChatPage from '../../pages/user/UserChatPage';
import UserMarksPage from '../../pages/user/UserMarksPage';
import UserPaymentsPage from '../../pages/user/UserPaymentsPage';
import UserVideoMeetPage from '../../pages/user/UserVideoMeetPage';
import LandingPage from '../../pages/Common/LandingPage';

const  UserRouters: React.FC=()=> {
  return (
   <Routes>
     <Route Component={LoginPage} path='/'/>
       <Route Component={signupPage} path='/signup'/>
       <Route Component={profilePage} path='/profile'/>
       <Route Component={profileUpdate} path='/profile-update' />
       <Route Component={Home} path='/home' />
       <Route Component={LandingPage} path='/home-page' />
       <Route Component={UserMarksPage} path="/marks" />
      {/* <Route Component={UserCoursePage} path="/mycourse" /> */}
      <Route Component={UserChatPage} path="/chat"/>
      <Route Component={UserPaymentsPage} path="/payments"/>
      <Route Component={UserVideoMeetPage} path="/videomeet" />
      <Route Component={UserListCoursePage} path="/list-allcourses"/>
      <Route Component={UserCourseDetailsPage} path="/course-details"/>
   </Routes>
  )
}

export default UserRouters