import { SERVER_MESSAGES, SERVER_MESSAGES_DESCRIPTIONS } from '../constants/serverMessages';
import { RESULT_CODES } from '../constants/systemConstants';
import {
	getIsAuth,
	getIsNeedCaptcha,
	getIsOwner,
	getLoginResponse,
	resetIsAuth,
	transformLoginResponse,
} from '.';

describe('app utils', () => {
	const successLoginResponse = { data: { userId: 1 } };

	const errorLoginResponse = {
		error: SERVER_MESSAGES_DESCRIPTIONS.wrongLogin,
		isNeedCaptcha: false,
	};

	const errorMaxAttempLoginResponse = {
		error: SERVER_MESSAGES_DESCRIPTIONS.maxAttempt,
		isNeedCaptcha: true,
	};

	test('if get success responce transformLoginResponse should return userId', () => {
		const successResponse = {
			resultCode: RESULT_CODES.success,
			messages: [],
			data: { userId: 1 },
		};

		expect(transformLoginResponse(successResponse)).toEqual({
			data: { userId: 1 },
		});
	});
	test('if wrong login / password transformLoginResponse should return error message', () => {
		const errorResponse = {
			resultCode: RESULT_CODES.error,
			messages: [SERVER_MESSAGES.WRONG_LOGIN],
			data: {},
		};

		expect(transformLoginResponse(errorResponse)).toEqual({
			error: SERVER_MESSAGES_DESCRIPTIONS.wrongLogin,
			isNeedCaptcha: false,
		});
	});
	test(`if take max attemp transformLoginResponse should return error
    message and ask captcha`, () => {
		const errorResponseMaxAttemp = {
			resultCode: RESULT_CODES.secure,
			messages: [SERVER_MESSAGES.MAX_ATTEMPT],
			data: {},
		};

		expect(transformLoginResponse(errorResponseMaxAttemp)).toEqual({
			error: SERVER_MESSAGES_DESCRIPTIONS.maxAttempt,
			isNeedCaptcha: true,
		});
	});
	test(`if take max attemp and wrong login /password transformLoginResponse
    should return error message and ask catcha`, () => {
		const errorResponseMaxAttempAndWrongLogin = {
			resultCode: RESULT_CODES.secure,
			messages: [SERVER_MESSAGES.WRONG_LOGIN],
			data: {},
		};

		expect(transformLoginResponse(errorResponseMaxAttempAndWrongLogin)).toEqual({
			error: SERVER_MESSAGES_DESCRIPTIONS.wrongLogin,
			isNeedCaptcha: true,
		});
	});
	test(`if get success login response getLoginResponse should return success response`, () => {
		expect(getLoginResponse(successLoginResponse)).toEqual({
			data: { userId: 1 },
			error: undefined,
			isNeedCaptcha: undefined,
		});
	});
	test(`if get login response with error getLoginResponse should return error response`, () => {
		expect(getLoginResponse(errorLoginResponse)).toEqual({
			data: undefined,
			error: 'Неверный логин или пароль',
			isNeedCaptcha: false,
		});

		expect(getLoginResponse(errorMaxAttempLoginResponse)).toEqual({
			data: undefined,
			error: 'Превышено количество попыток',
			isNeedCaptcha: true,
		});
	});

	test(`if get success login response getIsNeedCaptcha should return false`, () => {
		expect(getIsNeedCaptcha(successLoginResponse)).toBeFalsy();
	});

	test(`if get login response with password / login error getIsNeedCaptcha should return false`, () => {
		expect(getIsNeedCaptcha(errorLoginResponse)).toBeFalsy();
	});

	test(`if get login response with max attempt error getIsNeedCaptcha should return true`, () => {
		expect(getIsNeedCaptcha(errorMaxAttempLoginResponse)).toBeTruthy();
	});

	test(`if get success login response getIsAuth should return success response`, () => {
		expect(getIsAuth(successLoginResponse)).toEqual({
			isAuth: true,
			message: 'Autorization success',
		});
	});

	test(`if get login response with error getIsAuth should return errorn response`, () => {
		expect(getIsAuth(errorLoginResponse)).toEqual({
			isAuth: false,
			message: 'You are not authorized',
		});

		expect(getIsAuth(errorMaxAttempLoginResponse)).toEqual({
			isAuth: false,
			message: 'You are not authorized',
		});
	});

	test(`if get success login response getIsOwner should return success response`, () => {
		expect(getIsOwner(successLoginResponse)).toEqual({
			isOwner: true,
			ownerId: 1,
		});
	});

	test(`if get login response with error getIsOwner should return errorn response`, () => {
		expect(getIsOwner(errorLoginResponse)).toEqual({
			isOwner: false,
			ownerId: undefined,
		});

		expect(getIsOwner(errorMaxAttempLoginResponse)).toEqual({
			isOwner: false,
			ownerId: undefined,
		});
	});

	test(`if resetIsAuth called, it should return default auth state`, () => {
		expect(resetIsAuth()).toEqual({
			isAuth: false,
			message: 'You have logged out of your account',
		});
	});
});
