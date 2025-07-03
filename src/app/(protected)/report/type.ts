import { ICurrency } from "../(finance)/currency/type";

interface Summary {
    name: string;
    sum: {
        total: number;
        policeTotal: number;
        currency: ICurrency;
    }[];
    currencyCounts?: {
        THB: number,
        USD: number,
        CNY: number,
    }
}

interface NumberAggregation {
    no: number;
    id: number;
    number: string;
    createdAt: string;
    pricePrice: number;
    priceCode: string;
    priceDuration: string;
    approvedByFirstName: string;
    rateBase: number;
    ratePolice: number;
    currencyName: string;
    currencyCode: string;
    currencySymbol: string;
    targetCurrencyName: string;
    price: number;
    officeName: string;
    folderCode: string;
}

export interface INumberAggregation {
    summary: Summary;
    data: NumberAggregation[];
}
