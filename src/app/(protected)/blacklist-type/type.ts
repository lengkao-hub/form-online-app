export interface IBlacklistType {
  id: number,
  type: string,
  description: string,
  createdAt: string,
  updatedAt: string,
}

export interface IBlacklistTypeAggregation {
    month: string;
    male: number;
    female: number;
    result: {
        total: number;
        TotalActive: number;
    };
}