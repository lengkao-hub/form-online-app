/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IVisaType } from "../type";

interface IVisaResponse {
  result: IVisaType[];
  meta: MetaState;
}

const fetchVillage = async ({ page, limit, search }: {
  page: number;
  limit: number;
  search: string;
}): Promise<IVisaResponse> => {
  const params: Record<string, unknown> = { page, limit, search };
  const response = await apiClient.get<IVisaResponse>("/visa", {
    params,
  });
  return response;
};

const useVisaTable = () => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [districtId, setProvinceId] = useState<number>(0);

  const [debouncedSearch] = useDebounce(search, 500);

  const query = useQuery<IVisaResponse, Error>({
    queryKey: ["visas", page, limit, debouncedSearch, statusFilter, districtId],
    queryFn: async () => await fetchVillage({ page, limit, search: debouncedSearch }),
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
      statusFilter,
      setStatusFilter,
      districtId,
      setProvinceId,
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

export default useVisaTable;
