const initialstate = {
    firstname:"",
    lastname:"",
    email:"",
    mobile:"",
    image:"",
    experience_image:"",
    aadhar_image:""
    
    }
    
    
    const MentorUpdateReducer = (state=initialstate,action: { type: string; field: string; value: string })=>{
        switch(action.type){
            case "UPDATE_MENTOR":
                return{
                ...state,
                [action.field]:action.value,
                }
         
            default:
                return state
        }
    }
    
    
    export default MentorUpdateReducer