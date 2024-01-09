import { userSignup } from "../../../Interfaces/userInterfaces";

interface UserSignupState {
  user: userSignup | null;
}

export interface UserSignupAction {
  type: string;
  userPayload: userSignup;
}

const initialState: UserSignupState = {
  user: null,
};

const UserSignupReducer = (
  state: UserSignupState = initialState,
  action: UserSignupAction
): UserSignupState => {
  console.log("userReducer",action.userPayload);
  switch (action.type) {
    case "USER_SIGNUP":
      return {
        ...state,
        user: action.userPayload,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default UserSignupReducer;
