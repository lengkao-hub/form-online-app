"use client";
import React, { useRef, useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { Button } from "@/components/containers";
import { Form } from "@/components/containers/form";
import { useUpdateDefaultValues } from "@/lib/update-default-values";
import { type checkBlacklistFormSchema } from "src/app/(protected)/blacklist/container/form/schema";
import { CurrentAddressSection, IdentitySection, OverseasAddressSection, PersonalInfoSection } from "./field";
import { defaultValues, type profileFormSchema } from "./schema";
import { AddVillageDialog } from "src/app/(protected)/(address)/village/container/addVillageDialog";
import { useHandleEnterNavigation } from "@/lib/handleKeyDownNextField";


interface ProfileFormProps {
  form: UseFormReturn<z.infer<typeof profileFormSchema>>;
  setSavedData: any;
  // onSubmit: (data: z.infer<typeof profileFormSchema>) => Promise<void>;
  handleReset?: () => void;
  handlePrevious?: () => void;
  action?: "create" | "edit";
  blackProfile?: z.infer<typeof checkBlacklistFormSchema>;
}
const ProfileForm: React.FC<ProfileFormProps> = ({ form, setSavedData, action = "create", blackProfile, handlePrevious, handleReset }) => {
  const { firstName, lastName, dateOfBirth, identityNumber, identityType } = blackProfile ?? {};
  const disabled = action === "create";
  const [isAddingVillage, setIsAddingVillage] = useState<boolean>(false);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const handleSetIsAddingVillage = (value: boolean) => {
    setIsAddingVillage(value);
  };
  useUpdateDefaultValues({ form, fieldName: "firstName", value: firstName, shouldUpdate: disabled });
  useUpdateDefaultValues({ form, fieldName: "lastName", value: lastName, shouldUpdate: disabled });
  useUpdateDefaultValues({ form, fieldName: "dateOfBirth", value: dateOfBirth, shouldUpdate: disabled });
  useUpdateDefaultValues({ form, fieldName: "identityNumber", value: identityNumber, shouldUpdate: true });
  const formRef = React.useRef<HTMLFormElement>(null);
  useHandleEnterNavigation(formRef)

  const handleSave = form.handleSubmit(
    async (data) => {
      const fullData = { ...defaultValues, ...data };
      setSavedData((prev: any) => [...prev, fullData]);
      form.reset();
      handleReset?.();
    },
    (errors) => {
      console.log("❌ Validation errors:", errors);
    }
  );

  return (
    <>
      <Form formInstance={form} onSubmit={() => handleSave()} className="border-none shadow-none p-0" showButton={false} formRef={formRef}>
        <PersonalInfoSection form={form} disabled={false} action={disabled} formRef={formRef} />
        <IdentitySection form={form} identityType={identityType} formRef={formRef} />
        <CurrentAddressSection form={form} setIsAddingVillage={handleSetIsAddingVillage} formRef={formRef} />
        <OverseasAddressSection form={form} formRef={formRef} />
        <div className=" space-x-3">
          {action === "create" && (
            <>
              <Button ref={nextButtonRef} loading={form?.formState.isSubmitting} disabled={form?.formState.isSubmitting} >ບັນທຶກ</Button>
              <Button variant="outline" onClick={handlePrevious} className="w-full sm:w-auto" > ກັບຄືນ </Button>
            </>
          )}
          {action === "edit" && (
            <>
              <Button loading={form?.formState.isSubmitting} disabled={form?.formState.isSubmitting} >ບັນທຶກ</Button>
            </>
          )}
        </div>
      </Form>
      <AddVillageDialog
        open={isAddingVillage}
        onOpenChange={setIsAddingVillage}
        onSuccess={(newVillage) => {
          form.setValue("currentVillageId", newVillage.id);
        }}
      />
    </>
  );
};

export default ProfileForm;
