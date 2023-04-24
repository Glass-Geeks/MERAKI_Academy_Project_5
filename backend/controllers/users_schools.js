const { pool } = require("../module/db");

const getAllStudentBySchoolId = async (req, res) => {
  const { id } = req.params;
  const QUERY = `SELECT users.user_id, users.user_image ,users.first_name ,users.last_name , user_school.start_year, user_school.end_year FROM user_school INNER JOIN users ON users.user_id = user_school.user_id INNER JOIN role ON role.role_id = users.role 
  INNER JOIN schools ON schools.school_id = user_school.school_id
  WHERE role.role = 'STUDENT' AND schools.school_id = ${id}`;
  try {
    const result = await pool.query(QUERY);

    res.status(200).json({
      success: true,
      message: "Here Is The Students Data For This School",
      result: result.rows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
const getAllTeachersBySchoolId = async (req, res) => {
  const { id } = req.params;
  const QUERY = `SELECT users.user_id, users.user_image ,users.first_name ,users.last_name , user_school.start_year, user_school.end_year  FROM user_school INNER JOIN users ON users.user_id = user_school.user_id INNER JOIN role ON role.role_id = users.role 
  INNER JOIN schools ON schools.school_id = user_school.school_id
  WHERE role.role = 'TEACHER' AND schools.school_id =${id}`;
  try {
    const result = await pool.query(QUERY);

    res.status(200).json({
      success: true,
      message: "Here Is The Teachers Data For This School",
      result: result.rows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
const signUserWithSchool = async (req, res) => {
  const school_id = req.params.id;
  const { user_id, start_year, end_year } = req.body;
  const VALUE = [school_id, user_id, start_year, end_year];
  const QUERY = `INSERT INTO user_school (school_id,	user_id	,start_year,	end_year) VALUES ($1,$2,$3,$4) RETURNING *`;
  const QUERY2 = `SELECT users.user_id, users.user_image ,users.first_name ,users.last_name , user_school.start_year, user_school.end_year  FROM user_school INNER JOIN users ON users.user_id = user_school.user_id INNER JOIN role ON role.role_id = users.role 
  INNER JOIN schools ON schools.school_id = user_school.school_id
  WHERE role.role = 'TEACHER' AND schools.school_id =${school_id} AND users.user_id =${user_id} ;`;
  try {
    await pool.query(QUERY, VALUE);
    const result = await pool.query(QUERY2);
    res.status(201).json({
      success: true,
      message: "The Connection has been set",
      result: result.rows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
const getAllFriendsId = async (req, res) => {
  const { id } = req.params;
  const QUERY = `SELECT DISTINCT ON (C.connection_id) C.connection_id,
  CASE WHEN C.friend_id = $1 THEN C.user_id ELSE C.friend_id END AS friend_id
  FROM connection AS C 
  INNER JOIN users AS U ON U.user_id = CASE WHEN C.friend_id = $1 THEN C.user_id ELSE C.friend_id END
  WHERE (C.friend_id = $1 OR C.user_id = $1) AND C.status = 'Friends'
  GROUP BY C.connection_id,friend_id ;`;
  const VALUE = [id];
  try {
    const result = await pool.query(QUERY, VALUE);
    res.status(200).json({
      success: true,
      message: "here's all your friend id",
      result: result.rows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
const deleteConnectionWithSchool = async (req, res) => {
  const { user_id } = req.params;
  const { school_id } = req.query;
  const QUERY = `DELETE FROM user_school WHERE school_id = $1 AND user_id = $2 ;`;
  const VALUE = [school_id, user_id];
  console.log('result :>> ', VALUE);
  try {
    const result = await pool.query(QUERY, VALUE);
    res
      .status(200)
      .json({ success: true, message: "The connection deleted successfully " });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
module.exports = {
  getAllStudentBySchoolId,
  getAllTeachersBySchoolId,
  signUserWithSchool,
  getAllFriendsId,
  deleteConnectionWithSchool,
};
