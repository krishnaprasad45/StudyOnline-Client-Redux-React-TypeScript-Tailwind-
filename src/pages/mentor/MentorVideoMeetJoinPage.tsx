import JoinButton from '../../components/Common/VideoMeet/MentorVideoJoinButton';
import Homepage from '../../components/Mentor/Home/mentorHome';



function MentorCoursePage(){

    return(
        <div>
        <Homepage/>
        <div className='ml-80'><JoinButton /></div>
      
        </div>
    )
} 

export default MentorCoursePage