import { fetchUsersApi } from '@/api/usersApi';
import { sample } from 'effector';
import {
	unSetUsersError,
	getUsersFx,
	$usersError,
	$usersLoading,
	setUsersLoading,
	unSetUsersLoading,
	setUsersError,
	$users,
	$usersRequestParams,
	setUsersRequestParams,
	unSetUsersRequestParams,
} from '.';

$usersError
	.on(setUsersError, (_, data) => {
		return {
			status: data.response?.status,
			message: data.response?.data.message,
		};
	})
	.reset(unSetUsersError);

getUsersFx.use(fetchUsersApi).watch(() => console.log(`вызван эффект ${getUsersFx.shortName}`));

const usersData = getUsersFx.doneData.map((response) => response);

sample({
	clock: usersData,
	target: $users,
});

$usersRequestParams.on(setUsersRequestParams, (_, data) => data).reset(unSetUsersRequestParams);

$usersLoading.on(setUsersLoading, (_, data) => data).reset(unSetUsersLoading);
