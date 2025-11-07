
import {
  BadgeDollarSign,
  Briefcase,
  Building2,
  Camera,
  Check,
  Clipboard,
  FileUser,
  Flag,
  FolderArchive,
  Home,
  IdCard,
  Landmark,
  Map,
  MapPin,
  PrinterCheck,
  RefreshCcw,
  RotateCcw,
  ScanBarcode,
  Settings,
  UserIcon,
  Image,
  Images,
  CircleDollarSign,
  ChartCandlestick,
  ChartNoAxesCombined,
  ShieldBan,
  Clock8,
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
  {
    title: "ລົງທະບຽນບຸກຄົນ",
    subject: "profile-of-customer",
    href: "/profile-of-customer",
    icon: <FileUser size={18} />,
  },
  {
    title: "ອະນຸມັດບຸກຄົນແລ້ວ",
    subject: "approved-user",
    href: "/approved-user",
    icon: <FileUser size={18} />,
  },
  {
    title: "ປະຕິເສດອະນຸມັດບຸກຄົນ",
    subject: "rejected-user",
    href: "/rejected-user",
    icon: <FileUser size={18} />,
  },
  {
    title: "ລໍຖ້າການອະນຸມັດ",
    subject: "profile",
    href: "/profile",
    icon: <FileUser size={18} />,
  },
  {
    title: "ອະນຸມັດບຸກແລ້ວ",
    subject: "approved",
    href: "/approved",
    icon: <FileUser size={18} />,
  },
  {
    title: "ຜູ້ໃຊ້ງານລະບົບ",
    subject: "user",
    href: "/user",
    icon: <UserIcon size={18} />,
  },
];

