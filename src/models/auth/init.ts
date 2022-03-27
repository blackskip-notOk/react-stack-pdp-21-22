import { SERVER_MESSAGES_DESCRIPTIONS } from './../../constants/serverMessages';
import { API } from './../../constants/apiConstants';
import { $auth, autorize, authFx, unautorize } from ".";
import { AuthResponse } from "./types";
import { RESPONSE_STATUSES, RESULT_CODES } from '../../constants/systemConstants';
import { instance } from '..';

const updateAuth = ((authResponse: AuthResponse) => {
    if (authResponse.status === RESPONSE_STATUSES.success) {
        const { authInfo } = authResponse;

        if (authInfo.resultCode === RESULT_CODES.error) {
            autorize({ isAuth: false, message: authInfo.messages[0] });
        }

        if (authInfo.resultCode === RESULT_CODES.success) {
            autorize({ isAuth: true, message: authInfo.messages[0] });
        }
    } else if (authResponse.status === RESPONSE_STATUSES.clientError || authResponse.status === RESPONSE_STATUSES.serverError) {
        autorize({ isAuth: false, message: SERVER_MESSAGES_DESCRIPTIONS.someError });
    }
});

authFx.use(async (): Promise<AuthResponse> => {
    const response = await instance.get(API.authMe);
    return {status: response.status, authInfo: response.data};
});

authFx.doneData.watch(updateAuth);

authFx.watch(() => console.log(`вызван эффект ${authFx.shortName} - запрос авторизации`));

$auth
.on(autorize, (_, data) => ({isAuth: data.isAuth, message: data.message}))
.reset(unautorize);

$auth
.watch(state => console.log(
    `Состояние ${$auth.shortName} авторизация пройдена: ${state.isAuth}, сообщение: ${state.message ?? 'Autorization success'}`
));