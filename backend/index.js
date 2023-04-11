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
const { Server } = require("socket.io");
const messageSchema = require("./module/messageSchema");
const messageRouter = require("./routes/messages");
const { createServer } = require('http')
app.use(cors());
app.use(express.json());
app.use("/schools", schoolRouter);
app.use("/roles", roleRouter);
app.use("/users", usersRouter);
app.use("/friends", friendsRouter);
app.use("/users_schools", users_schools_router);
app.use("/message", messageRouter);
const PORT = process.env.PORT;
 app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
const chatServer = createServer()
const io = new Server(chatServer, {
  cors: {
    origin: process.env.CLIENT_API,
    method: ["GET", "POST"],
  },
});

io.on("CONNECTION", (socket) => {
  console.log("socket", socket.id);
  socket.on("JOIN_ROOM", (data) => {
    console.log(data);
    socket.join(data);
  });
  socket.on("SEND_MESSAGE", async (data) => {
    const { roomId, content } = data;
    try {
      const result = await messageSchema.findOneAndUpdate({roomId},
        { $push: { messages: content } }
      );
      console.log("result :>> ", result);
      socket.to(data.roomId).emit("RECEIVE_MESSAGE", data.content);
    } catch (error) {
      console.log("error :>> ", error);
    }
  });
  socket.on("disconnect", () => {
    console.log("User Left");
  });
});
chatServer.listen(5002)