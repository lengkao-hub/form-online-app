'use client';

import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions";
import { Badge } from "@/components/ui";
import { type ColumnDef } from "@tanstack/react-table";
import { type IProfile, type IProfileColumns } from "../../type";
import { BlacklistDialog } from "./blacklist";
import { getIdentityLabel } from "../../lib";
import { ImageViewer } from "@/components/containers/image-viewer";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { RoleBasedGuard } from "@/lib/ability/roleBasedGuard";
import { useSession } from "next-auth/react";
import { IProfileGallery } from "src/app/(protected)/(image)/profileGallery/type";
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

const userRole = () => {
  const { data: session } = useSession()
  const userRole = session?.user?.role;
  const columnTitle = userRole === "ADMIN" || userRole === "SUPER_ADMIN" ? "ຂື້ນບັນຊີດໍາ" : null;
  return columnTitle;
}

export const columnsProfile: Array<ColumnDef<IProfile>> = [
  {
    accessorKey: "image",
    header: "ຮູບ​",
    cell: ({ row }) => {
      const profileGallery = row.original?.profileGallery as object as IProfileGallery[] || [];
      return(
        <>
          {profileGallery.length > 0 ? (
            profileGallery.map((item) => (
              <ImageViewer key={item?.id} src={item?.gallery.image} className="my-1 h-14 w-14" />
            ))
          ):(
            <ImageViewer src={row.original?.image} className="my-1 h-14 w-14" />
          )}
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
    accessorKey: "barcode",
    header: "ບາໂຄດ",
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
    accessorKey: "id",
    header: "ຮູບພາບ",
    cell: ({ row }) => <ProfileLinkCell item={row.original} />,
  },
  {
    accessorKey: "id",
    header: userRole,
    cell: ({ row }) => (
      <RoleBasedGuard subject="add-blacklist-btn" action="read" fallback={<div></div>}>
        <BlacklistDialog profile={row.original} />
      </RoleBasedGuard>
    ),
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row: { original: row } }) => {
      const rowId = row.id;
      return <DataTableRowActions rowId={rowId} resource="profile" />;
    },
  },
];