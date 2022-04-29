import { fetchProfileApi } from '@/api/profileApi';
import { getProfileFx, $profile } from '.';
import { $profileError, setProfileError, unSetProfileError } from '.';
import { sample } from 'effector';

$profileError
	.on(setProfileError, (_, data) => {
		return {
			status: data.response?.status,
			message: data.response?.data.message,
		};
	})
	.reset(unSetProfileError);

getProfileFx
	.use(fetchProfileApi)
	.watch(() => console.log(`вызван эффект ${getProfileFx.shortName}`));

const profileData = getProfileFx.doneData.map((response) => response);

sample({
	clock: profileData,
	target: $profile,
});

// sample({
// 	clock: $loginResponse,
// 	fn: getIsNeedCaptcha,
// 	target: getCaptchaTrigger,
// });

// forward({
// 	from: getCaptchaTrigger,
// 	to: getCaptchaFx,
// });

// getCaptchaFx
// 	.use(fetchCaptchaApi)
// 	.watch(() => console.log(`вызван эффект ${getCaptchaFx.shortName}`));

// $captchaUrl.on(getCaptchaFx.doneData, (_, captchaUrl) => captchaUrl);

// sample({
// 	clock: $loginResponse,
// 	fn: getIsAuth,
// 	target: $auth,
// });
