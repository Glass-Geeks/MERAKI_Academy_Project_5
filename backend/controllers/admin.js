const { pool } = require("../module/db");

const createNewSchool = async (req, res) => {};
const getAllUsersInfo = async (req, res) => {};
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
