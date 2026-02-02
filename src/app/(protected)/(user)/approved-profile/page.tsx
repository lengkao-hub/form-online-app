"use client"; 

import { DataTable } from "@/components/containers/table/data-table";
import { Tab } from "@headlessui/react"; 
import { CardPagination } from "@/components/containers/table/data-card-pagination";
import { columnsProfile } from "../../profile/container/table/columns";
import { DataTableToolbar } from "../../profile/container/table/filter";
import useTable from "./hook/useTable";
import { TitleLabel } from "@/components/containers/headerLabel";

export default function UserPage() {
  const { result, meta, updatePagination, updateSearch, filter, loading } = useTable(); 
  return (
    <div>
      <div className="flex justify-between items-center">
        <TitleLabel title='ລໍຖ້າອະນຸມັດ' subtitle='ນີ່ແມ່ນລາຍການຂໍ້ມູນລົງທະບຽນບຸກຄົນທີ່ລໍຖ້າອະນຸມັດ' /> 
      </div>
      <Tab.Group>
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
 