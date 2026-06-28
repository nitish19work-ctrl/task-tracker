const express = require("express");

const {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
  downloadTaskExcel,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addTask);
router.get("/get", protect, getAllTasks);
router.put("/:id", protect, updateTask);
router.get("/downloadexcel", protect, downloadTaskExcel);
router.delete("/:id", protect, deleteTask);

module.exports = router;
