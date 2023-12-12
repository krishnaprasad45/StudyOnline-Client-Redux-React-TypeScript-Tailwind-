const initialstate={
    email:"",
    password:""
}

const MentorLoginReducer=(state=initialstate,action: { type: string; field: string; value: string })=>{
    switch(action.type){
        case 'MENTOR_LOGIN':
            return {
                ...state,
                [action.field]:action.value
            }

        default:
            return state
    }
}



export default MentorLoginReducer