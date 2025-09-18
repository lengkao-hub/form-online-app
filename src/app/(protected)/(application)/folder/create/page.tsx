"use client";

import { RoleBasedGuard } from "@/lib/ability/roleBasedGuard";
import { FolderForm } from "../container/form";
import { useFolderForm } from "../hook/useForm";
import { useState } from "react";

export default function FolderCreate() {
  const { form, onSubmit } = useFolderForm();
  const [folderId, setFolderId] = useState<number | undefined>(undefined);
  const handleSubmit = async (data: any) => {
    const folder = await onSubmit(data);
    if (folder && folder.id) {
      setFolderId(folder.id);
    }
  }
  return (
    <RoleBasedGuard subject="create-folder" action="manage" fallback={<div>You don&apos;t have permission to view this page</div>}>
      <FolderForm form={form} onSubmit={handleSubmit} folderId={Number(folderId)} />
    </RoleBasedGuard>
  );
}
