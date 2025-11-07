/* eslint-disable @typescript-eslint/naming-convention */
import { type Actions, type Role, type Subjects } from "./interface";

export const rolePermissions: Record<Role, Array<{ action: Actions; subject: Subjects | Subjects[] }>> = {

  ADMIN: [
    { action: "read", subject: "dashboard" },
    { action: "read", subject: "profile" },
    { action: "read", subject: "user" },
    { action: "read", subject: "approved" }, 
  ],
  USER: [
    { action: "read", subject: "dashboard" },
    { action: "read", subject: "profile-of-customer"},
     { action: "read", subject: "approved-user" }, 
     { action: "read", subject: "rejected-user" }, 
  ], 
  
};
