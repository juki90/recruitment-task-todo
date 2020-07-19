const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const task = {
  addTask: (req, res) => {
    const { task, token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.email) {
      res.json({ error: "Authentication error. Log in again" });
      return;
    }

    pool.query(
      `SELECT * FROM tasks WHERE email = '${decoded.email}'`,
      (err, results, fields) => {
        if (err) {
          res.json({ error: "Database error" });
          return;
        }
        const data = JSON.parse(results[0].scheduled);
        const result = [...data, task]
          .sort((a, b) => {
            const aNum = new Date(a.date).getTime();
            const bNum = new Date(b.date).getTime();
            return aNum > bNum ? 1 : -1;
          })
          .map((t, i) => {
            const tsk = t;
            tsk.id = i;
            return tsk;
          });
        pool.query(
          `UPDATE tasks SET scheduled = '${JSON.stringify(
            result
          )}' WHERE email = '${decoded.email}'`,
          (err) => {
            if (err) {
              res.json({ error: "Database error" });
              return;
            }
            res.json({ task });
            return;
          }
        );
      }
    );
    return;
  },
  removeTask: (req, res) => {
    const { id, token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.email) {
      res.json({ error: "Authentication error. Log in again" });
      return;
    }

    pool.query(
      `SELECT * FROM tasks WHERE email = '${decoded.email}'`,
      (err, results, fields) => {
        if (err) {
          res.json({ error: "Database error" });
          return;
        }

        const data = JSON.parse(results[0].scheduled);

        const result = [
          ...data
            .filter((t) => t.id !== id)
            .sort((a, b) => {
              const aNum = new Date(a.date).getTime();
              const bNum = new Date(b.date).getTime();
              return aNum > bNum ? 1 : -1;
            })
            .map((t, i) => {
              const tsk = t;
              tsk.id = i;
              return tsk;
            }),
        ];
        pool.query(
          `UPDATE tasks SET scheduled = '${JSON.stringify(
            result
          )}' WHERE email = '${decoded.email}'`,
          (err) => {
            if (err) {
              res.json({ error: "Database error" });
              return;
            }
            res.json({ id });
            return;
          }
        );
      }
    );
    return;
  },
  editTask: (req, res) => {
    const { id, task, token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.email) {
      res.json({ error: "Authentication error. Log in again" });
      return;
    }

    pool.query(
      `SELECT * FROM tasks WHERE email = '${decoded.email}'`,
      (err, results, fields) => {
        if (err) {
          res.json({ error: "Database error" });
          return;
        }

        const data = JSON.parse(results[0].scheduled);

        const result = [
          ...data
            .map((t) => {
              if (t.id === id) {
                let tsk = t;
                tsk = task;
                return tsk;
              }
              return t;
            })
            .sort((a, b) => {
              const aNum = new Date(a.date).getTime();
              const bNum = new Date(b.date).getTime();
              return aNum > bNum ? 1 : -1;
            })
            .map((t, i) => {
              const tsk = t;
              tsk.id = i;
              return tsk;
            }),
        ];
        pool.query(
          `UPDATE tasks SET scheduled = '${JSON.stringify(
            result
          )}' WHERE email = '${decoded.email}'`,
          (err) => {
            if (err) {
              res.json({ error: "Database error" });
              return;
            }
            res.json({ id, task });
            return;
          }
        );
      }
    );
    return;
  },
};

module.exports = task;
