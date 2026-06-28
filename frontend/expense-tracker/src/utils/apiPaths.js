export const BASE_URL = "https://task-tracker-1-gzmy.onrender.com";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
  },

  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },

  TASK: {
    ADD_TASK: "/api/v1/task/add",
    GET_ALL_TASKS: "/api/v1/task/get",
    UPDATE_TASK: (taskId) => `/api/v1/task/${taskId}`,
    DELETE_TASK: (taskId) => `/api/v1/task/${taskId}`,
    DOWNLOAD_TASKS: "/api/v1/task/downloadexcel",
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};
