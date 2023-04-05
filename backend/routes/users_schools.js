const express = require("express");
const { signUserWithSchool, getAllTeachersBySchoolId, getAllStudentBySchoolId } = require("../controllers/users_schools");
const users_schools_router = express.Router();
users_schools_router.get('/stu',getAllStudentBySchoolId)
users_schools_router.get('/teacher',getAllTeachersBySchoolId)
users_schools_router.post('/:id',signUserWithSchool)
module.exports = users_schools_router;
