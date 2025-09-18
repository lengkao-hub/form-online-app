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
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  isEdit?: boolean;
  folderId?: number;
}

export const FolderForm: React.FC<FolderFormProps> = ({ form, onSubmit, isEdit = false, folderId }) => {
  const [isAddingCompany, setIsAddingCompany] = useState<boolean>(false);
  const { result: priceOptions } = usePriceCombobox({ status: true });
  const { result: companyOptions } = useCompanyCombobox();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isPopup, setIsPoPup] = useState(false);
  const router = useRouter();
  const pathname = usePathname()
  const { fields: variantFields, append: append, remove: remove } = useFieldArray({
    control: form.control,
    name: "folderPrice",
  });
  const { errors } = form.formState;
  const extendedCompanyOptions = [
    { label: '+ ເພີ່ມຫົວໜ່ວຍທຸລະກິດ', value: 'addCompany' },
    ...companyOptions,
  ];
  useEffect(() => {
    if (folderId && folderId > 0) {
      setIsPoPup(true);
    }
  }, [folderId]);
  const handleVillageChange = (value: string | number) => {
    if (value === 'addCompany') {
      setIsAddingCompany?.(true);
      form.setValue('companyId', 0);
    } else {
      setIsAddingCompany?.(false);
      form.setValue('companyId', Number(value));
    }
  };
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
      <FolderDialog folderId={folderId} open={isPopup} onOpenChange={setIsPoPup}/>
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

