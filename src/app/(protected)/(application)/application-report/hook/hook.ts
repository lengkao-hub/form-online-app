import { apiClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IReportResponse } from "../../application/type";

const fetchGallery = async ({ filterType, officeId, start, end, gender, nationality, selectedOfficeId, cardType, visaType }: {
  officeId?: number;
  selectedOfficeId?: string
  start?: Date;
  end?: Date;
  gender?: string;
  nationality?: string | number;
  cardType?: string;
  visaType: string | number;
  filterType: string;
}): Promise<IReportResponse> => {
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
  if (cardType) {
    params.cardType = cardType;
  }
  if (visaType) {
    params.visaType = visaType;
  }
  if (filterType) {
    params.filterType = filterType;
  }
  const response = await apiClient.get<IReportResponse>("/application-report", {
    params,
  });
  return response;
};

const usePeopleReport = () => {
  const [start, setStart] = useState<Date | undefined>(undefined)
  const [end, setEnd] = useState<Date | undefined>(undefined)
  const [gender, setGender] = useState<string | undefined>("all")
  const [nationality, setNationality] = useState<string | number>(1)
  const [visaType, setVisaType] = useState<string | number>("all")
  const [selectedOfficeId, setSelectedOfficeId] = useState<string[]| undefined>([]);
  const [filterType, setFilterType] = useState<string>("daily")
  const [cardType, setCardType] = useState<string>("all")
  const query = useQuery<IReportResponse, Error>({
    queryKey: ["profile-reports",filterType, gender, start, end, nationality, cardType, visaType, selectedOfficeId],
    queryFn: async () => await fetchGallery({ filterType, gender, start, end, cardType, visaType, nationality, selectedOfficeId: selectedOfficeId?.join() }),
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
      cardType,
      setCardType,
      visaType,
      setVisaType,
    },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: query.refetch,
  };
};

export default usePeopleReport;