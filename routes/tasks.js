const express = require("express");
const router = express.Router();
const taskController = require("../controllers/TaskController.js");

router.post("/create", taskController.createTask);

router.get("/", taskController.getAllTasks);

router.get("/id/:id", taskController.getTaskById);

router.put("/markAsCompleted/:id", taskController.markAsComplete);

router.put("/id/:id", taskController.updateTask);

router.delete("/id/:id", taskController.deleteTask);

module.exports = router;