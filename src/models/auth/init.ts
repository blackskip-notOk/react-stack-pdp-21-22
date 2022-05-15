import { getAuthResponse, getInitialization } from '@/utils/index';
import {
	$initialization,
	setAuthLoading,
	initialize,
	unSetAuthLoading,
	unInitialize,
	initializeFx,
} from './index';
import { fetchAuthApi } from '@/api/authApi';
import { $auth, autorize, authFx, unautorize, $authLoading } from '.';
import { sample } from 'effector';

initializeFx
	.use(getInitialization)
	.watch(() => console.log(`вызван эффект ${initializeFx.shortName} - ининциализация приложения`));

$initialization.on(initialize, (_, data) => ({ initialize: data.initialize })).reset(unInitialize);

authFx
	.use(fetchAuthApi)
	.watch(() => console.log(`вызван эффект ${authFx.shortName} - запрос авторизации`));

sample({
	clock: authFx.doneData,
	fn: getAuthResponse,
	target: autorize,
});

$auth
	.on(autorize, (_, data) => ({
		isAuth: data.isAuth,
		message: data.message,
		ownerId: data.ownerId,
	}))
	.reset(unautorize);

$auth.watch((state) =>
	console.log(
		`Состояние ${$auth.shortName}: авторизация пройдена - ${state.isAuth},
		сообщение - ${state.message}`,
	),
);

$authLoading.on(setAuthLoading, (_, data) => data).reset(unSetAuthLoading);
