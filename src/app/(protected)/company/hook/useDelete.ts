import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { type ICompany } from "../type";

export interface ICompanyData {
  status: string;
  result: ICompany[];
}

export const useDelete = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const onSubmit = async () => {
    setLoading(true);
    try {
      await apiClient.patch(`/company/${id}/status`, { data: {} });
      showToast({
        type: "success",
        title: "ແກ້ໄຂຂໍ້ມູນສໍາເລັດ",
      });
      queryClient.invalidateQueries({ queryKey: ["company-aggregation"] });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    } catch {
      showToast({
        type: "error",
        title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນ",
      });
    } finally {
      setLoading(false);
    }
  };
  return { onSubmit, loading };
};