import { SERVER_MESSAGES, SERVER_MESSAGES_DESCRIPTIONS } from './../../../constants/serverMessages';
import { RESULT_CODES } from './../../../constants/systemConstants';
import { LoginResponse } from "../../../api/loginApi/types";
import * as R from 'ramda';

export const loginErrorTransform = (data: LoginResponse | undefined, emptyValue = null): string | null => {
    if (!data || R.isEmpty(data) || data.resultCode === RESULT_CODES.success) {
        return emptyValue;
    };

    const { resultCode, messages } = data;

    if (resultCode === RESULT_CODES.error && messages.includes(SERVER_MESSAGES.WRONG_LOGIN)) {
        return SERVER_MESSAGES_DESCRIPTIONS.wrongLogin;
    };
    if (resultCode === RESULT_CODES.secure) {
        return messages.includes(SERVER_MESSAGES.MAX_ATTEMPT)
        ? SERVER_MESSAGES_DESCRIPTIONS.maxAttempt
        : SERVER_MESSAGES_DESCRIPTIONS.wrongLogin;
    };
    return emptyValue;
};

