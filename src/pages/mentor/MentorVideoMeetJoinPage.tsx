import { useLocation } from 'react-router-dom';
import JoinButton from '../../components/Common/VideoMeet/MentorVideoJoinButton';
import Homepage from '../../components/Mentor/Home/mentorHome';



function MentorCoursePage(){
    const { state } = useLocation();
    const videoId = state.paymentId;
    const learnerEmail = state.learnerEmail;

    return(
        <div>
        <Homepage/>
        <div className='ml-80'><JoinButton  role={"mentor"} videoId= {`${videoId}`} email={`${learnerEmail}`} /></div>
      
        </div>
    )
} 

export default MentorCoursePage