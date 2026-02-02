"use client";
import { TitleLabel } from "@/components/containers/headerLabel"; 
import FolderCardList from "./container/card/folder-card";
import useFolderCard from "./hook/usefolder-card";
export default function UserPage() {
  const { result, loading } = useFolderCard();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ລໍຖ້າອະນຸມັດ' subtitle='ນີ່ແມ່ນລາຍການຂໍ້ມູນລົງທະບຽນບຸກຄົນທີ່ລໍຖ້າອະນຸມັດ' />
        {/* <CreateButton resouce="profile" title='ລົງທະບຽນບຸກຄົນ' /> */}
      </div>

      <FolderCardList result={result} loading={loading} showedit={false} />
    </div>
  );
}
 
