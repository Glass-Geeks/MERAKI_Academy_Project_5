const { pool } = require("../module/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT = parseInt(process.env.SALT);

const register = async (req, res) => {
  const { email, first_name, last_name, role, password, user_image, dob } =
    req.body;

  const encryptedPassword = await bcrypt.hash(password, SALT);

  const VALUE = [
    email.toLowerCase(),
    first_name,
    last_name,
    role,
    encryptedPassword,
    user_image,
    dob,
  ];

  const QUERY = `INSERT INTO users (email, first_name, last_name, role, password, user_image, dob) VALUES ($1,$2,$3,$4,$5,$6,$7)`;

  pool
    .query(QUERY, VALUE)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err,
      });
    });
};


// Generate Token Function

/* 
const generateToken = (whatEver Value You Need In The PayLoad "user_Id ...") => {
  const SECRET = process.env.SECRET;
  const payload = {
   user_id : user_Id ...
  };

  const options = {
    
  };
  return jwt.sign(payload, SECRET, options);
}; */
const login = async (req, res) => {
  const QUERY = ``;
  const VALUE = [];
  const { someData } = req.body;
  //   after login successfully invoke the token func generateToken(user_Id ...)
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const QUERY = ``;
};
const updateUserInfo = async (req, res) => {
  const { id } = req.params;
  const QUERY = ``;
  const VALUE = [];
  const { someData } = req.body;
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  const QUERY = ``;
};
module.exports = {
  register,
  login,
  deleteUser,
  updateUserInfo,
  getUserById,
};
