import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const prepareTaskBarChartData = (data = []) => {
  return data.map((item) => ({
    category: item?.name,
    count: item?.count,
  }));
};

export const prepareTaskLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return sortedData.map((item) => ({
    month: moment(item?.dueDate).format("Do MMM"),
    count: 1,
    title: item?.title,
  }));
};

export const preparePriorityChartData = (tasksByPriority = {}) => {
  return [
    { name: "Low", count: tasksByPriority.low || 0 },
    { name: "Medium", count: tasksByPriority.medium || 0 },
    { name: "High", count: tasksByPriority.high || 0 },
  ];
};
