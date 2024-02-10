import { io } from "socket.io-client";


const url = 'https://e-courses.online';

export const socket = io(url, {
    autoConnect: true,
    withCredentials: true,
});