/* eslint-disable @typescript-eslint/naming-convention */
import { DataTableColumnHeader } from "@/components/containers/table/data-table-column-header"
import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions"
import {
  Badge, 
} from "@/components/ui"
import { cn } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table" 
import type { IUser } from "../../type"
import type { RoleLabels } from "../interface"

export const columnsUser: Array<ColumnDef<IUser>> = [
  {
    accessorKey: "username",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ຊື່ບັນຊີເຂົ້າໃຊ້ລະບົບ" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <span className="font-normal">{row.original.username}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ຊື່ແທ້" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.firstName}</span>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ເບີໂທລະສັບ" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs bg-muted px-2 py-1 rounded-md">{`${row.original.phone}`}</span>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ອີເມວ"/>,
    cell: ({ row }) => <span className="text-muted-foreground text-sm">{row.original.email || "—"}</span>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ສີດໃຊ້ງານ" />,
    cell: ({ row }) => {
      const role = row.getValue("role") ?? ""
      return <div className="flex space-x-2">{getRoleLabel(role as keyof RoleLabels)}</div>
    },
  }, 
  {
    accessorKey: "id",
    header: "ແກ້ໄລ",
    cell: ({ row: { original: row } }) => {
      const rowId = row.id
      return (
        <div className="flex ">
          <DataTableRowActions rowId={rowId} resource="user" />
        </div>
      )
    },
  },
]
export const roleLabels: RoleLabels = {
  USER: "ພະນັກງານ",
  ADMIN: "ແອັດມິນ", 
}

export const getRoleLabel = (role: keyof RoleLabels | string) => {
  const result = roleLabels[role as keyof RoleLabels]
  const roleColors: Record<string, string> = {
    ADMIN: "bg-blue-50 text-blue-700 border-blue-200", 
    USER: "bg-green-50 text-green-700 border-green-200",
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
