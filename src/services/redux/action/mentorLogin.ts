export const MentorLoginAction = (field: string,value: string)=>{
    return{
        type:"MENTOR_LOGIN",
        field,
        value
    }
}