import { LoginResponse, LoginResponseState } from '~/store/slices/loginResponseSlice/types';
import { AuthState } from './../store/slices/authSlice/types';
import { Auth } from '~/store/slices/authSlice/types';
import { ServerMessage } from '~/constants/serverMessages';

export const authSuccess: Auth = {
	resultCode: 0,
	messages: [],
	data: {
		id: 1,
		email: 'testEmail@gmail.com',
		login: 'testLogin',
	},
	fieldsErrors: [],
};

export const authSuccessState: AuthState = {
	isAuth: true,
	authMessage: undefined,
	data: {
		id: 1,
		email: 'testEmail@gmail.com',
		login: 'testLogin',
	},
};

export const authNotAutorized: Auth = {
	resultCode: 1,
	messages: [ServerMessage.notAutorized],
	data: {
		id: null,
		email: null,
		login: null,
	},
	fieldsErrors: [],
};

export const authNotAutorizedState: AuthState = {
	isAuth: false,
	authMessage: ServerMessage.notAutorized,
	data: {
		id: null,
		email: null,
		login: null,
	},
};

export const loginSuccess: LoginResponse = {
	resultCode: 0,
	messages: [],
	data: { userId: 1 },
};

export const loginSuccessState: LoginResponseState = {
	isNeedCaptcha: false,
	userId: 1,
};
