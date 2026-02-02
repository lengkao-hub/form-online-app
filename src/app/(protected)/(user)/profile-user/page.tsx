"use client"; 

import { CreateButton } from "@/components/containers/create-button";
import { DataTable } from "@/components/containers/table/data-table"; 
import { Tab } from "@headlessui/react";

import { TitleLabel } from "@/components/containers/headerLabel";
import { CardPagination } from "@/components/containers/table/data-card-pagination"; 
import ProfileGrid from "./container/card/profile-grid";
import { columnsProfile } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import useProfileTable from "./hook/useTable"; 

export default function UserPage() {
  const { result, meta, updatePagination, updateSearch, filter, loading } = useProfileTable({ state: "WAITING" });
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງບຸກຄົນ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນລົງທະບຽນບຸກຄົນ 10-50 ລາຍການຫຼ້າສຸດ' />
        <CreateButton resouce="profile-user" title='ລົງທະບຽນບຸກຄົນ' />
      </div>
      <div>
        <Tab.Group>
          <Tab.Panels>
            <Tab.Panel className="space-y-4">
              <DataTableToolbar updateSearch={updateSearch} filter={filter} />
              <DataTable columns={columnsProfile} data={result} meta={meta} updatePagination={updatePagination} loading={loading} />
            </Tab.Panel>
            <Tab.Panel className="space-y-4">
              <DataTableToolbar updateSearch={updateSearch} filter={filter} />
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4'>
                {result?.map((item) => (
                  <ProfileGrid key={item?.no} data={[item]} />
                ))}
              </div>
              <CardPagination meta={meta} updatePagination={updatePagination} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
