import { z } from "zod";

export const visaFormSchema = z.object({
  typeCode: z.string().min(2, {
    message: "ກະລຸນາໃສ່ລະຫັດວິຊ່າ",
  }),
  description: z.string().min(2, {
    message: "ກະລຸນາໃສ່ຄໍາອະທິບາຍ",
  }),
});

export const defaultValues = {
  typeCode: "",
  description: "",
};
