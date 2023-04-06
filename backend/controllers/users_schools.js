const { pool } = require("../module/db");

const getAllStudentBySchoolId = async (req, res) => {
  const { id } = req.params;
  const QUERY = `SELECT users.user_image ,users.first_name ,users.last_name , user_school.start_year, user_school.end_year FROM user_school INNER JOIN users ON users.user_id = user_school.user_id INNER JOIN role ON role.role_id = users.role 
  INNER JOIN schools ON schools.school_id = user_school.school_id
  WHERE role.role = 'Student' AND schools.school_id = ${id}`;
  try {
    const result = await pool.query(QUERY);
    if (result.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Here Is The Students Data For This School",
        result: result.rows,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No Students data for this school ${id}`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
const getAllTeachersBySchoolId = async (req, res) => {
  const { id } = req.params;
  const QUERY = `SELECT users.user_image ,users.first_name ,users.last_name , user_school.start_year, user_school.end_year  FROM user_school INNER JOIN users ON users.user_id = user_school.user_id INNER JOIN role ON role.role_id = users.role 
  INNER JOIN schools ON schools.school_id = user_school.school_id
  WHERE role.role = 'Teacher' AND schools.school_id =${id}`;
  try {
    const result = await pool.query(QUERY);
    if (result.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Here Is The Teachers Data For This School",
        result: result.rows,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No Teachers data for this school ${id}`,
      });
    }
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
  try {
    const result = await pool.query(QUERY, VALUE);
    res
      .status(201)
      .json({
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
module.exports = {
  getAllStudentBySchoolId,
  getAllTeachersBySchoolId,
  signUserWithSchool,
};
