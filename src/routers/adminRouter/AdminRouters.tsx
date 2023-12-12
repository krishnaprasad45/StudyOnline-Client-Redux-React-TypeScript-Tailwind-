  
import {Routes,Route} from 'react-router-dom'
import adminLoginPage from '../../pages/admin/login';
import adminHomePage from '../../pages/admin/home';




const AdminRouters:React.FC = ()=> {
  return (
    
    <Routes>
     
        
       <Route Component={adminLoginPage} path='/login' />
       <Route Component={adminHomePage} path='/dashboard' />
     
    </Routes>
  )
}

export default AdminRouters