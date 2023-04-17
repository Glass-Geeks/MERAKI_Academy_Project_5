const express = require("express");
require("dotenv").config();
const db = require("./module/db");
const mongodb = require("./module/mongoDB");
const cors = require("cors");
const app = express();

const schoolRouter = require("./routes/schools");
const roleRouter = require("./routes/roles");
const usersRouter = require("./routes/users");
const users_schools_router = require("./routes/users_schools");
const friendsRouter = require("./routes/friends");
const messageRouter = require("./routes/messages");
const messageSchema = require("./module/messageSchema");

const { Server } = require("socket.io");
const adminRouter = require("./routes/admin");

app.use(cors());
app.use(express.json());

app.use("/schools", schoolRouter);
app.use("/roles", roleRouter);
app.use("/users", usersRouter);
app.use("/friends", friendsRouter);
app.use("/users_schools", users_schools_router);
app.use("/message", messageRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT;

const server = app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
// http://localhost:3000

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId == userId);
};
const getMyId = (userId) => {
  return users.find((user) => user.userId == userId);
};
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");
  //take userId and socketId from user
  socket.on("ADD_USER", (userId) => {
    addUser(userId, socket.id);
    console.log("users :>> ", users);
    io.emit("GET_USERS", users);
  });

  //send and get message

  socket.on(
    "SEND_MESSAGE",
    async ({ sender, receiverId, text, connection_id }) => {
      const user = getUser(receiverId);
      const myId = getMyId(sender);
      const content = { sender, receiverId, text };
      console.log("content :>> ", content);
      try {
        await messageSchema
          .findOneAndUpdate(
            { connection_id },
            { $push: { messages: content } },
            { new: true }
          )
          .exec();

        io.to([user?.socketId, myId.socketId]).emit("RECEIVE_MESSAGE", {
          sender,
          text,
        });
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  );

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    console.log("users :>> ", users);
    io.emit("GET_USERS", users);
  });
});

/* 

 socket.on("JOIN_ROOM", (data) => {
    console.log("data :>> ", data);
    socket.join(data);
    console.log("rooms", socket.rooms);
  });


   socket.on("SEND_MESSAGE", async (data) => {
    console.log("data :>> ", data);
    const content = { sender: data.sender, message: data.message };
    const roomId = data.roomId;
    await messageSchema
      .findOneAndUpdate(
        { roomId: roomId },
        { $push: { messages: content } },
        { new: true }
      )
      .exec();
    socket.to(roomId).emit("RECEIVE_MESSAGE", content);
  });
*/
