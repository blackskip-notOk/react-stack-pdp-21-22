import { AxiosError } from 'axios';
import { API } from '@/constants/apiConstants';
import { instance } from '.';
import {
	ProfilePhotoResponse,
	ProfileResponse,
	ProfileStatusResponse,
} from '@/models/profile/types';
import {
	useQuery,
	UseQueryResult,
	useMutation,
	RefetchOptions,
	RefetchQueryFilters,
	QueryObserverResult,
} from 'react-query';

export const fetchProfileApi = async (userId?: string): Promise<ProfileResponse> => {
	const response = await instance.get(API.profile, { params: { userId: Number(userId) } });
	return response.data;
};

export const useGetProfile = (
	userId?: string,
): UseQueryResult<ProfileResponse, AxiosError<ProfileResponse>> => {
	return useQuery(['profile', userId], () => fetchProfileApi(userId));
};

export const setProfileAvatarApi = async (photo: File): Promise<ProfilePhotoResponse> => {
	const formData = new FormData();
	formData.append('image', photo);

	const response = await instance.post(API.profilePhoto, formData, {
		headers: {
			'Content-Type': 'multupart/form-data',
		},
	});

	return response.data;
};

export const useSetProfileAvatar = (
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
	) => Promise<QueryObserverResult<ProfileResponse, AxiosError<ProfileResponse>>>,
) => {
	return useMutation<ProfilePhotoResponse, AxiosError<ProfilePhotoResponse>, File>(
		['setAvatar'],
		setProfileAvatarApi,
		{
			onSuccess: () => {
				refetch();
			},
		},
	);
};

export const getProfileStatusApi = async (userId?: number): Promise<string> => {
	const response = await instance.get(API.getProfileStatus, { params: { userId: userId } });

	return response.data;
};

export const useGetProfileStatus = (
	userId?: number,
): UseQueryResult<string, AxiosError<string>> => {
	return useQuery(['getStatus', userId], () => getProfileStatusApi(userId));
};

export const setProfileStatusApi = async (status?: string): Promise<ProfileStatusResponse> => {
	const response = await instance.put(API.setProfileStatus, { status });

	return response.data;
};

export const useSetProfileStatus = (
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
	) => Promise<QueryObserverResult<string, AxiosError<string>>>,
) => {
	return useMutation<ProfileStatusResponse, AxiosError<ProfileStatusResponse>, string | undefined>(
		['setStatus'],
		setProfileStatusApi,
		{
			onSuccess: () => {
				refetch();
			},
		},
	);
};
