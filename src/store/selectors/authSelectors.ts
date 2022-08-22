import { createSelector } from '@reduxjs/toolkit';
import { storeSelector } from '.';
import { UserID } from '../slices/profileSlice/types';

export const authStateSelector = createSelector(storeSelector, (state) => state.auth);
export const isAuthSelector = createSelector(authStateSelector, (state) => state.isAuth);
export const isOwnerIdSelector = createSelector(authStateSelector, (state) =>
	state.data.id ? UserID(state.data.id) : null,
);
