"use client";

import { RoleBasedGuard } from "@/lib/ability/roleBasedGuard";
import { FolderForm } from "../container/form";
import { useFolderForm } from "../hook/useForm";

export default function FolderCreate() {
  const { form,poPup, onSubmit,data } = useFolderForm();
  return (
    <RoleBasedGuard subject="create-folder" action="manage" fallback={<div>You don&apos;t have permission to view this page</div>}>
      <FolderForm form={form} poPup={poPup} onSubmit={onSubmit} data={data ?[data] : null }/>
    </RoleBasedGuard>
  );
}
