import  {SignupInterface}  from "../../../Interfaces/mentorInterfaces";

export const MentorSignupAction = (mentor: SignupInterface)=>{

    return{
        type:"MENTOR_SIGNUP",
        mentorPayload:mentor,
    }

}