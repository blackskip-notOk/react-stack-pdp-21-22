import { createSelector } from '@reduxjs/toolkit';
import { storeSelector } from '.';
import { UserID } from '../slices/profileSlice/types';

export const usersSelector = createSelector(storeSelector, (state) => {
	const users = state.users.items.map((item) => ({ ...item, id: UserID(item.id) }));
	return { ...state.users, items: users };
});

export const usersRequestSelector = createSelector(storeSelector, (state) => state.usersRequest);
