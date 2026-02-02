import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { queryClient } from "@/lib/interface";
import { useRouter } from "next/navigation";

const useEditStatus = () => {
  const router = useRouter(); // ຍ້າຍ hook ເຂົ້າໄປ

  const editStatus = async ({
    id,
    status,
    reason,
  }: {
    id: number;
    status: string;
    reason?: string;
  }) => {
    const data = { status, content: reason };
    try {
      await apiClient.put(`profile-status/${id}`, { data }); 
      showToast({
        type: "success",
        title: "ແກ້ໄຂຂໍ້ມູນຫ້ອບຸກຄົນສໍາເລັດ",
      });
      queryClient.invalidateQueries({ queryKey: ["folder"] });
      router.back();
    } catch (error: any) {
      
      // eslint-disable-next-line no-console
      console.error("Edit status error:", error?.response?.data || error);
      showToast({
        type: "error",
        title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນບຸກຄົນໄດ້",
      });
    }
  };

  return { editStatus };
};

export default useEditStatus;