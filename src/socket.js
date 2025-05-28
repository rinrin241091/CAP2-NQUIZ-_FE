// src/socket.js
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:3000", {
  transports: ["websocket"],
  withCredentials: true
});

export default socket;
