const express = require("express");
const roleRouter = express.Router();
const {
  createRole,
  createPermission,
  createRole_Permission,
} = require("../controllers/roles");

roleRouter.post("/role", createRole);
roleRouter.post("/permission", createPermission);
roleRouter.post("/role_permission", createRole_Permission);

module.exports = roleRouter;
