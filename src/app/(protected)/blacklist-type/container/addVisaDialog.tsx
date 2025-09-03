import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import DistrictForm from "./form/form";
import { useVisaFormDialog } from "../hook/useForm";
import { useVisaEditForm } from "../hook/useEditForm";

interface AddVisaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit?: boolean;
  id?: number;
}

export function AddVisaDialog({ open, onOpenChange, isEdit = false, id }: AddVisaProps ) {
  const { form, onSubmit } = (isEdit && id) ? useVisaEditForm({ id, onOpenChange }) : useVisaFormDialog(onOpenChange);
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="sm:max-w-[425px] p-0 border-none">
        <DistrictForm form={form} onSubmit={onSubmit} className="md:grid-cols-1 "/>
      </DialogContent>
    </Dialog>
  )
}
