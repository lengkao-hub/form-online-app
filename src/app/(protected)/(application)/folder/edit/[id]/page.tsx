"use client";

import { useSession } from "next-auth/react";
import { FolderForm } from "../../container/form";
import { useFolderEditForm } from "../../hook/useEditForm";

export default function ProfileEdit({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useFolderEditForm({ id: Number(params.id) });
  const { data: session } = useSession()
  const userRole = session?.user.role === "POLICE_OFFICER"
  return (
    <FolderForm form={form} onSubmit={onSubmit} isEdit={userRole} />
  );
}
