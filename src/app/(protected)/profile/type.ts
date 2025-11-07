import { type IDistrict } from "../(address)/district/type";
import { type INationality } from "../nationality/type";
import { type IProvince } from "../(address)/province/type";
import { IVillage } from "../(address)/village/type";
import { ICompany } from "../company/type";
import { IPosition } from "../position/type";
import { IProfileGallery } from "../(image)/profileGallery/type";
export interface IFolder {
    id: number
    userId: number
    createdAt: string
    updatedAt: string
    user: IUser
    profile: IProfile[]
}

export interface IUser {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
}

export interface IProfile {
    id: number
    barcode: number
    firstName: string
    lastName: string
    phoneNumber: string | null
    dateOfBirth: string
    gender: "MALE" | "FEMALE" | string
    status: "PENDING" | "APPROVED" | "REJECTED" | string
    nationalityId: number
    ethnicityId: number
    identityType: string
    identityNumber: string
    identityIssueDate: string
    identityExpiryDate: string
    currentProvince: string | null
    currentDistrict: string | null
    currentVillageId: number | null
    overseasCountryId: number | null
    overseasProvince: string | null
    image: string | null
    oldImage: string | null
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    companyId: number | null
    userId: number
    folderId: number
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