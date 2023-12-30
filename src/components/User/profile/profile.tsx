import './profile.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userProfile } from '../../../Interfaces/userInterfaces'
import { userAxios } from '../../../Constraints/axiosInterceptors/userAxiosInterceptors'
import userEndpoints from '../../../Constraints/endpoints/userEndpoints'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Interfaces/common';
import { UserLogout } from '../../../services/redux/action/userSignup';

function Profile() {
  const [data, setData] = useState<userProfile>();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userStore = useSelector((state:RootState)=>state.UserSignup)
  const user =userStore.user
  const Logout = (() => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("usertoken");
    // dispatch(UserLogout())
    navigate(userEndpoints.login)
  })

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate(userEndpoints.login);  
  } else{
    userAxios.get(userEndpoints.profile, {
      params: { email: userEmail },
    
    }).then(response => {
   
      setData(response.data)
    }).catch((error) => {
      console.error(error.message);
    })
  }
  
  }, [navigate])
 
  // console.log("user()",user.mobile)
  return (
    
    <div className="wrapper">
      { data?.email && <div className="profile-card js-profile-card">
        <div className="profile-card__img">
        <img src={data.image} alt={data.image} />
        </div>
        <div className="profile-card-inf">
            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title"> {data.firstname} {data.lastname}</div>
            </div>
          </div>
        <div className="profile-card__cnt js-profile-cnt">
          <br/>
          <div className="profile-card__txt"> Email ID  :   <strong>{data.email}</strong></div>
          <div className="profile-card-loc">
            <span className="profile-card-loc__icon">
              <svg className="icon"><use xlinkHref="#icon-location"></use></svg>
            </span>

            
            <span className="profile-card-loc__txt"> PHONE  : {data.mobile}  </span>
            {/* <span className="profile-card-loc__txt"> PHONE  : {user.mobile}  </span> */}
          </div>

          

      

          <div className="profile-card-ctr">
            <button onClick={(() => { navigate(userEndpoints.profileUpdate) })} className="profile-card__button button--blue js-message-btn">EDIT</button>
            <button onClick={Logout} className="profile-card__button button--orange">LOGOUT</button>
          </div>
        </div>
      </div>}
      
    </div>
   
  )
}

export default Profile