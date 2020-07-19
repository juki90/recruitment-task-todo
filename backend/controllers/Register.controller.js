const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const register = {
  register: (req, res) => {
    const { email, password, passwordRepeat, scheduled, done } = req.body;
    console.log(req.body);

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      ) ||
      (password && password.length < 6) ||
      (passwordRepeat && passwordRepeat.length < 6) ||
      passwordRepeat !== password
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
            console.log(err);
            res.sendStatus(500);
            return;
          }
          if (results.length) {
            res.json({ error: "User with this email already exists" });
            return;
          }
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              return res.sendStatus(500);
            }
            const uidVar = uuid.v4();
            pool.query(
              `INSERT INTO users (id, email, password) VALUES ('${uidVar}', '${email}', ${pool.escape(
                hash
              )})`,
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.sendStatus(500);
                  return;
                }
                pool.query(
                  `INSERT INTO tasks (id, email, scheduled, done) VALUES ('${uidVar}', '${email}', '${JSON.stringify(
                    scheduled
                  )}', '${JSON.stringify(done)}')`,
                  (err, result) => {
                    if (err) {
                      res.sendStatus(500);
                      return;
                    }
                    const token = jwt.sign(
                      {
                        email,
                      },
                      process.env.JWT_SECRET,
                      {
                        expiresIn: "7d",
                      }
                    );
                    res.json({ email, token });
                    return;
                  }
                );
              }
            );
          });
        }
      );
    } catch (err) {
      res.json({ error: err });
      return;
    }
  },
};

module.exports = register;
