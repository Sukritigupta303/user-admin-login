const express = require("express");
const { getTasks, addTask, deleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/auth");
const { getMyTasks } = require("../controllers/taskController");
const { deleteTaskByUser } = require("../controllers/taskController");
const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, addTask);
router.delete("/:id", authMiddleware, deleteTask);
router.get("/my-tasks", authMiddleware, getMyTasks);
router.delete("/my-tasks/:id", authMiddleware, deleteTaskByUser);

module.exports = router;

