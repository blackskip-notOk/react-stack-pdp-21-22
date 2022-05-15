import { SyntheticEvent } from 'react';
import { AuthResponse, AuthState } from '../models/auth/types';
import { SERVER_MESSAGES, SERVER_MESSAGES_DESCRIPTIONS } from '../constants/serverMessages';
import { RESPONSE_STATUSES, RESULT_CODES, SESSION_STORAGE } from '../constants/systemConstants';
import { LoginResponse, TransformLoginResponse } from '../models/login/types';
import { UsersRequest } from '@/models/users/types';
import { authFx, initialize } from '@/models/auth';

export const preventDefault = (event: SyntheticEvent) => {
	event.preventDefault();
};

export const getInitialization = () => {
	const authorization = authFx();

	Promise.all([authorization])
		.then(() => {
			initialize({ initialize: true });
		})
		.catch((err) => console.error(SERVER_MESSAGES_DESCRIPTIONS.failedInitialization, err));
};

export const getAuthResponse = (authResponse: AuthResponse): AuthState => {
	if (authResponse.status === RESPONSE_STATUSES.success) {
		const { authInfo } = authResponse;
		const { success, error } = RESULT_CODES;

		if (authInfo.resultCode === error) {
			return { isAuth: false, message: authInfo.messages[0] };
		}

		if (authInfo.resultCode === success) {
			return { isAuth: true, message: authInfo.messages[0], ownerId: authInfo.data.id };
		}
	}

	return { isAuth: false, message: SERVER_MESSAGES_DESCRIPTIONS.someError };
};

export const transformLoginResponse = (response: LoginResponse): TransformLoginResponse => {
	const { resultCode, data, messages } = response;
	const [message] = messages;

	const { error, secure } = RESULT_CODES;

	if (resultCode === error) {
		return {
			error: SERVER_MESSAGES_DESCRIPTIONS.wrongLogin,
			isNeedCaptcha: false,
		};
	}
	if (resultCode === secure) {
		const errorMessage =
			message === SERVER_MESSAGES.MAX_ATTEMPT
				? SERVER_MESSAGES_DESCRIPTIONS.maxAttempt
				: message === SERVER_MESSAGES.WRONG_LOGIN
				? SERVER_MESSAGES_DESCRIPTIONS.wrongLogin
				: SERVER_MESSAGES_DESCRIPTIONS.someError;

		return {
			error: errorMessage,
			isNeedCaptcha: true,
		};
	}

	return { data };
};

export const getLoginResponse = (clockData: TransformLoginResponse): TransformLoginResponse => ({
	data: clockData.data,
	error: clockData.error,
	isNeedCaptcha: clockData.isNeedCaptcha,
});

export const getIsNeedCaptcha = (clockData: TransformLoginResponse): boolean =>
	!!clockData.isNeedCaptcha;

export const getIsAuth = (clockData: TransformLoginResponse): AuthState => ({
	isAuth: !!clockData.data,
	message: clockData.data ? SERVER_MESSAGES.AUTORIZATION_SUCCESS : SERVER_MESSAGES.NOT_AUTHORIZED,
	ownerId: clockData.data ? clockData.data.userId : undefined,
});

export const resetIsAuth = (): AuthState => ({
	isAuth: false,
	message: SERVER_MESSAGES.LOGOUT,
	ownerId: undefined,
});

export const saveSessionParams = (params: UsersRequest): void => {
	const savedRequestParams = JSON.stringify({ ...params });
	sessionStorage.setItem(SESSION_STORAGE.USERS_REQUEST_PARAMS, savedRequestParams);
};
