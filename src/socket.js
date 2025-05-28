import { io } from "socket.io-client";

// URL backend socket (Render backend hoặc localhost khi dev)
const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:3000", {
  transports: ['websocket'],
  withCredentials: true
});

export default socket;
