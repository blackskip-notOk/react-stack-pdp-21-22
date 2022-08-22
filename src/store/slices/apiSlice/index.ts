import type {
	Photos,
	ProfileState,
	ProfileStatusResponse,
	ProfileStatusState,
	Status,
	UserID,
} from '~/store/slices/profileSlice/types';
import { ApiName, API } from '~/constants/apiConstants';
import { Tag } from '~/constants/systemConstants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthState } from '../authSlice/types';
import { CaptchaState } from '../captchaSlice/types';
import { LoginRequestState } from '../loginRequestSlice/types';
import { LoginResponseState, LogoutResponse } from '../loginResponseSlice/types';
import { FollowResponse, UsersRequestState, UsersState } from '../usersSlice/types';
import { authApi } from './auth';
import { fetchCaptchaApi, loginApi, logoutApi } from './login';
import {
	fetchProfileApi,
	fetchProfileStatusApi,
	setProfileStatusApi,
	setProfileAvatarApi,
} from './profile';
import { fetchUsersApi, followUserApi, unFollowUserApi } from './users';

export const appApi = createApi({
	reducerPath: ApiName.appApi,
	baseQuery: fetchBaseQuery({
		baseUrl: API.baseURL,
		prepareHeaders: (headers) => {
			headers.set(API.apiKey, API.apiToken);
			return headers;
		},
		credentials: 'include',
		mode: 'cors',
	}),
	refetchOnReconnect: true,
	tagTypes: [Tag.auth, Tag.captcha, Tag.profile, Tag.status],
	endpoints: (builder) => ({
		fetchAuth: builder.query<AuthState, null>(authApi),
		login: builder.mutation<LoginResponseState, LoginRequestState>(loginApi),
		logout: builder.mutation<LogoutResponse, null>(logoutApi),
		fetchCaptcha: builder.query<CaptchaState, null>(fetchCaptchaApi),
		fetchProfile: builder.query<ProfileState, UserID | null>(fetchProfileApi),
		fetchProfileStatus: builder.query<ProfileStatusState, UserID | null>(fetchProfileStatusApi),
		setProfileStatus: builder.mutation<ProfileStatusResponse, Status>(setProfileStatusApi),
		setProfileAvatar: builder.mutation<Photos, FormData>(setProfileAvatarApi),
		fetchUsers: builder.query<UsersState, UsersRequestState>(fetchUsersApi),
		followUser: builder.mutation<FollowResponse, UserID>(followUserApi),
		unFollowUser: builder.mutation<FollowResponse, UserID>(unFollowUserApi),
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
	useFollowUserMutation,
	useUnFollowUserMutation,
} = appApi;
