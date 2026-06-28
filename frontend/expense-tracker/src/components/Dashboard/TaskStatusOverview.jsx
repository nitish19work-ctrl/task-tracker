import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FF6900", "#22C55E"];

const TaskStatusOverview = ({ pendingTasks, inProgressTasks, completedTasks }) => {
  const statusData = [
    { name: "Pending", count: pendingTasks },
    { name: "In Progress", count: inProgressTasks },
    { name: "Completed", count: completedTasks },
  ];

  const totalTasks = pendingTasks + inProgressTasks + completedTasks;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Task Status Overview</h5>
      </div>

      <CustomPieChart
        data={statusData}
        label="Total Tasks"
        totalAmount={totalTasks}
        colors={COLORS}
        showTextAnchor
        dataKey="count"
      />
    </div>
  );
};

export default TaskStatusOverview;
