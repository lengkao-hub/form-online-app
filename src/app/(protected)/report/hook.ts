import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { INumberAggregation } from "./type";

interface INumberAggregationResponse {
  result: INumberAggregation;
  meta: MetaState;
}

const fetchGallery = async ({ officeId, createdAt, startDate, endDate, filterType, selectedOfficeId }: {
  officeId?: number;
  createdAt?: Date;
  selectedOfficeId?: string
  startDate?: Date;
  endDate?: Date;
  filterType: string;
}): Promise<INumberAggregationResponse> => {
  const date = new Date();
  const params: Record<string, unknown> = { officeId, createdAt: date, startDate, endDate, filterType };
  if (createdAt) {
    params.createdAt = createdAt;
  }
  if (startDate) {
    params.startDate = startDate;
  }
  if (endDate) {
    params.endDate = endDate;
  }
  if (filterType) {
    params.filterType = filterType;
  }
  if (selectedOfficeId) {
    params.officeIds = selectedOfficeId;
  }
  const response = await apiClient.get<INumberAggregationResponse>("/number-aggregation", {
    params,
  });
  return response;
};

const useNumberAggregation = () => {
  const [createdAt, setCreatedAtFilter] = useState<Date | undefined>(undefined)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [filterType, setFilterType] = useState<string>("daily")
  const [selectedOfficeId, setSelectedOfficeId] = useState<string[]| undefined>([]);
  const query = useQuery<INumberAggregationResponse, Error>({
    queryKey: ["number-aggregation", createdAt, startDate, endDate, filterType, selectedOfficeId],
    queryFn: async () => await fetchGallery({ createdAt, startDate, endDate, filterType, selectedOfficeId: selectedOfficeId?.join() }),
    placeholderData: (previousData) => previousData,
  });
  return {
    result: query.data?.result ?? {
      summary: {
        name: "",
        sum: [],
      },
      data: [],
    },
    filter: {
      createdAt,
      setCreatedAtFilter,
      selectedOfficeId,
      setSelectedOfficeId,
      startDate,
      endDate,
      setStartDate,
      setEndDate,
      filterType,
      setFilterType,
    },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: query.refetch,
  };
};

export default useNumberAggregation;