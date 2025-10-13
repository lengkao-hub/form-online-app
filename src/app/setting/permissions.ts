/* eslint-disable @typescript-eslint/naming-convention */
import { type Actions, type Role, type Subjects } from "./interface";

export const rolePermissions: Record<Role, Array<{ action: Actions; subject: Subjects | Subjects[] }>> = {

  ADMIN: [
    { action: "read", subject: "dashboard" },
    { action: "read", subject: "folder" },
    { action: "read", subject: "position" },
    { action: "read", subject: "profile" },
    { action: "read", subject: "application" },
    { action: "read", subject: "user" },
    { action: "read", subject: "village" },
    { action: "read", subject: "printing" },
    { action: "read", subject: "renew" },
    { action: "read", subject: "printed" },
    { action: "read", subject: "nationality" },
    { action: "read", subject: "province" },
    { action: "read", subject: "district" },
    { action: "read", subject: "office" },
    { action: "read", subject: "add-blacklist-btn" },
    { action: "read", subject: "gallery" },
    { action: "read", subject: "take-photo" },
    { action: "read", subject: "visa" },
  ],
  USER: [
    { action: "read", subject: "dashboard" },
    { action: "read", subject: "profile" },
  ],
  FINANCE:[
    {action: "read", subject: "dashboard" },
    {action: "read", subject: "profile-of-customer"},
  ]
  
};
