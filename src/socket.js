import { io } from "socket.io-client";

// URL backend socket (Render backend hoặc localhost khi dev)
const socket = io(https://cap2-nquiz-be.onrender.com, {
  transports: ['websocket'],
  withCredentials: true
});

export default socket;
