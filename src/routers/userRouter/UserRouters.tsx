  
import {Routes,Route} from 'react-router-dom'
import signupPage from '../../pages/user/signup';
import Home from '../../pages/user/home';
import profilePage from '../../pages/user/profile';
import LoginPage from '../../pages/user/login';
import profileUpdate from '../../pages/user/profileUpdate';

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