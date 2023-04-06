const { pool } = require("../module/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT = parseInt(process.env.SALT);
const SECRET = process.env.SECRET;
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

const generateToken = (role, userId) => {
  const payload = {
    userId,
    role,
  };

  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, SECRET, options);
};

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
            const { role, user_id } = result.rows[0];
            const token = generateToken(role, user_id);

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
  const id = req.params.id;
  let { first_name, last_name, user_image } = req.body;

  const query = `UPDATE users SET first_name = COALESCE($1,first_name), last_name = COALESCE($2, last_name), user_image = COALESCE($3, user_image) WHERE user_id=$4 AND is_deleted = 0  RETURNING *;`;
  const data = [first_name || null, last_name || null, user_image || null, id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `The user with id: ${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `User with id: ${id} updated successfully `,
          result: result.rows[0],
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

const getUserById = async (req, res) => {
  const { id } = req.params;
  const QUERY = `SELECT * FROM users WHERE id=$1`;
  const data = [id];

  pool
    .query(QUERY, data)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `The user with id: ${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,

          result: result.rows[0],
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
module.exports = {
  register,
  login,
  deleteUser,
  updateUserInfo,
  getUserById,
};
