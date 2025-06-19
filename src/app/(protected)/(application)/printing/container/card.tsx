
import Image from "next/image";
import { IApplication } from "../../application/type";
import { Barcode, formatDateString2, formatDateString, QRcode } from "./barcode";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export function StayPermitCard({ application, bgOptions, barCodeOptions, className }: { application?: IApplication, bgOptions?: string, barCodeOptions?: string, className?: string }) {
  const { expirationDate = "", issueDate = "" } = application || {};
  const profile = application?.profile?.image
  const bgColor = bgOptions === "print:bg-[#B69E80]"? "bg-amber-200": "";
  const isQRcode = barCodeOptions === "qrcode"
  return (
    <div className='flex justify-center box-border font-Phetsarath'>
      <div className='grid justify-center text-[#000000]'>
        <div className={cn(`${bgColor} text-[10.8px] scale-[1.9] print:scale-100 relative box-border border border-gray-500 print:border-none p-[6px] pl-[8.55px] w-[323.5px] h-[204px] mix-blend-multiply rounded-lg print:w-fit print:h-[101%] print:absolute print:top-[-2.5px] print:left-[2px] print:m-0 print:rounded-none ${bgOptions} print:px-[7px]`, className && `${className}`)}>
          <div className="p-0 pb-[4px]">
            <div className='leading-[1]'>
              <div className="text-center font-bold tracking-tight leading-[1.2] text-[10pt]">ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</div>
              <div className="text-center font-bold pb-[2px] print:pb-[2px] leading-[1] print:leading-[1.25] font-TimesNewRoman text-[7.5pt] print:text-[8pt]">Lao People&apos;s Democratic Republic</div>
              <div className="text-center font-bold tracking-normal flex justify-center text-[8pt] print:text-[8.5pt] text-[#000000]">
                ບັດອະນຸຍາດພັກເຊົາ&nbsp;/&nbsp;
                <div className="text-center font-bold tracking-tight font-TimesNewRoman text-[#000000]">Stay permit Card</div>
              </div>
            </div>
            <div className="absolute top-2 left-3 print:top-2 print:left-3">
              <Image src={"/police_logo.png"} alt="Police Logo" width={38} height={30} className="bg-none mix-blend-multiply"/>
            </div>
          </div>
          <div className="p-0 font-normal">
            <div className="w-full flex justify-between gap-1">
              <div className="pr-[2px] print:pr-2 flex items-center print:items-start print:mt-[24px] print:pt-[2px]">
                <div className="w-[66.1px] h-[83.5px] print:w-[80px] print:h-[98px]">
                  {profile ? (
                    <Image
                      src={profile}
                      alt="ຮູບພາບບຸກຄົນ"
                      width={66.5}
                      height={85}
                      unoptimized
                      className="object-fill h-full w-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-white">
                    </div>
                  )}
                </div>
              </div>
              <ProfileSection application={application} />
              <ContactSection application={application} />
            </div>
            <BarcodeSection expirationDate={expirationDate} issueDate={issueDate} barcode={application?.profile?.barcode} isQRcode={isQRcode} />
            <DateSection expirationDate={expirationDate} issueDate={issueDate} isQRcode={isQRcode} barcode={application?.profile?.barcode}/>
            <div className="absolute flex flex-col items-center right-2 print:right-3 bottom-[6px] print:bottom-[8px] z-0 leading-[0.7] font-bold">
              <Image src={"/immigration2.png"} alt="Logo" width={100} height={100} className="print:w-[120px] print:h=[120px]"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileSection({ application }: { application?: IApplication }) {
  const { firstName = "", lastName = "", dateOfBirth = "", identityType = "", gender } = application?.profile || {};
  const title = (gender === "MALE" || gender === "M") ? "MR" : "MS"
  return (
    <div className="w-[165px] leading-[0.98] print:leading-[1.14] print:tracking-tight font-bold">
      <div>
        <div>
          <p className="text-start text-[7pt] mb-[2.5px]">ຊື່/Name
            <br></br>
            <span className="font-TimesNewRoman uppercase text-[7.5pt]">
              {title}&nbsp;{firstName}
            </span>
          </p>
          <p className="text-start text-[7pt] mb-[2.5px] text-[#000000]">ນາມສະກຸນ/Surname
            <br></br>
            <span className="font-TimesNewRoman uppercase text-[7.5pt] text-[#000000]">{lastName}</span>
          </p>
        </div>
      </div>
      <div className="flex gap-1 items-center mb-[1px] print:mb-[2px] text-[#000000]">
        <div>
          <p className="text-start text-[7pt] print:text-[7.5pt]">ວັນເດືອນປີເກີດ/Date of Birth:</p>
          <p className="text-start text-[7pt] print:text-[7.5pt]">{formatDateString2(dateOfBirth)}</p>
        </div>
      </div>
      <div className="flex gap-1 items-center mb-[1px] print:mb-[2px] text-[#000000]">
        <div>
          <p className="text-start text-[7pt] print:text-[7.5pt] tracking-tighter">ເອກະສານເດີນທາງ/Travel document:</p>
          <p className="text-start text-[7pt] print:text-[7.5pt]">{documentType.find((item) => item.value === identityType)?.label || ""}</p>
        </div>
      </div>
      <div className="flex items-center justify-start relative mb-[1px] print:mb-[2px] text-[#000000]">
        <div >
          <p className="text-start text-[7pt] print:text-[7.5pt]">ສະຖານທີ່ພັກເຊົາ/Living place:</p>
          <p className="text-start text-[7pt] print:text-[7.5pt] w-[140px] print:w-[146px] overflow-hidden line-clamp-2 pt-[3px]">
            {/* eslint-disable-next-line no-magic-numbers */}
            {application?.company?.name ? (
              /* eslint-disable-next-line no-magic-numbers */
              application.company.name
            ) : (
              /* eslint-disable-next-line no-magic-numbers */
              application?.village?.villageLao
            )}
          </p>
        </div>
      </div>
      <p className="text-start text-[7pt] print:text-[7.5pt]">ໜ້າທີ່/Position: <span className="font-TimesNewRoman text-[#000000]"></span>
        {application?.position?.laoName}
      </p>
    </div>
  );
}
const documentType = [
  { value: "passport", label: "Passport" },
  { value: "nationalId", label: "ບັດປະຈຳຕົວ" },
  { value: "driverLicense", label: "ໃບຂັບຂີ່" },
]
export function BarcodeSection({ 
  expirationDate, 
  issueDate, 
  barcode, 
  isQRcode, 
  applicationType, 
}: { 
  expirationDate: string, 
  issueDate: string,
  barcode?: number, 
  isQRcode?: boolean, 
  applicationType?: string 
}) {
  const barcodeStr = String(barcode);
  const { data: session } = useSession();
  const officeId = session?.user?.officeId;
  const officeIdStr = officeId === null ? "000" : String(officeId).padStart(3, "0");
  const fullBarcode = officeIdStr + barcodeStr;
  return (
    <div >
      {isQRcode ? (
        <div className="absolute bottom-[3px] print:bottom-[5px] left-2 print:left-1 z-0 text-[#000000] flex items-center gap-[23px] print:gap-[40.5px]">
          {applicationType ? (
            <div className="barcode">
              <QRcode barcode={fullBarcode} bg={"#f56565"}/>
            </div>
          ) : (
            <div className="barcode">
              <QRcode barcode={fullBarcode}/>
            </div>
          )}
          <div className="pt-[18px]">
            <p className="text-[7pt] leading-[1] font-bold flex">ອອກໃຫ້ວັນທີ&#x3a;&nbsp;
              <p className="text-[red]">{formatDateString(issueDate)}</p>
            </p>
            <p className="text-[7pt] leading-[1] font-bold flex">ໝົດອາຍຸວັນທີ&#x3a;&nbsp;
              <p className="text-[red]">{formatDateString(expirationDate)}</p>
            </p>
          </div>
        </div>
      ):(
        <div className="absolute bottom-[6px] print:bottom-[8.5px] left-2 print:left-[8px] z-0 font-bold text-[#000000]">
          <div>
            <p className="text-[6pt] print:text-[6.5pt] leading-[1.1] text-[#000000]">ເລກທີ/ຄຕທ</p>
            <p className="text-[5.39pt] print:text-[6pt] leading-[1.1] font-TimesNewRoman text-[#000000]">{fullBarcode}</p>
          </div>
          <div className="barcode w-[160px] h-[25px]">
            <Barcode barcode={fullBarcode} />
          </div>
        </div>
      )}
    </div>
  );
}

export function DateSection({ 
  expirationDate, 
  issueDate,  
  isQRcode,
  barcode,
}: { 
  expirationDate: string, 
  issueDate: string,
  isQRcode: boolean,
  barcode?: number
}) {
  const barcodeStr = String(barcode);
  const { data: session } = useSession();
  const officeId = session?.user?.officeId;
  const officeIdStr = officeId === null ? "000" : String(officeId).padStart(3, "0");
  const fullBarcode = officeIdStr + barcodeStr;
  return (
    <div >
      {isQRcode ? (
        <div className="flex items-center gap-[2px] absolute top-14 right-2 print:leading-tight print:tracking-tight font-bold">
          <p className="text-[7pt] flex items-center leading-[1] text-[#000000] font-bold">ເລກທີ&#x3a;&nbsp;{fullBarcode}/ຄຕທ</p>
        </div>
      ):(
        <div className="flex items-center gap-[2px] absolute top-12 right-2 print:leading-tight print:tracking-tight font-bold">
          <p className="text-start leading-3 text-[7pt] text-[#000000]">ກໍານົດອາຍຸ/<span className="font-TimesNewRoman">Exp :</span></p>
          <div className='print:tracking-tighter text-[#000000]'>
            <p className="text-[red] text-[6pt] print:text-[6.5pt] font-TimesNewRoman">{formatDateString(issueDate)}</p>
            <p className="text-[red] text-[6pt] print:text-[6.5pt] font-TimesNewRoman">{formatDateString(expirationDate)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function ContactSection({ application }: { application?: IApplication }) {
  const { ethnicity, nationality, identityNumber = "" } = application?.profile || {};
  return (
    <div className='w-[100px] print:leading-[1.39] pt-6 pl-4 font-bold'>
      <div className="pb-[2px] text-[#000000]">
        <div className="flex items-center">
          <p className="flex items-center text-start text-[7pt] print:text-[7.5pt] leading-[1.2]">ເຊື້ອຊາດ/
            <span className="text-[7pt] font-TimesNewRoman">Race:</span>
          </p>
          {/* <p >Race:</p> */}
        </div>
        <div>
          <p className="text-start text-[7pt] print:text-[7.5pt] font-TimesNewRoman leading-[1.2] text-[#000000]">{ethnicity?.code}</p>
        </div>
      </div>
      <div className="items-center pb-[2px] text-[#000000]">
        <div>
          <p className="flex text-start text-[7pt] print:text-[7.5pt] leading-[1.2]">ສັນຊາດ/
            <p className="text-start text-[7pt] print:text-[7.5pt] font-TimesNewRoman">Nationality:</p>
          </p>
        </div>
        <div>
          <p className="text-start text-[7pt] print:text-[7.5pt] font-TimesNewRoman leading-[1.2]">{nationality?.nationality}</p>
        </div>
      </div>
      <div className="items-center print:mb-[5px] pb-[2px] text-[#000000]">
        <div>
          <p className="flex text-start text-[7pt] print:text-[7.5pt] leading-[1.2]">ເລກທີ/<p className="text-[8px] font-TimesNewRoman">No:</p></p>
          {/* <p className="text-start text-[8px] font-TimesNewRoman">No:</p> */}
        </div>
        <div>
          <p className="text-start text-[8px] print:text-[8.5pt] leading-[1.2]">{identityNumber}</p>
        </div>
      </div>
    </div>
  );
}