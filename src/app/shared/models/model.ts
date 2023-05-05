export interface Parameter {
    page?: number;
    per_page?: number;
    searchKey?: string;
    sort?: 0 | 1;
}

export interface BasketCalculation {
    totalCount: string;
    totalDiscount: string;
    totalPureSum: string;
    totalSum: string;
}