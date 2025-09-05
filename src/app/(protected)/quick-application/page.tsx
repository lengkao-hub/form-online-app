/* eslint-disable no-nested-ternary */

"use client";
import { Card, CardContent } from "@/components/ui";

import { type Step, useMultiStepForm } from "src/app/hook/useMultiStepForm";
import { Form } from "@/components/containers/form";
import { CheckCheck, SquareUserRound, X } from "lucide-react";
import { useQuickProfileForm } from "../profile/hook/useForm";
import { useBlacklistProfileForm } from "../blacklist/hook/useForm";
import ProfileForm from "../profile/container/form/form";
import useCompanyCombobox from "../company/hook/useeCompanyCombobox";
import { useState } from "react";
import { AddCompanyDialog } from "../company/container/table/addCompanyDialog";
import z from "zod";
import { UseFormReturn } from "react-hook-form";
import { companyQuickFormSchema } from "../company/container/form/schema";
import { useQuickForm } from "../company/hook/useQuickCompany";
import BlacklistProfileForm from "../blacklist/container/form/form";
import { cn } from "@/lib/utils";
import ApplicationForm from "../(application)/application/container/form/form";
import { useApplicationForm } from "../(application)/application/hook/useForm";

interface QuickCompanyProps {
  form: UseFormReturn<z.infer<typeof companyQuickFormSchema>>;
  onSubmit: (data: z.infer<typeof companyQuickFormSchema>) => Promise<void>;
  statusMessage?: string | null;
}

const FORM_STEPS: Step[] = [
  { number: 1, title: "ເລືອກບໍລິສັດ" },
  { number: 2, title: "ບັນຊີດໍາ" },
  { number: 3, title: "ປ້ອນຂໍ້ມູນບຸກຄົນ" },
  { number: 4, title: "ສໍາເລັດ" },
];

export default function QuickApplication() {
  const [count, setCount] = useState<number>(0)
  const [registered, setRegistered] = useState<number>(0)
  const { step, handleNext, handlePrevious, handleGotoStep, handleReset } = useMultiStepForm({ steps: FORM_STEPS, setCount, setRegistered });
  const { form: formQuickCompany, onSubmit: onSubmitQuickCompany } = useQuickForm({ handleNext , setCount });
  const { form, onSubmit } = useBlacklistProfileForm({ handleNext });
  const blackProfile = form.watch();
  const { form: formProfile, onSubmit: onSubmitProfile } = useQuickProfileForm({ handleNext, handleGotoStep, setCount, setRegistered, currentCount: count });
  const { form: formApplication, onSubmit: onSubmitApplication } = useApplicationForm({ profileId: 1, type: "NEW" });
  // const handleResetForm = () => {
  //   form.reset();
  //   handleReset();
  // };
  // Step 4 state
  const savedIds = localStorage.getItem("profileIds");
  const profileIds: number[] = savedIds ? JSON.parse(savedIds) : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleApplicationSubmit = async (data: any) => {
    await onSubmitApplication(data);

    if (currentIndex < profileIds.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleReset();
    }
  };
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <CompanyForm form={formQuickCompany} onSubmit={onSubmitQuickCompany} />;
      case 2:
        return <BlacklistProfileForm form={form} onSubmit={onSubmit} />;
      case 3:
        return <ProfileForm form={formProfile} handleNext={handleNext} onSubmit={onSubmitProfile} handlePrevious={handlePrevious} blackProfile={blackProfile} />;
      case 4: {
        return <ApplicationForm form={formApplication} onSubmit={handleApplicationSubmit} profileId={profileIds[currentIndex]}/>
      }
      default:
        return null;
    }
  };
  return (
    <div className="w-full bg-gradient-to-b p-4 flex items-center">
      <Card className={cn("shadow-lg", step > 1 ? "w-full" : "w-full lg:w-1/2")}>
        <CardContent className="pt-6 -mb-8">
          <div className="flex items-start gap-1">
            <div>
              <div
                key={step}
                className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-start"
              >
                <div className="space-y-1 px-5">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {step === 1 ? "ເລືອກຫົວໜ່ວຍທຸລະກິດ" : step === 2 ? "ຂັ້ນຕອນການກວດບັນຊີດໍາ" : ""}
                  </h3>
                  {step === 2 && (
                    <>
                      <h5 className="flex gap-1"><X className="text-red-500"/>ຍັງບໍ່ໄດ້ລົງທະບຽນ <h5 className="text-red-500">{count}</h5> ຄົນ</h5>
                      <h5 className="flex gap-1"><CheckCheck className="text-green-500"/>ລົງທະບຽນແລ້ວ <h5 className="text-green-500">{registered}</h5> ຄົນ</h5>
                    </>
                  )}
                </div>
              </div>
            </div>
            {step === 3 && (
              <div>
                <Form formInstance={formProfile} onSubmit={onSubmitProfile} className="border-none shadow-none -mt-6 -mb-10" showButton={false}>
                  <div className="flex flex-wrap gap-4 items-start">
                    <Form.Field name="image" control={formProfile.control} label="ຮູບພາບ (ຮູບໃຫມ່​)" required={false}>
                      <Form.Input.Image
                        label="3x4 cm"
                        iconImage={<SquareUserRound className="w-10 h-10" />}
                        accept="image/*"
                        className="flex items-center justify-center rounded-lg border border-dashed"
                      />
                    </Form.Field>
                    <Form.Field name="oldImage" control={formProfile.control} label="ຮູບພາບ (ຮູບເກົ່າ)" required={false}>
                      <Form.Input.Image
                        label="3x4 cm"
                        iconImage={<SquareUserRound className="w-10 h-10" />}
                        accept="image/*"
                        className="flex items-center justify-center rounded-lg border border-dashed bg-muted"
                      />
                    </Form.Field>
                  </div>
                </Form>
              </div>
            )}
          </div>
          {renderStepContent()}
        </CardContent>
      </Card>
    </div>
  );
}

const CompanyForm: React.FC<QuickCompanyProps> = ({ form, onSubmit }) => {
  const [isAddingCompany, setIsAddingCompany] = useState<boolean>(false);
  const { result: companyOptions } = useCompanyCombobox();
  const extendedCompanyOptions = [
    { label: '+ ເພີ່ມຫົວໜ່ວຍທຸລະກິດ', value: 'addCompany' },
    ...companyOptions,
  ];
  const handleVillageChange = (value: string | number) => {
    if (value === 'addCompany') {
      setIsAddingCompany?.(true);
      form.setValue('companyId', 0);
    } else {
      setIsAddingCompany?.(false);
      form.setValue('companyId', Number(value));
    }
  };
  return (
    <div className="pb-10">
      <Form formInstance={form} onSubmit={onSubmit} className="border-none shadow-none -mt-6 -mb-10 pb-8" showButton={true} saveButtonText="ຖັດໄປ">
        <Form.Field name="companyId" control={form.control} label="ຫົວໜ່ວຍທຸລະກິດ" required>
          <Form.Input.Combobox options={extendedCompanyOptions} onChange={handleVillageChange}/>
        </Form.Field>
        <Form.Field name="count" control={form.control} label="ຈໍານວນຄົນ" required>
          <Form.Input.Input/>
        </Form.Field>
      </Form>
      <AddCompanyDialog 
        open={isAddingCompany} 
        onOpenChange={setIsAddingCompany}
        onSuccess={(newCompany) => {
          form.setValue("companyId", newCompany.id);
        }}
      />
    </div>
  )
}