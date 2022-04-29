import { API } from '@/constants/apiConstants';
import { instance } from '.';
import { AuthResponse } from '@/models/auth/types';

export const fetchAuthApi = async (): Promise<AuthResponse> => {
	const response = await instance.get(API.authMe);
	return { status: response.status, authInfo: response.data };
};
