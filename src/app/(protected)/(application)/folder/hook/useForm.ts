import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReset } from "react-hook-form";
import { use, useEffect } from "react";
import type * as z from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";

import { formDefaultValues, formSchema, rejectFormDefaultValues, rejectFormSchema, RejectFormSchemaType } from "../container/schema";
import { type IFolder } from "../type";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { P } from "framer-motion/dist/types.d-D0HXPxHm";
export const useFolderForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [poPup, setPoPup] = useState(false)
  // useEffect(() => {
  //   console.log("poPup=========================>", poPup);
  // }, [poPup]);
  const [data, setData] = useState<IFolder | null>(null);
  useEffect(() => {
    console.log("poPup=========================>", data);
  }, [data]);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await apiClient.post<IFolder>("/folder", { data });
      const folder = (response as any)?.data?.result ?? (response as any)?.result ?? null;
      if (folder) {
        setPoPup(true)
        const folderData = fetchFolderById(folder.id);
        setData(await folderData);
      }
      showToast({ type: "success", title: "ສ້າງແຟ້ມເອກກະສານສໍາເລັດ" });
      // queryClient.invalidateQueries({ queryKey: ["folders"] });
      // form.reset();
      // router.back();
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      if (axiosError?.data?.message === "Office not found") {
        form.setError("root", { type: "manual", message: "ທ່ານບໍ່ໄດ້ ບັນຈຸຢູ່ສາຂາໃດ" })
      }
      showToast({ type: "error", title: "ບໍ່ສາມາດສ້າງແຟ້ມເອກກະສານ" });
    }
  };
  return { form, poPup, onSubmit, data, };
};
 const fetchFolderById = async (id: number): Promise<IFolder | null> => {
    try {
      const resp = await apiClient.get<{ result: IFolder }>(`/folder/${id}`);
      return (resp as any)?.data?.result ?? (resp as any)?.result ?? null;
    } catch (e) {
      console.error("fetchFolderById error", e);
      return null;
    }
  };

export const useFolderRejectForm = ({ folderId, setDialogOpen }: { setDialogOpen: (open: boolean) => void, folderId: number }) => {
  const queryClient = useQueryClient();
  const form = useForm<RejectFormSchemaType>({
    defaultValues: rejectFormDefaultValues,
    resolver: zodResolver(rejectFormSchema),
  });
  const { data } = useSession()
  const userRole = data?.user.role === "FINANCE"
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: RejectFormSchemaType) => {
    try {
      setIsLoading(true);
      await apiClient.post<IFolder>("/folder-reject", { data });
      await apiClient.patch(`/folder/${folderId}/progress`, { data: { status: userRole ? "REJECTED" : "REJECTED_BY_COMMANDER" } });
      showToast({ type: "success", title: "ສົ່ງແຟ້ມກັບຄືນສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["folder-aggregation"] });
      form.reset();
      setDialogOpen(false);
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດສົ່ງແຟ້ມກັບຄືນສໍາເລັດ" });
    } finally {
      setIsLoading(false);
    }
  };
  return { form, onSubmit, isLoading };
};
const resetFormValues = (
  folder: IFolder | null,
  formReset: UseFormReset<z.infer<typeof formSchema>>,
) => {
  if (!folder) {
    return
  }
  const formValues = {
    id: folder.id,
    name: folder.name,
    companyId: folder.companyId,
    billDate: folder.billDate,
    billNumber: folder.billNumber,
    folderPrice: folder.folderPrice?.map((price) => ({
      amount: price.amount,
      priceId: price.priceId,
    })) ?? [],
  };
  console.log("formValues=========================>", formValues);

  formReset(formValues, { keepErrors: false });
};
