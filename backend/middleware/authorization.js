const { pool } = require("../models/db");

// This function checks if the user has a permission the passed permission

const authorization = (string) => {
  return async (req, res, next) => {
    const role_id = req.token.role;
    const QUERY = `SELECT permissions.permission FROM role_permission 
            INNER JOIN roles ON roles.role_id = role_permission.role_id
            INNER JOIN permissions ON permissions.permission_id = role_permission.permission_id WHERE role_permission.role_id = ${role_id} AND permissions.permission = '${string}'`;
    try {
      const permission = await pool.query(QUERY);
      if (permission.rows.length) {
        const element = permission.rows[0];
        if (element.permission !== string) {
          return res.status(403).json({
            success: false,
            message: `Unauthorized`,
          });
        }
        next();
      } else {
        return res.status(403).json({
          success: false,
          message: `Unauthorized`,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error.message,
      });
    }
  };
};

module.exports = authorization;
