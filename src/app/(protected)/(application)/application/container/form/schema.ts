import { z } from "zod";

const ONE_KB = 1024;
const MAX_FILE_SIZE = 10 * ONE_KB * ONE_KB;
const ACCEPTED_PDF_TYPES = ["application/pdf"];

const extractApplicationFileIds = (applicationFile: Array<{ id?: number }>) => {
  const applicationFileIds: number[] = [];
  for (const file of applicationFile) {
    if (file?.id !== undefined) {
      applicationFileIds.push(file.id);
    }
  }
  return applicationFileIds;
};

export const applicationSchema = z.object({
  numberId: z.number().positive({
    message: "ກະລຸນາເລືອກເລກທິ",
  }),
  profileId: z.number().positive({
    message: "ກະລຸນາເລືອກບຸກຄົນ",
  }),
  folderId: z.number().positive({
    message: "ກະລຸນາເລືອກແຟ້ມເອກກະສານ",
  }),
  positionId: z.number().positive({
    message: "ກະລຸນາເລືອກຕຳແໜ່ງ",
  }),
  visaTypeId: z.number().positive({
    message: "ກະລຸນາເລືອກປະເພດວິຊ່າ",
  }),
  companyId: z.number({
    message: "ກະລຸນາເລືອກຫົວໜ່ວຍທຸລະກິດ",
  }).optional(),
  villageId: z.number({
    message: "ກະລຸນາເລືອກບ້ານ",
  }).optional(),
  type: z.string().min(1, {
    message: "ກະລຸນາເລືອກປະເພດ",
  }),
  visaIssuedAt: z.string().min(1, {
    message: "ກະລຸນາເລືອກປະເພດ",
  }),
  dependBy: z.string().min(1, {
    message: "ກະລຸນາເລືອກຂື້ນກັບ",
  }),
  expirationTerm: z.string(),
  issueDate: z
    .union([z.date(), z.string()])
    .refine((value) => value !== null && value !== "", {
      message: "ວັນທີອອກ",
    }),
  visaIssuedDate: z
    .union([z.date(), z.string()])
    .refine((value) => value !== null && value !== "", {
      message: "ວັນທີອອກ",
    }),
  // visaExpiryDate: z
  //   .union([z.date(), z.string()])
  //   .refine((value) => value !== null && value !== "", {
  //     message: "ວັນໝົດອາຍຸ",
  //   }).optional(),
  expirationDate: z
    .union([z.date(), z.string()])
    .refine((value) => value !== null && value !== "", {
      message: "ວັນໝົດອາຍຸ",
    }),
  status: z.string().min(1, {
    message: "Status is required.",
  }),
  applicationFile: z.array(
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
}).transform((data) => {
  if (data.applicationFile) {
    const companyFileIds = extractApplicationFileIds(data.applicationFile)
    const newData = {
      ...data,
      companyFileIds,
    }
    return newData
  }
  return data;
});
export const fileUploadSchema = z.object({
  applicationFile: z.array(
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
}).transform((data) => {
  if (data.applicationFile) {
    const companyFileIds = extractApplicationFileIds(data.applicationFile)
    const newData = {
      ...data,
      companyFileIds,
    }
    return newData
  }
  return data;
});

export const applicationDefaultValues = {
  profileId: 0,
  folderId: 0,
  positionId: 0,
  companyId: 0,
  type: "NEW",
  status: "DEFAULT",
  numberId: 0,
  visaTypeId: 0,
  applicationFile: [],
  visaIssuedAt: "",
};
