import {
	Photos,
	ProfilePhotoResponse,
	ProfileState,
	ProfileStatusResponse,
	ProfileStatusState,
	Status,
	UserId,
} from '@/store/slices/profileSlice/types';
import { ApiName, API } from '@/constants/apiConstants';
import { Method, Tag } from '@/constants/systemConstants';
import { getAuthResponse, getLoginResponse } from '@/helpers';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Auth, AuthState } from '../authSlice/types';
import { CaptchaState, CaptchaUrlResponse } from '../captchaSlice/types';
import { LoginRequestState } from '../loginRequestSlice/types';
import { LoginResponse, LoginResponseState, LogoutResponse } from '../loginResponseSlice/types';
import { TagValues } from '../types';
import { UsersRequestState, UsersState } from '../usersSlice/types';

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
	tagTypes: [Tag.auth, Tag.captcha, Tag.profile, Tag.status],
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
		fetchProfile: builder.query<ProfileState, UserId | null>({
			query: (userId) => ({
				url: API.profile,
				params: { userId },
			}),
			providesTags: [Tag.profile],
		}),
		fetchProfileStatus: builder.query<ProfileStatusState, UserId | null>({
			query: (userId) => ({
				url: API.getProfileStatus,
				params: { userId },
			}),
			providesTags: [Tag.status],
			transformResponse: (response: Status) => ({ status: response }),
		}),
		setProfileStatus: builder.mutation<ProfileStatusResponse, Status>({
			query: (status) => ({
				url: API.setProfileStatus,
				method: Method.put,
				body: { status },
			}),
			invalidatesTags: [Tag.status],
		}),
		setProfileAvatar: builder.mutation<Photos, FormData>({
			query: (photo) => ({
				url: API.profilePhoto,
				method: Method.put,
				body: photo,
			}),
			transformResponse: ({ data }: ProfilePhotoResponse) => ({
				large: data.photos.large,
				small: data.photos.small,
			}),
		}),
		fetchUsers: builder.query<UsersState, UsersRequestState>({
			query: (requestParams) => ({
				url: API.users,
				params: { ...requestParams },
			}),
		}),
	}),
});

export const {
	useFetchAuthQuery,
	useLoginMutation,
	useLogoutMutation,
	useFetchCaptchaQuery,
	useFetchProfileQuery,
	useFetchProfileStatusQuery,
	useSetProfileStatusMutation,
	useSetProfileAvatarMutation,
	useFetchUsersQuery,
} = appApi;
