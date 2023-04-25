const express = require("express");
const adminRouter = express.Router();
const {
  createNewSchool,
  getAllUsersInfo,
  deleteUser,
  createHistoryMove,
  getHistoryMoves,
  authorizeForUsersOrSchool,
  updateSchool,
  deleteSchool,
  getBasicNumbers,
  getSchoolById,
} = require("../controllers/admin");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const { getAllSchools } = require("../controllers/schools");

adminRouter.get("/school", getAllSchools);
adminRouter.get("/school/:id", getSchoolById);
adminRouter.post("/school", createNewSchool);
adminRouter.put("/school/:id", updateSchool);
adminRouter.delete("/school/:id", deleteSchool);
adminRouter.get("/users", getAllUsersInfo);
adminRouter.get("/numbers", getBasicNumbers);
module.exports = adminRouter;
