import { userSignup } from "../../../Interfaces/userInterfaces";

export const UserSignupAction = (user: userSignup) => {
  return {
    type: "USER_SIGNUP",
    userPayload: user, 
  };
};
export const UserLogout = () => {
  
  return {
    type: "USER_LOGOUT",
    userPayload: null, 
  };
};
