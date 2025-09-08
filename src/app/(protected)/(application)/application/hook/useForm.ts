import { useForm } from "react-hook-form";
import type * as z from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { applicationSchema } from "../container/form/schema";
import { buildFormData } from "@/components/containers/form/buildForm";
import { useUpdateDefaultValues } from "@/lib/update-default-values";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ApplicationProps { 
  profileId: number, 
  type: string, 
  isQuick?: boolean 
}

export const useApplicationForm = ({ profileId, type ="NEW" }:ApplicationProps ) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const lastFolderId = Number(sessionStorage.getItem("folderId"));
  const lastVisaTypeId = Number(sessionStorage.getItem("visaTypeId"));
  const lastVisaIssuedAt = sessionStorage.getItem("visaIssuedAt");
  const lastVisaIssuedDate = sessionStorage.getItem("visaIssuedDate");
  const lastPositionId = Number(sessionStorage.getItem("positionId"));
  const form = useForm<z.infer<typeof applicationSchema>>({
    defaultValues: {
      profileId: 0,
      folderId: lastFolderId || 0,
      positionId: lastPositionId || 0,
      companyId: profileId || 0,
      numberId: 0,
      visaTypeId: lastVisaTypeId || 0,
      type,
      expirationTerm: "",
      issueDate: "",
      visaIssuedAt: lastVisaIssuedAt || "",
      visaIssuedDate: lastVisaIssuedDate || "",
      visaNumber: "",
      expirationDate: "",
      status: "DEFAULT",
      applicationFile: [],
    },
    resolver: zodResolver(applicationSchema),
  });
  useUpdateDefaultValues({ form, fieldName: "profileId", value: profileId, shouldUpdate: true });
  const onSubmit = async (data: z.infer<typeof applicationSchema>) => {
    try {
      const FormData = buildFormData({ data, fieldName: "applicationFile" });
      await apiClient.post("/application", { 
        data: FormData,
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
      showToast({ type: "success", title: "ອອກບັດໃຫມ່ສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["numbers"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      sessionStorage.setItem("folderId", String(data.folderId));
      sessionStorage.setItem("visaTypeId", String(data.visaTypeId));
      sessionStorage.setItem("visaIssuedAt", String(data.visaIssuedAt));
      sessionStorage.setItem("visaIssuedDate", String(data.visaIssuedDate));
      // sessionStorage.setItem("visaExpiryDate", String(data.visaExpiryDate));
      sessionStorage.setItem("positionId", String(data.positionId));
      form.reset({
        folderId: data.folderId,
        visaTypeId: data.visaTypeId,
        visaIssuedAt: data.visaIssuedAt,
        visaIssuedDate: data.visaIssuedDate,
        // visaExpiryDate: data.visaExpiryDate,
        positionId: data.positionId,
      });
      router.back();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດອອກບັດໃຫມ່" });
    }
  };
  return { form, onSubmit };
};

export const useQuickApplicationForm = ({ profileId, type = "NEW" }: ApplicationProps) => {
  const queryClient = useQueryClient();
  const lastFolderId = Number(sessionStorage.getItem("folderId"));
  const lastVisaTypeId = Number(sessionStorage.getItem("visaTypeId"));
  const lastVisaIssuedAt = sessionStorage.getItem("visaIssuedAt");
  const lastVisaIssuedDate = sessionStorage.getItem("visaIssuedDate");
  const lastPositionId = Number(sessionStorage.getItem("positionId"));

  const form = useForm<z.infer<typeof applicationSchema>>({
    defaultValues: {
      profileId,
      folderId: lastFolderId || 0,
      positionId: lastPositionId || 0,
      companyId: profileId,
      numberId: 0,
      visaTypeId: lastVisaTypeId || 0,
      type,
      expirationTerm: "",
      issueDate: "",
      visaIssuedAt: lastVisaIssuedAt || "",
      visaIssuedDate: lastVisaIssuedDate || "",
      visaNumber: "",
      expirationDate: "",
      status: "DEFAULT",
      applicationFile: [],
    },
    resolver: zodResolver(applicationSchema),
  });

  useEffect(() => {
    form.setValue("profileId", profileId);
    form.setValue("companyId", profileId);
  }, [profileId]);

  const onSubmit = async (data: z.infer<typeof applicationSchema>) => {
    try {
      const FormData = buildFormData({ data, fieldName: "applicationFile" });
      await apiClient.post("/application", {
        data: FormData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
      showToast({ type: "success", title: "ອອກບັດໃຫມ່ສໍາເລັດ" });

      queryClient.invalidateQueries({ queryKey: ["numbers"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });

      sessionStorage.setItem("folderId", String(data.folderId));
      sessionStorage.setItem("visaTypeId", String(data.visaTypeId));
      sessionStorage.setItem("visaIssuedAt", String(data.visaIssuedAt));
      sessionStorage.setItem("visaIssuedDate", String(data.visaIssuedDate));
      sessionStorage.setItem("positionId", String(data.positionId));

      // reset form แต่เก็บ profileId ปัจจุบัน
      form.reset({
        ...data,
        profileId,
        companyId: profileId,
      });
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດອອກບັດໃຫມ່" });
    }
  };

  return { form, onSubmit };
};