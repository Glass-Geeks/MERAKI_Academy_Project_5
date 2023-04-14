const { pool } = require("../module/db");

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

module.exports = {
  getAllSchools,
  getSchoolById,
};
