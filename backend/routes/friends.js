const express = require("express");
const friendsRouter = express.Router();
const {
  createFriendConnection,
  getAllFriends,getFriendRequestsToUser,answerFriendRequest,deleteFriendRequest,getFriendRequestsForUser
} = require("../controllers/friends");

friendsRouter.post("/:id", createFriendConnection);
friendsRouter.put("/requests/:id/answer",answerFriendRequest)
friendsRouter.get("/requests/:id",getFriendRequestsToUser)
friendsRouter.get("/requests/forUser/:id",getFriendRequestsForUser)
friendsRouter.delete("/delete/:id",deleteFriendRequest)
friendsRouter.get("/:id", getAllFriends);



module.exports = friendsRouter;
