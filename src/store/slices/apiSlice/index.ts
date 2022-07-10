import { ApiName, API } from '@/constants/apiConstants';
import { Method, Tag } from '@/constants/systemConstants';
import { getAuthResponse, getLoginResponse } from '@/helpers';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Auth, AuthState } from '../authSlice/types';
import { CaptchaState, CaptchaUrlResponse } from '../captchaSlice/types';
import { LoginRequestState } from '../loginRequestSlice/types';
import { LoginResponse, LoginResponseState, LogoutResponse } from '../loginResponseSlice/types';
import { TagValues } from '../types';

export const appApi = createApi({
	reducerPath: ApiName.appApi,
	baseQuery: fetchBaseQuery({
		baseUrl: API.baseURL,
		prepareHeaders: (headers) => {
			headers.set(API.apiKey, API.apiToken);
			return headers;
		},
		credentials: 'include',
	}),
	refetchOnReconnect: true,
	tagTypes: [Tag.auth, Tag.captcha],
	endpoints: (builder) => ({
		fetchAuth: builder.query<AuthState, null>({
			query: () => API.authMe,
			keepUnusedDataFor: 60,
			transformResponse: (response: Auth) => getAuthResponse(response),
			providesTags: [Tag.auth],
		}),
		login: builder.mutation<LoginResponseState, LoginRequestState>({
			query: (data: LoginRequestState) => ({
				url: API.login,
				method: Method.post,
				body: data,
			}),
			transformResponse: (response: LoginResponse) => {
				return getLoginResponse(response);
			},
			invalidatesTags: (result) => {
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
		}),
		logout: builder.mutation<LogoutResponse, null>({
			query: () => ({
				url: API.logout,
				method: Method.post,
			}),
			invalidatesTags: [Tag.auth],
		}),
		fetchCaptcha: builder.query<CaptchaState, null>({
			query: () => API.captchaUrl,
			providesTags: [Tag.captcha],
			transformResponse: (response: CaptchaUrlResponse) => ({ captchaUrl: response.url }),
		}),
	}),
});

export const { useFetchAuthQuery, useLoginMutation, useLogoutMutation, useFetchCaptchaQuery } =
	appApi;
