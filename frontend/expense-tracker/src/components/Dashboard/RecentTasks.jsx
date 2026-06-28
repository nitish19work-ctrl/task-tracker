import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TaskInfoCard from "../Cards/TaskInfoCard";

const RecentTasks = ({ tasks = [], onSeeMore }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-medium">Recent Tasks</h5>

        <button
          className="flex items-center gap-2 text-purple-600"
          onClick={onSeeMore}
        >
          See All
          <LuArrowRight />
        </button>
      </div>

      <div className="mt-6">
        {tasks?.slice(0, 5)?.map((task) => (
          <TaskInfoCard
            key={task._id}
            title={task.title}
            description={task.description}
            status={task.status}
            priority={task.priority}
            dueDate={moment(task.dueDate).format("Do MMM YYYY")}
            hideActions
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTasks;
