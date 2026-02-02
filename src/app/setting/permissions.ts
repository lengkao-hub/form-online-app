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
    { action: "read", subject: "approved-profile" }, 
    { action: "read", subject: "rejected-profile" }, 
    { action: "read", subject: "profile-user" }, 
    { action: "read", subject: "new-card" }, 
  ], 
  
};
