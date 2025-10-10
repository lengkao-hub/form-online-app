import { differenceInYears, parse } from "date-fns";

/**
 * @param dob
 * @returns age
 */
export function calculateAge(dob: string | Date, format: string = "dd/MM/yyyy"): number {
  if (!dob) {
    return 0;
  }

  let birthDate: Date;
  if (typeof dob === "string") {
    birthDate = parse(dob, format, new Date());
  } else {
    birthDate = dob;
  }

  const today = new Date();
  return differenceInYears(today, birthDate);
}