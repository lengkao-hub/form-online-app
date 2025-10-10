import { SelectAllCheckbox, SelectRowCheckbox } from "@/components/containers/column";
import { type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { AddVisaDialog } from "../addVisaDialog";
import { Button } from "@/components/ui";
import { SquarePen } from "lucide-react";
import { IVisaType } from "src/app/(protected)/visa/type";

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
    accessorKey: "example",
    header: "",
  },
  {
    accessorKey: "example",
    header: "",
  },
  {
    accessorKey: "example",
    header: "",
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row: { original: row } }) => {
      const rowId = Number(row.id);
      const isEdit = true
      const [addVisa, setAddVisa] = useState<boolean>(false)
      const handleEdit = () => {
        setAddVisa(true)
      };
      return (
        <div>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
            onClick={handleEdit}
          >
            <SquarePen className='h-7 w-7'/>
            <span className='sr-only'>Open menu</span>
          </Button>
          <AddVisaDialog open={addVisa} onOpenChange={setAddVisa} isEdit={isEdit} id={rowId}/>
        </div>
      )
    },
  },
];
