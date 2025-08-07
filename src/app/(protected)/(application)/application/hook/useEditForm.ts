/* eslint-disable max-nested-callbacks */
import { useEffect, useState } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { applicationDefaultValues, applicationSchema } from "../container/form/schema";
import { IApplication } from "../type";
import { useOne } from "@/hooks/useOne";
import { buildFormData } from "@/components/containers/form/buildForm";

export interface IApplicationData {
  status: string;
  result: IApplication[];
}
export const useApplicationEditForm = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading: loading } = useOne<IApplication>({ resource: "application", id });
  const application = data?.result ?? null;
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: applicationDefaultValues,
  });

  const [removedFileIds, setRemovedFileIds] = useState<number[]>([]);
  useFormReset({ application, loading, formReset: form.reset, removedFileIds });
  const onSubmit = async (data: z.infer<typeof applicationSchema>) => {
    try {
      const FormData = buildFormData({ data, fieldName: "applicationFile" });
      await apiClient.put<IApplication>(`/application/${id}`, { 
        data: FormData,
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນ" });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["folder"] });
      form.reset();
      router.back();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນ" });
    }
  };
  return { form, onSubmit, setRemovedFileIds };
};

const useFormReset = ({
  application,
  loading,
  formReset,
  removedFileIds,
}: {
  application: IApplication | null,
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof applicationSchema>>,
  removedFileIds: number[],
}) => {
  useEffect(() => {
    const shouldResetForm = application && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<z.infer<typeof applicationSchema>> = {
      profileId: application.profileId,
      folderId: application.folderId,
      positionId: application.positionId,
      companyId: application.companyId ?? 0,
      type: application.type,
      expirationTerm: application.expirationTerm,
      issueDate: application.issueDate,
      visaTypeId: application.visaType.id,
      visaIssuedAt: application.visaIssuedAt,
      visaIssuedDate: application.visaIssuedDate,
      expirationDate: application.expirationDate,
      status: application.status,
      numberId: application.numberId,
      dependBy: application.dependBy,
      villageId: application.villageId ?? 0,
      applicationFile: Array.isArray(application.applicationFile)
        ? application.applicationFile
          .filter((file: any) => !removedFileIds.includes(file.id))
          .map((file: any) => {
            if (file.filePath && typeof file.filePath === "string") {
              return {
                ...file,
                filePath: "",
                preview: file.filePath,
                name: file.name ?? "",
              };
            }
            if (file.filePath instanceof Blob) {
              const newFile = new File([file.filePath], file.name || "document.pdf");
              return {
                ...file,
                filePath: newFile,
                preview: URL.createObjectURL(newFile),
                name: file.name ?? "",
              };
            }
            return {
              ...file,
              filePath: "",
              preview: "",
              name: file.name ?? "",
            };
          })
        : [],
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [application, loading, formReset]);
};

