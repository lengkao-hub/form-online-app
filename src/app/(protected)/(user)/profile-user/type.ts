import { type IDistrict } from "../../(address)/district/type"; 
import { IProvince } from "../../(address)/province/type";
import { IVillage } from "../../(address)/village/type";
import { ICompany } from "../../company/type";
import { INationality } from "../../nationality/type";
import { IPosition } from "../../position/type";

export interface IProfile {
    ethnicity: INationality;
    barcode?: number
    nationality: INationality;
    ethnicityId: number;
    nationalityId: number;
    status: string;
    id: number;
    no: number;
    name: string;
    image: string;
    oldImage: string
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    identityType: string;
    identityNumber: string;
    identityIssueDate: string;
    identityExpiryDate: string;
    currentProvince: number;
    district: IDistrict
    province: IProvince
    currentDistrict: number;
    currentVillageId: number;
    currentVillage: IVillage;
    overseasProvince: string;
    overseasCountry: INationality;
    overseasCountryId: number;
    createdAt: string;
    updatedAt: string;
    applicationNumber: string; 
}

export interface Position {
    id: number;
    englishName: string;
    laoName: string;
}

export interface BusinessUnit {
    id: number;
    name: string;
    businessCode: string;
    documentFile: string | null;
    businessRegisterBy: string;
}

export interface RegistrationDocument {
    id: number;
    type: string;
    laoName: string;
}

export interface Folder {
    id: number;
    name: string;
    code: string;
    totalApplications: number;
    approvedApplications: number;
}

export interface ProfileData {
    no: number;
    id: number;
    formId: string;
    applicationType: string;
    expirationTerm: string;
    requestDate: string;
    status: string;
    Profile: IProfile;
    Position: Position;
    BusinessUnit: BusinessUnit;
    RegistrationDocument: RegistrationDocument;
    Folder: Folder;
}

export interface IProfileColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: IProfile;
    };
}

export interface IAggregationChartProfile {
    month: string;
    male: number;
    female: number;
    result: {
        month: string;
        male: number;
        female: number;
    };
}

export interface IHistory {
    id: number,
    comanyId: number,
    issueDate: string,
    expirationDate: string,
    profileId: number,
    type: string,
    village: IVillage,
    company: ICompany,
    position: IPosition
}