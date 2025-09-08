/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { IFolder } from "../type";

interface IFolderResponse {
  result: IFolder[];
  meta: MetaState;
}

const fetchFolder = async ({ page, limit, search, status, typeFilter, statusFilter, dateFilter, officeId, officeIds, company }: {
  page: number;
  limit: number;
  search: string;
  status: string;
  statusFilter?: string;
  dateFilter?: Date;
  typeFilter?: string;
  officeId?: number;
  company?: number;
  officeIds?: string
}): Promise<IFolderResponse> => {
  const params: Record<string, unknown> = { page, limit, search, status, officeId };
  if (statusFilter) {
    params.status = statusFilter;
  }
  if (dateFilter) {
    params.createdAt = dateFilter;
  }
  if (officeIds) {
    params.officeIds = officeIds;
  }
  if (typeFilter) {
    params.type = typeFilter;
  }
  if (company) {
    params.company = company;
  }
  if (typeFilter) {
    params.type = typeFilter;
  }
  const response = await apiClient.get<IFolderResponse>("/folder", {
    params,
  });
  return response;
};

const useFolderTable = ({ status = "", officeId, officeIds, manual = false }: { status?: string, officeId?: number, officeIds?: string, manual?: boolean }) => {
  const { page, updatePagination, resetPage } = usePaginationStore();
  const [limit, setLimit] = useState<number>(9)
  const { search, updateSearch } = useSearchStore();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [company, setCompany] = useState<number | undefined>(undefined);
  const [dateFilter, setDateFilter] = useState<Date | undefined>()
  const [debouncedSearch] = useDebounce(search, 500);
  const query = useQuery<IFolderResponse, Error>({
    queryKey: ["folders", page, limit, debouncedSearch, status, statusFilter, company, dateFilter, typeFilter, officeId, officeIds, { manual }],
    queryFn: async () => await fetchFolder({ page, limit, search: debouncedSearch, company, status, statusFilter, dateFilter, typeFilter, officeId, officeIds }),
    enabled: !manual || !!company,
    placeholderData: (previousData) => previousData,
  });
  return {
    result: query.data?.result || [],
    meta: {
      ...query.data?.meta,
      currentPage: page,
      limit,
      totalCount: query.data?.meta?.totalCount || 0,
    },
    filter: {
      typeFilter,
      setTypeFilter,
      statusFilter,
      setStatusFilter,
      dateFilter,
      setDateFilter,
      company,
      setCompany,
    },
    limit: {
      limit,
      setLimit,
    },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    updatePagination,
    updateSearch: (newSearch: string) => {
      updateSearch(newSearch);
      resetPage();
    },
    refetch: query.refetch,
  };
};

export default useFolderTable;
