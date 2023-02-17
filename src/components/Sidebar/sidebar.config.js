import {
  ComputerDesktopIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const SIDEBAR_ITEMS = [
  {
    title: "Admin Layout Pages",
    items: [
      {
        title: "Users",
        icon: UsersIcon,
        path: "/admin/users",
      },
      {
        title: "Dashboard",
        icon: ComputerDesktopIcon,
        path: "/admin/dashboard",
      },
    ],
  },

  {
    title: "No Layout Pages",
    items: [{ title: "Profile Page", icon: UserCircleIcon, path: "/profile" }],
  },
];
