import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { type IVisaType } from "../type";

interface IVisaResponse {
  result: IVisaType[];
  meta: MetaState;
}

const fetchVisa = async ({ paginate }: {
  paginate: boolean;
  districtId?: number
}): Promise<IVisaResponse> => {
  const params: Record<string, unknown> = { paginate };
  const response = await apiClient.get<IVisaResponse>("/visa", {
    params,
  });
  return response;
};

const useVisaCombobox = () => {
  const paginate = false;
  const query = useQuery<IVisaResponse, Error>({
    queryKey: ["visas", paginate],
    queryFn: async () => await fetchVisa({ paginate }),
    placeholderData: (previousData) => previousData,
  });
  const folderData = query.data?.result || [];
  const result = useComboboxMapping(folderData);
  return {
    result,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
  };
};

export default useVisaCombobox;

function useComboboxMapping(folderData: IVisaType[]): Array<{ label: string; value: string | number; }> {
  return folderData.map((item) => ({
    label: `${item.typeCode}`,
    value: item.id,
  }));
}
