
import {
  FileUser,
  Home,
  IdCard,
  UserIcon,
  Clock8,
  BookCheck,
  BookX,
} from "lucide-react";

export interface NavLink {
  title: string;
  subject?: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface IResources extends NavLink {
  sub?: NavLink[];
}

export const resources: IResources[] = [

  {
    title: "ໜ້າຫຼັກ",
    subject: "dashboard",
    href: "/dashboard",
    icon: <Home size={18} />,
  },
  // {
  //   title: "ລົງທະບຽນບຸກຄົນ",
  //   subject: "profile-of-customer",
  //   href: "/profile-of-customer",
  //   icon: <FileUser size={18} />,
  // },
  {
    title: "ລົງທະທຽນບຸກຄົນ",
    subject: "profile-user",
    href: "/profile-user",
    icon: <FileUser size={18} />,
  },
  {
    title: "ອອກບັດ",
    subject: "new-card",
    href: "/new-card",
    icon: <IdCard size={18} />,
  },
  {
    title: "ອະນຸມັດບຸກຄົນແລ້ວ",
    subject: "approved-profile",
    href: "/approved-profile",
    icon: <BookCheck size={18} />,
  },
  {
    title: "ປະຕິເສດອະນຸມັດບຸກຄົນ",
    subject: "rejected-profile",
    href: "/rejected-profile",
    icon: <BookX size={18} />,
  },

  {
    title: "ລໍຖ້າການອະນຸມັດ",
    subject: "profile",
    href: "/profile",
    icon: <Clock8 size={18} />,
  },
  {
    title: "ອະນຸມັດບຸກແລ້ວ",
    subject: "approved",
    href: "/approved",
    icon: <BookCheck size={18} />,
  },
  {
    title: "ຜູ້ໃຊ້ງານລະບົບ",
    subject: "user",
    href: "/user",
    icon: <UserIcon size={18} />,
  },
];

