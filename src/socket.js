// src/socket.js
import { io } from "socket.io-client";

// Hardcode thẳng URL backend trên Render
const socket = io("https://cap2-nquiz-be.onrender.com", {
  transports: ["websocket"],
  withCredentials: true
});

export default socket;
