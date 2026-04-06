/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IProfile } from "../type";
import { usePaginationStore, useSearchStore } from "./pagination-search";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react"; 
interface IProfileResponse {
  result: IProfile[];
  meta: MetaState;
}

const fetchProfile = async ({ page, limit, search, genderFilter, yearFilter, dateFilter,userId }: {
  page: number;
  limit: number; 
  search: string; 
  genderFilter?: string;
  yearFilter: string;
  dateFilter?: Date;
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
  if (userId) {
    params.userId = userId;
  }
  const response = await apiClient.get<IProfileResponse>("/profile", {
    params,
  });
  return response;
};

const useProfileTable = () => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<Date | undefined>()
  const [debouncedSearch] = useDebounce(search, 500); 
  const { data } = useSession()
  const userId = data?.user.id
  const query = useQuery<IProfileResponse, Error>({
    queryKey: ["profile", page, limit, debouncedSearch, genderFilter, dateFilter, yearFilter, userId],
    queryFn: async () => await fetchProfile({ page, limit, search: debouncedSearch, genderFilter, yearFilter, dateFilter, userId }),
    placeholderData: (previousData) => previousData,
    enabled: true,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      return failureCount < 3 && status === 429;
    },
    retryDelay: (attempt) => attempt * 2000,

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

export default useProfileTable;
