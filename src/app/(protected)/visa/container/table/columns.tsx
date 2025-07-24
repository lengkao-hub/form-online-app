import { SelectAllCheckbox, SelectRowCheckbox } from "@/components/containers/column";
import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions";
import { type ColumnDef } from "@tanstack/react-table";
import { type IVisaType } from "../../type";

export const columnsVillage: Array<ColumnDef<IVisaType>> = [
  {
    id: "select",
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => <SelectRowCheckbox row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "no",
    header: "No",
  },
  {
    accessorKey: "typeCode",
    header: "ປະເພດວິຊ່າ",
  },
  {
    accessorKey: "description",
    header: "ຄໍາອະທິບາຍ",
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row: { original: row } }) => {
      const rwoId = row.id;
      return <DataTableRowActions rowId={rwoId} resource="village" />;
    },
  },
];
