/* eslint-disable max-depth */
import { appendObjectFields, buildFormData } from "@/components/containers/form/buildForm";
import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { defaultValues, profileFormSchema } from "../container/form/schema";
import { type IProfile } from "../type";
import { getRoleUser } from "@/lib/auth/getRoleUser";
export const useProfileForm = ({ handleReset, handleResetForm }: { handleReset: () => void, handleResetForm: () => void }) => {
  const queryClient = useQueryClient();
  const { id } = getRoleUser();
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange", // ✅ validate ທຸກຄັ້ງທີ່ປ້ອນ
    reValidateMode: "onChange", // ✅ revalidate ໃໝ່ທຸກຄັ້ງທີ່ປ້ອນ
    defaultValues,
  });
  const onSubmit = async (data: any) => {
    try {
      // const formData = buildFormData({ data, fieldName: "refundImage" });
      console.log("📦 Submitted Data ===> ", data);
      console.log("📦 Submitted Data ===> ", data.image);

      const formData = new FormData();
      appendObjectFields({ formData, data, excludeKeys: ["image"] });
      if (data.image instanceof File) {
        console.log("📦 Image File ===> ", data.image);
        formData.append("image", data.image);
      }
      if (data.oldImage instanceof File) {
        formData.append("oldImage", data.oldImage);
      }
      await apiClient.post<IProfile>("/profile-of-customer", {
        data: formData, 
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
      form.reset();
      showToast({ type: "success", title: "ລົງທະບຽນບຸກຄົນໃໝ່ສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      form.setValue("phoneNumber", data.phoneNumber);
      form.setValue("overseasProvince", data.overseasProvince);
      form.setValue("identityIssueDate", data.identityIssueDate);
      form.setValue("identityExpiryDate", data.identityExpiryDate);
      form.setValue("identityType", data.identityType);
      form.reset();
      handleResetForm();
      handleReset();
    } catch (error: any) {
      showToast({ type: "error", title: "ບໍ່ສາມາດລົງທະບຽນບຸກຄົນໃໝ່ໄດ້" });
      if (error.data.identityNumber || error.data.identityType) {
        form.setError("identityNumber", {
          type: "manual",
          message: `${error.data.identityNumber}`,
        });
        form.setError("identityType", {
          type: "manual",
          message: `${error.data.identityType}`,
        });
      }
    }
  };
  return { form, onSubmit };
};

interface ProfileResponse {
  status: string,
  message: string,
  result: IProfile
}

export const useQuickProfileForm = ({
  handleNext,
  handleGotoStep,
  setCount,
  setRegistered,
  currentCount,
}: {
  handleNext: () => void;
  handleGotoStep: (stepNumber: number) => void;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setRegistered: React.Dispatch<React.SetStateAction<number>>;
  currentCount: number;
}) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof profileFormSchema>>({
    defaultValues,
    resolver: zodResolver(profileFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    try {
      const { identityNumber, identityType } = data;
      const checkResponse: any = await apiClient.post("/profile-check-existence", {
        data: { identityNumber, identityType },
      });
      if (checkResponse?.data?.identityExists) {
        return;
      }
      const formData = new FormData();
      appendObjectFields({ formData, data, excludeKeys: ["image", "oldImage"] });
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      if (data.oldImage instanceof File) {
        formData.append("oldImage", data.oldImage);
      }
      const { result } = await apiClient.post<ProfileResponse>("/profile", {
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });

      // save profiles
      const savedIds = localStorage.getItem("profileIds");
      let profileIds: number[] = [];

      if (savedIds) {
        try {
          profileIds = JSON.parse(savedIds);
          if (!Array.isArray(profileIds)) {
            profileIds = []
          }
        } catch {
          profileIds = [];
        }
      }

      // push id and save to localStorage
      profileIds.push(result.id);
      localStorage.setItem("profileIds", JSON.stringify(profileIds));

      await setCount((prev) => prev - 1);
      await setRegistered((prev) => prev + 1);

      showToast({ type: "success", title: "ລົງທະບຽນບຸກຄົນໃໝ່ສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      if (currentCount > 1) {
        form.reset();
        form.setValue("phoneNumber", data.phoneNumber);
        form.setValue("overseasProvince", data.overseasProvince);
        form.setValue("identityIssueDate", data.identityIssueDate);
        form.setValue("identityExpiryDate", data.identityExpiryDate);
        form.setValue("identityType", data.identityType);
        handleGotoStep(2)
      } else {
        handleNext();
      }
    } catch (error: any) {
      showToast({ type: "error", title: "ບໍ່ສາມາດລົງທະບຽນບຸກຄົນໃໝ່ໄດ້" });
      if (error.data.identityNumber || error.data.identityType) {
        form.setError("identityNumber", {
          type: "manual",
          message: `${error.data.identityNumber}`,
        });
        form.setError("identityType", {
          type: "manual",
          message: `${error.data.identityType}`,
        });
      }
    }
  };
  return { form, onSubmit };
};

