import { Server } from "socket.io";
import { createServer } from "node:http";
import dotenv from "dotenv";
import { app } from "./utils/expMongo.mjs";

dotenv.config();

const server = createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // console.log("a user connected");
  socket.on("setup", (user_id) => {
    // console.log("user connected at : ", user_id);
    socket.join(user_id);
    socket.emit("connected");
  });

  socket.on("join chat", (chat_id) => {
    socket.join(chat_id);
    // console.log(socket.id + " joined room " + chat_id);
  });

  socket.on("new message", (message) => {
    const sender = message.sender;
    // console.log(message);
    message.chat.users.map((user) => {
      if (user !== sender) {
        socket.in(user).emit("message received", message);
      }
    });
  });

  socket.on("disconnect", () => {
    // console.log("User disconnected : ", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log("server running at localhost", process.env.PORT);
});
