import { SyntheticEvent } from 'react';
import { AuthState, Owner } from '../models/auth/types';
import { SERVER_MESSAGES, SERVER_MESSAGES_DESCRIPTIONS } from '../constants/serverMessages';
import { RESULT_CODES } from '../constants/systemConstants';
import { LoginResponse, TransformLoginResponse } from '../models/login/types';
import { ProfileResponse, ProfileState } from '../models/profile/types';
import { useStore } from 'effector-react';
import { $owner } from 'src/models/auth';

export const preventDefault = (event: SyntheticEvent) => {
	event.preventDefault();
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
});

// TODO take this and madde it for sample

// export const getIsOwner = (clockData: TransformLoginResponse): Owner => ({
// 	isOwner: !!clockData.data,
// 	ownerId: clockData.data ? clockData.data.userId : undefined,
// });
