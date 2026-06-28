import React, { useEffect, useState } from "react";
import { preparePriorityChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const TasksByPriority = ({ tasksByPriority }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = preparePriorityChartData(tasksByPriority);
    setChartData(result);
  }, [tasksByPriority]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Tasks by Priority</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
};

export default TasksByPriority;
