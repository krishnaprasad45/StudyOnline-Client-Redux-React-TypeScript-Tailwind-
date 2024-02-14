import { io } from "socket.io-client";


const url = import.meta.env.VITE_APIURL;

console.log("Url",URL)
export const socket = io(url, {
    autoConnect: true,
    withCredentials: true,
});