"use client";

import { useSession } from "next-auth/react";
import { Role } from "@/setting/interface";

export function getRoleUser() {
  const { data: session } = useSession();
  const role = (session?.user?.role as Role) ?? "";
  const id = session?.user?.id ?? "";
  return { role, id };
}
