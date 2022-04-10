import { API } from './../constants/apiConstants';
import { instance } from '.';
import { CaptchaUrlResponse } from '../models/login/types';

export const fetchCaptchaApi = async (
	isNeedCaptcha: boolean,
): Promise<CaptchaUrlResponse | null> => {
	if (isNeedCaptcha) {
		const response = await instance.get(API.captchaUrl);
		return response.data;
	}
	return null;
};
