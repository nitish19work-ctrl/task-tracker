import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TaskInfoCard from "../Cards/TaskInfoCard";

const UpcomingTasks = ({ tasks = [], onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Upcoming Tasks</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {tasks.slice(0, 5).map((task) => (
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

        {tasks.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">
            No upcoming tasks in the next 7 days
          </p>
        )}
      </div>
    </div>
  );
};

export default UpcomingTasks;
