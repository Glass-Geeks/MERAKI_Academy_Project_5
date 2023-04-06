const express = require("express");
const friendsRouter = express.Router();
const {
  createFriendConnection,
  getAllFriends,getFriendRequests,answerFriendRequest,deleteFriendRequest
} = require("../controllers/friends");

friendsRouter.post("/", createFriendConnection);
friendsRouter.put("/requests/:id/answer",answerFriendRequest)
friendsRouter.get("/requests/:id",getFriendRequests)
friendsRouter.delete("/delete/:id",deleteFriendRequest)
friendsRouter.get("/:id", getAllFriends);



module.exports = friendsRouter;
