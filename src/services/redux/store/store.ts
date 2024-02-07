import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserSignupReducer from "../reducer/userSignupReducer.js";
import UserUpdateReducer from "../reducer/userUpdateReducer.js";
import MentorSignupReducer from "../reducer/mentorSignupReducer.js";
import MentorUpdateReducer from "../reducer/mentorUpdateReducer.js";
import ApiUrlReducer from "../reducer/urlReducer";




const userPersistConfig = { key: "userAuth", storage, version: 1 };
const userUpdatePersistConfig = { key: "userUpdateAuth", storage, version: 1 };
const mentorPersistConfig = { key: "mentorAuth", storage, version: 1 };
const mentorUpdatePersistConfig = { key: "mentorUpdateAuth", storage, version: 1 };
const apiUrlPersistConfig = { key: "urlAuth", storage, version: 1 };

const userAuthPersistReducer = persistReducer(userPersistConfig, UserSignupReducer);
const userUpdatePersistReducer = persistReducer(userUpdatePersistConfig, UserUpdateReducer);
const mentorUpdatePersistReducer = persistReducer(mentorUpdatePersistConfig, MentorUpdateReducer);
const mentorAuthPersistReducer = persistReducer(mentorPersistConfig, MentorSignupReducer);
const urlPersistReducer = persistReducer(apiUrlPersistConfig, ApiUrlReducer);

export const store = configureStore({
  reducer: {
      user: userAuthPersistReducer,
      userUpdate:userUpdatePersistReducer,
      mentor: mentorAuthPersistReducer,
      mentorUpdate:mentorUpdatePersistReducer,
      url:urlPersistReducer
    
  }as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mentor: any
  },


  middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      });
      return middleware;
  },
})

export const persistor = persistStore(store);


