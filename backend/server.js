import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

//Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

//Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

global.io = io;

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

//Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    (console.log("MongoDB connected successfully."),
      server.listen(process.env.PORT, () =>
        console.log(`Server running on port ${process.env.PORT}`),
      ));
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
