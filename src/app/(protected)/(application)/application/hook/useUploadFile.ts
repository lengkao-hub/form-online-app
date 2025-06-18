import { useForm } from "react-hook-form";
import type * as z from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { fileUploadSchema } from "../container/form/schema";
import { buildFormData } from "@/components/containers/form/buildForm";

export const useUploadFile = (id: number) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof fileUploadSchema>>({
    defaultValues: {
      applicationFile: [],
    },
    resolver: zodResolver(fileUploadSchema),
  });
  const onSubmit = async (data: z.infer<typeof fileUploadSchema>) => {
    try {
      const FormData = buildFormData({ data, fieldName: "applicationFile" });
      await apiClient.post(`/application/file/${id}`, { 
        data: FormData,
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
      showToast({ type: "success", title: "ອັບໂຫຼດເອກະສານສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: [`application/history/${id}`] });
      form.reset();
    } catch {
      showToast({ type: "error", title: "ການອັບໂຫຼດເອກະສານມີບັນຫາ" });
    }
  };
  return { form, onSubmit };
};
