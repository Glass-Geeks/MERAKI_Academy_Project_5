const { pool } = require("../module/db");
const messageSchema = require("../module/messageSchema");

const createNewSchool = async (req, res) => {
  const {
    school_name,
    school_image,
    establish_date,
    longitude,
    latitude,
    type,
  } = req.body;
  const QUERY = `INSERT INTO schools (school_name,school_image,establish_date,longitude ,latitude ,type) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;
  const QUERY2 = `SELECT  type_id FROM type WHERE type = $1`;
  try {
    const typeId = await pool.query(QUERY2, [type]);
    const { type_id } = typeId.rows[0];
    const VALUE = [
      school_name,
      school_image,
      establish_date,
      longitude,
      latitude,
      type_id,
    ];
    const school = await pool.query(QUERY, VALUE);
    res.status(201).json({
      success: true,
      message: "School Added",
      school: school.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: error.message,
    });
  }
};

const getAllUsersInfo = async (req, res) => {
  const query = `SELECT u.user_id, u.first_name , u.last_name , u.dob , u.is_deleted , u.created_at  , r.role
FROM users AS u INNER JOIN role AS r ON r.role_id = u.role ;`;
  try {
    const data = await pool.query(query);
    res.status(200).json({ success: true, data: data.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const deleteUser = async (req, res) => { };

const updateSchool = async (req, res) => {
  const { id } = req.params;
  const {
    school_name,
    school_image,
    establish_date,
    longitude,
    latitude,
    type,
  } = req.body;
  const QUERY = `UPDATE schools SET school_name=COALESCE($1,school_name),school_image=COALESCE($2,school_image),establish_date=COALESCE($3,establish_date),longitude=COALESCE($4,longitude),latitude=COALESCE($5,latitude),type=COALESCE($6,type) WHERE school_id=$7 RETURNING * `;

  try {

    const typeId = await pool.query(`SELECT type_id FROM type WHERE type = $1 ;`, [type])
    const { type_id } = typeId.rows[0];
    const VALUE = [
      school_name || null,
      school_image || null,
      establish_date || null,
      longitude || null,
      latitude || null,
      type_id || null,
      id,
    ];

    const response = await pool.query(QUERY, VALUE);
    res.status(200).json({
      success: true,
      message: "School Updated",
      updatedSchool: response.rows,
    });


  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};
const deleteSchool = async (req, res) => {
  const { id } = req.params;
  VALUE = [id];
  const QUERY = `DELETE FROM schools  WHERE school_id = $1 RETURNING *`;
  try {
    const response = await pool.query(QUERY, VALUE);
    res.status(203).json({
      success: true,
      message: "School Deleted",
      deleteSchool: response.rows,
    });
    pool.query(
      `UPDATE user_school SET is_deleted=1 WHERE school_id=$1  ;`,
      VALUE
    );
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};
const getBasicNumbers = async (req, res) => {
  const stuQuery = `SELECT * FROM users AS u INNER JOIN role AS r ON r.role_id = u.role WHERE r.role = 'STUDENT';`;
  const teachersQuery = `SELECT * FROM users AS u INNER JOIN role AS r ON r.role_id = u.role WHERE r.role = 'TEACHER';`;
  const SchoolsQuery = `SELECT * FROM schools`;
  const usersQuery = `SELECT * FROM users`;
  const adminsQuery = `SELECT * FROM users AS u INNER JOIN role AS r ON r.role_id = u.role WHERE r.role = 'ADMIN';`;
  try {
    const resRoom = await messageSchema.find({});
    const resTea = await pool.query(teachersQuery);
    const resStu = await pool.query(stuQuery);
    const resAdmin = await pool.query(adminsQuery);
    const resUsers = await pool.query(usersQuery);
    const resSchools = await pool.query(SchoolsQuery);
    const result = {
      students: resStu.rowCount,
      teachers: resTea.rowCount,
      rooms: resRoom.length,
      admins: resAdmin.rowCount,
      schools: resSchools.rowCount,
      users: resUsers.rowCount,
    };

    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const getSchoolById = async (req, res) => {
  const { id } = req.params;
  VALUE = [id];
  const QUERY = `SELECT s.school_id,s.school_image
,s.latitude,s.longitude,s.establish_date,s.school_name,t.type
FROM schools AS s INNER JOIN type AS t ON s.type = t.type_id WHERE s.school_id = $1 AND s.is_deleted=0 `;
  try {
    const response = await pool.query(QUERY, VALUE);
    res.status(200).json({
      success: true,
      message: "All Schools",
      school: response.rows,
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
  createNewSchool,
  getAllUsersInfo,
  deleteUser,
  updateSchool,
  deleteSchool,
  getBasicNumbers, getSchoolById
};
