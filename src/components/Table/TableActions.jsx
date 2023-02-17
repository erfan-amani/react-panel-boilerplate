import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TableActions = ({
  rowId,
  edit,
  deleteHandler,
  deleteApi,
  updateData,
}) => {
  const hasDelete = !!deleteHandler || !!deleteApi;

  const onDelete = async () => {
    if (!hasDelete) return;

    if (deleteHandler) {
      deleteHandler();
    } else if (deleteApi) {
      try {
        await deleteApi(rowId);

        toast.success("Delete was successfull.");
      } catch (error) {
        console.log({ error });

        toast.success("Something went wrong while deleting item.");
      }
    }

    await updateData?.();
  };

  return (
    <div className="flex gap-2">
      {!!edit && (
        <Link to={`edit/${rowId}`}>
          <PencilSquareIcon className="w-5 h-5" />
        </Link>
      )}
      {hasDelete && (
        <button onClick={onDelete}>
          <TrashIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default TableActions;
