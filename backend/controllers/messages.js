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
  const { connection_id } = req.params;
  const QUERY = `SELECT f.user_image, u.user_image AS MY_image FROM connection AS c
  INNER JOIN users AS u ON c.user_id = u.user_id 
  LEFT JOIN users AS f ON c.friend_id = f.user_id 
  WHERE c.connection_id = $1 ;`;
  const VALUE = [connection_id];
  try {
    const result = await pool.query(QUERY, VALUE);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: error.message });
  }
};
module.exports = { getAllMessages, getImages };
