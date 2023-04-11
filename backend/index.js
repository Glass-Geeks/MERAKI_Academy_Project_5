const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const db = require("./module/db");
const mongodb = require("./module/mongoDB");
const schoolRouter = require("./routes/schools");
const roleRouter = require("./routes/roles");
const usersRouter = require("./routes/users");
const users_schools_router = require("./routes/users_schools");
const friendsRouter = require("./routes/friends");
const socket = require("socket.io");
const messageSchema = require("./module/messageSchema");
const messageRouter = require("./routes/messages");




app.use(cors());
app.use(express.json());
app.use("/schools", schoolRouter);
app.use("/roles", roleRouter);
app.use("/users", usersRouter);
app.use("/friends", friendsRouter);
app.use("/users_schools", users_schools_router);
app.use("/message", messageRouter);
const PORT = process.env.PORT;
const server = app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);

const io = socket(server, {
  cors: {
    origin: process.env.CLIENT_API,
    method: ["GET", "POST"],
  },
});

io.on("CONNECTION", (socket) => {
  socket.on("JOIN_ROOM", (data) => {
    socket.join(data);
  });
  socket.on("SEND_MESSAGE", (data) => {
    const { roomId, content } = data;
    const updateMessage = messageSchema
      .updateOne({ roomId }, { $push: { message: content } })
      .then(() => {
        socket.to(data.room).emit("RECEIVE_MESSAGE", data.content);
      })
      .catch((err) => console.log(err));
  });
});
