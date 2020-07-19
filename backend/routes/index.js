const router = require("express").Router();
const { register, login, task, finished } = require("../controllers");

router.post("/register", register.register);
router.post("/login", login.login);

router.post("/task", task.addTask);
router.delete("/task", task.removeTask);
router.put("/task", task.editTask);

router.post("/finished", finished.moveToHistory);
router.delete("/finished", finished.removeHistory);

module.exports = router;
