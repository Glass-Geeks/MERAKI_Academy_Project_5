
const { pool } = require("../module/db");

const createSchool =  (req, res) => {
  const { school_name, school_image, establish_date, longitude, latitude, type } = req.body;
  const VALUE = [school_name, school_image, establish_date, longitude, latitude, type];
  const QUERY = `INSERT INTO schools (school_name,school_image,establish_date,longitude ,latitude ,type) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;

  pool.query(QUERY, VALUE)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "School Added",
        school: result.rows
      })
    })
    .catch((err) => {
     
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message
      })
    })

};
const getAllSchools = async (req, res) => {
  const QUERY = `SELECT * FROM schools`;
  try{
    pool.query(QUERY)
    res.status(200).json({
      success:true,
      message:"All Schools",
      schools:result
    })
  }
  catch(err){

  }
};
const getSchoolById = async (req, res) => {
  const { id } = req.params;
  const QUERY = ``;
};
const updateSchool = async (req, res) => {
  const QUERY = ``;
  const { id } = req.params;
  const VALUE = [];
  const { someData } = req.body;
};
const deleteSchool = async (req, res) => {
  const { id } = req.params;
  const QUERY = ``;
};
module.exports = {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
};
