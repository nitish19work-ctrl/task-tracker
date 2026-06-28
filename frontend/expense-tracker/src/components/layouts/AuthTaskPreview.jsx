import React from "react";
import TaskInfoCard from "../Cards/TaskInfoCard";

const PREVIEW_TASKS = [
  {
    title: "Plan project roadmap",
    description: "Outline milestones and key deadlines",
    status: "In Progress",
    priority: "High",
    dueDate: "15 Mar 2026",
  },
  {
    title: "Review team feedback",
    description: "Go through sprint retrospective notes",
    status: "Pending",
    priority: "Medium",
    dueDate: "18 Mar 2026",
  },
  {
    title: "Update documentation",
    description: "Finalize guides and release notes",
    status: "Completed",
    priority: "Low",
    dueDate: "10 Mar 2026",
  },
];

const AuthTaskPreview = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-purple-200/30 p-5 w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-base font-semibold text-gray-900">Your Tasks</h4>
          <p className="text-xs text-gray-400 mt-0.5">Stay organized at a glance</p>
        </div>
        <span className="text-[11px] font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-lg">
          3 active
        </span>
      </div>

      <div className="space-y-1 divide-y divide-gray-100">
        {PREVIEW_TASKS.map((task) => (
          <TaskInfoCard
            key={task.title}
            title={task.title}
            description={task.description}
            status={task.status}
            priority={task.priority}
            dueDate={task.dueDate}
            hideActions
          />
        ))}
      </div>
    </div>
  );
};

export default AuthTaskPreview;
