const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Successfully connected to the database.");
});

connection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    connection.query(`USE ${process.env.DB_NAME}`, (err) => {
      if (err) {
        console.log(err);
        return;
      }

      connection.query(
        `CREATE TABLE IF NOT EXISTS users(
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
      connection.query(
        `CREATE TABLE IF NOT EXISTS tasks(
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      scheduled JSON NOT NULL,
      done JSON NOT NULL
    )`,
        (err) => {
          if (err) {
            console.log(err);
          }
          return;
        }
      );
    });
  }
);

module.exports = connection;
