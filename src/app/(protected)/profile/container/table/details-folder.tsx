"use client"; 
import { DataTable } from "@/components/containers/table/data-table"; 
import { Tab } from "@headlessui/react"; 
import useDetailsFolder from "../../hook/useDetails-folder";
import { columnsProfile } from "./columns"; 
import { useEffect } from "react";
import { Button } from "@/components/ui";
import useEditStatus from "../../../(user)/rejected-profile/hook/useEditStatus";
type TableUserProps = {
    id: number,
    content: string,
    showedit: boolean,
}

export function DetailsFolder({ id, content, showedit }: TableUserProps) {
  const { result, meta, updatePagination, loading } = useDetailsFolder({ id: id });
  const { editStatus } = useEditStatus()
  const handleTabChange = newFunction(updatePagination);
  return (
    <div>
      <Tab.Group onChange={handleTabChange}>
        <Tab.Panels>
          {showedit && (
            <>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50"
                  onClick={() => editStatus({ id: id, status: "PENDING" })}
                >
                                    ບັນທືກ
                </Button>
              </div>
              <div className="text-red-500 p-4">
                {content}
              </div>
            </>
          )}
          <Tab.Panel className="space-y-4">
            <DataTable columns={columnsProfile} data={result} meta={meta} updatePagination={updatePagination} loading={loading} />
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