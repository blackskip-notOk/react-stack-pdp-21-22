import { miniSerializeError } from '@reduxjs/toolkit';
import { ServerMessage } from '~/constants/serverMessages';
import authSliceReducer, { setAuthData, setAuthError } from './index';

describe('autn slice', () => {
	const initialState = {
		isAuth: false,
		authMessage: undefined,
		data: {
			id: null,
			email: null,
			login: null,
		},
	};

	const authState = {
		isAuth: true,
		authMessage: undefined,
		data: {
			id: 1,
			email: 'testEmail@gmail.com',
			login: 'testLogin',
		},
	};

	const authError = new Error(ServerMessage.notAutorized);
	const serializeAuthError = miniSerializeError(authError);

	it('should return the initial state when passed an empty action', () => {
		const state = undefined;
		const action = { type: '' };
		const result = authSliceReducer(state, action);

		expect(result).toEqual(initialState);
	});

	it('if set authData, should fill data fields from action', () => {
		const state = undefined;
		const action = setAuthData(authState);
		const result = authSliceReducer(state, action);

		expect(result).toEqual(authState);
		expect(result.data.email).toBe('testEmail@gmail.com');
	});

	it('if auth error occured, should fill authMessage from action', () => {
		const state = undefined;
		const action = setAuthError(serializeAuthError);
		const result = authSliceReducer(state, action);

		expect(result.authMessage).toBe(ServerMessage.notAutorized);
		expect(result).toEqual({ ...initialState, authMessage: ServerMessage.notAutorized });
	});
});
