"use client"

import UserForm from "./form/form";
import { useUserForm } from "./hooks/useForm";
function register() {
  const { form, onSubmit } = useUserForm();
  return (
    <UserForm form={form} onSubmit={onSubmit} />
  )
}
export default register