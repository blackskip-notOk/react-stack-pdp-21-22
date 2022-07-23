import { createSelector } from '@reduxjs/toolkit';
import { storeSelector } from '.';

export const usersSelector = createSelector(storeSelector, (state) => state.users);
export const usersRequestSelector = createSelector(storeSelector, (state) => state.usersRequest);
