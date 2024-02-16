  
import {Routes,Route} from 'react-router-dom'
import AdminLoginPage from '../../pages/admin/AdminLoginPage';
import AdminHomePage from '../../pages/admin/AdminHomePage';
import AdminMentorManagementPage from '../../pages/admin/AdminMentorManagementPage';
import AdminUserManagementPage from '../../pages/admin/AdminUserManagementPage';
import AdminStatisticsPage from '../../pages/admin/AdminStatisticsPage';
import AdminSalesReportPage from '../../pages/admin/AdminSalesReportPage';
import AdminMentorDetailsPage from '../../pages/admin/AdminMentorDetailsPage';
import NotFound from '../../components/Common/PageNotFound/PageNotFound';




const AdminRouters:React.FC = ()=> {
  return (
    
    <Routes>
     
        
       <Route Component={AdminLoginPage} path='/login' />
       <Route Component={AdminHomePage} path='/dashboard' />
       <Route Component={AdminHomePage} path='/statistics' />
       <Route Component={AdminMentorManagementPage} path='/mentor-management' />
       <Route Component={AdminUserManagementPage} path='/user-management' />
       <Route Component={AdminSalesReportPage} path='/sales-report' />
       <Route Component={AdminStatisticsPage} path='/statitics' />
       <Route Component={AdminMentorDetailsPage} path='/mentor-details' />
       <Route element={<NotFound role='admin'  />} path="/*"/>

     
    </Routes>
  )
}

export default AdminRouters