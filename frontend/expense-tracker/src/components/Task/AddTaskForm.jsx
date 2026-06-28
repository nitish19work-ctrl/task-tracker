import React, { useEffect, useState } from "react";
import Input from "../Inputs/Input";

const STATUS_OPTIONS = ["Pending", "In Progress", "Completed"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

const AddTaskForm = ({ onSubmit, initialData, submitLabel = "Add Task" }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setTask({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "Pending",
        priority: initialData.priority || "Medium",
        dueDate: initialData.dueDate
          ? new Date(initialData.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setTask({ ...task, [key]: value });
  };

  return (
    <div>
      <Input
        value={task.title}
        onChange={({ target }) => handleChange("title", target.value)}
        label="Title"
        placeholder="Task title"
        type="text"
      />

      <label className="text-[13px] text-slate-800">Description</label>
      <textarea
        value={task.description}
        onChange={({ target }) => handleChange("description", target.value)}
        placeholder="Task description (optional)"
        className="input-box min-h-[80px] resize-none"
      />

      <label className="text-[13px] text-slate-800">Status</label>
      <select
        value={task.status}
        onChange={({ target }) => handleChange("status", target.value)}
        className="input-box cursor-pointer"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label className="text-[13px] text-slate-800">Priority</label>
      <select
        value={task.priority}
        onChange={({ target }) => handleChange("priority", target.value)}
        className="input-box cursor-pointer"
      >
        {PRIORITY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <Input
        value={task.dueDate}
        onChange={({ target }) => handleChange("dueDate", target.value)}
        label="Due Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onSubmit(task)}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;
