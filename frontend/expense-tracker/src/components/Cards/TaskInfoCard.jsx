import React from "react";
import { LuTrash2, LuPencil } from "react-icons/lu";

const PRIORITY_STYLES = {
  Low: "bg-green-50 text-green-600",
  Medium: "bg-orange-50 text-orange-600",
  High: "bg-red-50 text-red-600",
};

const STATUS_STYLES = {
  Pending: "bg-gray-100 text-gray-600",
  "In Progress": "bg-blue-50 text-blue-600",
  Completed: "bg-green-50 text-green-600",
};

const TaskInfoCard = ({
  title,
  description,
  dueDate,
  status,
  priority,
  hideActions,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="group relative flex items-start gap-3 mt-1 p-3 rounded-xl hover:bg-purple-50/40 transition-colors">
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm text-gray-800 font-medium leading-snug">{title}</p>
            {description && (
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{description}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">Due: {dueDate}</p>
          </div>

          {!hideActions && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="text-gray-400 hover:text-purple-500 cursor-pointer"
                onClick={onEdit}
              >
                <LuPencil size={16} />
              </button>
              <button
                className="text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={onDelete}
              >
                <LuTrash2 size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${STATUS_STYLES[status]}`}
          >
            {status}
          </span>
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${PRIORITY_STYLES[priority]}`}
          >
            {priority}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskInfoCard;
