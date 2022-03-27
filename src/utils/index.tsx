import { SyntheticEvent } from "react";
import { getCaptchaFx, setLoginError, setLoginSuccesData } from "../models/login";
import { SERVER_MESSAGES, SERVER_MESSAGES_DESCRIPTIONS } from "../constants/serverMessages";
import { RESULT_CODES } from "../constants/systemConstants";
import { LoginResponse } from "../models/login/types";
import { authFx, autorize } from "../models/auth";

export const preventDefault = (event: SyntheticEvent) => {
    event.preventDefault()
};

export const transformLoginResponse = (response: LoginResponse): void => {
    const { resultCode, data, messages } = response;
    const [ message ] = messages;

    const { error, secure, success } = RESULT_CODES;

    if (resultCode === error || resultCode === secure) {
        resultCode === secure && getCaptchaFx();
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

    if (resultCode === success) {
        setLoginSuccesData(data);
    }
};