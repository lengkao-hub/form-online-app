import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { usePositionFormDialog } from "../../hook/useForm";
import PositionForm from "../form/form";

interface AddPositionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (company: { id: number; englishName: string, laoName: string }) => void;
}

export function AddPositionDialog({ open, onOpenChange, onSuccess }: AddPositionDialogProps ) {
  const { form, onSubmit } = usePositionFormDialog(onOpenChange);
  const handleSubmit = async (data: any) => {
    const newPosition = await onSubmit(data);
    if (newPosition) {
      onSuccess?.(newPosition);
    }
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="sm:max-w-[425px] p-0 border-none bg-white">
        <PositionForm form={form} onSubmit={handleSubmit} className="md:grid-cols-1"/>
      </DialogContent>
    </Dialog>
  )
}