
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import FolderCardView from "../card"
import { FolderDialogProps, IFolder } from "../../type"
import { useOne } from "@/hooks/useOne"
import { useEffect, useState } from "react"
export function FolderDialog({ folderId, open, onOpenChange }:FolderDialogProps ) {
  const [folder, setFolder] = useState<IFolder | null>(null);
  const { data } = useOne<any>({ resource: "folder", id: Number(folderId) })
  useEffect(() => {
    if (data && data.result) {
      setFolder(data.result);
    }
  }, [data])
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {folder && (
          <FolderCardView folder={folder} status="FINANCE_UNDER_REVIEW" key={folder.id} onOpenChange={onOpenChange} action={{ editText: "ແກ້ໄຂ", statusText2: "ສົ່ງເອກກະສານ", showDetail: "ລາຍລະອຽດ", edit: "ແກ້ໄຂ" }} />
        )}
      </DialogContent>
    </Dialog>
  )
}
