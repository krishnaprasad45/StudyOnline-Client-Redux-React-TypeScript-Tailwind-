const initialstate = {
    firstname:"",
    lastname:"",
    email:"",
    mobile:"",
    image:""
    
    }
    
    
    const UserUpdateReducer = (state=initialstate,action: { type: string; field: string; value: string })=>{
        switch(action.type){
            case "UPDATE_USER":
                return{
                ...state,
                [action.field]:action.value,
                }
         
            default:
                return state
        }
    }
    
    
    export default UserUpdateReducer