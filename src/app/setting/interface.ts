import { type MongoAbility } from "@casl/ability";

export type Role = "ADMIN" | "USER" | "FINANCE";

export type Actions = "create" | "read" | "update" | "delete" | "manage";

export type Subjects =
  | "all"
  | "user"
  | "profile-of-customer"
  | "manage"
  | "position"
  | "setting"
  | "folder"
  | "profile"
  | "company"
  | "dashboard"
  | "application"
  | "printing"
  | "renew"
  | "finance"
  | "complete"
  | "refund"
  | "village"
  | "scanner"
  | "take-photo"
  | "gallery"
  | "currency"
  | "exchange"
  | "report"
  | "back-printing"
  | "printed"
  | "nationality"
  | "province"
  | "district"
  | "office"
  | "add-blacklist-btn"
  | "blacklist"
  | "create-folder"
  | "profile-report"
  | "application-report"
  | "visa"
  | "quick-application"

export type AppAbility = MongoAbility<[Actions, Subjects]>;
