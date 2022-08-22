import { API } from '~/constants/apiConstants';
import { Method, Tag } from '~/constants/systemConstants';
import { getLoginResponse } from '~/helpers';
import type { CaptchaUrlResponse } from '../captchaSlice/types';
import type { LoginRequestState } from '../loginRequestSlice/types';
import type { LoginResponse, LoginResponseState } from '../loginResponseSlice/types';
import { TagValues } from '../types';

export const loginApi = {
	query: (data: LoginRequestState) => ({
		url: API.login,
		method: Method.post,
		body: data,
	}),
	transformResponse: (response: LoginResponse) => {
		return getLoginResponse(response);
	},
	invalidatesTags: (result: LoginResponseState | undefined) => {
		const invalidateTags = [] as Array<TagValues>;

		if (result) {
			if (result.userId) {
				invalidateTags.push(Tag.auth);
			}
			if (result.isNeedCaptcha) {
				invalidateTags.push(Tag.captcha);
			}
		}

		return invalidateTags;
	},
};

export const logoutApi = {
	query: () => ({
		url: API.logout,
		method: Method.post,
	}),
	invalidatesTags: [Tag.auth],
};

export const fetchCaptchaApi = {
	query: () => API.captchaUrl,
	providesTags: [Tag.captcha],
	transformResponse: (response: CaptchaUrlResponse) => ({ captchaUrl: response.url }),
};
