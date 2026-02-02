import showToast from "@/components/containers/show-toast";
import { apiClient, type ApiResponse } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { blacklistDefaultValues, blacklistFormCreateSchema, type BlacklistFormCreateType, checkBlacklistFormSchema, defaultValues } from "../container/form/schema";
import { useState } from "react";
import { IFoundResponse } from "../type";
import { IProfile } from "../../profile/type";

export const useBlacklistProfileForm = ({ handleNext }: { handleNext: () => void }) => {
  const form = useForm<z.infer<typeof checkBlacklistFormSchema>>({
    defaultValues,
    resolver: zodResolver(checkBlacklistFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof checkBlacklistFormSchema>) => {
    try { 
      const response = await apiClient.get<ApiResponse<string>>("https://bn.l-itlaos.com/backlist-check", { params: data });
      if (response.status === "exists" || response.status === "blacklisted") {
        form.setError("root", { type: "manual", message: response.message });
      }
 
      // ສ່ວນນີ້ແມ່ນ check ບຸນຄົນໃນລະບົບວ່າມີຢູ່ແລ້ວບໍ່ 
      // const checkResponse: any = await apiClient.post("/profile-check-existence", {
      //   data: { identityNumber, identityType },
      // });
      // if (checkResponse?.identityExists) {
      //   form.setError("identityNumber", {
      //     type: "manual",
      //     message: `${checkResponse?.identityNumber}`,
      //   });
      //   form.setError("identityType", {
      //     type: "manual",
      //     message: `${checkResponse?.identityType}`,
      //   });
      //   return;
      // }
      if (response.status === "ok") {
        handleNext();
      }
    } catch {
      showToast({ type: "error", title: "ລະບົບຂັດຂ້ອງ" });
    }
  };
  return { form, onSubmit };
};

export const useQuickBlacklistProfileForm = ({ 
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
  const [foundProfile, setFoundProfile] = useState<IProfile | undefined>();
  const form = useForm<z.infer<typeof checkBlacklistFormSchema>>({
    defaultValues,
    resolver: zodResolver(checkBlacklistFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof checkBlacklistFormSchema>) => {
    try {
      const { identityNumber, identityType } = data;
      const response = await apiClient.get<ApiResponse<string>>("/backlist-check", { params: data });
      if (response.status === "exists" || response.status === "blacklisted") {
        form.setError("root", { type: "manual", message: response.message });
      }
      const checkResponse = await apiClient.post<IFoundResponse>("/profile-check-existence", {
        data: { identityNumber, identityType },
      });
      if (checkResponse?.identityExists) {
        setFoundProfile(checkResponse.data)
        form.setError("identityNumber", {
          type: "manual",
          message: `${checkResponse?.identityNumber}`,
        });
        form.setError("identityType", {
          type: "manual",
          message: `${checkResponse?.identityType}`,
        });
        return;
      }
      handleNext();
    } catch {
      showToast({ type: "error", title: "ລະບົບຂັດຂ້ອງ" });
    }
  };
  const addProfile = async() => {
    if (!foundProfile) {
      return;
    }
    const savedIds = localStorage.getItem("profileIds");
    const profileIds: number[] = savedIds ? JSON.parse(savedIds) : [];
    // add current profile id if not exist
    if (!profileIds.includes(foundProfile.id)) {
      profileIds.push(foundProfile.id);
    }
    localStorage.setItem("profileIds", JSON.stringify(profileIds));
    await setCount((prev) => prev - 1);
    await setRegistered((prev) => prev + 1);
    setFoundProfile(undefined);
    if (profileIds.length < currentCount) {
      handleGotoStep(2);
    } else {
      handleGotoStep(4);
    }
  };

  const clearProfile = () => setFoundProfile(undefined);
  return { form, onSubmit, foundProfile, addProfile, clearProfile };
};

export const useBlacklistCheck = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof checkBlacklistFormSchema>>({
    defaultValues,
    resolver: zodResolver(checkBlacklistFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof checkBlacklistFormSchema>) => {
    try {
      const { identityNumber, identityType } = data;
      const response = await apiClient.get<ApiResponse<string>>("/backlist-check", { params: data });
      if (response.status === "exists" || response.status === "blacklisted") {
        form.setError("root", { type: "manual", message: response.message });
        setStatusMessage(null)
      } else {
        setStatusMessage("✅ ບຸກຄົນນີ້ບໍ່ໄດ້ຕິດບັນຊີດໍາ");
        form.clearErrors("root");
      }
      const checkResponse: any = await apiClient.post("/profile-check-existence", {
        data: { identityNumber, identityType },
      });
      if (checkResponse?.data?.identityExists) {
        return;
      }
    } catch(error: any) {
      showToast({ type: "error", title: "ລະບົບຂັດຂ້ອງ" });
      if (error.data.identityNumber || error.data.identityType ) {
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
  return { form, onSubmit, statusMessage };
};

export const useBlacklistProfileCreateForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<BlacklistFormCreateType>({
    defaultValues: blacklistDefaultValues,
    resolver: zodResolver(blacklistFormCreateSchema),
  });
  const onSubmit = async (data: BlacklistFormCreateType) => {
    try {
      await apiClient.post("/backlist", { data });
      showToast({ type: "success", title: "ຂື້ນບັນຊີດໍາບຸກຄົນນິ້ສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message || "An unexpected error occurred.";
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};
