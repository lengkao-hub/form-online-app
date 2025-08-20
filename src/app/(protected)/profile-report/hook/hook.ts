import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IProfile } from "../../profile/type";

interface IProfileReportResponse {
  result: {
    total: number,
    male: number,
    female: number,
    data: IProfile
  };
  meta: MetaState;
}

const fetchGallery = async ({ officeId, start, end, gender, nationality, selectedOfficeId }: {
  officeId?: number;
  selectedOfficeId?: string
  start?: Date;
  end?: Date;
  gender?: string;
  nationality?: string;
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
  const response = await apiClient.get<IProfileReportResponse>("/profile-report", {
    params,
  });
  return response;
};

const usePeopleReport = () => {
  const [start, setStart] = useState<Date | undefined>(undefined)
  const [end, setEnd] = useState<Date | undefined>(undefined)
  const [gender, setGender] = useState<string | undefined>(undefined)
  const [nationality, setNationality] = useState<string | undefined>(undefined)
  const [selectedOfficeId, setSelectedOfficeId] = useState<string[]| undefined>([]);
  const query = useQuery<IProfileReportResponse, Error>({
    queryKey: ["profile-reports", gender, start, end, nationality, selectedOfficeId],
    queryFn: async () => await fetchGallery({ gender, start, end, nationality, selectedOfficeId: selectedOfficeId?.join() }),
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
    },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: query.refetch,
  };
};

export default usePeopleReport;