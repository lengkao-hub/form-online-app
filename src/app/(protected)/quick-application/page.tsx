/* eslint-disable max-nested-callbacks */
/* eslint-disable no-nested-ternary */

"use client";
import { Button, Card, CardContent, Separator, Spinner } from "@/components/ui";

import { type Step, useMultiStepForm } from "src/app/hook/useMultiStepForm";
import { Form } from "@/components/containers/form";
import { CheckCheck, SquareUserRound, X } from "lucide-react";
import { useQuickProfileForm } from "../profile/hook/useForm";
import { useQuickBlacklistProfileForm } from "../blacklist/hook/useForm";
import ProfileForm from "../profile/container/form/form";
import { useState } from "react";
import BlacklistProfileForm from "../blacklist/container/form/form";
import { cn } from "@/lib/utils";
import FolderCardView from "../(application)/folder/container/card";
import useFolderTable from "../(application)/folder/hook/useFolderList";
import { getOfficeId } from "@/lib/getSession";
import { FolderToolbar } from "./container/filter";
import { ApplicationStep } from "./container/applicationStep";

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
  const { form, onSubmit, foundProfile, addProfile, clearProfile  } = useQuickBlacklistProfileForm({ handleGotoStep, setCount, setRegistered, currentCount: count });
  const blackProfile = form.watch();
  const { form: formProfile, onSubmit: onSubmitProfile } = useQuickProfileForm({ handleNext, handleGotoStep, setCount, setRegistered, currentCount: count });
  const savedIds = localStorage.getItem("profileIds");
  const profileIds: number[] = savedIds ? JSON.parse(savedIds) : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <FolderListPoliceOfficer setCount={setCount} setRegistered={setRegistered} handleGotoStep={handleGotoStep}/>;
      case 2:
        return <BlacklistProfileForm form={form} onSubmit={onSubmit} found={foundProfile} add={addProfile} clear={clearProfile}/>;
      case 3:
        return <ProfileForm form={formProfile} handleNext={handleNext} onSubmit={onSubmitProfile} handlePrevious={handlePrevious} blackProfile={blackProfile} />;
      case 4:
        return (
          <ApplicationStep
            profileId={profileIds[currentIndex]}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            profileIds={profileIds}
            handleReset={handleReset}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="w-full bg-gradient-to-b flex items-center">
      <Card className={cn("w-full", step > 1 ? "shadow-lg" : "border-none shadow-none")}>
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

function FolderListPoliceOfficer({ 
  setCount,
  setRegistered,
  handleGotoStep, 
}: { 
  setCount: (id: number) => void, 
  handleGotoStep: (id: number) => void 
  setRegistered: (id: number) => void 
}) {
  const officeListIds = getOfficeId()
  const { result: resultPreview, updateSearch: updateSearchPreview, filter: filterPreview, limit: previewLimit, loading } = useFolderTable({ status: "POLICE_UNDER_REVIEW", officeId: officeListIds, manual: true  });
  if (loading) {
    return <Spinner />
  }
  return (
    <div className="pl-4 space-y-2 mt-3">
      <div>
        <div className='space-y-4'>
          <FolderToolbar updateSearch={updateSearchPreview} filter={filterPreview} />
          <Separator className="my-4" />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6'>
            {resultPreview.length > 0 ? (
              resultPreview?.map((folder) => (
                <FolderCardView 
                  folder={folder} 
                  status="APPROVED_BY_PROVINCE" 
                  key={folder?.id} 
                  action={{ showDetail: "ລາຍລະອຽດ", application: "ລົງທະບຽນດ່ວນ" }}
                  onClick={() => {
                    const availableCount = folder.number?.filter((n: any) => n.isAvailable).length ?? 0
                    const unavailableCount = folder.number?.filter((n: any) => !n.isAvailable).length ?? 0
                    localStorage.setItem("profileIds", JSON.stringify([]));
                    localStorage.setItem("selectedFolderId", String(folder.id))
                    setCount(availableCount)
                    setRegistered(unavailableCount)
                    if (availableCount > 0) {
                      handleGotoStep(2)
                    }
                  }} 
                />
              ))
            ):(
              <div className="text-center col-span-3">
                No data
              </div>
            )}
          </div>
          {resultPreview.length > 9 && (
            <div className="w-full flex justify-end">
              <Button className="bg-none" onClick={() => previewLimit.setLimit(previewLimit.limit += 9) }>ສະແດງເພີ່ມເຕີມ</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}