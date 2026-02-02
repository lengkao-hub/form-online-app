"use client";
import { TitleLabel } from "@/components/containers/headerLabel";
import FolderCardList from "../../profile/container/card/folder-card";
import useCardReject from "./hook/useCardRejected"
export default function UserPage() {
  const { result, loading } = useCardReject();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ປະຕິເສດ' subtitle='ນີ່ແມ່ນລາຍການຂໍ້ມູນປະຕິເສດການອະນຸມັດ' />
      </div>
      <FolderCardList result={result} loading={loading} showedit={true} />
    </div>
  );
}
