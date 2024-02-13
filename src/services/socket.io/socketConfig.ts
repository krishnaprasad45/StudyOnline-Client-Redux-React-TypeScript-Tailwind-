import { io } from "socket.io-client";


// const URL = import.meta.env.VITE_APIURL;
const URL = 'http://localhost:4000'
console.log("Url",URL)
export const socket = io(URL, {
    autoConnect: true,
    withCredentials: true,
});