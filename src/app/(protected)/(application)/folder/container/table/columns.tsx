/* eslint-disable @typescript-eslint/naming-convention */
import { type ColumnDef } from "@tanstack/react-table";
import { IFolder, processStatus } from "../../type";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columnsFolder: Array<ColumnDef<IFolder>> = [
  {
    accessorKey: "no",
    header: "ລໍາດັບ",
    cell: ({ row }) => <p className="pl-3">{row.original.no}</p>,
  },
  {
    accessorKey: "name",
    header: "ຊື່ແຟ້ມ",
    cell: ({ row }) => <p>{row.original.name}</p>,
  },
  {
    accessorKey: "code",
    header: "ລະຫັດແຟ້ມ",
    cell: ({ row }) => <p>{row.original.code}</p>,
  },
  {
    accessorKey: "status",
    header: "ສະຖານະ",
    cell: ({ row }) => {
      const status = row.getValue("status") ?? ""
      return <div className="flex space-x-2">{getRoleLabel(status as keyof processStatus)}</div>
    },
  },
  {
    accessorKey: "billDate",
    header: "ວັນທີອອກບິນຮັບເງີນ",
    cell: ({ row }) => {
      const date = format(row.original.billDate, "dd/MM/yyyy")
      return <p>{date || "-"}</p>
    },
  },
];

export const statusLabels: processStatus = {
  DEFAULT: "ຍັງບໍ່ໄດ້ສົ່ງໃຫ້ການເງີນ",
  PENDING: "ລໍຖ້າຍອມຮັບ",
  FINISHED: "ສໍາເລັດແລ້ວ",
  APPROVED_BY_POLICE: "ແຟ້ມທີ່ກໍາລັງຕື່ມຟອມ",
  FINANCE_UNDER_REVIEW: "ລໍຖ້າການເງີນຢືນຢັນ",
  REJECTED: "ແຟ້ມມີບັນຫາ",
  POLICE_UNDER_REVIEW: "ເຈົ້າໜ້າທີ່ກໍາລັງກວດສອບ",
  IN_PRODUCTION: "ລໍຖ້າພິມບັດ",
}

export const getRoleLabel = (role: keyof processStatus | string) => {
  const result = statusLabels[role as keyof processStatus]
  const roleColors: Record<string, string> = {
    DEFAULT: "bg-blue-50 text-blue-700 border-blue-200",
    PENDING: "bg-blue-50 text-blue-700 border-blue-200",
    FINISHED: "bg-green-50 text-green-700 border-green-200",
    APPROVED_BY_POLICE: "bg-amber-50 text-amber-700 border-amber-200",
    FINANCE_UNDER_REVIEW: "bg-purple-50 text-purple-700 border-purple-200",
    REJECTED: "bg-indigo-50 text-indigo-700 border-indigo-200",
    POLICE_UNDER_REVIEW: "bg-rose-50 text-rose-700 border-rose-200",
    IN_PRODUCTION: "bg-rose-50 text-rose-700 border-rose-200",
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium text-xs py-1 px-2 rounded-md",
        roleColors[role as string] || "bg-gray-50 text-gray-700 border-gray-200",
      )}
    >
      {result}
    </Badge>
  )
}