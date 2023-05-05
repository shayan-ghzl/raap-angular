import { createAction, props } from "@ngrx/store";
import { LoginState } from "../reducers/identity.reducer";

export const identityActionStart = createAction('[Identity Start Get/Api]');
export const identityActionIsLoggedIn = createAction('[Identity Initial Set/Api]', props<{ isLoggedIn: number }>());