import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";

import { Button } from "@/components/containers";
import { Form } from "@/components/containers/form";
import { type checkBlacklistFormSchema } from "./schema";
import { useUpdateDefaultValues } from "@/lib/update-default-values";
import { IProfile } from "src/app/(protected)/profile/type";
import Image from "next/image";
import { formatDate } from "@/lib/format-date";
import { X } from "lucide-react";
interface BlacklistProfileFormProps {
  form: UseFormReturn<z.infer<typeof checkBlacklistFormSchema>>;
  onSubmit: (data: z.infer<typeof checkBlacklistFormSchema>) => Promise<void>;
  statusMessage?: string | null;
  found?: IProfile;
  add?: (profileId: number) => void;
  clear?: () => void;
}

const IdentifyOptions = [
  { value: "passport", label: "Passport" },
  { value: "nationalId", label: "ບັດປະຈຳຕົວ" },
  { value: "driverLicense", label: "ໃບຂັບຂີ່" },
];

const BlacklistProfileForm: React.FC<BlacklistProfileFormProps> = ({ form, onSubmit, statusMessage, add, found, clear }) => {
  const { errors } = form.formState;
  useUpdateDefaultValues({ form, fieldName: "identityType", value: "passport", shouldUpdate: true });

  return (
    <Form formInstance={form} onSubmit={onSubmit} className="border-none shadow-none p-0" showButton={false}>
      {Object.keys(errors).length > 0 && (
        <div className=" p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-medium text-red-800 mb-2">ຂໍ້ຜິດພາດໃນຟອມ</h3>
          <ul className="list-disc pl-5 space-y-1 text-red-600">
            {Object.entries(errors).map(([key, error]) => (
              <li key={key}>{error?.message || key}</li>
            ))}
          </ul>
        </div>
      )}
      {found && (
        <div className="p-4 border border-gray-300 rounded-lg shadow mb-4">
          <div className="flex gap-4">
            <div>
              <Image 
                src={found.image || "/user_Icon.png"}
                alt="profile-image"
                width={1000}
                height={1000}
                className="w-[100px] h-[100px]"
              />
            </div>
            <div>
              <h4 className="font-[500] mb-2 uppercase">ຊື່ ແລະ ນາມສະກຸນ: {found.firstName} {found.lastName}</h4>
              <p></p>
              <p className="capitalize text-xl">ວັນເດືອນປີເກີດ: {formatDate({ date: found.dateOfBirth })}</p>
              <p></p>
              <p className="capitalize text-xl">{found.identityType}: {found.id}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button type="button" onClick={() => add?.(found.id)} className="bg-green-500">ເພີ່ມ</Button>
            <Button onClick={clear} className="bg-red-500"><X /></Button>
          </div>
        </div>
      )}
      {statusMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-medium text-green-800 mb-2">ຜົນກວດສອບ</h3>
          <p className="text-green-600">{statusMessage}</p>
        </div>
      )}
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Form.Field name="firstName" control={form.control} label="ຊື່ແທ້">
            <Form.Input.Input placeholder="ປ້ອນຊື່" />
          </Form.Field>

          <Form.Field name="lastName" control={form.control} label="ນາມສະກຸນ">
            <Form.Input.Input placeholder="ປ້ອນນາມສະກຸນ" />
          </Form.Field>

          <Form.Field name="dateOfBirth" control={form.control} label="ວັນເດືອນປີເກີດ">
            <Form.Input.DateTimePicker />
          </Form.Field>

          <Form.Field name="identityType" control={form.control} label="ປະເພດເອກະສານ">
            <Form.Input.Select options={IdentifyOptions} defaultValue="passport" />
          </Form.Field>

          <Form.Field name="identityNumber" control={form.control} label="ໜັງສືຜ່ານແດນເລກທີ">
            <Form.Input.Input placeholder="ໜັງສືຜ່ານແດນເລກທີ"/>
          </Form.Field>
        </div>
      </div>
      <Button
        loading={form?.formState.isSubmitting}
        disabled={form?.formState.isSubmitting}
      >ຖັດໄປ</Button>
    </Form>
  );
};

export default BlacklistProfileForm;
