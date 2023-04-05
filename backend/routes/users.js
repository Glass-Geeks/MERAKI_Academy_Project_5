const express = require("express");
const usersRouter = express.Router();
const {
  register,
  login,
  deleteUser,
  updateUserInfo,
  getUserById,
} = require("../controllers/users");

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.put("/update/:id", updateUserInfo);
usersRouter.delete("/delete/:id", deleteUser);
usersRouter.get("/:id", getUserById);

module.exports = usersRouter;
