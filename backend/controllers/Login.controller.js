const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const login = {
  login: (req, res) => {
    const { email, password } = req.body;
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      ) ||
      password.length < 6
    ) {
      res.json({
        error:
          "Email or password is incorrect. Password must contain at least 6 characters",
      });
      return;
    }
    try {
      pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results, fields) => {
          if (err) {
            res.res(500);
            return;
          }
          if (!results.length) {
            res.json({ error: "Email or password is incorrect!" });
            return;
          }

          bcrypt.compare(password, results[0].password, (bErr, bResult) => {
            if (bErr) {
              return res.status(401).json({
                error: "Email or password is incorrect!",
              });
            }
            if (bResult) {
              const token = jwt.sign(
                {
                  email,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: "7d",
                }
              );
              pool.query(
                `SELECT * FROM tasks WHERE email = ?`,
                [email],
                (err, results, fields) => {
                  if (err) {
                    return res.status(500).json({
                      error: "Database error!",
                    });
                  }
                  const scheduled = JSON.parse(results[0].scheduled);
                  const done = JSON.parse(results[0].done);

                  return res.json({
                    token,
                    email,
                    scheduled,
                    done,
                  });
                }
              );
              return;
            }
            return res.json({
              error: "Email or password is incorrect!",
            });
          });
        }
      );
    } catch (err) {
      res.json({ error: err });
      return;
    }
  },
};

module.exports = login;
