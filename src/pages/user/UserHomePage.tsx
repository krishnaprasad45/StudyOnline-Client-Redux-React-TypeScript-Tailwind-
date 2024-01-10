import Greeting from '../../components/Common/Greeting/Greeting'
import Home from '../../components/User/Home/userHome'
  

function UserHomePage() {
  return (
    <div className='w-30'>
        <Home/>
        <Greeting />
    </div>
  )
}

export default UserHomePage