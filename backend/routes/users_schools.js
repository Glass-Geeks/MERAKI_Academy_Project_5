const express = require("express");
const {
  signUserWithSchool,
  getAllTeachersBySchoolId,
  getAllStudentBySchoolId,
  getAllFriendsId,
  deleteConnectionWithSchool,
} = require("../controllers/users_schools");
const users_schools_router = express.Router();
users_schools_router.get("/stu/:id", getAllStudentBySchoolId);
users_schools_router.get("/teacher/:id", getAllTeachersBySchoolId);
users_schools_router.get("/friends/:id", getAllFriendsId);
users_schools_router.post("/:id", signUserWithSchool);
users_schools_router.delete("/:user_id", deleteConnectionWithSchool);
module.exports = users_schools_router;
