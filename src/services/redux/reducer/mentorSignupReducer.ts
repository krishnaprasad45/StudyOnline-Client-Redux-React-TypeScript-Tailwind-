import  mentorSignup  from "../../../Interfaces/mentorInterfaces";



interface MentorSignupState {
    mentor: mentorSignup | null;
  }
  
  interface MentorSignupAction {
    type: string;
    mentorPayload: mentorSignup;
  }
  
  const initialState: MentorSignupState = {
    mentor: null,
  };



const MentorSignupReducer = (
  state : MentorSignupState = initialState,
  action: MentorSignupAction
): MentorSignupState => {
  switch (action.type) {
    case "MENTOR_SIGNUP":
      return {
        ...state,
        mentor:action.mentorPayload,
      };
    default:
      return state;
  }
};

export default MentorSignupReducer;
