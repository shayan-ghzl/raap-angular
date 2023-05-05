import { createFeatureSelector } from "@ngrx/store";
import { LoginState } from "../reducers/identity.reducer";

export const identitySelectorIsLoggedIn = createFeatureSelector<LoginState>('isLoggedIn');

// export const selectFeature = (state: AppState) => state.isLoggedIn;
// export const identitySelectorIsLoggedIn = createSelector(selectFeature, (state) => {
//     if (!state) {
//         return null;
//     }
//     return state;
// });