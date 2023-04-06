const { pool } = require("../module/db");

const createFriendConnection = async (req, res) => {
  const userID = req.params.id
  
  const {user_id ,friend_id,status } = req.body;
  const VALUE = [userID,friend_id,status];
  const QUERY = `INSERT INTO connection (user_id,friend_id,status) VALUES($1,$2,$3) RETURNING *`;
  try{
   const response= await pool.query(QUERY,VALUE);
   res.status(201).json({
    success :true,
    Message:"Connection Send",
    connection:response.rows
   })
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message
    })
  }
};
const getAllFriends = async (req, res) => {
  const { id } = req.params.id;
  const QUERY = `SELECT  `;
};

const getFriendRequests = (req,res)=>{

}

const answerFriendRequest = (req,res)=>{

}

module.exports = { createFriendConnection, getAllFriends ,getFriendRequests,answerFriendRequest};
