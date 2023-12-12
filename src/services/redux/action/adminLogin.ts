export const AdminLoginAction = (field: string,value: string)=>{
    return{
        type:"ADMIN_LOGIN",
        field,
        value
    }
}