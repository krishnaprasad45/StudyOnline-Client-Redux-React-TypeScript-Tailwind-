export const MentorSignupAction = (field: string,value: string)=>{

    return{
        type:"MENTOR_SIGNUP",
        field,
        value
    }

}