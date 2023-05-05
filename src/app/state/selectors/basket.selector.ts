import { createFeatureSelector } from "@ngrx/store";
import { Product } from "src/app/shared/models/basket";
import { BasketCalculation } from "src/app/shared/models/model";

export const basketSelector = createFeatureSelector<Product[]>('basket');
export const basketCalculationSelector = createFeatureSelector<BasketCalculation>('basketCalculation');