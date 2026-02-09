import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";  
import { INationality } from "../type";

interface IProvinceResponse {
  result: INationality[];
  meta: MetaState;
}

const fetchNationality = async ({ paginate }: {
  paginate: boolean;
}): Promise<IProvinceResponse> => {
  const params: Record<string, unknown> = { paginate };
  const response = await apiClient.get<IProvinceResponse>("https://api.l-itlaos.com/nationality", {
    params,
  });
  return response;
};

const useNationalitiesCombobox = ({ isNationality }:{ isNationality?:boolean }) => {
  const paginate = false;
  const query = useQuery<IProvinceResponse, Error>({
    queryKey: ["nationality", paginate],
    queryFn: async () => await fetchNationality({ paginate }),
    placeholderData: (previousData) => previousData,
  });
  const folderData = query.data?.result || []; 
  const result = useComboboxMapping( folderData, isNationality );
  return {
    result,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
  };
};

export default useNationalitiesCombobox;

function useComboboxMapping(folderData: INationality[], isNationality?:boolean ): Array<{ label: string; value: string | number; }> {
  return folderData.map((item) => ({
    label: isNationality ? `${item.name} (${item.nationality}) - ${item.code}` :`${item.code}`,
    value: item.id,
  }));
}
