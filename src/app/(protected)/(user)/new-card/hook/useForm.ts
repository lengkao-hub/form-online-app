import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";

import { formDefaultValues, formSchema } from "../container/schema";
import { appendObjectFields } from "@/components/containers/form/buildForm";
export const useFolderForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: any[]) => {
    try {
      // console.log("Form Data:", data); // ເພີ່ມການ log ຂໍ້ມູນເພື່ອ debug
      const params = { status: "PENDING" };
      const formData = new FormData();
      appendObjectFields({ formData, data, excludeKeys: ["file"] });

      const processItemFiles = (item: any, index: number, formData: FormData) => {
        if (!item.file || item.file.length === 0) {
          return;
        }

        for (const file of item.file) {
          formData.append("file", file);
          formData.append("fileRecordIndex", String(index));
        }
      };

      // ດຽວນີ້ມີແຕ່ 1 ຊັ້ນເທົ່ານັ້ນ! ✅
      for (let index = 0; index < data.length; index++) {
        processItemFiles(data[index], index, formData);
      }
      await apiClient.put("/new-card", {
        data: formData,
        config: { params, headers: { "Content-Type": "multipart/form-data" } },
      });
      showToast({ type: "success", title: "ສ້າງແຟ້ມເອກກະສານສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      form.reset();
      return true;
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      if (axiosError?.data?.message === "Office not found") {
        form.setError("root", { type: "manual", message: "ທ່ານບໍ່ໄດ້ ບັນຈຸຢູ່ສາຂາໃດ" })
      }
      showToast({ type: "error", title: "ບໍ່ສາມາດສ້າງແຟ້ມເອກກະສານ" });
    }
  };
  return { form, onSubmit };
};

// export const useFolderRejectForm = ({ folderId, setDialogOpen }: { setDialogOpen: (open: boolean) => void, folderId: number }) => {
//   const queryClient = useQueryClient();
//   const form = useForm<RejectFormSchemaType>({
//     defaultValues: rejectFormDefaultValues,
//     resolver: zodResolver(rejectFormSchema),
//   });
//   const { data } = useSession()
//   const userRole = data?.user.role === "FINANCE"
//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (data: RejectFormSchemaType) => {
//     try {
//       setIsLoading(true);
//       await apiClient.post<IFolder>("/folder-reject", { data });
//       await apiClient.patch(`/folder/${folderId}/progress`, { data: { status: userRole ? "REJECTED" : "REJECTED_BY_COMMANDER" } });
//       showToast({ type: "success", title: "ສົ່ງແຟ້ມກັບຄືນສໍາເລັດ" });
//       queryClient.invalidateQueries({ queryKey: ["folders"] });
//       queryClient.invalidateQueries({ queryKey: ["folder-aggregation"] });
//       form.reset();
//       setDialogOpen(false);
//     } catch {
//       showToast({ type: "error", title: "ບໍ່ສາມາດສົ່ງແຟ້ມກັບຄືນສໍາເລັດ" });
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return { form, onSubmit, isLoading };
// };
