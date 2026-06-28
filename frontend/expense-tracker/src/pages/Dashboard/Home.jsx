import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

import InfoCard from "../../components/Cards/InfoCardComponent";
import RecentTasks from "../../components/Dashboard/RecentTasks";

import { LuListTodo, LuClock, LuCircleCheck } from "react-icons/lu";
import { IoMdCheckboxOutline } from "react-icons/io";

import TaskStatusOverview from "../../components/Dashboard/TaskStatusOverview";
import UpcomingTasks from "../../components/Dashboard/UpcomingTasks";
import TasksByPriority from "../../components/Dashboard/TasksByPriority";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.DASHBOARD.GET_DATA
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Dashboard error:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <InfoCard
            icon={<IoMdCheckboxOutline />}
            label="Total Tasks"
            value={dashboardData?.totalTasks || 0}
            color="bg-purple-500"
          />

          <InfoCard
            icon={<LuClock />}
            label="Pending"
            value={dashboardData?.pendingTasks || 0}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuListTodo />}
            label="In Progress"
            value={dashboardData?.inProgressTasks || 0}
            color="bg-blue-500"
          />

          <InfoCard
            icon={<LuCircleCheck />}
            label="Completed"
            value={dashboardData?.completedTasks || 0}
            color="bg-green-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTasks
            tasks={dashboardData?.recentTasks || []}
            onSeeMore={() => navigate("/tasks")}
          />

          <TaskStatusOverview
            pendingTasks={dashboardData?.pendingTasks || 0}
            inProgressTasks={dashboardData?.inProgressTasks || 0}
            completedTasks={dashboardData?.completedTasks || 0}
          />

          <UpcomingTasks
            tasks={dashboardData?.upcomingTasks || []}
            onSeeMore={() => navigate("/tasks")}
          />

          <TasksByPriority
            tasksByPriority={dashboardData?.tasksByPriority || {}}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
