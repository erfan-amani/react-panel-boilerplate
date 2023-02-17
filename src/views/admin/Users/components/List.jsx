import Table from "@/components/Table";
import { Delete, GetAll } from "../api";
import { StatusObj } from "../model/Data";
import { NumberFilter, SelectFilter } from "@inovua/reactdatagrid-community";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import TableActions from "../../../../components/Table/TableActions";
import { useState } from "react";

const filterValue = [
  { name: "id", operator: "eq", type: "number" },
  { name: "name", operator: "contains", type: "string" },
  { name: "email", operator: "contains", type: "string" },
  { name: "mobile", operator: "contains", type: "string" },
  { name: "feePercent", operator: "eq", type: "number" },
  { name: "isVerified", operator: "eq", type: "boolean" },
  { name: "referralCode", operator: "contains", type: "string" },
  { name: "status", operator: "eq", type: "select" },
];

const getColumns = (updateData) => [
  { name: "id", header: "Id", filterEditor: NumberFilter },
  {
    name: "avatar",
    header: "Avatar",
    render: ({ value }) =>
      value?.[0]?.location ? (
        <img
          className="w-12 h-12 rounded-full"
          src={value?.[0]?.location}
          alt=""
        />
      ) : (
        <svg
          className="rounded-full w-12 h-12 text-gray-300 border-2 border-gray-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
  },
  { name: "name", header: "Name", render: ({ value }) => value || "-" },
  { name: "email", header: "Email", render: ({ value }) => value || "-" },
  { name: "mobile", header: "Mobile", render: ({ value }) => value || "-" },
  { name: "feePercent", header: "Fee Percent" },
  {
    name: "isVerified",
    header: "Verified",
    render: ({ value }) =>
      value ? (
        <CheckCircleIcon className="w-6 h-6 text-green-600" />
      ) : (
        <XCircleIcon className="w-6 h-6 text-red-500" />
      ),
  },
  { name: "level", header: "Level" },
  { name: "referralCode", header: "Referral Code" },
  {
    name: "status",
    header: "Status",
    filterEditor: SelectFilter,
    filterEditorProps: {
      placeholder: "All",
      dataSource: StatusObj,
    },
  },
  {
    name: "action",
    header: "Actions",
    render: ({ data }) => (
      <TableActions
        edit
        deleteApi={Delete}
        rowId={data?.id}
        updateData={updateData}
      />
    ),
  },
];

const Index = () => {
  const [update, setUpdate] = useState(0);

  const loadData = async ({ skip, limit, filterValue, sortInfo }) => {
    const queryData = {
      page: skip / limit + 1,
      limit,
    };
    if (sortInfo?.id) {
      queryData.sort = sortInfo.id;
      queryData.order = sortInfo.dir === 1 ? "ASC" : "DESC";
    }
    if (filterValue?.length) {
      filterValue?.forEach(
        (filter) => !!filter?.value && (queryData[filter.name] = filter.value)
      );
    }

    try {
      const response = await GetAll(queryData);

      const data = response?.data?.data?.data;
      // const page = query.page;
      const count = response?.data?.data?.total;
      return { data, count };
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = () => setUpdate((prev) => prev + 1);

  return (
    <div className="">
      <Table
        columns={getColumns(updateData)}
        title="Users Records"
        loadData={loadData}
        filterValue={filterValue}
        add
        rowHeight={100}
        update={update}
      />
    </div>
  );
};

export default Index;
