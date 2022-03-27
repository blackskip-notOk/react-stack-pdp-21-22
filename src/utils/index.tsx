import { SyntheticEvent } from "react";
import { getCaptchaFx, setLoginError } from "../models/login";
import { SERVER_MESSAGES, SERVER_MESSAGES_DESCRIPTIONS } from "../constants/serverMessages";
import { RESULT_CODES } from "../constants/systemConstants";
import { LoginResponse, TransformedLoginResponse } from "../models/login/types";

export const preventDefault = (event: SyntheticEvent) => {
    event.preventDefault()
};

export const transformLoginResponse = (response: LoginResponse) => {
    const { resultCode, data, messages } = response;
    const [ message ] = messages;

    const { error, secure, } = RESULT_CODES;

    if (resultCode === error || resultCode === secure) {
        resultCode === secure && getCaptchaFx(null);
        if (message === SERVER_MESSAGES.MAX_ATTEMPT) {
            setLoginError({
                error: SERVER_MESSAGES_DESCRIPTIONS.maxAttempt,
                isNeedCaptcha: true,
            });
        } else if (message === SERVER_MESSAGES.WRONG_LOGIN) {
            setLoginError({
                error: SERVER_MESSAGES_DESCRIPTIONS.wrongLogin,
                isNeedCaptcha: resultCode === RESULT_CODES.secure,
            });
        } else {
            setLoginError({
                error: SERVER_MESSAGES_DESCRIPTIONS.someError,
                isNeedCaptcha: resultCode === RESULT_CODES.secure,
            });
        }
    }

    return { data: data };
};