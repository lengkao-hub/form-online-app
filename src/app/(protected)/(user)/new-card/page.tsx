"use client";
import { useEffect } from "react";

import { CreateButton } from "@/components/containers/create-button";
import { DataTable } from "@/components/containers/table/data-table";
import { Tabs } from "@/components/ui";
import { Tab } from "@headlessui/react";

import { TitleLabel } from "@/components/containers/headerLabel";
import { CardPagination } from "@/components/containers/table/data-card-pagination";

import { columnsProfile } from "./container/table/columns";
import { DataTableToolbar } from "../../profile/container/table/filter";
import useProfileTable from "./hook/useTable";
import { getOfficeIds } from "@/lib/getSession";

export default function UserPage() {
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງບຸກຄົນ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນລົງທະບຽນບຸກຄົນ 10-50 ລາຍການຫຼ້າສຸດ' />
        <CreateButton resouce="new-card" title='ອອກບັດ' />
      </div>
      <Tabs defaultValue="profile" className="space-y-4">
        <TableUser />
      </Tabs>
    </div>
  );
}

function TableUser() {
  const officeListIds = getOfficeIds()
  const { result, meta, updatePagination, updateSearch, filter, loading } = useProfileTable({ officeIds: officeListIds });
  const handleTabChange = newFunction(updatePagination);
  return (
    <div>
      <Tab.Group onChange={handleTabChange}>
        <Tab.Panels>
          <Tab.Panel className="space-y-4">
            <DataTableToolbar updateSearch={updateSearch} filter={filter} />
            <DataTable columns={columnsProfile} data={result} meta={meta} updatePagination={updatePagination} loading={loading} />
          </Tab.Panel>
          <Tab.Panel className="space-y-4">
            <DataTableToolbar updateSearch={updateSearch} filter={filter} />
            <CardPagination meta={meta} updatePagination={updatePagination} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

interface Pagination {
  limit: number;
}
function newFunction(updatePagination: (newPagination: Pagination) => void) {
  useEffect(() => {
    updatePagination({ limit: 10 });
  }, [updatePagination]);
  const handleTabChange = (index: number) => {
    if (index === 0) {
      updatePagination({ limit: 10 });
    } else {
      updatePagination({ limit: 8 });
    }
  };
  return handleTabChange;
}
