import { setProfileLoading, unSetProfileLoading } from './index';
import { fetchProfileApi } from '@/api/profileApi';
import { getProfileFx, $profile, $profileLoading } from '.';
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

$profileLoading.on(setProfileLoading, (_, data) => data).reset(unSetProfileLoading);
