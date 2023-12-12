export const UserUpdateAction=(field: string,value: string)=>{

    return{
        type:"UPDATE_USER",
        field,
        value
    }
    }