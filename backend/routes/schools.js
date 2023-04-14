const express = require("express");
const schoolRouter = express.Router();
const { getAllSchools, getSchoolById } = require("../controllers/schools");

schoolRouter.get("/", getAllSchools);
schoolRouter.get("/:id", getSchoolById);

module.exports = schoolRouter;
