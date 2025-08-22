import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import DistrictForm from "./form/form";
import { useVillageFormDialog } from "../hook/useForm";

interface AddVillageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (village: { id: number; villageLao: string }) => void;
}

export function AddVillageDialog({ open, onOpenChange, onSuccess }: AddVillageDialogProps ) {
  const { form, onSubmit } = useVillageFormDialog(onOpenChange);
  const handleSubmit = async (data: any) => {
    const response:any = await onSubmit(data);
    const newVillage = response?.result;
    if (newVillage) {
      onSuccess?.(newVillage);
    }

    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="sm:max-w-[425px] p-0 border-none">
        <DistrictForm form={form} onSubmit={handleSubmit} className="md:grid-cols-1 "/>
      </DialogContent>
    </Dialog>
  )
}
