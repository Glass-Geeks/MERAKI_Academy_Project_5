const express = require("express");
const friendsRouter = express.Router();
const {
  createFriendConnection,
  getAllFriends,
} = require("../controllers/friends");

friendsRouter.post("/", createFriendConnection);
friendsRouter.get("/:id", getAllFriends);
module.exports = friendsRouter;
