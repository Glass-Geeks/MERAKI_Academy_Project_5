const { pool } = require("../module/db");
const messageSchema = require("../module/messageSchema");

const getAllMessages = async (req, res) => {
  const connection_id = req.params.id;
  try {
    const result = await messageSchema.findOne({ connection_id });
    res
      .status(200)
      .json({ success: true, message: "Here is all messages", result });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: error.message });
  }
};
const getImages = async (req, res) => {
  const { friend_id } = req.params;
  const { user_id } = req.query
  const QUERY = `SELECT user_image FROM users WHERE user_id = $1 ;`;
  const VALUE = [friend_id];
  const QUERY1 = `SELECT user_image AS MY_image FROM users WHERE user_id = $1 ;`;
  const VALUE1 = [user_id];
  try {
    const result = await pool.query(QUERY, VALUE);
    const result1 = await pool.query(QUERY1, VALUE1);
    res.status(200).json({ success: true, data: [{...result.rows[0], ...result1.rows[0]}] });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: error.message });
  }
};
module.exports = { getAllMessages, getImages };
