import { Product } from "../shared/models/basket";
import { BasketCalculation } from "../shared/models/model";
import { LoginState } from "./reducers/identity.reducer";

export interface AppState {
    isDesktop: boolean;
    basket: Product[];
    basketCalculation: BasketCalculation;
    isLoggedIn: LoginState;
}