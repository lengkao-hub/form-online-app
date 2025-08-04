import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { applicationSchema } from "../container/form/schema";
import { buildFormData } from "@/components/containers/form/buildForm";

export const useApplicationForm = ({ profileId, type ="NEW" }: { profileId: number, type: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const lastFolderId = Number(sessionStorage.getItem("folderId"));
  const lastVisaTypeId = Number(sessionStorage.getItem("visaTypeId"));
  const lastVisaIssuedAt = sessionStorage.getItem("visaIssuedAt");
  const lastVisaIssuedDate = sessionStorage.getItem("visaIssuedDate");
  const lastVisaExpiryDate = sessionStorage.getItem("visaExpiryDate");
  const lastPositionId = Number(sessionStorage.getItem("positionId"));
  const form = useForm<z.infer<typeof applicationSchema>>({
    defaultValues: {
      profileId: 0,
      folderId: lastFolderId || 0,
      positionId: lastPositionId || 0,
      companyId: 0,
      numberId: 0,
      visaTypeId: lastVisaTypeId || 0,
      type,
      expirationTerm: "",
      issueDate: "",
      visaIssuedAt: lastVisaIssuedAt || "",
      visaIssuedDate: lastVisaIssuedDate || "",
      visaExpiryDate: lastVisaExpiryDate || "",
      expirationDate: "",
      status: "DEFAULT",
      applicationFile: [],
    },
    resolver: zodResolver(applicationSchema),
  });
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
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      sessionStorage.setItem("folderId", String(data.folderId));
      sessionStorage.setItem("visaTypeId", String(data.visaTypeId));
      sessionStorage.setItem("visaIssuedAt", String(data.visaIssuedAt));
      sessionStorage.setItem("visaIssuedDate", String(data.visaIssuedDate));
      sessionStorage.setItem("visaExpiryDate", String(data.visaExpiryDate));
      sessionStorage.setItem("positionId", String(data.positionId));
      form.reset({
        folderId: data.folderId,
        visaTypeId: data.visaTypeId,
        visaIssuedAt: data.visaIssuedAt,
        visaIssuedDate: data.visaIssuedDate,
        visaExpiryDate: data.visaExpiryDate,
        positionId: data.positionId,
      });
      router.back();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດອອກບັດໃຫມ່" });
    }
  };
  useUpdateDefaultValues({ form, fieldName: "profileId", value: profileId, shouldUpdate: true });
  return { form, onSubmit };
};

const useUpdateDefaultValues = ({ form, fieldName, value, shouldUpdate }: any) => {
  const valueRef = useRef(value);
  useEffect(() => {
    if (shouldUpdate) {
      form.setValue(fieldName, value);
      valueRef.current = value;
    }
  }, [value, fieldName, form.setValue, shouldUpdate]);
};
