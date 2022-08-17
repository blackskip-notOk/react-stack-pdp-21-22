import { setupStore } from '~/store/store';
import { storeSelector } from '.';
import authSliceReducer, { setAuthData } from '../slices/authSlice';
import type { AuthState } from '../slices/authSlice/types';
import { authStateSelector, isAuthSelector, isOwnerIdSelector } from './authSelectors';

describe('authSelectors', () => {
	const initialAuthState: AuthState = {
		isAuth: false,
		authMessage: undefined,
		data: {
			id: null,
			email: null,
			login: null,
		},
	};

	const rootState = storeSelector(setupStore().getState());

	const SuccessAuthState: AuthState = {
		isAuth: true,
		authMessage: undefined,
		data: {
			id: 1,
			email: 'testEmail@gmail.com',
			login: 'testLogin',
		},
	};

	it('authStateSelector should return authState', () => {
		const authState = authStateSelector(rootState);

		expect(authState).toEqual(initialAuthState);
	});

	it('if do not set authData, isAuthSelector should return initial isAuth', () => {
		const result = isAuthSelector(rootState);

		expect(result).toBe(false);
		expect(result).toBeFalsy();
	});

	it('if set authData, isAuthSelector should return correct isAuth', () => {
		const state = undefined;
		const action = setAuthData(SuccessAuthState);
		const newAuthState = authSliceReducer(state, action);

		const result = isAuthSelector({ ...rootState, auth: newAuthState });

		expect(result).toBe(true);
		expect(result).not.toBeFalsy();
	});

	it('isAuthSelector should not compute again with the same state', () => {
		const newAuthState: AuthState = {
			isAuth: true,
			authMessage: undefined,
			data: {
				id: 1,
				email: 'testEmail@gmail.com',
				login: 'testLogin',
			},
		};
		const newState = { ...rootState, auth: newAuthState };

		isAuthSelector.resetRecomputations();
		isAuthSelector(newState);

		expect(isAuthSelector.recomputations()).toEqual(1);

		isAuthSelector(newState);

		expect(isAuthSelector.recomputations()).toEqual(1);

		isAuthSelector(newState);
		isAuthSelector(newState);
		isAuthSelector(newState);
		isAuthSelector(newState);

		expect(isAuthSelector.recomputations()).toEqual(1);
	});

	it('isAuthSelector should recompute with new state', () => {
		const authState: AuthState = {
			isAuth: true,
			authMessage: undefined,
			data: {
				id: 1,
				email: 'testEmail@gmail.com',
				login: 'testLogin',
			},
		};
		const state = { ...rootState, auth: authState };

		isAuthSelector.resetRecomputations();
		const result = isAuthSelector(state);

		expect(isAuthSelector.recomputations()).toEqual(1);
		expect(result).toBe(true);

		const newAuthState = { ...authState, isAuth: false };
		const newState = { ...rootState, auth: newAuthState };
		const newResult = isAuthSelector(newState);

		expect(isAuthSelector.recomputations()).toEqual(2);
		expect(newResult).toBe(false);
	});

	it('isOwnerIdSelector should return user id', () => {
		const result = isOwnerIdSelector(rootState);
		expect(result).toBe(null);
		expect(result).toBeFalsy();
		expect(result).toBeNull();
	});
});
