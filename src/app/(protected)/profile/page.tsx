"use client";
import { LayoutGrid, TableProperties } from "lucide-react";
import { use, useEffect } from "react";

import { CreateButton } from "@/components/containers/create-button";
import { DataTable } from "@/components/containers/table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { Tab } from "@headlessui/react";

import { TitleLabel } from "@/components/containers/headerLabel";
import { CardPagination } from "@/components/containers/table/data-card-pagination";
import ProfileGrid from "./container/card/profile-grid";
import { columnsProfile } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import useProfileTable from "./hook/useTable";
import { getOfficeIds } from "@/lib/getSession";
import Card from "./container/card/folder-card";
import useEditStatus from "./hook/useEditStatus";
export default function UserPage() {
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ລໍຖ້າອະນຸມັດ' subtitle='ນີ່ແມ່ນລາຍການຂໍ້ມູນລົງທະບຽນບຸກຄົນທີ່ລໍຖ້າອະນຸມັດ' />
        {/* <CreateButton resouce="profile" title='ລົງທະບຽນບຸກຄົນ' /> */}
      </div>

      <Card useEditStatus={useEditStatus} />
    </div>
  );
}

export function TableUser() {
  const officeListIds = getOfficeIds()
  const { result, meta, updatePagination, updateSearch, filter, loading } = useProfileTable({ officeIds: officeListIds });

  const handleTabChange = newFunction(updatePagination);
  return (
    <div>
      <Tab.Group onChange={handleTabChange}>
        <Tab.List className="flex justify-end">
          <Tab className={({ selected }) => selected ? "border-b-2 border-[--primary] p-2" : "p-2 hover:text-[--primary]"} >
            <TableProperties />
          </Tab>
          <Tab className={({ selected }) => selected ? "border-b-2 border-[--primary] p-2" : "p-2 hover:text-[--primary]"} >
            <LayoutGrid />
          </Tab>
        </Tab.List>
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
