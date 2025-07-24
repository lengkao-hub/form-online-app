import { useRouter } from "next/navigation";
import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { defaultValues, visaFormSchema } from "../container/form/schema";
import { type IVisaType } from "../type";

export const useVisaForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof visaFormSchema>>({
    defaultValues,
    resolver: zodResolver(visaFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof visaFormSchema>) => {
    try {
      await apiClient.post<IVisaType>("/visa", { data });
      showToast({ type: "success", title: "ສ້າງສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["visas"] });
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດສ້າງໄດ້" });
    }
  };
  return { form, onSubmit };
};
export const useVisaFormDialog = (onOpenChange: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof visaFormSchema>>({
    defaultValues,
    resolver: zodResolver(visaFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof visaFormSchema>) => {
    try {
      await apiClient.post<IVisaType>("/visa", { data });
      showToast({ type: "success", title: "ສ້າງສໍາເລັດ" });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["visas"] });
      onOpenChange(false);
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດສ້າງໄດ້" });
    }
  };
  return { form, onSubmit };
};
