import  mentorSignup  from "../../../Interfaces/mentorInterfaces";

export const MentorSignupAction = (mentor:mentorSignup)=>{

    return{
        type:"MENTOR_SIGNUP",
        mentorPayload:mentor,
    }

}