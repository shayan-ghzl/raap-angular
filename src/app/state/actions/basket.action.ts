import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/shared/models/basket";
import { BasketCalculation } from "src/app/shared/models/model";

export const basketActionStart = createAction('[Basket Start Get/Api]');
export const basketActionInit = createAction('[Basket Initial Set/Api]', props<{ basket: Product[] }>());
export const basketActionAdd = createAction('[Basket Add Product]', props<{ product: Product }>());
export const basketActionRemove = createAction('[Basket Remove Product]', props<{ productId: string }>());
// -----------------basket-calculation------------------
export const basketCalculationActionSet = createAction('[Basket Calculation Set]', props<{ basketCalculation: BasketCalculation }>());