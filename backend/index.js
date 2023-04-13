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
// const { createServer } = require("https");

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
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("rooms", socket.rooms);
  socket.on("JOIN_ROOM", (data) => {
    console.log("data :>> ", data);
    socket.join(data);
    console.log("rooms", socket.rooms);
  });
  socket.on("SEND_MESSAGE",async (data) => {
    console.log('data :>> ', data);
    const content = { sender: data.sender, message: data.message };
    const roomId = data.roomId
    await messageSchema
    .findOneAndUpdate(
      { roomId: roomId },
      { $push: { messages: content } },
      { new: true }
    )
    .exec();
    socket.to(roomId).emit("RECEIVE_MESSAGE", content);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// server.listen(PORT, () =>
//   console.log(`Example app listening on port ${PORT}!`)
// );

/* 
 
*/
