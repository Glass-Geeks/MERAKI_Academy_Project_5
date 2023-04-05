const { pool } = require("../module/db");

const createSchool = async (req, res) => {
  const QUERY = ``;
  const VALUE = [];
  const { someData } = req.body;
};
const getAllSchools = async (req, res) => {
  const QUERY = ``;
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
