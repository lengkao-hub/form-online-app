export interface IVisaType {
  id: number,
  typeCode: string,
  description: string,
  createdAt: string,
  updatedAt: string,
}

export interface IVisaAggregation {
    month: string;
    male: number;
    female: number;
    result: {
        total: number;
        TotalActive: number;
    };
}