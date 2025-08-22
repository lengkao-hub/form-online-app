import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import CompanyForm from "../form/form";
import { useCompanyFormDialog } from "../../hook/useForm";

interface AddCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (company: { id: number; name: string }) => void;
}

export function AddCompanyDialog({ open, onOpenChange, onSuccess }: AddCompanyDialogProps ) {
  const { form, onSubmit } = useCompanyFormDialog(onOpenChange);
  const handleSubmit = async (data: any) => {
    const newCompany = await onSubmit(data);
    if (newCompany) {
      onSuccess?.(newCompany);
    }
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="sm:max-w-[425px] p-0 border-none bg-white">
        <CompanyForm form={form} onSubmit={handleSubmit} className="md:grid-cols-1" isDialog={true}/>
      </DialogContent>
    </Dialog>
  )
}