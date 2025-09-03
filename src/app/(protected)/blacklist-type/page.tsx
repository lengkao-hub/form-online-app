"use client";

import { DataTable } from "@/components/containers/table/data-table";

import { AggregationCard } from "@/components/containers/aggregation-card";
import { TitleLabel } from "@/components/containers/headerLabel";
import { List } from "lucide-react";
import { columnsVillage } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import { useAggregation } from "./hook/useAggregation";
import useTypeTable from "./hook/useTable";
import { AddVisaDialog } from "./container/addVisaDialog";
import { Button } from "@/components/ui";
import { useState } from "react";

export default function VillageList() {
  const { result, meta, updatePagination, updateSearch, loading, filter } = useTypeTable();
  const { result: aggregation } = useAggregation();
  const [addVisa, setAddVisa] = useState<boolean>(false)
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ປະເພດບັນຊີດໍາ' subtitle='' />
        <Button onClick={() => setAddVisa(true)}>ເພີ່ມ</Button>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
        <AggregationCard value={aggregation?.total ?? 0} title="ທັງໝົດ" icon={<List />} label='ປະເພດ' />
      </div>
      <div className="space-y-4">
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
        <DataTable columns={columnsVillage} data={result} meta={meta} updatePagination={updatePagination} loading={loading} />
      </div>
      <AddVisaDialog open={addVisa} onOpenChange={setAddVisa}/>
    </div>
  );
}
