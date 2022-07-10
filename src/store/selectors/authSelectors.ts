import { createSelector } from '@reduxjs/toolkit';
import { storeSelector } from '.';

export const authStateSelector = createSelector(storeSelector, (state) => state.auth);
export const isAuthSelector = createSelector(authStateSelector, (state) => state.isAuth);
export const isOwnerIdSelector = createSelector(authStateSelector, (state) => state.data.id);
