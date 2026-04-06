/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IProfile } from "../type";
import { usePaginationStore, useSearchStore } from "../../../profile/hook/pagination-search";
import { AxiosError } from "axios"; 
import { useSession } from "next-auth/react";
interface IProfileResponse {
  result: IProfile[];
  meta: MetaState;
}

const fetchProfile = async ({ page, limit, search, excludeApplications, genderFilter, yearFilter, dateFilter, officeId, officeIds,status, userId }: {
  page: number;
  limit: number;
  officeId?: number;
  search: string;
  excludeApplications: boolean;
  genderFilter?: string;
  yearFilter: string;
  dateFilter?: Date;
  officeIds?: string;
  id?:string;
  status?: string[];
  userId?: number | string;
}): Promise<IProfileResponse> => {
  const params: Record<string, unknown> = { page, limit, search, excludeApplications, officeId };
  params.status = status;
  if (genderFilter) {
    params.gender = genderFilter;
  }
  if (yearFilter) {
    params.year = yearFilter;
  }
  if (dateFilter) {
    params.date = dateFilter;
  }
  if (officeIds) {
    params.officeIds = officeIds;
  }
  if (userId) {
    params.userId = userId;
  }
  const response = await apiClient.get<IProfileResponse>(`/status-profile`, {
    params,
  });
  return response;
};

const useProfileTable = ({ excludeApplications = false }: { excludeApplications?: boolean, officeIds?: string }) => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<Date | undefined>()
  const [debouncedSearch] = useDebounce(search, 500);
  const { data } = useSession()
  const userId = data?.user.id
  const status =["PENDING"];
  const query = useQuery<IProfileResponse, Error>({
    queryKey: ["status-profile", page, limit, debouncedSearch, excludeApplications, genderFilter, dateFilter, yearFilter, status, userId],
    queryFn: async () => await fetchProfile({ page, limit, search: debouncedSearch, excludeApplications, genderFilter, yearFilter, dateFilter, status, userId }),
    placeholderData: (previousData) => previousData,
    enabled: true,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      return failureCount < 3 && status === 429;
    },
    retryDelay: (attempt) => attempt * 2000,

  }); 
  // console.log("Query data:", query.data);
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
