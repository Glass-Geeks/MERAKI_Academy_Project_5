const { pool } = require("../module/db");

const createRole = async (req, res) => {
  const { role } = req.body;
  const QUERY = `INSERT INTO role (role) VALUES ($1) RETURNING *`;
  const VALUE = [role];
  try {
    const result = await pool.query(QUERY, VALUE);
    res.status(201).json({
      success: true,
      message: "The role created successfully",
      result: result.rows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
const createPermission = async (req, res) => {
  const { permission } = req.body;
  const QUERY = `INSERT INTO permission (permission) VALUES ($1) RETURNING *`;
  const VALUE = [permission];
  try {
    const result = await pool.query(QUERY, VALUE);
    res.status(201).json({
      success: true,
      message: "The permission created successfully",
      result: result.rows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
const createRole_Permission = async (req, res) => {
  const { role_id, permission_id } = req.body;
  const QUERY = `INSERT INTO role_permission ( role_id, permission_id) VALUES ($1,$2) RETURNING *`;
  const VALUE = [role_id, permission_id];
  try {
    const result = await pool.query(QUERY, VALUE);
    res.status(201).json({
      success: true,
      message: "The role_permission created successfully",
      result: result.rows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
module.exports = { createRole, createPermission, createRole_Permission };
