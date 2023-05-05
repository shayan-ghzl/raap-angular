import { createReducer, on } from "@ngrx/store";
import { uiActionPlatform } from "../actions/ui.action";

const initialState = true;

export const uiReducer = createReducer(
    initialState,
    on(uiActionPlatform, (state, prop) => prop.desktop),
)