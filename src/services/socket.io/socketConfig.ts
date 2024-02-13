import { io } from "socket.io-client";


// const URL = import.meta.env.VITE_APIURL;
const url = 'http://localhost:4000'
console.log("Url",URL)
export const socket = io(url, {
    autoConnect: true,
    withCredentials: true,
});