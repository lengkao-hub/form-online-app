"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { type visaFormSchema } from "./schema";
import { cn } from "@/lib/utils";

const formTitle = "ເພິ່ມ ຫຼື ແກ້ໄຂວິຊ່າ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງປະເພດວິຊ່າ";

interface DistrictFormProps {
  form: UseFormReturn<z.infer<typeof visaFormSchema>>;
  onSubmit: (data: z.infer<typeof visaFormSchema>) => Promise<void>;
  className?: string;
}

const VisaForm: React.FC<DistrictFormProps> = ({ form, onSubmit, className }) => {
  return (
    <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
      <div className={cn("grid gap-4 md:grid-cols-2", className)}>
        <Form.Field name="typeCode" control={form.control} label="ປະເພດວິຊ່າ(ລະຫັດວິຊ່າ)">
          <Form.Input.Input placeholder="ລະຫັດວິຊ່າ" />
        </Form.Field>
        <Form.Field name="description" control={form.control} label="ຄໍາອະທິບາຍຂອງປະເພດວິຊ່າ">
          <Form.Input.Input placeholder="ຄໍາອະທິບາຍ" />
        </Form.Field>
      </div>
    </Form>
  );
};

export default VisaForm;
