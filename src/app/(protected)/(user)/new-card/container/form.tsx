/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as z from "zod"
import { Form } from "@/components/containers/form";
import React, { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { Button, Card, Separator, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { formSchema } from "./schema";
import usePriceCombobox from "src/app/(protected)/(finance)/price/hook/usePriceCombobox";
import useProfileCombobox from "src/app/(protected)/(user)/profile-user/hook/useProfileCombobox";
import MultiFileUpload from "src/app/(protected)/(user)/new-card/uploadFile";

const formTitle = "ສ້າງແຟ້ມເອກກະສານ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງແຟ້ມ";
interface FolderFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: any;
  isEdit?: boolean;
  folderId?: number;
}

export const FolderForm: React.FC<FolderFormProps> = ({ form, onSubmit, isEdit = false }) => {

  // eslint-disable-next-line no-unused-vars
  const { result: priceOptions } = usePriceCombobox({ status: true });
  const { result: profileOption } = useProfileCombobox();
  const formRef = React.useRef<HTMLFormElement>(null);
  const price = [
    {
      value: JSON.stringify({
        id: "1",
        name: "ບັດໜື່ງປີ",
        price: "100",
      }),
      label: "ບັດໜື່ງປີ",
    },
    {
      value: JSON.stringify({
        id: "2",
        name: "ບັດ6ເດືອນ",
        price: "60",
      }),
      label: "ບັດ6ເດືອນ",
    },
    {
      value: JSON.stringify({
        id: "3",
        name: "ບັດ3ເດືອນ",
        price: "30",
      }),
      label: "ບັດ3ເດືອນ",
    },
  ];

  const [savedData, setSavedData] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | number>("");
  const [priceValue, setPriceValue] = useState<string | number>("");
  const [show, setShow] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([]);

  // const handlePriceChange = (
  //   groupIndex: number,
  //   itemIndex: number,
  //   value: string | number
  // ) => {
  //   let parsed: any = {};

  //   if (typeof value === "string") {
  //     try {
  //       parsed = JSON.parse(value);
  //     } catch { }
  //   }

  const handleProfileChange = (value: string | number) => {
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);

        setSelectedValue(value); // ເກັບ string ທີ່ຍັງເປັນ JSON

        form.setValue("id", parsed.id, { shouldValidate: true });
        form.setValue("firstName", parsed.firstName);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("JSON parse error", error);
      }
    }
  };
  // const handlePriceChange = (value: string | number) => {
  //   if (typeof value === "string") {
  //     try {
  //       const parsed = JSON.parse(value);
  //       console.log("parsed", parsed);
  //       setPriceValue(value); // ເກັບ string ທີ່ຍັງເປັນ JSON

  //       form.setValue("priceId", parsed.id, { shouldValidate: true });
  //       form.setValue("price", parsed.price);
  //       form.setValue("priceName", parsed.name);
  //     } catch (error) {
  //       console.error("JSON parse error", error);
  //     }
  //   }
  // };
  const handlePriceChange = (value: string | number) => {
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);

        setPriceValue(value); // ເກັບ JSON string

        form.setValue("priceId", Number(parsed.id), {
          shouldValidate: true,
        });

        form.setValue("price", parsed.price, {
          shouldValidate: true,
        });

        form.setValue("priceName", parsed.name, {
          shouldValidate: true,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("JSON parse error", error);
      }
    }
  };
  const onSubmitSuccess = (data: any) => {
    const fullData = {
      ...data,
      file: files.length > 0 ? files : [],  // ⭐ สำคัญ
    };
    setSavedData((prev) => [...prev, fullData]);

    setShow(true);

    // ✅ reset ทุกอย่างที่เกี่ยวข้อง
    form.reset();

    setFiles([]);          // ⭐ สำคัญมาก
    setSelectedValue("");  // reset combobox
    setPriceValue("");
  };

  // Extract the error handler
  const onSubmitError = (errors: any) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log("❌ Validation errors:", errors);
    }
  };

  // Now handleSave has no nested callbacks
  const handleSave = form.handleSubmit(onSubmitSuccess, onSubmitError);

  const handleDelete = (index: any) => {
    setSavedData(savedData.filter((_, i) => i !== index))
  }
  const onsubmit = async () => {
    const result = await onSubmit(savedData)
    if (result) { // ຖ້າ validation ຜ່ານ
      // setShow(false)
      // setSavedData([])
    }
  }

  return (
    <>
      <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle} formRef={formRef} showButton={false}
        className="z-10">

        <Separator />
        <div className="space-y-4">
          <h3 className="text-lg font-medium">ປະເພດບັດ</h3>

          <div className="p-4 border rounded-lg space-y-4">
            <h4 className="font-medium">ປະເພດບັດ  </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Field name="id" control={form.control} label="ບຸກຄົນ" >
                <Form.Input.Combobox placeholder="ເລື່ອກບຸກຄົນ" disabled={isEdit} options={profileOption} value={selectedValue} onChange={handleProfileChange} />
              </Form.Field>
              <Form.Field name="priceId" control={form.control} label="ປະເພດບັດ" >
                <Form.Input.Combobox placeholder="ປະເພດບັດ" className="w-full" options={price} value={priceValue} onChange={handlePriceChange} disabled={isEdit} formRef={formRef} />
              </Form.Field>
              <MultiFileUpload
                files={files}
                onChangeFiles={setFiles}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="end"
            onClick={handleSave}
          >
            ບັນທືກ
          </Button>
        </div>
      </Form>
      {show && (
        <>
          <Card className="mt-6 p-5">
            <div className="py-5">
              <h3 className="font-bold">ລາຍການບຸກຄົນຂໍອອກບັດ</h3>
              <p className="text-gray-500 text-sm mt-2">ຕ້ອງເລືອກປະເພດບັດໃຫ້ຄືກັນ</p>
            </div>
            <div className="overflow-x-auto">
              <Table className="border rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead>ລະຫັດບຸກຄົນ</TableHead>
                    <TableHead>ຊື່</TableHead>
                    <TableHead>ລະຫັດປະເພດບັດ</TableHead>
                    <TableHead>ປະເພດບັດ</TableHead>
                    <TableHead>ເອກະສານ</TableHead>
                    <TableHead>ລຶບ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savedData.map((item, index) => (
                    <DataRow
                      key={index}
                      item={item}
                      index={index}
                      onDelete={handleDelete}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-3 text-end">
              <Button onClick={onsubmit} > ບັນທືກ </Button>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
const FileList = ({ files }: { files: File[] }) => {
  if (!files || files.length === 0) {
    return <span className="text-gray-400">ບໍ່ມີໄຟ</span>;
  }

  const renderFile = (file: File, i: number) => (
    <li key={i}>
      <a
        href={URL.createObjectURL(file)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {file.name}
      </a>
    </li >
  );
  return <ul className="space-y-1">{files.map(renderFile)}</ul>;
};
const DataRow = ({
  item,
  index,
  onDelete,
}: {
  item: any;
  index: number;
  onDelete: (index: number) => void;
}) => (
  <TableRow>
    <TableCell>{item.id}</TableCell>
    <TableCell>{item.firstName}</TableCell>
    <TableCell>{item.priceId}</TableCell>
    <TableCell>{item.priceName}</TableCell>
    <TableCell>
      <FileList files={item.file} />
    </TableCell>
    <TableCell>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onDelete(index)}
      >
        ລົບ
      </Button>
    </TableCell>
  </TableRow>
);

