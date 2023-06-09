const express = require("express");
require("dotenv").config();
require("./module/db");
require("./module/mongoDB");
const cors = require("cors");
const app = express();
// const https = require('https')
// const fs = require('fs');
const schoolRouter = require("./routes/schools");
const roleRouter = require("./routes/roles");
const usersRouter = require("./routes/users");
const users_schools_router = require("./routes/users_schools");
const friendsRouter = require("./routes/friends");
const messageRouter = require("./routes/messages");

const { Server } = require("socket.io");
const adminRouter = require("./routes/admin");
const { chat } = require("./socket_chat");
// const option = {
//   key:fs.readFileSync('certificate/key.pem'),
//   cert:fs.readFileSync('certificate/cert.pem')
// }
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/schools", schoolRouter);
app.use("/roles", roleRouter);
app.use("/users", usersRouter);
app.use("/friends", friendsRouter);
app.use("/users_schools", users_schools_router);
app.use("/message", messageRouter);
app.use("/admin", adminRouter);

// const server =  https.createServer(option,(req,res)=>res.end('test')).listen(PORT, () =>
// console.log(`Example app listening on port ${PORT}!`)
// )
const server = app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
// http://localhost:3000

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", async (socket) => {
  try {
    chat(socket, io);
    console.log("a user connected.");
  } catch (error) {
    console.log("error :>> ", error);
  }
});
