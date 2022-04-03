import { fetchLoginApi } from './../../api/loginApi';
import { $captchaUrl, getCaptchaFx, getCaptchaTrigger } from './index';
import { $loginResponse, loginFx } from '.';
import { forward, sample } from 'effector';
import {
	getIsAuth,
	getIsNeedCaptcha,
	getIsOwner,
	getLoginResponse,
	transformLoginResponse,
} from '../../utils/index';
import { $auth, $owner } from '../auth';
import { fetchCaptchaApi } from '../../api/captchaApi';

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

sample({
	clock: $loginResponse,
	fn: getIsOwner,
	target: $owner,
});
