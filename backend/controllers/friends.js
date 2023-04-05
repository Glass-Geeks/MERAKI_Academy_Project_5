const { pool } = require("../module/db");

const createFriendConnection = async (req, res) => {
  const { user_id } = req.params;
  const { someData } = req.body;
  const QUERY = ``;
  const VALUE = [];
};
const getAllFriends = async (req, res) => {
  const { id } = req.params;
  const QUERY = ``;
};

module.exports = { createFriendConnection, getAllFriends };
