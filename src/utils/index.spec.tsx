import { ServerMessage, Description } from '../constants/serverMessages';
import { ReultCode } from '../constants/systemConstants';

describe('app utils', () => {
	const successLoginResponse = { data: { userId: 1 } };

	const errorLoginResponse = {
		error: Description.wrongLogin,
		isNeedCaptcha: false,
	};

	const errorMaxAttempLoginResponse = {
		error: Description.maxAttempt,
		isNeedCaptcha: true,
	};
	test('right', () => {
		const num = 2;

		expect(num).toBeDefined();
	});

	// test('if get success responce transformLoginResponse should return userId', () => {
	// 	const successResponse = {
	// 		resultCode: ReultCode.success,
	// 		messages: [],
	// 		data: { userId: 1 },
	// 	};

	// 	expect(transformLoginResponse(successResponse)).toEqual({
	// 		data: { userId: 1 },
	// 	});
	// });
	// test('if wrong login / password transformLoginResponse should return error message', () => {
	// 	const errorResponse = {
	// 		resultCode: ReultCode.error,
	// 		messages: [ServerMessage.wrongLogin],
	// 		data: {},
	// 	};

	// 	expect(transformLoginResponse(errorResponse)).toEqual({
	// 		error: Description.wrongLogin,
	// 		isNeedCaptcha: false,
	// 	});
	// });
	// test(`if take max attemp transformLoginResponse should return error
	//   message and ask captcha`, () => {
	// 	const errorResponseMaxAttemp = {
	// 		resultCode: ReultCode.secure,
	// 		messages: [ServerMessage.maxAttemp],
	// 		data: {},
	// 	};

	// 	expect(transformLoginResponse(errorResponseMaxAttemp)).toEqual({
	// 		error: Description.maxAttempt,
	// 		isNeedCaptcha: true,
	// 	});
	// // });
	// test(`if take max attemp and wrong login /password transformLoginResponse
	//   should return error message and ask catcha`, () => {
	// 	const errorResponseMaxAttempAndWrongLogin = {
	// 		resultCode: ReultCode.secure,
	// 		messages: [ServerMessage.wrongLogin],
	// 		data: {},
	// 	};

	// 	expect(transformLoginResponse(errorResponseMaxAttempAndWrongLogin)).toEqual({
	// 		error: Description.wrongLogin,
	// 		isNeedCaptcha: true,
	// 	});
	// });
	// test(`if get success login response getLoginResponse should return success response`, () => {
	// 	expect(getLoginResponse(successLoginResponse)).toEqual({
	// 		data: { userId: 1 },
	// 		error: undefined,
	// 		isNeedCaptcha: undefined,
	// 	});
	// });
	// test(`if get login response with error getLoginResponse should return error response`, () => {
	// 	expect(getLoginResponse(errorLoginResponse)).toEqual({
	// 		data: undefined,
	// 		error: 'Неверный логин или пароль',
	// 		isNeedCaptcha: false,
	// 	});

	// 	expect(getLoginResponse(errorMaxAttempLoginResponse)).toEqual({
	// 		data: undefined,
	// 		error: 'Превышено количество попыток',
	// 		isNeedCaptcha: true,
	// 	});
	// });

	// test(`if get success login response getIsNeedCaptcha should return false`, () => {
	// 	expect(getIsNeedCaptcha(successLoginResponse)).toBeFalsy();
	// });

	// test(`if get login response with password / login error getIsNeedCaptcha should return false`, () => {
	// 	expect(getIsNeedCaptcha(errorLoginResponse)).toBeFalsy();
	// });

	// test(`if get login response with max attempt error getIsNeedCaptcha should return true`, () => {
	// 	expect(getIsNeedCaptcha(errorMaxAttempLoginResponse)).toBeTruthy();
	// });

	// 	test(`if get success login response getIsAuth should return success response`, () => {
	// 		expect(getIsAuth(successLoginResponse)).toEqual({
	// 			isAuth: true,
	// 			message: 'Autorization success',
	// 			ownerId: 1,
	// 		});
	// 	});

	// 	test(`if get login response with error getIsAuth should return errorn response`, () => {
	// 		expect(getIsAuth(errorLoginResponse)).toEqual({
	// 			isAuth: false,
	// 			message: 'You are not authorized',
	// 		});

	// 		expect(getIsAuth(errorMaxAttempLoginResponse)).toEqual({
	// 			isAuth: false,
	// 			message: 'You are not authorized',
	// 		});
	// 	});

	// 	test(`if resetIsAuth called, it should return default auth state`, () => {
	// 		expect(resetIsAuth()).toEqual({
	// 			isAuth: false,
	// 			message: 'You have logged out of your account',
	// 		});
	// 	});
});
