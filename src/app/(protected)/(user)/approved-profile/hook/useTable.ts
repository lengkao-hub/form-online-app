/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IProfile } from "../../../profile/type";
import { usePaginationStore, useSearchStore } from "../../../profile/hook/pagination-search";
import { useSession } from "next-auth/react";
  
interface IProfileResponse {
  result: IProfile[];
  meta: MetaState;
}

const fetchFolder = async ({ page, limit, search, genderFilter, yearFilter, dateFilter, status, userId }: {
  page: number;
  limit: number;
  search: string;
  genderFilter?: string;
  yearFilter: string;
  dateFilter?: Date;
  status?: string[];
  userId?: number | string;
}): Promise<IProfileResponse> => {
  const params: Record<string, unknown> = { page, limit, search }; 
  if (genderFilter) {
    params.gender = genderFilter;
  }
  if (yearFilter) {
    params.year = yearFilter;
  }
  if (dateFilter) {
    params.date = dateFilter;
  }
  if (status) {
    params.status = status;
  } 
  if (userId) {
    params.userId = userId;
  }

  const response = await apiClient.get<IProfileResponse>("/status-profile", {
    params,
  });
  return response;
};

const useTable = () => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<Date | undefined>()
  const [debouncedSearch] = useDebounce(search, 500);
  const status =["APPROVED", "APPROVED_BY_POLICE"];
  const { data } = useSession()
  const userId = data?.user.id
  const query = useQuery<IProfileResponse, Error>({
    queryKey: ["approved-user", page, limit, debouncedSearch,   genderFilter, dateFilter, yearFilter, status, userId],
    queryFn: async () => await fetchFolder({ page, limit, search: debouncedSearch,  genderFilter, yearFilter, dateFilter, status, userId }),

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
      genderFilter,
      setGenderFilter,
      yearFilter,
      setYearFilter,
      dateFilter,
      setDateFilter,
    },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    updatePagination,
    updateSearch: (newSearch: string) => {
      updateSearch(newSearch);
      resetPage();
      // setSearchTriggered(true);
    },
    refetch: query.refetch,
  };
};

export default useTable;
