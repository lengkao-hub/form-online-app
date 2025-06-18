import { CookingPot } from "lucide-react";

import { DataTableFacetedFilter } from "@/components/containers/table/data-table-faceted-filter";
import { Button, Input } from "@/components/ui";
import { DataTableDateFilter } from "@/components/containers/table/data-table-date-filter";

export const status = [
  {
    label: "ຍັງບໍ່ໄດ້ສົ່ງໃຫ້ການເງີນ",
    value: "DEFAULT",
  },
  {
    label: "ລໍຖ້າຍອມຮັບ",
    value: "PENDING",
  },
  {
    label: "ສໍາເລັດແລ້ວ",
    value: "FINISHED",
  },
  {
    label: "ແຟ້ມທີ່ກໍາລັງຕື່ມຟອມ",
    value: "APPROVED_BY_POLICE",
  },
  {
    label: "ລໍຖ້າການເງີນຢືນຢັນ",
    value: "FINANCE_UNDER_REVIEW",
  },
  {
    label: "ແຟ້ມມີບັນຫາ",
    value: "REJECTED",
  },
];

interface DataTableToolbarProps {
    updateSearch: (search: string) => void;
    filter: {
        statusFilter: string;
        setStatusFilter: (filter: string) => void;
        dateFilter?: Date;
        setDateFilter: (date: Date | undefined) => void;
    };
}

export function DataTableToolbar({ updateSearch, filter: { statusFilter, setStatusFilter, dateFilter, setDateFilter } }: DataTableToolbarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="ຄົ້ນຫາ..."
          className="h-8 w-[150px] lg:w-[250px]"
          onChange={handleSearchChange}
        />
        <div className="flex gap-x-2">
          <DataTableFacetedFilter
            title="ສະຖານະ"
            options={status}
            selectedValues={statusFilter}
            onSelect={(value: string) => { setStatusFilter(value); }}
          />
        </div>
        <div className="flex gap-x-2">
          <DataTableDateFilter
            title="ວັນທີອອກບິນຮັບເງີນ"
            selectedDate={dateFilter}
            onSelect={(date) => setDateFilter(date)}
          />
        </div>
        <Button
          variant="ghost"
          className="h-8 px-2 lg:px-3"
          onClick={() => { 
            setStatusFilter(""); 
            setDateFilter(undefined);
          }}
        >
          ຣີເຊັດ
          <CookingPot className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
