import { useRouter } from "next/navigation";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { defaultValues, positionFormSchema } from "../container/form/schema";
import { type IPosition } from "../type";

export const usePositionForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof positionFormSchema>>({
    defaultValues,
    resolver: zodResolver(positionFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof positionFormSchema>) => {
    try {
      await apiClient.post<IPosition>("/position", { data });
      showToast({ type: "success", title: "ສ້າງຕຳແໜ່ງ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດຕຳແໜ່ງ" });
    }
  };
  return { form, onSubmit };
};

export const usePositionFormDialog = (onOpenChange: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof positionFormSchema>>({
    defaultValues,
    resolver: zodResolver(positionFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof positionFormSchema>) => {
    try {
      const response = await apiClient.post<{
        status: string;
        message: string;
        result: IPosition;
      }>("/position", { data });
      showToast({ type: "success", title: "ສ້າງຕຳແໜ່ງ" });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      onOpenChange(false);
      return response.result;
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດເພີ່ມຫົວໜ່ວຍທຸລະກິດ" });
    }
  };
  return { form, onSubmit };
};