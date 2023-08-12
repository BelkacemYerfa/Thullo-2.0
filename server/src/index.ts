import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("join_room", (data) => {
    socket.join(data.roomId);
    console.log("User joined room: " + data.roomId);
  });
  socket.on("start_dragging", (data) => {
    socket.emit("update_dragging", data);
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
