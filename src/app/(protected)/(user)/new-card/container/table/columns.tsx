'use client';

import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions";
import { Badge } from "@/components/ui";
import { type ColumnDef } from "@tanstack/react-table";
import { type IProfile, type IProfileColumns } from "../../type"; 
import { getIdentityLabel } from "../../lib";
import { ImageViewer } from "@/components/containers/image-viewer";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
const FullNameCell = ({ row }: IProfileColumns) => (
  <span>{`${row.original?.firstName} ${row.original?.lastName}`}</span>
);

const DocumentIdentityCell = ({ row }: IProfileColumns) => {
  const identityType = getIdentityLabel(row?.original?.identityType ?? "");
  const number = row?.original?.identityNumber;
  return (
    <div className="">
      <p className="text-sm text-muted-foreground">{identityType}</p>
      <p className="">{number}</p>
    </div>
  );
};

const GenderCell = ({ row }: IProfileColumns) => {
  const gender = row.original?.gender ?? "";
  return (
    <Badge variant={gender === "ຊາຍ" ? "outline" : "secondary"}>{`${gender}`}</Badge>
  );
};
const ProfileLinkCell = ({ item }: any) => {
  const router = useRouter();
  const hasProfile = item.profileGallery && item.profileGallery.length > 0;
  const pushTo = hasProfile ? `/profileGallery/edit/${item.id}` : `/profileGallery/create/0/${item.id}`;
  return (
    <div>
      <Button variant="outline" size="sm" className="h-9 w-10" onClick={() => router.push(pushTo)}>
        Link
      </Button>
    </div>
  );
};

export const columnsProfile: Array<ColumnDef<IProfile>> = [
  {
    accessorKey: "image",
    header: "ຮູບ​",
    cell: ({ row }) => { 
      return (
        <>
          <ImageViewer src={row.original?.image} className="my-1 h-14 w-14" />

        </>
      )
    },
  },
  {
    accessorKey: "firstName",
    header: "ຊື່ ແລະ ນາມສະກຸນ",
    cell: ({ row }) => <FullNameCell row={row} />,
  },
  {
    accessorKey: "document_identity",
    header: "ເອກະສານຢັ້ງຢືນ",
    cell: ({ row }) => <DocumentIdentityCell row={row} />,
  },
  {
    accessorKey: "phoneNumber",
    header: "ເບີໂທລະສັບ",
    cell: ({ row }) => {
      return <p>{row.original.phoneNumber || "ບໍ່ມີເບີໂທ"}</p>
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: "ວັນທີເກີດ",
    cell: ({ row }) => {
      const date = row.original?.dateOfBirth || "";
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "gender",
    header: "ເພດ",
    cell: ({ row }) => <GenderCell row={row} />,
  },
  {
    accessorKey: "nationality.code",
    header: "ສັນຊາດ",
  },
  {
    accessorKey: "status",
    header: "ສະຖານະ",
    cell: ({ row }) => {
      const status = row.original?.folder.status ?? "ບໍ່ຮູ້ສະຖານະ";
      let colorClass = "";
      switch (status) {
        case "PENDING":
          colorClass = "bg-yellow-100 text-yellow-800 border-yellow-300";
          break;
        case "APPROVED":
          colorClass = "bg-green-100 text-green-800 border-green-300";
          break;
        case "REJECTED":
          colorClass = "bg-red-100 text-red-800 border-red-300";
          break;
        default:
          colorClass = "bg-gray-100 text-gray-800 border-gray-300";
      }
      return (
        <Badge
          variant="outline"
          className={`px-3 py-1 rounded-md text-sm font-medium border ${colorClass}`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "id",
    header: "ຮູບພາບ",
    cell: ({ row }) => <ProfileLinkCell item={row.original} />,
  }, 
  {
    accessorKey: "id",
    header: "",
    cell: ({ row: { original: row } }) => {
      const rowId = row.id;
      return <DataTableRowActions rowId={rowId} resource="profile-of-customer" />;
    },
  },
];