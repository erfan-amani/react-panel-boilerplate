import Dashboard from "@/views/admin/Dashboard";
// USERS
import Users from "@/views/admin/Users";
import UsersList from "@/views/admin/Users/components/List";
import UserAdd from "@/views/admin/Users/components/Add";
import EditUser from "@/views/admin/Users/components/Edit";

export const adminRoutes = [
  { title: "Dashboard", path: "dashboard", component: Dashboard },
  {
    title: "Users",
    path: "users",
    component: Users,
    children: [
      { title: "List", path: "list", component: UsersList },
      { title: "Add", parent: "list", path: "list/add", component: UserAdd },
      {
        title: "Edit",
        parent: "list",
        path: "list/edit/:id",
        component: EditUser,
      },
    ],
    breadcrumbs: {
      list: "/admin/users/list",
      add: "/admin/users/list/add",
      edit: "/admin/users/list/edit",
    },
  },
];
