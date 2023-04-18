const express = require("express");
require("dotenv").config();
require("./module/db");
require("./module/mongoDB");
const cors = require("cors");
const app = express();

const schoolRouter = require("./routes/schools");
const roleRouter = require("./routes/roles");
const usersRouter = require("./routes/users");
const users_schools_router = require("./routes/users_schools");
const friendsRouter = require("./routes/friends");
const messageRouter = require("./routes/messages");

const { Server } = require("socket.io");
const adminRouter = require("./routes/admin");
const { chat } = require("./socket_chat");

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

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  chat(socket, io);
  //when connect
  console.log("a user connected.");
});
