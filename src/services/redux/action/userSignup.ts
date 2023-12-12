export const UserSignupAction = (field: string,value: string)=>{

    return{
        type:"USER_SIGNUP",
        field,
        value
    }

}