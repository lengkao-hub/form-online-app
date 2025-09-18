import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FolderCardView from "../card"
import { FolderDialogProps, IFolder } from "../../type"
import { useOne } from "@/hooks/useOne"

export function FolderDialog({ folderId, open, onOpenChange }:FolderDialogProps ) {
    const folder = useOne<IFolder>({ resource: "folder", id: Number(folderId) })
    console.log(folder)
    return (
        <Dialog>
                <DialogContent className="sm:max-w-[425px]">
                    {/* {folder && (
                        <FolderCardView folder={folder} status="FINANCE_UNDER_REVIEW" key={folder} action={{ editText: "ແກ້ໄຂ", statusText: "ສົ່ງເອກກະສານ", showDetail: "ລາຍລະອຽດ", edit: "ແກ້ໄຂ" }} />
                    )} */}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
        </Dialog>
    )
}
