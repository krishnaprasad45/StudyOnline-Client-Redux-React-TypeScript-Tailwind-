const initialstate ={
    firstname:"",
    lastname:"",
    email:"",
    mobile:"",
    password:""
}


const MentorSignupReducer = (state=initialstate,action: { type: string; field: string; value: string })=>{
    switch(action.type){

        case "MENTOR_SIGNUP":
            return{
                ...state,
                [action.field]:action.value
            }
        default:
            return state
        
    }
}

export default MentorSignupReducer