const Task = require("../models/TaskModel");
const { Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = new Types.ObjectId(req.user.id);

    const allTasks = await Task.find({ userId }).sort({ dueDate: 1 });

    const totalTasks = allTasks.length;
    const pendingTasks = allTasks.filter((t) => t.status === "Pending").length;
    const inProgressTasks = allTasks.filter((t) => t.status === "In Progress").length;
    const completedTasks = allTasks.filter((t) => t.status === "Completed").length;

    const tasksByPriority = {
      low: allTasks.filter((t) => t.priority === "Low").length,
      medium: allTasks.filter((t) => t.priority === "Medium").length,
      high: allTasks.filter((t) => t.priority === "High").length,
    };

    const tasksByStatus = [
      { name: "Pending", count: pendingTasks },
      { name: "In Progress", count: inProgressTasks },
      { name: "Completed", count: completedTasks },
    ];

    const now = new Date();
    const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const upcomingTasks = allTasks.filter(
      (t) =>
        t.status !== "Completed" &&
        new Date(t.dueDate) >= now &&
        new Date(t.dueDate) <= sevenDaysFromNow
    );

    const recentTasks = [...allTasks]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.json({
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      tasksByPriority,
      tasksByStatus,
      upcomingTasks,
      recentTasks,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
