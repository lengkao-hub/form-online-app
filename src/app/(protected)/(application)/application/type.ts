import { ICompany } from "../../company/type";
import { IOffice } from "../../office/type";
import { IPosition } from "../../position/type";
import { IPrice } from "../../(finance)/price/type";
import { IProfile } from "../../profile/type";
import { IVillage } from "../../(address)/village/type";
import { IFolder } from "../folder/type";
import { IVisaType } from "../../visa/type";

export interface IApplication {
    no: number;
    id: number;
    numberId: number;
    profileId: number;
    folderId: number;
    positionId: number;
    companyId: number;
    visaType: IVisaType,
    registrationDocumentId: string | null;
    applicationType: "DEFAULT" | "OTHER_TYPES";
    expirationTerm: "ONE_YEAR" | "TWO_YEARS";
    issueDate: string;
    visaIssuedAt: string;
    visaIssuedDate: string;
    visaExpiryDate: string;
    expirationDate: string;
    applicationNumber: string;
    status: "DEFAULT" | "APPROVED" |"PROCESS" |"FINISHED"
    type: "NEW" | "RENEW"
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    officeId: number | null;
    profile: IProfile;
    number: NumberDetail;
    company: ICompany;
    folder: IFolder;
    position: IPosition;
    office: IOffice | null;
    application: IApplicationFile[],
    printCount: number;
    dependBy: "VILLAGE" | "COMPANY";
    villageId: number | null;
    village: IVillage | null;
}

export interface IApplicationFile {
    id: number,
    applicationId: number,
    name: string,
    filePath: string,
    createdAt: string,
    updatedAt: string,
}

export interface NumberDetail {
    id: number;
    number: string;
    folderId: number;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    officeId: number;
    price: IPrice
    duration: string
}

export interface IApplicationColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: IApplication;
    };
}

export interface IApplicationAggregation {
    month: string;
    male: number;
    female: number;
    result: {
        total: number;
        TotalActive: number;
    };
}
export interface ILastApplication {
    id: number,
    issueDate: string,
    expirationDate: string, 
}