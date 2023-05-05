import { createReducer, on } from "@ngrx/store";
import { identityActionIsLoggedIn } from "../actions/identity.action";

export enum LoginState{
    INITIAL = 0,
    REGISTERED = 1,
    NOTALLOWED = -1 
}
const initialState: LoginState = LoginState.INITIAL;

export const identityReducer = createReducer(
    initialState,
    on(identityActionIsLoggedIn, (state, prop) => prop.isLoggedIn)
)
