import { userSignup } from "../../../Interfaces/userInterfaces";

export const UserSignupAction = (user: userSignup) => {
  console.log("userAction",user)
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
