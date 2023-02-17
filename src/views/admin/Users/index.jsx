import { PortalWithState } from "react-portal";
import { Routes, Route, Navigate } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import List from "./components/List";
import Add from "./components/Add";
import Edit from "./components/Edit";

const Users = ({ routeItems, rootTitle, rootPath, breadcrumbs }) => {
  console.log({ breadcrumbs });

  return (
    <>
      <PortalWithState
        node={document && document.getElementById("breadcrumbs")}
      >
        {({}) => (
          <Breadcrumbs
            items={routeItems}
            rootTitle={rootTitle}
            rootPath={rootPath}
            breadcrumbs={breadcrumbs}
          />
        )}
      </PortalWithState>

      <Routes>
        <Route path="list/edit/:id" element={<Edit />} />
        <Route path="list/add" element={<Add />} />
        <Route path="list" element={<List />} />

        <Route path="*" element={<Navigate to="/admin/users/list" />} />
      </Routes>
    </>
  );
};

export default Users;
