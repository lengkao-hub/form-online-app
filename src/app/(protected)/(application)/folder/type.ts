/* eslint-disable @typescript-eslint/naming-convention */
import { IOffice } from "../../office/type";
import { IPrice } from "../../(finance)/price/type";
import { ICompany } from "../../company/type";

interface FolderPrice {
    amount: number;
    priceId?: number;
    price?: IPrice
    total?: number;
}

export interface INumber {
    id: number;
    number: string;
    folderId: number;
    folder: IFolder
    isAvailable: boolean
}
export interface FolderReject {
    id: number;
    comment: string;
    folderId: number;
    status: string;
}
export interface IFolder {
    id: number;
    no?: string;
    code: string;
    name: string;
    officeId: number;
    status: string;
    billDate: string,
    billNumber: string,
    companyId: number;
    createdAt: string;
    number?: INumber[];
    folderPrice: FolderPrice[];
    folderReject?: FolderReject[]
    totalAmount: number;
    totalPrice: number;
    office: IOffice;
    company: ICompany;
}
export interface IAction {
    editText?: string;
    acceptText?: string;
    statusText?: string;
    approveText?: string;
    showDetail?: string;
    reject?: string;
    application?: string;
    edit?: string;
  }

export interface FolderCardViewProps {
    folder: IFolder;
    action?: IAction;
    status: ProcessStatus;
    showReject?: boolean;
    onClick?: () => void;
  }

export type FolderType = "YELLOW" | "BLUE";
export type ProcessStatus = "DEFAULT" | "PENDING" | "APPROVED_BY_POLICE" | "FINANCE_UNDER_REVIEW" | "POLICE_UNDER_REVIEW" | "IN_PRODUCTION" | "FINISHED" | "REJECTED" | "REJECTED_BY_COMMANDER" | "APPROVED_BY_PROVINCE" | "APPROVED_BY_HQ";
export interface processStatus {
    DEFAULT: string,
    PENDING: string,
    APPROVED_BY_POLICE: string,
    FINANCE_UNDER_REVIEW: string,
    POLICE_UNDER_REVIEW: string,
    IN_PRODUCTION: string,
    FINISHED: string,
    REJECTED: string,
}


export interface FolderDialogProps { 
    folderId: number, 
    open: boolean, 
    onOpenChange: (open: boolean) => void 
}