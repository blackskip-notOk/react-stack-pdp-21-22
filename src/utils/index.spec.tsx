import { SERVER_MESSAGES, SERVER_MESSAGES_DESCRIPTIONS } from '../constants/serverMessages';
import { RESULT_CODES } from '../constants/systemConstants';
import { transformLoginResponse } from '.';

describe('app utils', () => {
	test('if get success responce transformLoginResponse should return userId', () => {
		const successResponse = {
			resultCode: RESULT_CODES.success,
			messages: [],
			data: { userId: 1 },
		};

		expect(transformLoginResponse(successResponse)).toEqual({ data: { userId: 1 } });
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
});
