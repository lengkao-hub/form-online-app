import { Form } from "@/components/containers/form"
import { Button } from "@/components/ui"
import {
  Dialog,
  // DialogClose,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  // DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUploadFile } from "../../hook/useUploadFile"
import { useState } from "react"

export function DocsDialog({ filePath, onClose }:{ filePath: string, onClose: () => void }) {
  return (
    <Dialog open onOpenChange={onClose} >
      <DialogContent className="sm:max-w-full p-0">
        <div className="grid gap-2">
          <iframe src={filePath} width={'100%'} className="h-[99vh] rounded-lg"></iframe>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function UploadDocsDialog({ applicationId }:{ applicationId: number }) {
  const { form, onSubmit: originalOnSubmit } = useUploadFile(Number(applicationId))
  const [open, setOpen] = useState(false)
  const onSubmit = async (data: any) => {
    await originalOnSubmit(data)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">ອັບໂຫຼດ</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <Form formInstance={form} onSubmit={onSubmit} title="ອັບໂຫຼດໃບຄໍາຮ້ອງ"
        >
          <Form.Field name="applicationFile" control={form.control} label="ອັບໂຫຼດເອກະສານ" required={false}>
            <Form.Input.File name="applicationFile" control={form.control} />
          </Form.Field>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

