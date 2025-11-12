/* eslint-disable max-depth */
import { appendObjectFields } from "@/components/containers/form/buildForm";
import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { defaultValues, profileFormSchema } from "../container/form/schema";
import { type IProfile } from "../type";
export const useProfileForm = ({ handleReset, handleResetForm }: { handleReset: () => void, handleResetForm: () => void }) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange", // ✅ validate ທຸກຄັ້ງທີ່ປ້ອນ
    reValidateMode: "onChange", // ✅ revalidate ໃໝ່ທຸກຄັ້ງທີ່ປ້ອນ
    defaultValues,
  });
  const onSubmit = async (rawData: any) => {
    try {
      const dataItems = Array.isArray(rawData) ? rawData : [rawData]
      const formData = new FormData()

      // Send customers without images
      formData.append(
        "customers",
        JSON.stringify(
          dataItems.map((data) => {
            const dataWithoutImage = { ...data }
            delete dataWithoutImage.image
            return dataWithoutImage
          }),
        ),
      )
      dataItems.forEach((data, index) => {
        if (data.image) {
          formData.append(`image_${index}`, data.image) // image_0, image_1, image_2
        }
      })

      // Debug logging
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`🖼️ ${key}:`, value.name, `(${(value.size / 1024).toFixed(2)} KB)`)
        } else {
          console.log(`📝 ${key}:`, value)
        }
      }

      await apiClient.post("/profile-of-customer", {
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })

      showToast({ type: "success", title: "ລົງທະບຽນສຳເລັດ" })
    } catch (error: any) {
      console.error("❌", error)
      showToast({ type: "error", title: "ບໍ່ສາມາດລົງທະບຽນໄດ້" })
    }
  }
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

