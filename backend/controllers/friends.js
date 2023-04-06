const { pool } = require("../module/db");

const createFriendConnection = async (req, res) => {
  const userID = req.params.id
  
  const { friend_id } = req.body;
  const VALUE = [userID,friend_id];
  const QUERY = `INSERT INTO connection (user_id,friend_id) VALUES($1,$2) RETURNING *`;
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

const getFriendRequests = async(req,res)=>{
const id = req.params.id
const VALUE= [id]
const QUERY = `SELECT * FROM connection WHERE user_id=$1 `

try{
 const response = pool.query(QUERY,VALUE)
 res.status(201).json({
  success :true,
  Message:"Connection Status",
  connection:response.rows
 })
}catch(err){
  res.status(500).json({
    success: false,
    message: "Server Error",
    err: err.message
  })
}
}

const answerFriendRequest = (req,res)=>{
const id = req.params.id
const {status} = req.body
const VALUE = []
const QUERY = `UPDATE Connection SET status= `
}

const deleteFriendRequest = (req,res)=>{

}
module.exports = { createFriendConnection, getAllFriends ,getFriendRequests,answerFriendRequest,deleteFriendRequest};
