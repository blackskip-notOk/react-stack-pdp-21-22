import { setProfileLoading } from '@/models/profile/index';
import { AxiosError } from 'axios';
import { setProfileError } from '@/models/profile';
import { API } from '@/constants/apiConstants';
import { instance } from '.';
import { ProfileResponse, UserId } from '@/models/profile/types';

export const fetchProfileApi = async (userId: UserId): Promise<ProfileResponse> => {
	setProfileLoading(true);

	try {
		const response = await instance.get(API.profile, { params: { userId } });
		return response.data;
	} catch (e: unknown) {
		const error = e as AxiosError;
		if (error.isAxiosError) {
			setProfileError(error);
		}
		throw error;
	} finally {
		setProfileLoading(false);
	}
};
