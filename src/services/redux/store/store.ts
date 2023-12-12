import UserLoginReducer from "../reducer/userLoginReducer";
import UserSignupReducer from "../reducer/userSignupReducer.js";
import UserUpdateReducer from "../reducer/userUpdateReducer.js";
import MentorLoginReducer from "../reducer/mentorLoginReducer";
import MentorSignupReducer from "../reducer/mentorSignupReducer.js";
import MentorUpdateReducer from "../reducer/mentorUpdateReducer.js";
import AdminLoginReducer from "../reducer/adminLoginReducer";


import ApiUrlReducer from "../reducer/urlReducer";
import { combineReducers, legacy_createStore as createStore } from "redux";

const rootReducer = combineReducers({
  UserSignup: UserSignupReducer,
  UserLogin: UserLoginReducer,
  UserUpdate: UserUpdateReducer,
  MentorSignup: MentorSignupReducer,
  MentorLogin: MentorLoginReducer,
  MentorUpdate: MentorUpdateReducer,
  AdminLogin: AdminLoginReducer,
  APIURL: ApiUrlReducer,
});

const store = createStore(rootReducer);

export default store;


