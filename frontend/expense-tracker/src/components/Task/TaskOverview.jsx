import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import moment from "moment";
import CustomBarChart from "../Charts/CustomBarChart";

const TaskOverview = ({ tasks, onAddTask }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const weeks = Array.from({ length: 6 }, (_, i) => {
      const weekStart = moment().subtract(5 - i, "weeks").startOf("isoWeek");
      const weekEnd = moment().subtract(5 - i, "weeks").endOf("isoWeek");

      const count = tasks.filter((task) =>
        moment(task.dueDate).isBetween(weekStart, weekEnd, "day", "[]")
      ).length;

      return {
        category: weekStart.format("DD MMM"),
        count,
      };
    });

    setChartData(weeks);
  }, [tasks]);

  const statusCounts = {
    Pending: tasks.filter((t) => t.status === "Pending").length,
    "In Progress": tasks.filter((t) => t.status === "In Progress").length,
    Completed: tasks.filter((t) => t.status === "Completed").length,
  };

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h5 className="text-lg font-medium text-gray-900">Weekly Progress</h5>
          <p className="text-xs text-gray-400 mt-1">
            Tasks due each week and current status breakdown
          </p>
        </div>

        <button className="add-btn shrink-0" onClick={onAddTask}>
          <LuPlus className="text-lg" />
          Add Task
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        {Object.entries(statusCounts).map(([status, count]) => (
          <span
            key={status}
            className="text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1 rounded-lg"
          >
            {status}: <span className="text-purple-600">{count}</span>
          </span>
        ))}
      </div>

      <div className="mt-6">
        {tasks.length > 0 ? (
          <CustomBarChart data={chartData} valueLabel="Tasks" />
        ) : (
          <p className="text-sm text-gray-400 text-center py-16">
            Add tasks to see your weekly progress chart
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskOverview;
