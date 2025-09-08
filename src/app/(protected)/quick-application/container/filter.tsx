import { CookingPot } from "lucide-react";

import { Button, Input } from "@/components/ui";
import useCompanyCombobox from "../../company/hook/useeCompanyCombobox";
import { Combobox } from "@/components/ui/combobox";

interface DataTableToolbarProps {
  updateSearch: (search: string) => void;
  filter: {
    company?: number;
    setCompany: (company: number | undefined) => void;
  };
}

export function FolderToolbar({ updateSearch, filter: { company, setCompany } }: DataTableToolbarProps) {
  const { result: companyOptions } = useCompanyCombobox();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="ຄົ້ນຫາ..."
          className="h-8 w-[150px] lg:w-[250px]"
          type="hidden"
          onChange={handleSearchChange}
        />
        <div className="space-y-2 col-span-2 md:w-fit">
          <Combobox
            options={companyOptions}
            value={company}
            onChange={(value: string | number) => 
              setCompany(value ? Number(value) : undefined)
            }
            placeholder="ເລືອກຫົວໜ່ວຍທຸລະກິດ"
          />
        </div>
        <Button
          variant="ghost"
          className="h-8 px-2 lg:px-3"
          onClick={() => {
            setCompany(0);
          }}
        >
          ຣີເຊັດ
          <CookingPot className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
