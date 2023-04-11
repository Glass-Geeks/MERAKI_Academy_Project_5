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
  const  id  = req.params.id;
  const VALUE = [id]
  const QUERY = `SELECT * FROM connection WHERE status='Friends' AND (user_id=$1 OR friend_id=$1) `;
  try{
    const response= await pool.query(QUERY,VALUE);
    res.status(200).json({
     success :true,
     Message:"All Friends",
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

const getFriendRequests = async(req,res)=>{
const id = req.params.id
const VALUE= [id]
const QUERY = `SELECT * FROM connection WHERE friend_id=$1 AND status = 'Pending' `

try{
 const response =await  pool.query(QUERY,VALUE)
 
 res.status(200).json({
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

const answerFriendRequest = async(req,res)=>{
const id = req.params.id
const {friend_id}= req.body
const VALUE = [id,friend_id]
const QUERY = `UPDATE Connection SET status='Friends' WHERE user_id=$1 AND friend_id=$2 RETURNING * `
try{
  const response =await pool.query(QUERY,VALUE)
  res.status(200).json({
   success :true,
   Message:"Connection Response",
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

const deleteFriendRequest =async (req,res)=>{
const id = req.params.id
const {friend_id} = req.body
const VALUE = [friend_id,id]
const QUERY = `DELETE FROM connection WHERE friend_id = $1 AND user_id=$2`
try{
  const response =await pool.query(QUERY,VALUE)
  res.status(200).json({
   success :true,
   Message:"Friend deleted"
   
  })
 }catch(err){
   res.status(500).json({
     success: false,
     message: "Server Error",
     err: err.message
   })
 }
}
module.exports = { createFriendConnection, getAllFriends ,getFriendRequests,answerFriendRequest,deleteFriendRequest};
