"use client"

import { useOne } from "@/hooks/useOne";
import { format, formatDate } from "date-fns";
import { ForwardedRef, forwardRef } from "react";
import { IHistory, IProfile } from "src/app/(protected)/profile/type";

const Certificate = forwardRef(function Certificate(
  { profileId }: { profileId: number },
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { data } = useOne({ resource: "profile", id: Number(profileId) });
  const profile: IProfile = data?.result as IProfile;

  if (!profile) {
    return null;
  }

  return (
    <div className="flex justify-center" ref={ref}>
      <div className="w-[8.27in] h-[11.69in] p-[0.5in]">
        <div className="text-center text-[12pt]">
          <p>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</p>
          <p>ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນະຖາວອນ</p>
        </div>
        <div className="flex justify-center items-center py-1">
          <h2 className="text-[14pt] font-bold">ໃບຢັ້ງຢືນການອອກບັດ</h2>
        </div>
        <CertificateDate applicationNumber={"01644"} />
        <PersonalDetails profile={profile} />
        <History profileId={Number(profile?.id)} />
      </div>
    </div>
  );
});

const CertificateDate = ({ applicationNumber }:{ applicationNumber: string }) => {
  const formNumber: number = Number(applicationNumber)
  const currentDate: Date = new Date()
  return(
    <div className="flex justify-between items-end mb-3">
      <div>
        <p>ກົມໃຫຍ່ສັນຕິບານ</p>
        <p>ກົມ ຄຕທ</p>
        <p>ຫ້ອງການ ຄຕທ ຂສມຄ</p>
      </div>
      <div className="text-end">
        <p>ເລກທີ:&nbsp;<span className="underline decoration-dotted underline-offset-4">{formNumber}</span></p>
        <p className="flex justify-end">ລົງວັນທີ:&nbsp;<span className="underline decoration-dotted underline-offset-4">{format(currentDate, "dd/MM/yyyy")}</span></p>
      </div>
    </div>
  );
}

const PersonalDetails = ({ profile }:{ profile: IProfile } ) => {
  if (!profile) {
    return;
  }
  const { 
    gender, 
    lastName, 
    firstName, 
    dateOfBirth, 
    nationality, 
    identityNumber, 
    overseasProvince, 
    identityIssueDate,
    image,
  } = profile;
  const age = calculateAge(dateOfBirth)
  const title = (gender === "MALE" || gender === "M") ? "MS" : "MR"
  return(
    <div className="flex gap-8">
      <div>
        <img 
          src={image}
          alt="personal-img"
          width={150}
          height={80}
        />
      </div>
      <div>
        <p>ຊື່:&nbsp;<span className="underline decoration-dotted underline-offset-4">{title}&nbsp;{firstName}</span></p>
        <p>ນາມສະກຸນ:&nbsp;<span className="underline decoration-dotted underline-offset-4">{lastName}</span></p>
        <p>ອາຍຸ:&nbsp;<span className="underline decoration-dotted underline-offset-4">&nbsp;{age}&nbsp;</span></p>
        <p>ວັນເດືອນປີເກິດ:&nbsp;<span className="underline decoration-dotted underline-offset-4">{formatDate(dateOfBirth, "dd/MM/yyyy")}</span></p>
        <p>ເຊື້ອຊາດ:&nbsp;
          <span className="underline decoration-dotted underline-offset-4">&nbsp;{nationality?.code}&nbsp;</span>,&nbsp;ສັນຊາດ:&nbsp;
          <span className="underline decoration-dotted underline-offset-4">&nbsp;{nationality?.code}&nbsp;</span></p>
        <p>ບັດປະຈໍາຕົວ:&nbsp;<span className="underline decoration-dotted underline-offset-4">{identityNumber}</span></p>
        <p>ລົງວັນທີ:&nbsp;<span className="underline decoration-dotted underline-offset-4">{formatDate(identityIssueDate, "dd/MM/yyyy")}</span></p>
        <p>ທີ່ຢູ່ຕ່າງປະເທດ:&nbsp;
          <span className="underline decoration-dotted underline-offset-4">&nbsp;{nationality.name}&nbsp;</span>&nbsp;-&nbsp;ແຂວງ:&nbsp;
          <span className="underline decoration-dotted underline-offset-4">&nbsp;{overseasProvince}&nbsp;</span></p>
      </div>
    </div>
  );
}

const History = ({ profileId }:{ profileId: number }) => {
  const { data } = useOne<IHistory[]>({ resource: "application/history", id: profileId })
  const historyList = data?.result;
  return(
    <div className="relative">
      <div className="flex justify-center items-center py-2">
        <h2 className="text-[14pt] font-bold">ປະຫວັດການອອກບັດຢັ້ງຢືນການພັກເຊົ່າຊົ່ວຄາວ</h2>
      </div>
      <ol className="pl-4 py-2">
        {(historyList && historyList.length > 0) && (
          historyList.map((item) => (
            <li key={item.id}>
              <div className="flex">ໜ້າທີ່:&nbsp;
                <p className="underline decoration-dotted underline-offset-4">{item?.position?.laoName}</p>&nbsp;
                <p className="underline decoration-dotted underline-offset-4">{item?.company?.name}</p>,&nbsp;
                ຕັ້ງແຕ່ວັນທີ&nbsp;
                <p className="underline decoration-dotted underline-offset-4">{formatDate(item.issueDate, "dd/MM/yyyy")}&nbsp;-&nbsp;{formatDate(item.expirationDate, "dd/MM/yyyy")}</p>
              </div>
            </li>
          ))
        )}
      </ol>
      <p>&emsp;&emsp;&emsp;ເອກະສານສະບັບນີ້ແມ່ນເອກະສານຢັ້ງຢືນວ່າຜຸ້ກ່ຽວໄດ້ມາອອກບັດຢັ້ງຢືນການພັກເຊົານໍາກົມຕໍາຫຼວດຄຸ້ມຄອງຄົນຕ່າງປະເທດແທ້.</p>
      <div className="absolute right-10 -bottom-32 text-center flex flex-col gap-6">
        <p>ລາຍເຊັນເຈົ້າໜ້າທີ່</p>
        <p>......................................</p>
      </div>
    </div>
  );
}

function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassedThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassedThisYear) {
    age--;
  }

  return age;
}

export default Certificate;