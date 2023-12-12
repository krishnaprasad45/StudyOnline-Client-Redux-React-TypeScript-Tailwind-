const initialstate ={
    firstname:"",
    lastname:"",
    email:"",
    mobile:"",
    password:"",
    image:""
}


const UserSignupReducer = (state=initialstate,action: { type: string; field: string; value: string })=>{
    switch(action.type){

        case "USER_SIGNUP":
            return{
                ...state,
                [action.field]:action.value
            }
        default:
            return state
        
    }
}

export default UserSignupReducer