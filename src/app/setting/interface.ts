import { type MongoAbility } from "@casl/ability";

export type Role = "ADMIN" | "USER" ;

export type Actions = "create" | "read" | "update" | "delete" | "manage";

export type Subjects =
  | "all"
  | "user" 
  | "approved-profile"
  | "rejected-profile"
  | "profile-user"
  | "new-card"
  | "approved"
  | "manage"
  | "position"
  | "setting"
  | "folder"
  | "profile"
  | "company"
  | "dashboard" 
  | "take-photo"
  | "gallery"
  | "currency"
  | "exchange"
  | "report"

export type AppAbility = MongoAbility<[Actions, Subjects]>;
