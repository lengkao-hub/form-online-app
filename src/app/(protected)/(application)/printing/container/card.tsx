
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
        <div className={cn(`${bgColor} text-[10.8px] scale-[1.9] print:scale-100 relative box-border border border-gray-500 print:border-none p-[6px] pl-[7.5px] w-[323.5px] h-[204px] mix-blend-multiply rounded-lg print:w-fit print:h-[101%] print:absolute print:top-[-2.5px] print:left-[2px] print:m-0 print:rounded-none ${bgOptions} print:px-[7px]`, className && `${className}`)}>
          <div className="p-0 pb-[1px]">
            <div className='leading-[1.2]'>
              <div className="text-center font-semibold tracking-tight leading-[1.2] text-[9pt]">ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</div>
              <div className="text-center font-semibold pb-[2px] print:pb-[2px] leading-[1] print:leading-[1.25] font-TimesNewRoman text-[7.5pt] print:text-[8pt]">Lao People&apos;s Democratic Republic</div>
              <div className="text-center font-semibold tracking-normal flex justify-center text-[9pt] print:text-[9pt] text-black">
                ບັດອະນຸຍາດພັກເຊົາຄົນຕ່າງປະເທດ
              </div>
              <div className="text-center font-semibold tracking-tight font-TimesNewRoman text-black">Stay Permit Card</div>
            </div>
            <div className="absolute top-2 left-3 print:top-2 print:left-4">
              <Image src={"/police_logo.png"} alt="Police Logo" width={38} height={30} className="print:w-[40px] print:h-[54px] bg-none mix-blend-multiply"/>
            </div>
          </div>
          <div className="p-0 font-normal">
            <div className="w-full flex justify-between gap-[2px]">
              <div className="pr-[2px] print:pr-1 flex items-start print:items-start mt-1 print:mt-[3.5px] print:-ml-[3px]">
                <div className="w-[66.1px] h-[83.5px] print:w-[68px] print:h-[85px]">
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
              <div className="w-[85%]">
                <ProfileSection application={application} />
              </div>
            </div>
            <BarcodeSection expirationDate={expirationDate} issueDate={issueDate} barcode={application?.profile?.barcode} isQRcode={isQRcode} />
            <DateSection expirationDate={expirationDate} issueDate={issueDate} isQRcode={isQRcode} barcode={application?.profile?.barcode}/>
            <div className="absolute flex flex-col items-center right-1 print:right-1 bottom-[4px] print:bottom-[1px] z-0 leading-[0.7] font-semibold">
              <Image src={"/immigration4.png"} alt="Logo" width={1000} height={1000} className="w-[100px] print:w-[110px] font-semibold "/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileSection({ application }: { application?: IApplication }) {
  const { firstName = "", lastName = "", dateOfBirth = "", identityNumber, gender, identityIssueDate } = application?.profile || {};
  const title = (gender === "MALE" || gender === "M") ? "MR." : "MS."
  return (
    <div className="leading-[0.98] print:leading-[0.9] print:tracking-tight font-semibold mt-[1px] print:mt-[1px] w-full">
      <div>
        <div >
          <p className="text-start font-semibold flex text-[7pt] mb-[1.5px] print:mb-[1.5px]">ຊື່/Name:&nbsp;
            <span className="font-TimesNewRoman uppercase text-[6pt] font-semibold">
              {title}&nbsp;{firstName}
            </span>
          </p>
          <p className="text-start font-semibold text-[7pt] mb-[1.5px] print:mb-[1.5px] text-[#000000]">ນາມສະກຸນ/Surname:&nbsp;
            <span className="font-TimesNewRoman font-semibold uppercase text-[6pt] text-[#000000]">{lastName}</span>
          </p>
        </div>
      </div>
      <div className="flex">
        <div>
          <div className="flex gap-2 items-center mb-[1px] print:mb-[2px] text-[#000000]">
            <div>
              <p className="text-start font-semibold text-[7pt] print:text-[7pt]">ວັນເດືອນປີເກີດ</p>
              <p className="text-start font-semibold text-[7pt] print:text-[7pt]">Date of Birth:</p>
            </div>
            <div>
              <p className="text-start font-semibold text-[7pt] print:text-[7pt]">{formatDateString2(dateOfBirth)}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center mb-[1px] print:mb-[2px] text-[#000000]">
            <div>
              <p className="text-start font-semibold text-[7pt] print:text-[7pt] tracking-tighter">ໜັງສືຜ່ານແດນ:</p>
              <p className="text-start font-semibold text-[7pt] print:text-[7pt] tracking-tighter">Passport No. :</p>
            </div>
            <div>
              <p className="text-start font-semibold text-[7pt] print:text-[7pt] uppercase">{identityNumber}</p>
            </div>
          </div>
          <div className="flex gap-1 items-center mb-[1px] print:mb-[2px] text-[#000000]">
            <div>
              <p className="text-start font-semibold text-[7pt] print:text-[7pt] tracking-tighter">ລົງວັນທີ</p>
              <p className="text-start font-semibold text-[7pt] print:text-[7pt] tracking-tighter">Date Of Issue:</p>
            </div>
            <div>
              <p className="text-start font-semibold text-[7pt] print:text-[7pt]">{formatDateString(identityIssueDate)}</p>
            </div>
          </div>
          <div className="flex gap-1 items-center text-[#000000]">
            <div className="leading-[0.9]">
              <p className="flex text-start font-semibold text-[7pt] print:text-[7pt]">ໜ້າທີ່: </p>
              <p className="flex text-start font-semibold text-[7pt] print:text-[7pt]">Position:</p>
            </div>
            <div>
              <p className="text-start font-semibold text-[7pt] print:text-[7pt]">{application?.position.laoName}</p>
            </div>
          </div>
          {/* <div className="flex gap-1 items-center mb-[1px] print:mb-[2px] text-[#000000]">
            <div>
              <p className="text-start font-semibold text-[7pt] print:text-[7.5pt] tracking-tighter">ເອກະສານເດີນທາງ/Travel document:</p>
              <p className="text-start font-semibold text-[7pt] print:text-[7.5pt]">{documentType.find((item) => item.value === identityType)?.label || ""}</p>
            </div>
          </div> */}
          <div className="flex items-center justify-start relative mb-[1px] print:mb-[2px] text-[#000000]">
            <div className="leading-[0.9]">
              {/* <p className="text-start font-semibold text-[7pt] print:text-[7.5pt]">ບ່ອນເຮັດວຽກ/Working place:</p> */}
              <p className="text-start font-semibold text-[7pt] h-auto print:text-[7pt] w-[140px] print:w-[136px] overflow-hidden line-clamp-2 pt-[1.5px]">
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
        </div>   
        <ContactSection application={application} />
      </div>
      {/* <p className="text-start font-semibold text-[7pt] print:text-[7.5pt]">ໜ້າທີ່/Position: <span className="font-TimesNewRoman text-[#000000]"></span>
        {application?.position?.laoName}
      </p> */}
    </div>
  );
}

export function BarcodeSection({ 
  // expirationDate, 
  // issueDate, 
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
        <div className="absolute bottom-[3px] print:bottom-[5px] left-2 print:left-[7px]   z-0 text-[#000000] flex items-center gap-[23px] print:gap-[32
        px]">
          {applicationType ? (
            <div className="barcode">
              <QRcode barcode={fullBarcode} bg={"#f56565"}/>
            </div>
          ) : (
            <div className="barcode">
              <QRcode barcode={fullBarcode}/>
            </div>
          )}
          <div className="pt-[28px]">
            {/* <p className="text-[7pt] print:text-[7.5pt] leading-[1] font-semibold flex">ອອກໃຫ້ວັນທີ&#x3a;&nbsp;
              <p className="text-[red]">{formatDateString(issueDate)}</p>
            </p>
            <p className="text-[7pt] print:text-[7.5pt] leading-[1] font-semibold flex">ໝົດອາຍຸວັນທີ&#x3a;&nbsp;
              <p className="text-[red]">{formatDateString(expirationDate)}</p>
            </p> */}
            <div className="text-[7pt] print:text-[7pt] leading-[1] font-semibold flex">
              <p className="text-[7pt] font-semibold flex items-center leading-[1] text-[#000000]">ເລກທີ&#x3a;&nbsp;{fullBarcode}/ຄຕທ</p>
            </div>
          </div>
        </div>
      ):(
        <div className="absolute bottom-[6px] print:bottom-[8.5px] left-2 print:left-[8px] z-0 font-semibold text-[#000000]">
          <div>
            <p className="text-[6pt] font-semibold print:text-[6.5pt] leading-[1.1] text-[#000000]">ເລກທີ/ຄຕທ</p>
            <p className="text-[5.39pt] font-semibold print:text-[6pt] leading-[1.1] font-TimesNewRoman text-[#000000] mb-[3px]">{fullBarcode}</p>
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
      {!isQRcode ? (
        <div className="flex items-center gap-[2px] absolute top-[53px] right-2 print:leading-tight print:tracking-tight font-semibold">
          <p className="text-[7pt] font-semibold flex items-center leading-[1] text-[#000000]">ເລກທີ&#x3a;&nbsp;{fullBarcode}/ຄຕທ</p>
        </div>
      ):(
        // <div className="flex items-center gap-[2px] absolute top-12 right-2 print:leading-tight print:tracking-tight font-semibold">
        <div className="flex items-center gap-[2px] absolute top-[40px] print:top-[45px] right-[2px] print:right-[4px] print:leading-tight print:tracking-tight font-semibold">
          <p className="text-start font-semibold leading-3 text-[7pt] text-[#000000]">ກໍານົດອາຍຸ/<span className="font-TimesNewRoman">Exp :</span></p>
          <div className='print:tracking-tighter text-[#000000]'>
            <p className="text-[red] font-semibold text-[6pt] print:text-[6.5pt] font-TimesNewRoman">{formatDateString(issueDate)}</p>
            <p className="text-[red] font-semibold text-[6pt] print:text-[6.5pt] font-TimesNewRoman">{formatDateString(expirationDate)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function ContactSection({ application }: { application?: IApplication }) {
  const { ethnicity, nationality } = application?.profile || {};
  return (
    <div className='w-[100px] print:leading-[1] pt-[2px] pl-1 font-semibold'>
      <div className="pb-[1px] flex gap-1 items-center text-[#000000]">
        <div className="leading-[0.7]">
          <p className="flex items-center font-semibold text-start text-[7pt] pb-[2px] print:text-[7pt]">ເຊື້ອຊາດ</p>
          <p className="flex items-center font-semibold text-start text-[7pt] pb-[2px] print:text-[7pt]">Race:</p>
        </div>
        <div>
          <p className="text-start font-semibold text-[6pt] print:text-[6pt] font-TimesNewRoman leading-[1.1] text-[#000000]">{ethnicity?.code}</p>
        </div>
      </div>
      <div className="flex gap-1 items-center pb-[3px] text-[#000000]">
        <div className="leading-[0.7]">
          <p className="flex text-start font-semibold text-[7pt] print:text-[7pt] pb-[2px]">ສັນຊາດ</p>
          <p className="text-start font-semibold text-[6pt] print:text-[6pt] font-TimesNewRoman">Nationality:</p>
        </div>
        <div>
          <p className="text-start font-semibold text-[6pt] print:text-[6pt] font-TimesNewRoman leading-[1.1]">{nationality?.nationality}</p>
        </div>
      </div>
      <div className="flex gap-1 items-center text-[#000000] pt-[2px]">
        <div className="leading-[0.7]">
          <p className="flex text-start font-semibold text-[7pt] print:text-[7pt] pb-[2px]">ປະເພດວິຊ່າ</p>
          <p className="text-start font-semibold text-[6pt] print:text-[6pt] font-TimesNewRoman">Visa Type:</p>
        </div>
        <p className="w-fit text-[7pt] print:text-[7pt]">{application?.visaType?.typeCode}</p>
      </div>
    </div>
  );
}