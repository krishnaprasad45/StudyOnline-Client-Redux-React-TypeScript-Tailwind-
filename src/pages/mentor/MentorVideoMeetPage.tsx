
import VideoCall from '../../components/Common/VideoMeet/VideoCall';
import Homepage from '../../components/Mentor/Home/mentorHome';

function MentorVideoMeetPage(){

    return(
        <div>
        <Homepage/>
        <div className='ml-80'><VideoCall value="mentor"/></div>
        
        </div>
    )
} 

export default MentorVideoMeetPage