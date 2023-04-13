const express = require("express");
const adminRouter = express.Router();
const {
  createNewSchool,
  getAllUsersInfo,
  deleteUser,
  createHistoryMove,
  getHistoryMoves,
  authorizeForUsersOrSchool,
} = require("../controllers/admin");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

adminRouter.post("/school", createNewSchool);
adminRouter.get("/users", getAllUsersInfo);
module.exports = adminRouter;
