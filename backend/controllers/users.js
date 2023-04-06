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
const login = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].user_id,

              role: result.rows[0].role,
            };
            const options = { expiresIn: "1d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                success: true,
                message: `Valid login credentials`,
                token,
                userId: result.rows[0].id,
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err,
      });
    });
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const query = `UPDATE users SET is_deleted=1 WHERE user_id=$1;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: `User with id: ${id} is not found`,
          err: err,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `User with id: ${id} deleted successfully`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
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
