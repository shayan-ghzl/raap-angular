import { createFeatureSelector } from "@ngrx/store";

export const uiSelectorPlatform = createFeatureSelector<boolean>('isDesktop');