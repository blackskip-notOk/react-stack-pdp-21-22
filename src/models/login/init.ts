import { $captchaUrl, $loginError, checkLoginResponse, getCaptchaFx, setLoginError, unSetLoginError, setLoginSuccesData, unSetLoginSuccessData } from './index';
import { API } from './../../constants/apiConstants';
import { $loginResponse, $owner, deleteOwner, loginFx, setOwner } from ".";
import { instance } from "..";
import { CaptchaUrlResponse, LoginFormData, LoginResponse } from "./types";
import { forward } from 'effector';
import { transformLoginResponse } from '../../utils/index';

const handleSetOwner = (loginResponse: LoginResponse) => setOwner({ isOwner: true, ownerId: loginResponse.data.userId });

loginFx.use(async (loginData: LoginFormData): Promise<LoginResponse> => {
	const response = await instance.post(API.login, loginData);
	return response.data;
});

loginFx
.watch(() => console.log(`вызван эффект ${loginFx.shortName}`));

forward({
	from: loginFx.doneData,
	to: checkLoginResponse
});

checkLoginResponse.map(response => transformLoginResponse(response));

$loginError
.on(setLoginError, (_, data) => ({ error: data.error, isNeedCaptcha: data.isNeedCaptcha }))
.reset(unSetLoginError);

getCaptchaFx.use(async (): Promise<CaptchaUrlResponse> => {
		const response = await instance.get(API.captchaUrl);
		return response.data;
});

getCaptchaFx.watch(() => console.log(`вызван эффект ${getCaptchaFx.shortName}`));

$captchaUrl.on(getCaptchaFx.doneData, (_, captchaUrl) => captchaUrl);

$loginResponse
.on(setLoginSuccesData, (_, data) => ({ userId: data.userId }))
.reset(unSetLoginSuccessData)
.watch(data => console.log(data));

$owner
.on(setOwner, (_, data) => ({ isOwner: data.isOwner, ownerId: data.ownerId }))
.reset(deleteOwner);

$owner
.watch(state => console.log(
    `Состояние ${$owner.shortName}: логин - ${state.isOwner}, пользовательский ID - ${state.ownerId}`
));