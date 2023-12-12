import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_GOOGLE_APIKEY,
    authDomain: import.meta.env.VITE_GOOGLE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_GOOGLE_PROJECTID,
    storageBucket: import.meta.env.VITE_GOOGLE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSEGING_SENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASURMENTID,
};

const Firebase = initializeApp(firebaseConfig);
const auth = getAuth(Firebase);
const storage = getStorage(Firebase)

export { Firebase, auth, storage };