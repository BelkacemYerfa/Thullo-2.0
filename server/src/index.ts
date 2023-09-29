import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

const socket = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

socket.on("connect", (socket) => {
  socket.on("card:move", (data) => {
    socket.broadcast.emit("card:move", data);
  });
  socket.on("card:delete", (data) => {
    socket.broadcast.emit("card:delete", data);
  });
  socket.on("card:edit", (data) => {});
  socket.on("card:add", (data) => {
    socket.broadcast.emit("card:add", data.card);
  });
  socket.on("list:move", (data) => {
    socket.broadcast.emit("list:move", data);
  });
  socket.on("list:delete", (data) => {});
  socket.on("list:edit", (data) => {});
  socket.on("list:add", (data) => {});
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
