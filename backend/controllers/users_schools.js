const { pool } = require("../module/db");

const getAllStudentBySchoolId = async (req, res) => {
  const { id } = req.params;
  const QUERY = ``;
};
const getAllTeachersBySchoolId = async (req, res) => {
  const { id } = req.params;
  const QUERY = ``;
};
const signUserWithSchool = async (req, res) => {
  const QUERY = ``;
  const { someData } = req.body;
  const VALUE = [];
  const { id } = req.params;
};
module.exports = {
  getAllStudentBySchoolId,
  getAllTeachersBySchoolId,
  signUserWithSchool,
};
