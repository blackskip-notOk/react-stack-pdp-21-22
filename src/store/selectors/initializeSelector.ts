import { createSelector } from '@reduxjs/toolkit';
import { storeSelector } from '.';

export const initializeStateSelector = createSelector(storeSelector, (state) => state.initialize);
export const isInitializeSelector = createSelector(
	initializeStateSelector,
	(state) => state.initialize,
);
