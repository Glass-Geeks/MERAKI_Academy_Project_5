const { pool } = require("../module/db");

const createSchool = (req, res) => {
  const {
    school_name,
    school_image,
    establish_date,
    longitude,
    latitude,
    type,
  } = req.body;
  const VALUE = [
    school_name,
    school_image,
    establish_date,
    longitude,
    latitude,
    type,
  ];
  const QUERY = `INSERT INTO schools (school_name,school_image,establish_date,longitude ,latitude ,type) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;

  pool
    .query(QUERY, VALUE)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "School Added",
        school: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
const getAllSchools = async (req, res) => {
  const QUERY = `SELECT s.school_id ,s.school_name,s.school_image,s.establish_date,s.longitude,s.latitude , type.type  FROM schools as s INNER JOIN type ON type.type_id = s.type WHERE s.is_deleted = 0 ; `;
  try {
    const response = await pool.query(QUERY);
    res.status(200).json({
      success: true,
      message: "All Schools",
      schools: response.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};
const getSchoolById = async (req, res) => {
  const { id } = req.params;
  VALUE = [id];
  const QUERY = `SELECT * FROM schools WHERE school_id = $1 AND is_deleted=0`;
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
  const VALUE = [
    school_name || null,
    school_image || null,
    establish_date || null,
    longitude || null,
    latitude || null,
    type || null,
    id,
  ];
  const QUERY = `UPDATE schools SET school_name=COALESCE($1,school_name),school_image=COALESCE($2,school_image),establish_date=COALESCE($3,establish_date),longitude=COALESCE($4,longitude),latitude=COALESCE($5,latitude),type=COALESCE($6,type) WHERE school_id=$7 RETURNING * `;
  try {
    const response = await pool.query(QUERY, VALUE);
    res.status(203).json({
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
  const QUERY = `UPDATE  schools SET is_deleted=1 WHERE school_id=$1 
   RETURNING *`;
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
module.exports = {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
};
