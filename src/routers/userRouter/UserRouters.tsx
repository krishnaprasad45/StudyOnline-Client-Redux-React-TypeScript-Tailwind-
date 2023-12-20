  
import {Routes,Route} from 'react-router-dom'
import signupPage from '../../pages/user/UserSignupPage';
import Home from '../../pages/user/UserHomePage';
import profilePage from '../../pages/user/UserProfilePage';
import LoginPage from '../../pages/user/UserLoginPage';
import profileUpdate from '../../pages/user/UserProfileUpdatePage';

const  UserRouters: React.FC=()=> {
  return (
   <Routes>
     <Route Component={LoginPage} path='/'/>
       <Route Component={signupPage} path='/signup'/>
       <Route Component={profilePage} path='/profile'/>
       <Route Component={profileUpdate} path='/profile-update' />
       <Route Component={Home} path='/home' />
   </Routes>
  )
}

export default UserRouters