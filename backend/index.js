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
const { createServer } = require("https");

app.use(cors());
app.use(express.json());

app.use("/schools", schoolRouter);
app.use("/roles", roleRouter);
app.use("/users", usersRouter);
app.use("/friends", friendsRouter);
app.use("/users_schools", users_schools_router);
app.use("/message", messageRouter);

const PORT = process.env.PORT;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
