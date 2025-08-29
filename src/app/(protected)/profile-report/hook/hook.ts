import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface IProfileReportResponse {
  result: {
    total: {
      male: number,
      female: number,
    },
    nationalityCount: number;
    rows: {
      nationality: string;
      male: number;
      female: number;
    }[]
  }
  meta: MetaState;
}

const fetchGallery = async ({ filterType, officeId, start, end, gender, nationality, selectedOfficeId }: {
  officeId?: number;
  selectedOfficeId?: string
  start?: Date;
  end?: Date;
  gender?: string;
  nationality?: string | number;
  filterType: string;
}): Promise<IProfileReportResponse> => {
  const params: Record<string, unknown> = { officeId, start , end, gender, nationality };
  if (start) {
    params.start = start;
  }
  if (end) {
    params.end = end;
  }
  if (gender) {
    params.gender = gender;
  }
  if (nationality) {
    params.nationality = nationality;
  }
  if (selectedOfficeId) {
    params.officeIds = selectedOfficeId;
  }
  if (filterType) {
    params.filterType = filterType;
  }
  const response = await apiClient.get<IProfileReportResponse>("/profile-report", {
    params,
  });
  return response;
};

const usePeopleReport = () => {
  const [start, setStart] = useState<Date | undefined>(undefined)
  const [end, setEnd] = useState<Date | undefined>(undefined)
  const [gender, setGender] = useState<string | undefined>("all")
  const [nationality, setNationality] = useState<string | number>(1)
  const [selectedOfficeId, setSelectedOfficeId] = useState<string[]| undefined>([]);
  const [filterType, setFilterType] = useState<string>("daily")
  const query = useQuery<IProfileReportResponse, Error>({
    queryKey: ["profile-reports",filterType, gender, start, end, nationality, selectedOfficeId],
    queryFn: async () => await fetchGallery({ filterType, gender, start, end, nationality, selectedOfficeId: selectedOfficeId?.join() }),
    placeholderData: (previousData) => previousData,
  });
  return {
    result: query.data?.result,
    filter: {
      start,
      setStart,
      selectedOfficeId,
      setSelectedOfficeId,
      end,
      setEnd,
      gender,
      setGender,
      nationality,
      setNationality,
      filterType,
      setFilterType,
    },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: query.refetch,
  };
};

export default usePeopleReport;