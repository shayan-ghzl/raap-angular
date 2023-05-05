import { createAction, props } from "@ngrx/store";

export const uiActionPlatform = createAction('[Ui Platform]', props<{ desktop: boolean }>());