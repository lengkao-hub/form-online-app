"use client";
import { CardPagination } from "@/components/containers/table/data-card-pagination";
import { DataTable } from "@/components/containers/table/data-table";
import { getOfficeIds } from "@/lib/getSession";
import { Tab } from "@headlessui/react";
import { LayoutGrid, TableProperties } from "lucide-react";
import useDetailsFolder from "../../hook/useDetails-folder";
import { columnsProfile } from "./columns";
import { DataTableToolbar } from "./filter";
import { useEffect } from "react";
type TableUserProps = {
    id: number
}

export function DetailsFolder({ id }: TableUserProps) {
    const { result, meta, updatePagination, updateSearch, filter, loading } = useDetailsFolder({ id: id });
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