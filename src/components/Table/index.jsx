import "@inovua/reactdatagrid-community/index.css";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

const gridStyle = { minHeight: 550 };

const Table = ({
  title,
  columns,
  loadData,
  filterValue,
  add,
  update,
  ...otherProps
}) => {
  const dataSource = useCallback(loadData, []);

  useEffect(() => {
    if (!update) return; // update should be greater than 1

    const refreshButton = document.getElementsByClassName(
      "inovua-react-pagination-toolbar__icon--named--REFRESH"
    )?.[0];
    refreshButton && refreshButton?.click?.();
  }, [update]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center bg-white border-t border-gray-200 p-4">
        <p>{title}</p>

        {add && (
          <Link className="rounded-md border border-gray-200 p-2" to="add">
            <PlusIcon className="w-5 h-5" />
          </Link>
        )}
      </div>

      {/* <div className="p-4 shadow-sm"> */}
      <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={dataSource}
        defaultFilterValue={filterValue}
        style={gridStyle}
        pagination="remote"
        defaultLimit={10}
        {...otherProps}
      />
    </div>
    // </div>
  );
};

export default Table;
