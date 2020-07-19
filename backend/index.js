require("dotenv").config();
const express = require("express");
const path = require("path");
const routes = require("./routes");
const cors = require("cors");
const app = express();
require("./db");

app.use(express.json({ extended: true }));
app.use(cors({ credentials: true }));

app.use(express.static(path.resolve("..", "client", "build")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve("..", "client", "build", "index.html"))
);

app.use("/api", routes);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
