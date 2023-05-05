import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/shared/models/basket";
import { BasketCalculation } from "src/app/shared/models/model";
import { basketActionAdd, basketActionInit, basketActionRemove, basketCalculationActionSet } from "../actions/basket.action";

const initialState: Product[] = [];

export const basketReducer = createReducer(
    initialState,
    on(basketActionInit, (state, prop) => prop.basket),
    on(basketActionAdd, (state, prop) => {
        let isAdd = true;
        let updatedList = state.map(p => {
            if (p.id == prop.product.id) {
                isAdd = false;
                return prop.product;
            } else {
                return p;
            }
        });
        if (isAdd) {
            updatedList.push(prop.product);
        }
        return updatedList;
    }),
    on(basketActionRemove, (state, prop) => state.filter(p => p.id != prop.productId)),
)
// ------------------basket-calculation-reducer-------------------
const initialState2: BasketCalculation = {
    totalCount: '',
    totalDiscount: '',
    totalPureSum: '',
    totalSum: '',
};
export const basketCalculationReducer = createReducer(
    initialState2,
    on(basketCalculationActionSet, (state, prop) => prop.basketCalculation),
)