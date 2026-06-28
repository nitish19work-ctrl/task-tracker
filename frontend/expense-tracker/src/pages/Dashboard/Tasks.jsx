import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TaskOverview from "../../components/Task/TaskOverview";
import useUserAuth from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddTaskForm from "../../components/Task/AddTaskForm";
import axiosInstance from "../../utils/axiosinstance";
import toast from "react-hot-toast";
import TaskList from "../../components/Task/TaskList";
import DeleteAlert from "../../components/DeleteAlert";

const Tasks = () => {
  useUserAuth();

  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTaskDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.TASK.GET_ALL_TASKS);

      if (response?.data) {
        setTaskData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  const validateTask = (task) => {
    const { title, dueDate } = task;

    if (!title.trim()) {
      toast.error("Title is required.");
      return false;
    }

    if (!dueDate) {
      toast.error("Due date is required.");
      return false;
    }

    return true;
  };

  const handleAddTask = async (task) => {
    if (!validateTask(task)) return;

    try {
      const response = await axiosInstance.post(API_PATHS.TASK.ADD_TASK, task);

      if (response?.data) {
        toast.success("Task added successfully");
        setOpenAddTaskModal(false);
        fetchTaskDetails();
      }
    } catch (error) {
      console.error(
        "Error adding task:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to add task");
    }
  };

  const handleUpdateTask = async (task) => {
    if (!validateTask(task)) return;

    try {
      const response = await axiosInstance.put(
        API_PATHS.TASK.UPDATE_TASK(selectedTask._id),
        task
      );

      if (response?.data) {
        toast.success("Task updated successfully");
        setOpenEditTaskModal(false);
        setSelectedTask(null);
        fetchTaskDetails();
      }
    } catch (error) {
      console.error(
        "Error updating task:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.TASK.DELETE_TASK(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Task deleted successfully");
      fetchTaskDetails();
    } catch (error) {
      console.error(
        "Error deleting task:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to delete task");
    }
  };

  const handleDownloadTaskDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASK.DOWNLOAD_TASKS,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "task_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading task details", error);
      toast.error("Failed to download task details. Please try again.");
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Tasks">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <TaskOverview
            tasks={taskData}
            onAddTask={() => setOpenAddTaskModal(true)}
          />

          <TaskList
            tasks={taskData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onEdit={(task) => {
              setSelectedTask(task);
              setOpenEditTaskModal(true);
            }}
            onDownload={handleDownloadTaskDetails}
          />
        </div>

        <Modal
          isOpen={openAddTaskModal}
          onClose={() => setOpenAddTaskModal(false)}
          title="Add Task"
        >
          <AddTaskForm onSubmit={handleAddTask} />
        </Modal>

        <Modal
          isOpen={openEditTaskModal}
          onClose={() => {
            setOpenEditTaskModal(false);
            setSelectedTask(null);
          }}
          title="Edit Task"
        >
          <AddTaskForm
            initialData={selectedTask}
            onSubmit={handleUpdateTask}
            submitLabel="Update Task"
          />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Task"
        >
          <DeleteAlert
            content="Are you sure you want to delete this task?"
            onDelete={() => deleteTask(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
