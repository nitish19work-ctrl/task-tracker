import React from "react";
import { LuDownload } from "react-icons/lu";
import moment from "moment";
import TaskInfoCard from "../Cards/TaskInfoCard";

const TaskList = ({ tasks, onDelete, onEdit, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium text-gray-900">All Tasks</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mt-4">
        {tasks?.length > 0 ? (
          tasks.map((task) => (
            <TaskInfoCard
              key={task._id}
              title={task.title}
              description={task.description}
              status={task.status}
              priority={task.priority}
              dueDate={moment(task.dueDate).format("Do MMM YYYY")}
              onDelete={() => onDelete(task._id)}
              onEdit={() => onEdit(task)}
            />
          ))
        ) : (
          <p className="col-span-full text-sm text-gray-400 text-center py-10">
            No tasks yet. Click &quot;Add Task&quot; to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
