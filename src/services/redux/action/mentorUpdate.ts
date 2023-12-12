export const MentorUpdateAction=(field: string,value: string)=>{

    return{
        type:"UPDATE_MENTOR",
        field,
        value
    }
    }