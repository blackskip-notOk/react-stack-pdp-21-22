import { AxiosError, AxiosResponse } from 'axios';
import { API } from '@/constants/apiConstants';
import { instance } from '.';
import { FollowResponse, UsersRequest, UsersResponse } from '@/models/users/types';
import { setUsersError, setUsersLoading } from '@/models/users';
import { useMutation } from 'react-query';

export const fetchUsersApi = async (requestParams: UsersRequest): Promise<UsersResponse> => {
	setUsersLoading(true);

	try {
		const response = await instance.get(API.users, { params: { ...requestParams } });
		return response.data;
	} catch (e: unknown) {
		const error = e as AxiosError;
		if (error.isAxiosError) {
			setUsersError(error);
		}
		throw error;
	} finally {
		setUsersLoading(false);
	}
};

export const fetchFollowApi = async (userId: number): Promise<AxiosResponse<FollowResponse>> => {
	const response = await instance.post(API.follow, null, { params: { userId } });
	return response;
};

export const fetchUnFollowApi = async (userId: number): Promise<AxiosResponse<FollowResponse>> => {
	const response = await instance.delete(API.follow, { params: { userId } });
	return response;
};

export const useFollow = (userId: number) => {
	return useMutation<AxiosResponse<FollowResponse>, AxiosError<FollowResponse>, number>(
		['follow', userId],
		fetchFollowApi,
	);
};

export const useUnFollow = (userId: number) => {
	return useMutation<AxiosResponse<FollowResponse>, AxiosError<FollowResponse>, number>(
		['unFollow', userId],
		fetchUnFollowApi,
	);
};
