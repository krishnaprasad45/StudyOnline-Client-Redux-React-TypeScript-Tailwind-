const initialstate={
    email:"",
    password:""
}

const UserLoginReducer=(state=initialstate,action: { type: string; field: string; value: string })=>{
    switch(action.type){
        case 'USER_LOGIN':
            return {
                ...state,
                [action.field]:action.value
            }

        default:
            return state
    }
}



export default UserLoginReducer