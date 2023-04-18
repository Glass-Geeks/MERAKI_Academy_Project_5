const { pool } = require("../module/db");
const messageSchema = require("../module/messageSchema");

const createFriendConnection = async (req, res) => {
  const userID = req.params.id;
  const { friend_id } = req.body;
  const VALUE = [userID, friend_id];
  const QUERY = `INSERT INTO connection (user_id,friend_id) VALUES($1,$2) RETURNING *`;
  try {
    const response = await pool.query(QUERY, VALUE);
    const connection_id = response.rows[0].connection_id;
    const chatRoom = new messageSchema({ connection_id });
    const data = await chatRoom.save();
    res.status(201).json({
      success: true,
      Message: "Connection Send",
      connection: response.rows,
      chatTable: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};
const getAllFriends = async (req, res) => {
  const id = req.params.id;
  const VALUE = [id];
  const QUERY = `SELECT DISTINCT ON (C.connection_id) C.connection_id, 
  U.first_name, U.last_name, U.user_image,
  CASE WHEN C.friend_id = $1 THEN C.user_id ELSE C.friend_id END AS friend_id
  FROM connection AS C 
  INNER JOIN users AS U ON U.user_id = CASE WHEN C.friend_id = $1 THEN C.user_id ELSE C.friend_id END
  WHERE (C.friend_id = $1 OR C.user_id = $1) AND C.status = 'Friends'
  GROUP BY C.connection_id, U.first_name, U.last_name, U.user_image, friend_id; ;`;
  // const QUERY2 = `SELECT DISTINCT ON (C.connection_id) C.connection_id,  U.first_name,U.last_name,U.user_image,C.friend_id,C.user_id FROM connection AS C
  // INNER JOIN users AS U ON U.user_id = C.friend_id
  // WHERE C.user_id  = $1  AND C.status = 'Friends'
  // GROUP BY C.connection_id , U.first_name,U.last_name,U.user_image,C.friend_id , C.user_id ;`;
  try {
    const response1 = await pool.query(QUERY, VALUE);
    // const response2 = await pool.query(QUERY2, VALUE);
    // const result = [...response1.rows, ...response2.rows];
    res.status(200).json({
      success: true,
      Message: "All Friends",
      connection: response1.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

const getFriendRequestsToUser = async (req, res) => {
  const id = req.params.id;
  const VALUE = [id];
  const QUERY = `SELECT u.first_name,u.last_name,u.user_image,c.created_at,c.user_id FROM connection AS c
  INNER JOIN users AS u ON  c.user_id = u.user_id
  WHERE friend_id=$1 AND status = 'Pending' ;`;

  try {
    const response = await pool.query(QUERY, VALUE);

    res.status(200).json({
      success: true,
      Message: "Connection Status",
      connection: response.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

const getFriendRequestsForUser = async (req, res) => {
  const id = req.params.id;
  const VALUE = [id];
  const QUERY = `SELECT * FROM connection WHERE user_id=$1 AND status = 'Pending' `;

  try {
    const response = await pool.query(QUERY, VALUE);

    res.status(200).json({
      success: true,
      Message: "Connection Status",
      connection: response.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

const answerFriendRequest = async (req, res) => {
  const id = req.params.id;
  const { friend_id } = req.body;
  const VALUE = [friend_id, id];
  const QUERY = `UPDATE Connection SET status='Friends' WHERE user_id= $2 AND friend_id = $1 RETURNING * `;
  try {
    const response = await pool.query(QUERY, VALUE);

    res.status(200).json({
      success: true,
      Message: "Connection Response",
      connection: response.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

const deleteFriendRequest = async (req, res) => {
  const id = req.params.id;
  const { friend_id } = req.query;
  const VALUE = [friend_id, id];
  const QUERY = `DELETE FROM connection WHERE friend_id = $1 AND user_id=$2 `;
  try {
    const response = await pool.query(QUERY, VALUE);
    res.status(200).json({
      success: true,
      Message: "Friend deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};
module.exports = {
  createFriendConnection,
  getAllFriends,
  getFriendRequestsToUser,
  answerFriendRequest,
  deleteFriendRequest,
  getFriendRequestsForUser,
};
