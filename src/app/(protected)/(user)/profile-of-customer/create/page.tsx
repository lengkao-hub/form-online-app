/* eslint-disable no-nested-ternary */

"use client";
import { Button, Card, CardContent, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";

import { StepIndicator } from "@/components/containers/StepIndicator";
import { type Step, useMultiStepForm } from "src/app/hook/useMultiStepForm";
import BlacklistProfileForm from "../../../blacklist/container/form/form";
import { useBlacklistProfileForm } from "../../../blacklist/hook/useForm";
import ProfileForm from "../container/form/form";
import { useProfileForm } from "../hook/useForm";
import { Form } from "@/components/containers/form";
import { SquareUserRound } from "lucide-react";
import { useState } from "react";

import { defaultValues } from "../container/form/schema"
import { set } from "date-fns";
import { ImageViewer } from "@/components/containers/image-viewer";

const FORM_STEPS: Step[] = [
  { number: 1, title: "ກວດບັນຊີດໍາ" },
  { number: 2, title: "ປ້ອນຂໍ້ມູນບຸກຄົນ" },
];

export default function UserCreate() {
  const { step, handleNext, handlePrevious, handleStepClick, handleReset } = useMultiStepForm({ steps: FORM_STEPS });
  const { form, onSubmit } = useBlacklistProfileForm({ handleNext });
  const blackProfile = form.watch();
  const handleResetForm = () => {
    form.reset();
    handleReset();
  };
  const [savedData, setSavedData] = useState<any[]>([]);
  const handleSubmit = () => {
    onSubmitProfile(savedData);
    console.log("data=====>", savedData)
    // setSavedData([]);
  };
  const { form: formProfile, onSubmit: onSubmitProfile } = useProfileForm({ handleReset, handleResetForm });
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <BlacklistProfileForm form={form} onSubmit={onSubmit} />;
      case 2:
        return <ProfileForm form={formProfile} setSavedData={setSavedData} handleReset={handleReset} handlePrevious={handlePrevious} blackProfile={blackProfile} />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="w-full bg-gradient-to-b p-4 flex items-center justify-center">
        <Card className="w-full  mx-auto shadow-lg">
          <CardContent className="pt-6 -mb-8">
            <div className="flex items-start gap-1">
              <div>
                <div className="mb-1 px-2">
                  <StepIndicator steps={FORM_STEPS} currentStep={step} onStepClick={handleStepClick} />
                </div>
                <div
                  key={step}
                  className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-start"
                >
                  <div className="space-y-1 px-5">
                    <h3 className="text-2xl font-bold tracking-tight">
                      {step === 1 ? "ຂັ້ນຕອນນີ້ກວດບັນຊີບັນດໍາ ແລະ ບຸກຄົນທີ່ມີຂໍ້ມູນແລ້ວ" : step === 2 ? "ຂັ້ນຕອນນີ້ເພີ່ມຂໍ້ມູນບຸກຄົນ" : ""}
                    </h3>
                  </div>
                </div>
              </div>
              {step === 2 && (
                <div>
                  <Form formInstance={formProfile} onSubmit={onSubmitProfile} className="border-none shadow-none -mt-6 -mb-10" showButton={false}>
                    <div className="flex flex-wrap gap-4 items-start">
                      <Form.Field name="image" control={formProfile.control} label="" required={false}>
                        <Form.Input.Image
                          label="3x4 cm"
                          iconImage={<SquareUserRound className="w-10 h-10" />}
                          accept="image/*"
                          className="flex items-center justify-center rounded-lg border border-dashed"
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
      {savedData.length > 0 && (
        <div className="w-full bg-gradient-to-b p-4 flex items-center justify-center">
          <Card className="w-full  mx-auto shadow-lg">
            <CardContent>
              <Table className="border-collapse border border-gray-300 mt-6 w-full text-center">
                <TableHeader>
                  <TableRow>
                    <TableHead className="border border-gray-300 p-2">ລໍາດັບ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ຮູບພາບ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ຊື່</TableHead>
                    <TableHead className="border border-gray-300 p-2">ນາມສະກຸນ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ເບີໂທລະສັບ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ວັນເດືອນປີເກີດ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ເພດ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ສັນຊາດ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ເຜົ່າ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ປະເພດເອກະສານ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ວັນອອກເອກະສານ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ເລກເອກະສານ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ວັນໝົດອາຍຸ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ແຂວງ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ເມືອງ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ບ້ານ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ປະເທດຕ່າງປະເທດ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ແຂວງຕ່າງປະເທດ</TableHead>
                    <TableHead className="border border-gray-300 p-2">ລົບ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savedData.map((item, index) => (
                    <TableRow key={index}>

                      <TableCell className="border border-gray-300 p-2">{index + 1}</TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        <ImageViewer src={item.imageUrl} className="my-1 h-14 w-14" />
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">{item.firstName}</TableCell>
                      <TableCell className="border border-gray-300 p-2">{item.lastName}</TableCell>
                      <TableCell className="border border-gray-300 p-2">{item.phoneNumber}</TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        {item.dateOfBirth
                          ? new Date(item.dateOfBirth).toLocaleDateString("lo-LA", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          : "-"}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">{item.gender}</TableCell>
                      <TableCell className="border border-gray-300 p-2">{item.nationalityId}</TableCell>
                      <TableCell className="border border-gray-300 p-2">{item.ethnicityId}</TableCell>
                      <TableCell className="border border-gray-300 p-2">{item.identityType}</TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        {item.identityIssueDate
                          ? new Date(item.identityIssueDate).toLocaleDateString("lo-LA", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          : "-"}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">{item.identityNumber}</TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        {item.identityExpiryDate
                          ? new Date(item.identityExpiryDate).toLocaleDateString("lo-LA", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          : "-"}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2">{item.currentProvince}</TableCell>
                      <TableCell className="border border-gray-300 p-2">{item.currentDistrict}</TableCell>
                      <TableCell className="border border-gray-300 p-2">{item.currentVillageId}</TableCell>
                      <TableCell className="border border-gray-300 p-2">{item.overseasCountryId}</TableCell>
                      <TableCell className="border border-gray-300 p-2">{item.overseasProvince}</TableCell>
                      <TableCell className="border border-gray-300 p-2">
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => setSavedData(prev => prev.filter((_, i) => i !== index))}
                        >
                          ລົບ
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                className="mt-4 bg-sky-500 hover:bg-sky-400"
                onClick={() => handleSubmit()}
              > ບັນທືກ</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

