import { io } from "socket.io-client";


const url = 'http://13.126.248.71';

export const socket = io(url, {
    autoConnect: true,
    withCredentials: true,
});