import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { type IProfile } from "../type";

interface ICompanyResponse {
  result: IProfile[];
  meta: MetaState;
}

const fetchProfile = async ({ paginate, status }: {
  paginate: boolean;
  status?: string;
}): Promise<ICompanyResponse> => {
  const params: Record<string, unknown> = { paginate };
  if (status) {
    params.status = status;
  }
  // }
  const response = await apiClient.get<ICompanyResponse>("/profile", {
    params,
  });
  return response;
};

const useProfileCombobox = (status?: string) => { 
  const paginate = false;
  const query = useQuery<ICompanyResponse, Error>({
    queryKey: ["companies"],
    queryFn: async () => await fetchProfile({ paginate, status }),
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

export default useProfileCombobox;

function useComboboxMapping(folderData: IProfile[]): Array<{ label: string; value: string | number; }> {
  return folderData.map((item) => ({
    label: `${item.firstName}`,
    value: JSON.stringify({
      id: item.id,
      firstName: item.firstName,
    }),
  }));
}
