import {
  LuLayoutDashboard,
  LuListTodo,
  LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Tasks",
    icon: LuListTodo,
    path: "/tasks",
  },
  {
    id: "03",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];
