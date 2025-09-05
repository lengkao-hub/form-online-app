import showToast from "@/components/containers/show-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { companyQuickDefaultValues, companyQuickFormSchema } from "../container/form/schema";
import z from "zod";

export const useQuickForm = ({ handleNext, setCount }: { 
  handleNext: () => void, 
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const form = useForm<z.infer<typeof companyQuickFormSchema>>({
    defaultValues: companyQuickDefaultValues,
    resolver: zodResolver(companyQuickFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof companyQuickFormSchema>) => {
    const { companyId, count } = data;
    try {
      if (companyId > 0) {
        setCount(Number(count))
        localStorage.setItem("profileIds", JSON.stringify([]));
        localStorage.setItem("companyId", String(companyId));
        form.reset();
        handleNext();
      }
    } catch {
      showToast({ type: "error", title: "ລະບົບຂັດຂ້ອງ" });
    }
  };
  return { form, onSubmit };
};