import  {SignupInterface}  from "../../../Interfaces/mentorInterfaces";



interface SignupInterfaceState {
    mentor: SignupInterface | null;
  }
  
  interface SignupInterfaceAction {
    type: string;
    mentorPayload: SignupInterface;
  }
  
  const initialState: SignupInterfaceState = {
    mentor: null,
  };



const SignupInterfaceReducer = (
  state : SignupInterfaceState = initialState,
  action: SignupInterfaceAction
): SignupInterfaceState => {
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

export default SignupInterfaceReducer;
