import { AxiosError } from 'axios';
import { API } from '@/constants/apiConstants';
import { instance } from '.';
import { ProfilePhotoResponse, ProfileResponse } from '@/models/profile/types';
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
