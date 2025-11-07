import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { queryClient } from "@/lib/interface"; 

const useEditStatus = async ({ id, status, reason }: { id: number; status: string; reason?: string }) => {
    const data = { status, content: reason }
    try {
        const statuss =await apiClient.put(`profile-status/${id}`, {data:{status}});
        console.log("Edit status success", statuss);
        showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນຫ້ອບຸກຄົນສໍາເລັດ" });
        queryClient.invalidateQueries({ queryKey: ["folder"] });
         
    } catch (error: any) {
        console.error("Edit status error:", error?.response?.data || error);
        showToast({ type: "error", title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນບຸກຄົນໄດ້" });
    }
};

export default useEditStatus;