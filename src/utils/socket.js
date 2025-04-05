import { Server } from "socket.io";

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}
