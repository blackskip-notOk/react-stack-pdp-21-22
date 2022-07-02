import { Description, ServerMessage } from '@/constants/serverMessages';
import { ResponseStatus, ReultCode } from '@/constants/systemConstants';
import { AuthResponse, AuthState } from '@/store/slices/authSlice/types';
import { LoginResponse, TransformLoginResponse } from '@/store/slices/loginSlice/types';

export const getAuthResponse = (authResponse: AuthResponse): AuthState => {
	if (authResponse.status === ResponseStatus.success) {
		const { authInfo } = authResponse;
		const { success, error } = ReultCode;

		if (authInfo.resultCode === error) {
			return {
				isAuth: false,
				authMessage: authInfo.messages.at(0),
				data: { id: null, email: null, login: null },
			};
		}

		if (authInfo.resultCode === success) {
			const {
				data: { email, id, login },
			} = authInfo;

			return {
				isAuth: true,
				authMessage: authInfo.messages.at(0),
				data: { id, email, login },
			};
		}
	}

	return {
		isAuth: false,
		authMessage: Description.someError,
		data: { id: null, email: null, login: null },
	};
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

export const getLoginResponse = (response: LoginResponse): TransformLoginResponse => {
	const { resultCode, data, messages } = response;

	const { error, secure, success } = ReultCode;

	const responses = {
		[error]: () => ({
			error: Description.wrongLogin,
			isNeedCaptcha: false,
		}),
		[secure]: () => ({
			error: getLoginError(messages.at(0)),
			isNeedCaptcha: true,
		}),
		[success]: () => ({ data }),
	};

	return responses[resultCode]();
};
