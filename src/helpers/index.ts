import { Description, ServerMessage } from '@/constants/serverMessages';
import { ReultCode } from '@/constants/systemConstants';
import { Auth, AuthState } from '@/store/slices/authSlice/types';
import { LoginResponse, LoginResponseState } from '@/store/slices/loginResponseSlice/types';

export const getAuthResponse = (authResponse: Auth): AuthState => {
	const { data, messages, resultCode } = authResponse;
	const { success, error, secure } = ReultCode;

	const defaultResponse = {
		isAuth: false,
		authMessage: Description.someError,
		data: { id: null, email: null, login: null },
	};

	const authResponses = {
		[error]: {
			isAuth: false,
			authMessage: messages.at(0),
			data: { id: null, email: null, login: null },
		},
		[success]: {
			isAuth: true,
			authMessage: messages.at(0),
			data,
		},
		[secure]: defaultResponse,
		default: defaultResponse,
	};

	return authResponses[resultCode] || authResponses.default;
};

const getLoginError = (error: string | undefined): string => {
	if (!error) {
		return Description.someError;
	}

	const errors = {
		[`${ServerMessage.maxAttemp}`]: Description.maxAttempt,
		[`${ServerMessage.wrongLogin}`]: Description.wrongLogin,
	};

	return errors[error] || Description.someError;
};

export const getLoginResponse = (response: LoginResponse): LoginResponseState => {
	const { resultCode, data, messages } = response;

	const { error, secure, success } = ReultCode;

	const responses = {
		[error]: {
			error: Description.wrongLogin,
			isNeedCaptcha: false,
		},
		[secure]: {
			error: getLoginError(messages.at(0)),
			isNeedCaptcha: true,
		},
		[success]: {
			userId: data.userId,
			error: '',
			isNeedCaptcha: false,
		},
	};

	return responses[resultCode];
};
