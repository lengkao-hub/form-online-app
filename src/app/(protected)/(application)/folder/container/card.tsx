/* eslint-disable max-lines */
"use client";
import { BadgeCheck, BadgeDollarSign, CheckCheck, CornerDownLeft, Edit, Folders, MessageSquareX, MoreHorizontal, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, ScrollArea,
  Separator,
} from "@/components/ui";
import { cn } from "@/lib/utils";

import { WarningMessage } from "@/components/containers/warning-message";
import { useFolderProgress } from "../hook/useFolderProgress";
import { FolderCardViewProps, IAction, ProcessStatus, type IFolder } from "../type";
import { formatDate } from "@/lib/format-date";
import RejectCreateForm from "./rejectForm";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function FolderCardView({
  folder,
  action,
  status,
  onOpenChange,
  showReject = false,
  onClick,
}: FolderCardViewProps): JSX.Element {
  const router = useRouter();
  const { data: userRole } = useSession()
  const pathName = usePathname()
  const basePath = pathName.split("/").slice(0, 3).join("/") + "/";
  const isShowing = basePath === "/folder/show/";
  const [folderToStatus, setFolderToStatus] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = (id: number) => {
    router.push(`/folder/edit/${id}`);
  };
  const handleApprove = (id: number) => {
    router.push(`/finance/create/${id}`);
  };
  const handleShowDetail = (id: number) => {
    router.push(`/folder/show/${id}`);
  };
  const DEFAULT_MAX_LENGTH = 20;

  const { onSubmit, loading } = useFolderProgress({ id: folder?.id, status });
  const setFolderToStatus2 = async () => {
    if (!loading) {
      await onSubmit();
      onOpenChange?.(false);
    }
  };
  const truncateText = (text?: string, maxLength: number = DEFAULT_MAX_LENGTH): string => {
    if (!text) {
      return "";
    }
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };
  const { editText = false, statusText = false, statusText2 = false, acceptText = false, approveText = false, reject = false, showDetail = false, application = false, edit = false } = action || {};
  return (
    <div
      key={folder?.id}
      className="motion-preset-slide-down font-black group relative border p-5 rounded-lg shadow-lg motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out transform hover:scale-105 hover:shadow-xl"
    >
      <div className="absolute top-3 right-3">
        {(editText || statusText || acceptText || approveText || reject || showDetail) && (
          <FolderOptionsDropdown
            folder={folder}
            folderId={folder?.id}
            onEdit={handleEdit}
            onApprove={handleApprove}
            handleShowDetail={handleShowDetail}
            action={action}
            onStatus={() => { setFolderToStatus(folder?.id); }}
            showReject={showReject}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
          />
        )}
      </div>
      <div className="flex items-center gap-4">
        <Folders className={cn("w-14 h-14 text-yellow-500")} />
        <div>
          <div className='flex items-center'>
            {isShowing ? (
              <div className="text-xl font-bold">{folder?.name} </div>
            ) : (
              <div className="text-xl font-bold">{truncateText(folder?.name)} </div>
            )}
          </div>
          <div className="flex gap-x-2 text-sm text-gray-500">
            <span>ແຟ້ມເລກທີ: {folder?.code}</span>
            <span>ສ້າງວັນທີ: {formatDate({ date: folder?.createdAt })}</span>
          </div>
          <div className="flex gap-x-2 text-sm text-gray-500">
            <span>ສາຂາ: {folder?.office?.name}</span>
          </div>
          <div className="flex gap-x-2 text-sm text-gray-500">
            <span>{folder?.company?.name}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <ScrollArea className=" h-28 w-full">
          <div className="gap-x-2 text-sm text-gray-500 space-y-2">
            {folder?.folderPrice?.map((item, index) => (
              <div key={index} className="border rounded-lg p-2">
                <div> ປະເພດ: {`${item?.price?.name}`} </div>
                <div className=" flex justify-between">
                  <span className="text-gray-500">{"ລວມຍອດເງິນ:"}</span>
                  <span className="font-medium">{item?.total?.toLocaleString()}</span>
                </div>
                <div className=" flex justify-between">
                  <span className="text-gray-500">{"ລວມຈໍານວນຟອມ:"}</span>
                  <span className="text-gray-500">{item?.amount?.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        {showReject && (
          <div className="gap-x-2 text-sm text-gray-500 space-y-2">
            <div className="border rounded-lg p-2">
              <div> ເຫດຜົນທິ່ສົ່ງ: <span className="text-red-500">{folder.folderReject?.[0]?.comment}</span></div>
            </div>
          </div>
        )}
        <Separator />
        {[
          { label: "ຈໍານວນຟອມ:", value: `${folder?.totalAmount?.toLocaleString()}` },
          { label: "ລວມຍອດເງິນ:", value: `${folder?.totalPrice?.toLocaleString()}` },
        ].map(({ label, value }, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
      <FolderNumbersAccordion folder={folder} />
      <div className="flex gap-1 justify-end items-end">
        {reject && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild >
              <Button
                className="bg-red-700 hover:bg-red-600"
                onClick={(event) => {
                  event.preventDefault()
                  setDialogOpen(true)
                }}
              >
                <CornerDownLeft className="mr-2 h-4 w-4" />
                ຕິກັບ
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <RejectCreateForm folderId={folder.id} setDialogOpen={setDialogOpen} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
        {edit && (
          <div className="flex justify-end">
            <Button
              className="mt-4 flex gap-1"
              onClick={() => handleEdit(folder.id)}
            >
              <Edit size={18} />
              ແກ້ໄຂ
            </Button>
          </div>
        )}
        {statusText && (
          <div className="flex justify-end">
            <Button
              className="mt-4 flex gap-1"
              onClick={() => setFolderToStatus(folder.id)}
            >
              <Send size={18} />
              {userRole?.user.role === "POLICE_COMMANDER_PROVINCE" || userRole?.user.role === "POLICE_COMMANDER" ? "ອະນຸມັດ" : "ສົ່ງ"}
            </Button>
          </div>
        )}
        {statusText2 && (
          <div className="flex justify-end">
            <Button
              className="mt-4 flex gap-1"
              onClick={() => setFolderToStatus2()}
            >
              <Send size={18} />
              ສົ່ງ
            </Button>
          </div>
        )}
        {approveText && (
          <div className="flex justify-end">
            <Button
              className="mt-4 flex gap-1"
              onClick={() => handleApprove(folder.id)}
            >
              <CheckCheck size={18} />
              ຢັ້ງຢືນຮັບເງິນ
            </Button>
          </div>
        )}
        {(acceptText) && (
          <div className="flex justify-end">
            <Button
              className="mt-4 flex gap-1"
              onClick={() => setFolderToStatus(folder.id)}
            >
              <CheckCheck size={18} />
              ຮັບເອກກະສານ
            </Button>
          </div>
        )}
        {(application) && (
          <div className="flex justify-end">
            <Button
              className="mt-4 flex gap-1"
              onClick={onClick}
            >
              <CheckCheck size={18} />
              ລົງທະບຽນດ່ວນ
            </Button>
          </div>
        )}
      </div>
      {
        folderToStatus && (
          <StatusConfirmationDialog
            isOpen={!!folderToStatus}
            onClose={() => { setFolderToStatus(null); }}
            folder={folder}
            status={status}
          />
        )
      }
    </div >
  );
}

function FolderNumbersAccordion({ folder }: { folder: IFolder }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>ສະແດງຟອມເລກທິ</AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-fit w-full">
            <div className='grid grid-cols-2'>
              {folder?.number?.map((item, index) => (
                <div className='flex gap-x-1' key={index}>
                  <div className={cn("text-sm", item.isAvailable ? "text-green-500" : "text-red-500")}>ເລກທິ: {`${folder?.code}${item.number}`}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

interface FolderOptionsDropdownProps {
  folderId: number;
  onEdit: (id: number) => void;
  onApprove: (id: number) => void;
  handleShowDetail: (id: number) => void;
  onStatus?: () => void;
  onReject?: () => void;
  action?: IAction
  folder: IFolder
  showReject?: boolean
  setDialogOpen: (open: boolean) => void
  dialogOpen: boolean
}

function FolderOptionsDropdown({
  folderId,
  onEdit,
  onStatus,
  onApprove,
  handleShowDetail,
  setDialogOpen,
  dialogOpen,
  action = { editText: "", statusText: "", acceptText: "", approveText: "", showDetail: "", reject: "" },
}: FolderOptionsDropdownProps): JSX.Element {
  const { editText = "", statusText = "", acceptText = "", approveText = "", showDetail = "", reject = "" } = action;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {editText && (
          <DropdownMenuItem onClick={() => { onEdit(folderId); }}>
            <Edit className="mr-2 h-4 w-4" />
            <span>{editText}</span>
          </DropdownMenuItem>
        )}
        {statusText && onStatus && (
          <DropdownMenuItem onClick={onStatus} className="text-blue-500">
            <Send className="mr-2 h-4 w-4" />
            <span>{statusText}</span>
          </DropdownMenuItem>
        )}
        {acceptText && onStatus && (
          <DropdownMenuItem onClick={onStatus} className="text-blue-500">
            <BadgeCheck className="mr-2 h-4 w-4" />
            <span>{acceptText}</span>
          </DropdownMenuItem>
        )}
        {approveText && onStatus && (
          <DropdownMenuItem onClick={() => { onApprove(folderId); }} className='text-blue-500'>
            <BadgeDollarSign className="mr-2 h-4 w-4" />
            <span>{approveText}</span>
          </DropdownMenuItem>
        )}
        {showDetail && (
          <DropdownMenuItem onClick={() => { handleShowDetail(folderId); }} className='text-blue-500'>
            <BadgeDollarSign className="mr-2 h-4 w-4" />
            <span>{showDetail}</span>
          </DropdownMenuItem>
        )}
        {reject && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="text-red-500"
                onSelect={(event) => {
                  event.preventDefault()
                  setDialogOpen(true)
                }}
              >
                <MessageSquareX className="mr-2 h-4 w-4" />
                <span>ສົ່ງເອກກະສານກັບຄືນ</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <RejectCreateForm folderId={folderId} setDialogOpen={setDialogOpen} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function StatusConfirmationDialog({ isOpen, onClose, folder, status }: { isOpen: boolean; onClose: () => void; folder: IFolder, status: ProcessStatus }) {
  const { onSubmit, loading } = useFolderProgress({ id: folder?.id, status });
  const handleConfirm = async () => {
    if (!loading) {
      await onSubmit();
      onClose();
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ທ່ານແນ່ໃຈບໍ?</AlertDialogTitle>
          <AlertDialogDescription>
            <WarningMessage />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ຍົກເລີກ</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={`bg-red-600 hover:bg-red-700 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            ຢືນຢັນ {loading && "..."}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default FolderCardView;