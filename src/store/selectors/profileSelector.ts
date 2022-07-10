import { createSelector } from '@reduxjs/toolkit';
import { storeSelector } from '.';

export const profileSelector = createSelector(storeSelector, (state) => state.profile);
export const profileStatusSelector = createSelector(storeSelector, (state) => state.status);
