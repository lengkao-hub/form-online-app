'use client';
import * as z from "zod"

import { Form } from "@/components/containers/form";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Button, Separator } from "@/components/ui";
import { PlusCircle } from "lucide-react";
import { formSchema } from "./schema";
import usePriceCombobox from "src/app/(protected)/(finance)/price/hook/usePriceCombobox";
import useCompanyCombobox from "src/app/(protected)/company/hook/useeCompanyCombobox";
import { AddCompanyDialog } from "src/app/(protected)/company/container/table/addCompanyDialog";
import { useHandleEnterNavigation } from "@/lib/handleKeyDownNextField";
import { BadgeCheck, BadgeDollarSign, CheckCheck, CornerDownLeft, Edit, Folders, MessageSquareX, MoreHorizontal, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import FolderCardView from "./card";
import useFolderTable from "../hook/useFolderList";
import { getOfficeId, getOfficeIds, getUserRole } from "../../../../lib/getSession";
import { IFolder } from "../type";
import { FolderDialog } from "./table/folderDialog";


const formTitle = "ສ້າງແຟ້ມເອກກະສານ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງແຟ້ມ";
interface FolderFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  poPup?: boolean;
  data?: IFolder[] | null;
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  isEdit?: boolean;
}

export const FolderForm: React.FC<FolderFormProps> = ({ form, poPup, data, onSubmit, isEdit = false }) => {
  const [isAddingCompany, setIsAddingCompany] = useState<boolean>(false);
  const { result: priceOptions } = usePriceCombobox({ status: true });
  const { result: companyOptions } = useCompanyCombobox();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [popup, setPoPup] = useState(false);
  const router = useRouter();
  const pathname = usePathname()
  useEffect(() => {
    setPoPup(Boolean(poPup))
    // console.log("popup=========================>", poPup);
  }, [poPup])
  const handleEdit = (id: number) => {
    router.push(`/folder/edit/${id}`);
  };
  const { fields: variantFields, append: append, remove: remove } = useFieldArray({
    control: form.control,
    name: "folderPrice",
  });
  const { errors } = form.formState;
  const extendedCompanyOptions = [
    { label: '+ ເພີ່ມຫົວໜ່ວຍທຸລະກິດ', value: 'addCompany' },
    ...companyOptions,
  ];
  const handleVillageChange = (value: string | number) => {
    if (value === 'addCompany') {
      setIsAddingCompany?.(true);
      form.setValue('companyId', 0);
    } else {
      setIsAddingCompany?.(false);
      form.setValue('companyId', Number(value));
    }
  };
  // const officeListIds = getOfficeIds()
  // const { result: resultDefault, updateSearch, filter, limit: defaultLimit } = useFolderTable({ status: "DEFAULT", officeId: officeListIds  });
  return (
    <>
      <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle} formRef={formRef} showButton={false}
        className="z-10">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">ຂໍ້ມູນພື້ນຖານ</h3>
          <div className="grid grid-cols-2 gap-4">
            <Form.Field name="name" control={form.control} label="ຊື່ແຟ້ມ">
              <Form.Input.Input placeholder="ຊື່ແຟ້ມ" />
            </Form.Field>
            <Form.Field name="companyId" control={form.control} label="ຫົວໜ່ວຍທຸລະກິດ">
              <Form.Input.Combobox placeholder="ເລືອກ" options={extendedCompanyOptions} onChange={handleVillageChange} formRef={formRef} />
            </Form.Field>
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <h3 className="text-lg font-medium">ປະເພດບັດ</h3>
          {variantFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4">
              <h4 className="font-medium">ປະເພດບັດ {index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Field name={`folderPrice.${index}.amount`} control={form.control} label="ຈໍານວນຟອມ" >
                  <Form.Input.Input placeholder="ຊື່ຕົວເລືອກ" disabled={isEdit} />
                </Form.Field>
                <Form.Field name={`folderPrice.${index}.priceId`} control={form.control} label="ປະເພດບັດ" >
                  <Form.Input.Combobox placeholder="ປະເພດບັດ" className="w-full" options={priceOptions} disabled={isEdit} formRef={formRef} />
                </Form.Field>
              </div>
              <Button type="button" variant="destructive" onClick={() => remove(index)} disabled={isEdit}>
                ລົບ
              </Button>
            </div>
          ))}
          <Button type="button"
            onClick={() => append({ amount: 1, priceId: 0 })} disabled={isEdit}>
            <PlusCircle className="w-4 h-4 mr-2" />
            ເພີ່ມປະເພດບັດ
          </Button>
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-medium text-red-800 mb-2">ຂໍ້ຜິດພາດໃນຟອມ</h3>
            <ul className="list-disc pl-5 space-y-1 text-red-600">
              {errors.folderPrice?.root?.message && <li>{errors.folderPrice?.root?.message}</li>}
            </ul>
          </div>
        )}
        <div className="flex justify-end">
          <Button type="submit" className="end">
            ບັນທືກ
          </Button>
        </div>
      </Form>

      {/* {popup && (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 left-64">
        //   <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 mt-6">
        //     <div className="flex items-center space-x-3 w-full">
        //       <div>
        //         <Folders className={cn("w-14 h-14 text-yellow-500")} />
        //       </div>
        //       <div className="w-full">
        //         <h5>lengkao</h5>
        //         <div className="flex flex-row w-full justify-between space-x-4 text-sm text-gray-600">
        //           <div className="w-full">
        //             <div>ແຟ້ມເລກທີ:</div>
        //             <div className="font-bold">0061</div>
        //           </div>
        //           <div className=" left-10 w-full">
        //             <div>ສ້າງວັນທີ:</div>
        //             <div className="font-bold">16/09/2025</div>
        //           </div>
        //         </div>
        //         <div className="flex flex-col text-sm text-gray-600">
        //           <span>ສາຂາ: ເສີ້ງໄຫ້</span>
        //           <span>ຮ້ານຂາຍເຫຼົ້າແລະຢາສູບຜີງຜ່ານ</span>
        //         </div>
        //       </div>
        //     </div>
        //     <div className="bg-gray-50 border border-gray-500 rounded-lg p-4 space-y-3">
        //       <div className="text-sm text-gray-700">
        //         <div className="font-medium">ປະເພດ: ບັດຢູ່ຊົ່ວຄາວສໍາລັບຄູ່ສົມລົດ - Temporary</div>
        //         <div className="font-medium">Stay Card (ມຽນມ້າ 6 ເດືອນ)</div>
        //       </div>
        //       <div className="flex justify-between items-center text-sm">
        //         <span className="text-gray-600">ລວມຍອດເງິນ:</span>
        //         <span className="font-semibold text-gray-900">720</span>
        //       </div>

        //       <div className="flex justify-between items-center text-sm">
        //         <span className="text-gray-600">ລວມຈໍານວນຟອມ:</span>
        //         <span className="font-semibold text-gray-900">9</span>
        //       </div>
        //     </div>
        //     <hr className=" border-gray-400 " />
        //     <div className="space-y-2">
        //       <div className="flex justify-between items-center text-sm">
        //         <span className="text-gray-600">ຈໍານວນຟອມ:</span>
        //         <span className="font-semibold text-gray-900">9</span>
        //       </div>
        //       <div className="flex justify-between items-center text-sm">
        //         <span className="text-gray-600">ລວມຍອດເງິນ:</span>
        //         <span className="font-semibold text-gray-900">720</span>
        //       </div>
        //     </div>
        //     <button
        //       className="flex justify-between items-center w-full text-sm text-gray-700 hover:text-gray-900 transition-colors"
        //     >
        //       <span>ສະແດງລາຍລະອຽດ</span>
        //     </button>
        //     <hr className="border-gray-400" />
        //     <div className="flex justify-end space-x-4">
        //       <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
        //         <span>ແກ້ໄຂ</span>
        //       </button>
        //       <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
        //         <Send size={18}/><span>ສົ່ງ</span>
        //       </button>
        //     </div>
        //   </div>
        // </div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 left-64">
          <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 mt-6 overflow-y-auto max-h-[80vh]"
          // onClick={()=> setPoPup(false)}
          >
            {data?.map((folder) => (
              <FolderCardView folder={folder} status="FINANCE_UNDER_REVIEW" key={folder.id} action={{ editText: "ແກ້ໄຂ", statusText: "ສົ່ງເອກກະສານ", showDetail: "ລາຍລະອຽດ",edit:"ແກ້ໄຂ" }} />
            ))}
          </div>
        </div>

      )} */}
      <FolderDialog folderId={folderId} open={popup} onOpenChange={setPopup}/>
      <AddCompanyDialog
        open={isAddingCompany}
        onOpenChange={setIsAddingCompany}
        onSuccess={(newCompany) => {
          form.setValue("companyId", newCompany.id);
        }}
      />
    </>
  );
}

