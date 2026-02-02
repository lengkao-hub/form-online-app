import { z } from "zod";
const ONE_KB = 1024;
const MAX_FILE_SIZE = 10 * ONE_KB * ONE_KB;
const ACCEPTED_PDF_TYPES = ["profile/pdf"];
export const formSchema = z
  .object({
    id: z.number().min(1,"ກະລຸນາເລືອກປະບຸກຄົນ"),
    firstName: z.string().optional(),
    priceId: z.number().min(1,"ກະລຸນາປ້ອນລາຄາ"),
    price: z.string().optional(),
    priceName: z.string().min(1, "ກະລຸນາເລືອກປະເພດບັດ"), 
    companyId: z.number({ message: "ກະລຸນາເລືອກຫົວໜ່ວຍທຸລະກິດ" }),
    file: z.array(
      z.object({
        file: z
          .union([
            z.instanceof(File).refine(
              (file) => file.size <= MAX_FILE_SIZE,
              `Max file size is 10MB.`,
            ).refine(
              (file) => ACCEPTED_PDF_TYPES.includes(file.type),
              "Only .pdf formats are supported.",
            ),
            z.literal(""),
          ])
          .optional(),
        id: z.number().optional(),
        name: z.string().optional(),
      }),
    ).optional(),
  });

export const rejectFormSchema = z
  .object({
    comment: z.string().min(1, "ກະລຸນາປ້ອນຊື່"),
    folderId: z.number().min(1, "ກະລຸນາເລືອກປະເພດ"),
    status: z.string().min(1, "ກະລຸນາເລືອກປະເພດ"),
  });

export const formDefaultValues = {
  id: 0,
  firstName: "",
  priceId: 0,
  price: "",
  priceName: "",
  companyId: 0,
  file: [],
};

export const rejectFormDefaultValues = {
  comment: "",
  folderId: 0,
  status: "REJECTED",
};

export type RejectFormSchemaType = z.infer<typeof rejectFormSchema>;