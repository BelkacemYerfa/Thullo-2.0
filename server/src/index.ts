import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import io from "socket.io";
import http from "http";

const app = express();

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

const socket = new io.Server(8000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PATCH"],
  },
});

socket.on("connect", (socket) => {
  console.log("connected", socket.id);
  socket.on("card:move", (data) => {
    console.log("card:move : ", data);
    socket.broadcast.emit("dragTaskEmit", data);
  });
  socket.on("card:drop", (data) => {
    console.log("card:drop : ", data);
    socket.broadcast.emit("dropTaskEmit", data);
  });
  socket.on("card:delete", (data) => {});
  socket.on("card:edit", (data) => {});
  socket.on("card:add", (data) => {
    console.log("card:add : ", data);
    socket.broadcast.emit("addTaskEmit", data);
  });
  socket.on("list:move", (data) => {});
  socket.on("list:delete", (data) => {});
  socket.on("list:edit", (data) => {});
  socket.on("list:add", (data) => {});
});
