/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios"; 
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IFolder } from "../type";
import { usePaginationStore, useSearchStore } from "./pagination-search";

interface IPFolderResponse {
  result: IFolder[];
  // meta: MetaState;
}

const fetchProfile = async ({
  page,
  limit,
  search,
  yearFilter,
  dateFilter,
}: {
  page: number;
  limit: number;
  search: string;
  yearFilter: string;
  dateFilter?: Date;
}): Promise<IPFolderResponse> => {
  const params: Record<string, unknown> = { page, limit, search };
  params.status = "PENDING";
  if (yearFilter)
  { params.year = yearFilter; }
  if (dateFilter)
  { params.date = dateFilter; }

  const response = await apiClient.get<IPFolderResponse>("/folder", { params });
 
  return response
};

const useFolderCard = () => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();

  const [genderFilter, setGenderFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<Date | undefined>();
  const [debouncedSearch] = useDebounce(search, 500);

  const query = useQuery<IPFolderResponse, Error>({
    queryKey: ["folder", page, limit, debouncedSearch, dateFilter, yearFilter],
    queryFn: () => fetchProfile({ page, limit, search: debouncedSearch, yearFilter, dateFilter }),
  }); 
  return {
    result: query.data?.result || [],
    // meta: {
    //   ...query.data?.meta,
    //   currentPage: page,
    //   limit,
    //   totalCount: query.data?.meta?.totalCount || 0,
    // },
    filter: {
      genderFilter,
      setGenderFilter,
      yearFilter,
      setYearFilter,
      dateFilter,
      setDateFilter,
    },
    loading: query.isLoading,
    error: query.error?.message || null,
    updatePagination,
    updateSearch: (newSearch: string) => {
      updateSearch(newSearch);
      resetPage();
    },
    refetch: query.refetch,
  };
};

export default useFolderCard;
