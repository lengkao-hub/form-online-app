import { useEffect } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { defaultValues, visaFormSchema } from "../container/form/schema";
import { useOne } from "@/hooks/useOne";
import { IVisaType } from "../../visa/type";

export interface IVisaData {
  status: string;
  result: IVisaType[];
}
export const useVisaEditForm = ({ id, onOpenChange }: { id: number, onOpenChange: (open: boolean) => void }) => {
  const queryClient = useQueryClient();
  const { data, isLoading: loading } = useOne<IVisaType>({ resource: "visa", id });
  const visa = data?.result ?? null;
  const form = useForm<z.infer<typeof visaFormSchema>>({
    resolver: zodResolver(visaFormSchema),
    defaultValues,
  });
  useFormReset({ visa, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof visaFormSchema>) => {
    try {
      await apiClient.put<IVisaType>(`/visa/${id}`, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູບ້ານສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["visas"] });
      onOpenChange(false);
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນບ້ານໄດ້" });
    }
  };
  return { form, onSubmit };
};

const useFormReset = ({
  visa,
  loading,
  formReset,
}: {
  visa: IVisaType | null;
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof visaFormSchema>>
}) => {
  useEffect(() => {
    const shouldResetForm = visa && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<z.infer<typeof visaFormSchema>> = {
      typeCode: visa.typeCode,
      description: visa.description,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [visa, loading, formReset]);
};

