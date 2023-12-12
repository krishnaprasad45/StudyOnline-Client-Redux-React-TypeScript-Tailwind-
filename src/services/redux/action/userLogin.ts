export const UserLoginAction = (field: string,value: string)=>{
    return{
        type:"USER_LOGIN",
        field,
        value
    }
}