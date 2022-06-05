import { unautorize, $auth } from '@/models/auth';
import { fetchLoginApi, fetchLogoutApi } from '@/api/loginApi';
import {
	$captchaUrl,
	getCaptchaFx,
	getCaptchaTrigger,
	logoutFx,
	resetLoginResponse,
} from './index';
import { $loginResponse, loginFx } from '.';
import { forward, sample } from 'effector';
import {
	getIsAuth,
	getIsNeedCaptcha,
	getLoginResponse,
	transformLoginResponse,
	resetIsAuth,
} from '@/utils/index';
import { fetchCaptchaApi } from '@/api/captchaApi';

$loginResponse.reset(resetLoginResponse);

loginFx.use(fetchLoginApi).watch(() => console.log(`вызван эффект ${loginFx.shortName}`));

const loginResponse = loginFx.doneData.map((response) => transformLoginResponse(response));

sample({
	clock: loginResponse,
	fn: getLoginResponse,
	target: $loginResponse,
});

sample({
	clock: $loginResponse,
	fn: getIsNeedCaptcha,
	target: getCaptchaTrigger,
});

forward({
	from: getCaptchaTrigger,
	to: getCaptchaFx,
});

getCaptchaFx
	.use(fetchCaptchaApi)
	.watch(() => console.log(`вызван эффект ${getCaptchaFx.shortName}`));

$captchaUrl.on(getCaptchaFx.doneData, (_, captchaUrl) => captchaUrl);

sample({
	clock: $loginResponse,
	fn: getIsAuth,
	target: $auth,
});

logoutFx.use(fetchLogoutApi).watch(() => console.log(`вызван эффект ${logoutFx.shortName}`));

forward({
	from: logoutFx.doneData,
	to: resetLoginResponse,
});

sample({
	clock: logoutFx.doneData,
	fn: resetIsAuth,
	target: unautorize,
});
