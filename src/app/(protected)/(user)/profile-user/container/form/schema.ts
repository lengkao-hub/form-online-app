import { validateImageSchema } from "@/lib/validation";
import { z } from "zod";

export const profileFormSchema = z.object({
  image: validateImageSchema({
    required: false,
    message: "ກະລຸນາເລືອກຮູບພາບ",
  }).or(z.string()), 
  identityIssueDate: z.date().or(z.string()).refine((value) => { return value != null && value !== ""; }, { message: "ກະລຸນາລະບຸວັນທີອອກເອກະສານ" }),
  firstName: z.string().min(1, { message: "ກະລຸນາໃສ່ຊື່" }),
  lastName: z.string().min(1, { message: "ກະລຸນາໃສ່ນາມສະກຸນ" }),
  phoneNumber: z
    .string()
    .regex(/^\d{8,}$/, { message: "ເບີໂທທີ່ປ້ອນບໍ່ຖືກຕ້ອງ" })
    .optional()
    .or(z.literal("")),
  dateOfBirth: z
    .union([z.date(), z.string()])
    .refine((value) => value !== null && value !== "", {
      message: "ວັນເດືອນປີເກີດ",
    }),
  gender: z.string().min(1, { message: "ກະລຸນາລະບຸເພດ" }),
  nationalityId: z.number().min(1, { message: "ກະລຸນາເລືອກສັນຊາດ" }),
  ethnicityId: z.number().min(1, { message: "ກະລຸນາເລືອກເຊື້ອຊາດ" }),
  identityType: z.string().min(1, { message: "ກະລຸນາໃສ່ປະເພດອອກເອກະສານ" }),
  identityNumber: z.string().min(1, { message: "ກະລຸນາໃສ່ເລກທີເອກະສານ" }),
  // applicationFile: z.array(
  //   z.object({
  //     file: z
  //       .union([
  //         z.instanceof(File).refine(
  //           (file) => file.size <= MAX_FILE_SIZE,
  //           `Max file size is 10MB.`,
  //         ).refine(
  //           (file) => ACCEPTED_PDF_TYPES.includes(file.type),
  //           "Only .pdf formats are supported.",
  //         ),
  //         z.literal(""),
  //       ])
  //       .optional(),
  //     id: z.number().optional(),
  //     name: z.string().optional(),
  //   }),
  // ).optional(),
  identityExpiryDate: z
    .union([z.date(), z.string()])
    .nullable()
    .optional(),
  currentProvince: z.number().optional(),
  currentDistrict: z.number().optional(),
  currentVillageId: z.number().optional(),
  overseasCountryId: z.number().optional(),
  overseasProvince: z.string().optional(),
}).transform((data) => {
  // if (data.applicationFile) {
  //   const companyFileIds = extractApplicationFileIds(data.applicationFile)
  //   const newData = {
  //     ...data,
  //     companyFileIds,
  //   }
  //   return newData
  // }
  return data;
});
export const defaultValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  nationalityId: 1,
  ethnicityId: 1,
  identityType: "",
  identityIssueDate: "",
  identityNumber: "",
  identityExpiryDate: null,
  currentProvince: 0,
  currentDistrict: 0,
  currentVillageId: 0,
  overseasCountryId: 0,
  overseasDistrict: "",
  overseasProvince: "",
  applicationFile: [],
};
