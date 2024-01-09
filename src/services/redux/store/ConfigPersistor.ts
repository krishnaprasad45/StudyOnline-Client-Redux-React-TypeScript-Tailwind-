// import { persistStore, persistReducer } from 'redux-persist';
// import localForage from 'localforage'
// import rootReducer  from './store';
// import { createStore } from 'redux';


// const persistConfig = {
//     key: 'root',
//     storage: localForage,
//     whitelist: ['UserSignup', 'MentorSignup'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const configureStore = () => {
//     const store = createStore(persistedReducer);
//     const persistor = persistStore(store);
//     return { store, persistor};
// };