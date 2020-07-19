const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const finished = {
  moveToHistory: (req, res) => {
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

        const scheduledData = JSON.parse(results[0].scheduled);
        const historyData = JSON.parse(results[0].done);

        const [moved] = scheduledData.filter((t) => t.id === id);
        moved.date = new Date().toString();

        const scheduledResult = [
          ...scheduledData
            .filter((t) => t.id !== id)
            .map((t, i) => {
              const task = t;
              task.id = i;
              return task;
            }),
        ];

        const historyResult = [...historyData, moved]
          .sort((a, b) => {
            const aNum = new Date(a.date).getTime();
            const bNum = new Date(b.date).getTime();
            return aNum < bNum ? 1 : -1;
          })
          .map((t, i) => {
            const task = t;
            task.id = i;
            return task;
          });

        pool.query(
          `UPDATE tasks SET scheduled = '${JSON.stringify(
            scheduledResult
          )}', done = '${JSON.stringify(historyResult)}' WHERE email = '${
            decoded.email
          }'`,
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
  removeHistory: (req, res) => {
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

        const data = JSON.parse(results[0].done);

        const result = [
          ...data
            .filter((t) => t.id !== id)
            .map((t, i) => {
              const task = t;
              task.id = i;
              return task;
            }),
        ];

        pool.query(
          `UPDATE tasks SET done = '${JSON.stringify(result)}' WHERE email = '${
            decoded.email
          }'`,
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
};

module.exports = finished;
