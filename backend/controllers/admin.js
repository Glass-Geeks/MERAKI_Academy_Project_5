const { pool } = require("../module/db");

const createNewSchool = async (req, res) => {};
const getAllUsersInfo = async (req, res) => {
  const query = `SELECT u.user_id, u.first_name , u.last_name , u.dob , u.is_deleted , u.created_at  , r.role
FROM users AS u INNER JOIN role AS r ON r.role_id = u.role ;`;
  try {
    const data = await pool.query(query);
    res.status(200).json({ success: true, data: data.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const deleteUser = async (req, res) => {};

const createHistoryMove = async (req, res) => {};
const getHistoryMoves = async (req, res) => {};
const authorizeForUsersOrSchool = async (req, res) => {};

module.exports = {
  createNewSchool,
  getAllUsersInfo,
  deleteUser,
  createHistoryMove,
  getHistoryMoves,
  authorizeForUsersOrSchool,
};
