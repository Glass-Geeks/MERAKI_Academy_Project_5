const express = require("express");
const friendsRouter = express.Router();
const {
  createFriendConnection,
  getAllFriends,getFriendRequests,answerFriendRequest
} = require("../controllers/friends");

friendsRouter.post("/", createFriendConnection);
friendsRouter.get("/requests/:id",getFriendRequests)
friendsRouter.put("/requsts/:id/answer",answerFriendRequest)
friendsRouter.get("/:id", getAllFriends);



module.exports = friendsRouter;
