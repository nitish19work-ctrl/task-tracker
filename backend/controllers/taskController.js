const xlsx = require("xlsx");
const Task = require("../models/TaskModel");

exports.addTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ message: "Title and due date are required" });
    }

    const task = await Task.create({
      userId: req.user.id,
      title,
      description: description || "",
      status: status || "Pending",
      priority: priority || "Medium",
      dueDate: new Date(dueDate),
    });

    res.status(201).json({
      message: "Task added successfully",
      task,
    });
  } catch (error) {
    console.error("ADD TASK ERROR:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ dueDate: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("GET TASK ERROR:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(status !== undefined && { status }),
        ...(priority !== undefined && { priority }),
        ...(dueDate !== undefined && { dueDate: new Date(dueDate) }),
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("DELETE TASK ERROR:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.downloadTaskExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.find({ userId }).sort({ dueDate: -1 });

    const data = tasks.map((item) => ({
      Title: item.title,
      Description: item.description,
      Status: item.status,
      Priority: item.priority,
      DueDate: item.dueDate,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Tasks");

    const buffer = xlsx.write(wb, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=task_details.xlsx"
    );

    res.send(buffer);
  } catch (error) {
    console.error("DOWNLOAD TASK ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
